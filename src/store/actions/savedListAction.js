import axios from 'axios';

export const ADD_TO_SAVED_SUCCESS = 'ADD_TO_SAVED_SUCCESS';
export const ADD_TO_SAVED_ERROR = 'ADD_TO_SAVED_ERROR';
export const DEL_SAVED_SUCCESS = 'DEL_SAVED_SUCCESS';
export const DEL_SAVED_ERROR = 'DEL_SAVED_ERROR';
export const FETCH_SAVED = 'FETCH_SAVED';

export const savedList = (type, id, arr, item) => {
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
        } else if (type === 'del') {
            if(arr.splice(arr.indexOf(item), 1) !== -1) {
                axios
                .delete(`https://fakestoreapi.com/products/${id}`)
                .then(res => {
                    arr.splice(arr.indexOf(item), 1);
                    dispatch({ type: DEL_SAVED_SUCCESS, payload: arr });
                })
                .catch(err => {
                    dispatch({ type: DEL_SAVED_ERROR, payload: err });
                })
            } else {
                dispatch({ type: DEL_SAVED_ERROR, payload: 'ERROR: Item was not found in saved list.'})
            }
        }
    }
}