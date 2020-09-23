import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; // Will use this for axios so we won't have to keep retyping the URL
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
        bw_ft_african_2
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

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
            username: formValues.username.trim(),
            password: formValues.password,
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
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"> Log in </Typography>
                    <form className={classes.form} onSubmit={submit}>
                        <TextField value={formValues.username} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth id="email" label="Username" name="username" autoComplete="email" autoFocus />
                        <p>{errors.username}</p>
                        <TextField value={formValues.password} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                        <p>{errors.password}</p>
                        <Button disabled={buttonDisabled} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Log In </Button>
                        <Grid container>
                            <Grid item>
                            <Link href="#" variant="body2"> {"Don't have an account? Sign Up"} </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
};

export default Login;