import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import TimeboxCreator from './TimeboxCreator';

import { RemainingTimeboxesList } from './TimeboxesList';

import {
  fetchAllTimeboxes,
  removeTimeboxRemotely,
  addTimeboxRemotely,
  updateTimeboxRemotely,
} from '../timeboxesActions';
import EditableTimebox from './EditableTimebox';
import { areTimeboxesLoading, getTimeboxesLoadingError } from '../reducers';

const TimeboxesManager = () => {
  const dispatch = useDispatch();
  const timeboxesLoading = useSelector(areTimeboxesLoading);
  const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);

  useEffect(() => {
    dispatch(fetchAllTimeboxes());
  }, [dispatch]);

  const handleCreate = (createdTimebox) =>
    dispatch(addTimeboxRemotely(createdTimebox));

  const renderTimebox = (timebox) => {
    const onUpdate = (updatedTimebox) =>
      dispatch(updateTimeboxRemotely(timebox, updatedTimebox));

    const onDelete = () => dispatch(removeTimeboxRemotely(timebox));

    return (
      <EditableTimebox
        timebox={timebox}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  };

  return (
    <>
      <TimeboxCreator onCreate={handleCreate} />
      {timeboxesLoading ? 'Timeboxes is loading...' : null}
      {timeboxesLoadingError ? 'Failed to load...' : null}
      <RemainingTimeboxesList renderTimebox={renderTimebox} />
    </>
  );
};

export default TimeboxesManager;
