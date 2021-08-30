import { combineReducers } from 'redux';

import areLoadingTimeboxesReducer, * as areLoadingTimeboxesSelectors from './areLoadingTimeboxesReducer';
import currentlyEditedTimeboxIdReducer, * as currentlyEditedTimeboxIdSelectors from './currentlyEditedTimeboxIdReducer';
import currentTimeboxIdReducer, * as currentTimeboxIdSelectors from './currentTimeboxIdReducer';
import timeboxesLoadingErrorReducer, * as timeboxesLoadingErrorSelectors from './timeboxesLoadingErrorReducer';
import timeboxesReducer, * as timeboxesSelectors from './timeboxesReducer';

export const rootReducer = combineReducers({
  currentTimeboxId: currentTimeboxIdReducer,
  timeboxes: timeboxesReducer,
  currentlyEditedTimeboxId: currentlyEditedTimeboxIdReducer,
  areLoadingTimeboxes: areLoadingTimeboxesReducer,
  timeboxesLoadingError: timeboxesLoadingErrorReducer,
});

export const getAllTimeboxes = (state) =>
  timeboxesSelectors.getAllTimeboxes(state.timeboxes);
export const getRemainingTimeboxes = (state) =>
  timeboxesSelectors.getRemainingTimeboxes(state.timeboxes);
export const getTimeboxById = (state, timeboxId) =>
  timeboxesSelectors.getTimeboxById(state.timeboxes, timeboxId);

export const areTimeboxesLoading = (state) =>
  areLoadingTimeboxesSelectors.areTimeboxesLoading(state.areLoadingTimeboxes);

export const getTimeboxesLoadingError = (state) =>
  timeboxesLoadingErrorSelectors.getTimeboxesLoadingError(
    state.timeboxesLoadingError
  );

export const isTimeboxEdited = (state, timebox) =>
  currentlyEditedTimeboxIdSelectors.isTimeboxEdited(
    state.currentlyEditedTimeboxId &&
      state.currentlyEditedTimeboxId === timebox.id
  );
export const isAnyTimeboxEdited = (state) =>
  currentlyEditedTimeboxIdSelectors.isAnyTimeboxEdited(
    !!state.currentlyEditedTimeboxId
  );

export const getCurrentlyEditedTimebox = (state) =>
  currentlyEditedTimeboxIdSelectors.getCurrentlyEditedTimebox(
    getTimeboxById(state, state.currentlyEditedTimeboxId)
  );
export const isAnyTimeboxCurrent = (state) =>
  currentTimeboxIdSelectors.isAnyTimeboxCurrent(!!state.currentTimeboxId);
export const getCurrentTimebox = (state) =>
  isAnyTimeboxCurrent(state)
    ? getTimeboxById(state, state.currentTimeboxId)
    : null;
