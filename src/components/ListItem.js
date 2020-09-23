import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; // Will use this for axios so we won't have to keep retyping the URL
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './ListItem.css';

const defaultValues = {
    title: '',
    image: '',
    description: '',
    price: undefined,
    location: '',
};

const defaultErrors = {
    title: '',
    image: '',
    description: '',
    price: '',
    location: '',
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    image: yup.string().required('Image is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required'),
    location: yup.string().required('Location is required'),
})

const Login = (props) => {
    // State
    const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const history = useHistory();

    // Form functions
    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({ ...formValues, [name]: value });
    }

    const submit = (evt) => {
        const token = localStorage.setItem('token', 'testtoken')
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            title: formValues.title.trim(),
            image: formValues.image,
            description: formValues.description.trim(),
            price: formValues.price,
            location: formValues.trim(),
        }
        // Axios functionality
        axios.post('https://reqres.in/api/users', formValues)
            .then((res) => {
                console.log(res.data);
            })
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
        history.push('/dashboard');
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
        <div className='login'>
            <h2>List an item for sale!</h2>
            <form onSubmit={submit}>
                <label htmlFor="title">Title: </label>
                <input type='text' name='title' value={formValues.title} onChange={handleChanges}/>
                <p>{errors.title}</p>

                <label htmlFor="image">Image: </label>
                <input type='text' name='image' value={formValues.image} onChange={handleChanges} />
                <p>{errors.image}</p>

                <label htmlFor="desription">Description: </label>
                <textarea name="description" cols="30" rows="3" onChange={handleChanges}></textarea>
                <p>{errors.description}</p>

                <label htmlFor="price">Price: </label>
                <input type='number' name='price' min="0" step="0.01" placeholder='Enter a valid price' value={formValues.price} onChange={handleChanges} />
                <p>{errors.price}</p>

                <label htmlFor="location">Location: </label>
                <input type='text' name='location' value={formValues.location} onChange={handleChanges} />
                <p>{errors.location}</p>

                <button className='button' disabled={buttonDisabled} >List Item</button>
            </form>
        </div>
    )
};

export default Login;