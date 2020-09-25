import { FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_ERROR } from '../actions'

const initState = {
  users: [],
  isLoading: false,
  error: ''
}

export const fetchUserData = (state = initState, action)=> {
  switch(action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_USER_DATA_SUCCESS:
      return {
        ...initState,
        users: action.payload
      };

    case FETCH_USER_DATA_ERROR:
      return {
        ...initState,
        error: action.payload
      };

    default:
      return state;
  };
};
