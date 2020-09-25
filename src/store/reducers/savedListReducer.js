import { ADD_TO_SAVED_ERROR, ADD_TO_SAVED_SUCCESS } from '../actions'

const initState = {
    saved: [],
    error: ''
};

export const savedList = (state = initState, action) => {
    switch(action.type) {
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

        default:
            return state;
    }
};