import axios from 'axios';
export const FETCH_STORE_DATA = 'FETCH_STORE_DATA';
export const FETCH_STORE_DATA_SUCCESS = 'FETCH_STORE_DATA_SUCCESS';
export const FETCH_STORE_DATA_ERROR = 'FETCH_STORE_DATA_ERROR';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';

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

export const addProduct = (item) => {
  return dispatch => {
    axios
    .post('https://fakestoreapi.com/products', item)
    .then(res => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_PRODUCT_ERROR, payload: err });
    })
  }
}

export const updateProduct = (id, data) => {
  return dispatch => {
    axios
    .patch(`https://fakestoreapi.com/products/${id}`, data)
    .then(res => {
      res.data.id = parseInt(res.data.id);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: UPDATE_PRODUCT_ERROR, payload: err });
    });
  };
};