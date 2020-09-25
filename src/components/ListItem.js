import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct, updateProduct } from '../store/actions';

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
    category: '',
    image: '',
    description: '',
    price: 0.00,
};

const defaultErrors = {
    title: '',
    image: '',
    description: '',
    price: '',
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
    image: yup.string(),
    description: yup.string().required('Description is required'),
    price: yup.string().required('Price is required')
  })

  const ListItem = (props) => {
    const { addProduct, forSale, updateProduct, product } = props;
    // State
    const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const history = useHistory();
    const classes = useStyles();
    const params = useParams();
    
    useEffect(() => {
      setFormValues(forSale.find(obj => obj.id === parseInt(params.id)))
    }, [updateProduct])
    
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
          }
          // Axios functionality
          !params.id ? addProduct(newData) : updateProduct(parseInt(params.id), newData);
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
                        <TextField value={formValues.description} onChange={handleChanges} variant="outlined" margin="normal" required fullWidth label="Description" name="description" />
                        <p>{errors.description}</p>
                        <InputLabel htmlFor="outlined-adornment-amount">&nbsp; &nbsp; Price</InputLabel>
                        <OutlinedInput name='price' id="outlined-adornment-amount" value={formValues.price} onChange={handleChanges} startAdornment={<InputAdornment position="start">$</InputAdornment>} labelWidth={60} placeholder='Enter a valid price' />                        
                        <p>{errors.price}</p>
                        <Button disabled={buttonDisabled} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Submit </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
};

const mapStateToProps = state => {
  return {
    forSale: state.fetchForSale.forSale,
    product: state.fetchForSale.product
  }
}

export default connect(mapStateToProps, { addProduct, updateProduct })(ListItem);