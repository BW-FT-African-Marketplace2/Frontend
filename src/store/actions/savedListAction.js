import axios from 'axios';

export const ADD_TO_SAVED_SUCCESS = 'ADD_TO_SAVED_SUCCESS';
export const ADD_TO_SAVED_ERROR = 'ADD_TO_SAVED_ERROR';

export const savedList = (type, id) => {
    return dispatch => {
        if(type === 'add') {
            axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                dispatch({ type: ADD_TO_SAVED_SUCCESS, payload: res.data});
            })
            .catch(err => {
                dispatch({ type: ADD_TO_SAVED_ERROR, payload: err });
            });
        }
    }
}