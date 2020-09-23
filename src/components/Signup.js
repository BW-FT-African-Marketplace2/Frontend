// import { axiosWithAuth } from '../utils/axiosWithAuth'; // Will use this for axios so we won't have to keep retyping the URL
import Form from './SignupForm'
import React, { useState, useEffect } from 'react'
import schema from './SignupFormSchema'
import axios from 'axios'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';
import './Signup.css'

const initialFormValues = {
  username: '',
  primaryemail: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  username: '',
  primaryemail: '',
  password: '',
  terms: '',
}

const initialDisabled = true

export default function Signup() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [post, setPost] = useState([])
  const history = useHistory();
  const postNewUser = newUser => {
    axios.post("https://african-market-2.herokuapp.com/createnewuser", newUser)
      .then(res => {
        setPost(res.data)
        setFormValues(initialFormValues)
        console.log(res.data)
        history.push("/login")
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
      })
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      primaryemail: formValues.primaryemail.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>&nbsp;User Signup</h1></header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        formValues={formValues}
        postNewUser={postNewUser}
      />
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  )
}
