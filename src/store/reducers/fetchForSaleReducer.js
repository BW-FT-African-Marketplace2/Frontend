import { FETCH_STORE_DATA, FETCH_STORE_DATA_SUCCESS, FETCH_STORE_DATA_ERROR } from '../actions'

const initState = {
  forSale: [],
  isLoading: false,
  error: ''
}

export const fetchForSale = (state = initState, action) => {
    switch(action.type) {
        case FETCH_STORE_DATA:
            return {
                ...initState,
                isLoading: true
            };
        case FETCH_STORE_DATA_SUCCESS:
            return {
                ...initState,
                forSale: action.payload
            };
        case FETCH_STORE_DATA_ERROR:
            return {
                ...initState,
                error: action.payload
            };
        default:
            return state;
    }
}