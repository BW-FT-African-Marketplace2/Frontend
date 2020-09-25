import { combineReducers } from 'redux'
import { fetchUserData } from './fetchUserDataReducer';
import { fetchForSale } from './fetchForSaleReducer';
import { savedList } from './savedListReducer'

export default combineReducers({
  fetchUserData,
  fetchForSale,
  savedList
})