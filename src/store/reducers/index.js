const initState = {
  forsale: [],
  isLoading: false
}

export const fetchForSale = (state = initState, action)=> {
  switch(action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  };
};
