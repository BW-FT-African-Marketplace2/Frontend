import axios from 'axios';
export const FETCH_STORE_DATA = 'FETCH_STORE_DATA';
export const FETCH_STORE_DATA_SUCCESS = 'FETCH_STORE_DATA_SUCCESS';
export const FETCH_STORE_DATA_ERROR = 'FETCH_STORE_DATA_ERROR';

export const fetchForSale = () => {
  return dispatch => {
    dispatch({ type: FETCH_STORE_DATA });
    axios
    .get('https://fakestoreapi.com/products')
    .then(res => {
      dispatch({ type: FETCH_STORE_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: FETCH_STORE_DATA_ERROR, payload: err});
    });
  };
};