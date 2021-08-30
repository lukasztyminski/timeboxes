const timeboxesLoadingErrorReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_SET': {
      const { timeboxesLoadingError } = action;
      return timeboxesLoadingError;
    }
    default: {
      return state;
    }
  }
};

export const getTimeboxesLoadingError = (state) => state;

export default timeboxesLoadingErrorReducer;
