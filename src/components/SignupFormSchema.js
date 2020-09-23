import * as yup from 'yup'

export default yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(7, 'Username must be 7 characters or longer'),
    primaryemail: yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup.string()
        .required('password is required')
        .min(3, 'password must be 3 chars or longer'),
    terms: yup.boolean().oneOf([true])
})