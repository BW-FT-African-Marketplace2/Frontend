import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; // Will use this for axios so we won't have to keep retyping the URL
import * as yup from 'yup';

const defaultValues = {
    username: '',
    password: '',
};

const defaultErrors = {
    username: '',
    password: '',
};

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})

const Login = (props) => {
    // State
    const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)

    // Form functions
    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({ ...formValues, [name]: value });
    }

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            username: formValues.username.trim(),
            password: formValues.password,
        }
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
    }

    const validate = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then((valid) => {
            setErrors({ ...errors, [name]: "" });
          })
          .catch((err) => {
            setErrors({ ...errors, [name]: err.errors[0] });
          });
      };

    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
          setButtonDisabled(!valid);
        });
      }, [formValues]);

    return (
        <div>
            <form onSubmit={submit}>
                <label for="username">Username: </label>
                <input type='text' name='username' value={formValues.username} onChange={handleChanges}/>
                <p>{errors.username}</p>

                <label for="password">Password: </label>
                <input type='password' name='password' value={formValues.password} onChange={handleChanges} />
                <p>{errors.password}</p>

                <button disabled={buttonDisabled} >Login</button>
            </form>
        </div>
    )
};

export default Login;