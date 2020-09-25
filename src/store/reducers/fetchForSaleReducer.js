import { FETCH_STORE_DATA, 
    FETCH_STORE_DATA_SUCCESS, 
    FETCH_STORE_DATA_ERROR, 
    ADD_PRODUCT_SUCCESS, 
    ADD_PRODUCT_ERROR,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR
} from '../actions'

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

        case ADD_PRODUCT_SUCCESS:
            return {
                forSale: [action.payload, ...state.forSale],
                error: ''
            };

        case ADD_PRODUCT_ERROR:
            return {
                forSale: state.forSale,
                error: action.payload
            }

        case UPDATE_PRODUCT_SUCCESS:
            const updatedIndex = state.forSale.findIndex(obj => obj.id === action.payload.id);
            state.forSale.splice(updatedIndex, 1);
            return {
                ...state,
                forSale: [action.payload, ...state.forSale]
            }
        
        default:
            return state;
    }
}