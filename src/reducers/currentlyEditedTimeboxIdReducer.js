const currentlyEditedTimeboxIdReducer = (state = null, action) => {
  switch (action.type) {
    case 'TIMEBOX_EDIT_START': {
      const { currentlyEditedTimeboxId } = action;
      return currentlyEditedTimeboxId;
    }
    case 'TIMEBOX_EDIT_STOP': {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const isTimeboxEdited = (state) => state;
export const isAnyTimeboxEdited = (state) => state;
export const getCurrentlyEditedTimebox = (state) => state;

export default currentlyEditedTimeboxIdReducer;
