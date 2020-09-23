import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const fetchForSale = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA });
    axiosWithAuth()
    .get('/api/users')
    .then(res => {
      console.log(res.data)
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_DATA_ERROR, payload: err });
    })
  }
};
