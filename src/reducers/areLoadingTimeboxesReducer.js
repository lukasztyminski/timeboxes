const areLoadingTimeboxesReducer = (state = true, action) => {
  switch (action.type) {
    case 'LOADING_INDICATOR_DISABLE': {
      return false;
    }
    default: {
      return state;
    }
  }
};

export const areTimeboxesLoading = (state) => state;

export default areLoadingTimeboxesReducer;
