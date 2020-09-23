import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        Header: {
            Authorization: token
        },
        baseURL: 'https://reqres.in'
    })
};