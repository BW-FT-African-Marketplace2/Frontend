import { ADD_TO_SAVED_ERROR, ADD_TO_SAVED_SUCCESS, DEL_SAVED_SUCCESS, DEL_SAVED_ERROR } from '../actions'
import { LOCATION_CHANGE } from 'react-router-redux'

const initState = {
    saved: [],
    error: ''
};

export const savedList = (state = initState, action) => {
    switch(action.type) {
        case LOCATION_CHANGE: 
            return state;

        case ADD_TO_SAVED_SUCCESS:
            return {
                error: '',
                saved: [action.payload, ...state.saved]
            };

        case ADD_TO_SAVED_ERROR:
            return {
                saved: state.saved,
                error: action.payload
            };

        case DEL_SAVED_SUCCESS:
            return {
                saved: action.payload,
                error:''
            }

        case DEL_SAVED_ERROR:
            return {
                error: action.payload,
                saved: state.saved
            }

        default:
            return state;
    }
};