import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const fetchForSale = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA });
  }
};
