import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCH_USER_DATA = 'FETCH_DATA';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_USER_DATA_ERROR = 'FETCH_DATA_ERROR';

export const fetchUserData = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USER_DATA });
    axiosWithAuth()
    .get('/api/users')
    .then(res => {
      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_DATA_ERROR, payload: err });
    })
  }
};