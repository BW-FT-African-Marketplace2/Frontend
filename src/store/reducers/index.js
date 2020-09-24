import { combineReducers } from 'redux'
import { fetchUserData } from './fetchUserDataReducer';
import { fetchForSale } from './fetchForSaleReducer';

export default combineReducers({
  fetchUserData,
  fetchForSale
})