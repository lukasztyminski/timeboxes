import React from 'react';
import { connect } from 'react-redux';
import {
  makeTimeboxCurrent,
  startEditingTimebox,
  stopEditingTimebox,
} from '../timeboxesActions';
import { isTimeboxEdited } from '../reducers';
import Timebox from './Timebox';
import TimeboxEditor from './TimeboxEditor';

const EditableTimebox = ({
  timebox,
  isEdited,
  onCancel,
  onUpdate,
  onEdit,
  onDelete,
  onMakeCurrent,
}) => {
  return (
    <>
      {isEdited ? (
        <TimeboxEditor
          initialTitle={timebox.title}
          initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
          onCancel={onCancel}
          onUpdate={onUpdate}
        />
      ) : (
        <Timebox
          key={timebox.id}
          title={timebox.title}
          totalTimeInMinutes={timebox.totalTimeInMinutes}
          onDelete={onDelete}
          onEdit={onEdit}
          onMakeCurrent={onMakeCurrent}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isEdited: isTimeboxEdited(state, ownProps.timebox),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const onCancel = () => dispatch(stopEditingTimebox());
  const onEdit = () => {
    dispatch(startEditingTimebox(ownProps.timebox.id));
  };
  const onMakeCurrent = () => dispatch(makeTimeboxCurrent(ownProps.timebox));
  return {
    onEdit,
    onCancel,
    onMakeCurrent,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableTimebox);
