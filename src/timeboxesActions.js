import AxiosTimeboxesAPI from './api/AxiosTimeboxesApi';
import { getCurrentTimebox, isAnyTimeboxCurrent } from './reducers';

export const setTimeboxes = (timeboxes) => ({
  type: 'TIMEBOXES_SET',
  timeboxes,
});

export const addTimebox = (timebox) => ({
  type: 'TIMEBOX_ADD',
  timebox,
});

export const removeTimebox = (removedTimebox) => ({
  type: 'TIMEBOX_REMOVE',
  removedTimebox,
});

export const replaceTimebox = (replacedTimebox) => ({
  type: 'TIMEBOX_REPLACE',
  replacedTimebox,
});

export const startEditingTimebox = (currentlyEditedTimeboxId) => ({
  type: 'TIMEBOX_EDIT_START',
  currentlyEditedTimeboxId,
});

export const makeTimeboxCurrent = (timebox) => ({
  type: 'TIMEBOX_MAKE_CURRENT',
  timebox,
});

export const finishCurrentTimebox = () => (dispatch, getState) => {
  if (isAnyTimeboxCurrent(getState())) {
    dispatch(removeTimebox(getCurrentTimebox(getState())));
  }
  return {
    type: 'CURRENT_TIMEBOX_FINISH',
  };
};

export const stopEditingTimebox = () => ({ type: 'TIMEBOX_EDIT_STOP' });

export const setError = (error) => ({
  type: 'ERROR_SET',
  timeboxesLoadingError: error,
});

export const disableLoadingIndicator = () => ({
  type: 'LOADING_INDICATOR_DISABLE',
});

export const fetchAllTimeboxes = () => (dispatch) => {
  AxiosTimeboxesAPI.getAllTimeboxes()
    .then((timeboxes) => {
      dispatch(setTimeboxes(timeboxes));
    })
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(disableLoadingIndicator()));
};

export const addTimeboxRemotely = (createdTimebox) => (dispatch) => {
  try {
    AxiosTimeboxesAPI.addTimebox(createdTimebox).then((addedTimebox) =>
      dispatch(addTimebox(addedTimebox))
    );
  } catch (error) {
    console.log('Jest błąd przy tworzeniu timeboxa:', error);
  }
};

export const updateTimeboxRemotely =
  (timebox, updatedTimebox) => (dispatch) => {
    const timeboxToUpdate = { ...timebox, ...updatedTimebox };
    AxiosTimeboxesAPI.partiallyUpdateTimebox(timeboxToUpdate).then(
      (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
    );
    dispatch(stopEditingTimebox());
  };

export const removeTimeboxRemotely = (timebox) => (dispatch) => {
  AxiosTimeboxesAPI.removeTimebox(timebox).then(() =>
    dispatch(removeTimebox(timebox))
  );
};
