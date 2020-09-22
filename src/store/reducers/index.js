import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions/fetchForSaleAction'

const initState = {
  forSale: [],
  isLoading: false,
  error: ''
}

export const fetchForSale = (state = initState, action)=> {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...initState,
        forSale: action.payload
      };

    case FETCH_DATA_ERROR:
      return {
        ...initState,
        error: action.payload
      };

    default:
      return state;
  };
};
