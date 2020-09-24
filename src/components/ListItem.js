import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; // Will use this for axios so we won't have to keep retyping the URL
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';





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

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(15),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#f94144',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

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
    const classes = useStyles();

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

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5"> List an item for sale! </Typography>
                    <form className={classes.form} onSubmit={submit}>
                        <TextField value={formValues.title} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth label="Title" name="title" autoComplete="email" autoFocus />
                        <p>{errors.title}</p>
                        <TextField value={formValues.image} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth name="image" label="Image" type="text" />
                        <p>{errors.image}</p>
                        <TextField value={formValues.description} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth label="Description" name="description" autoComplete="email" autoFocus />
                        <p>{errors.description}</p>
                        <TextField value={formValues.location} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth label="Location" name="location" autoComplete="email" autoFocus />
                        <p>{errors.location}</p>
                        <InputLabel htmlFor="outlined-adornment-amount">&nbsp; &nbsp; Price</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" value={formValues.amount} onChange={handleChanges} startAdornment={<InputAdornment position="start">$</InputAdornment>} labelWidth={60} placeholder='Enter a valid price' />                        
                        <p>{errors.price}</p>
                        <Button disabled={buttonDisabled} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Submit </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
};

export default Login;