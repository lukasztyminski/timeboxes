import React from 'react';
import { connect } from 'react-redux';
import { getAllTimeboxes, getRemainingTimeboxes } from '../reducers';

export const TimeboxesList = ({ timeboxes, renderTimebox }) => {
  return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
};

const mapStateToPropsAll = (state) => ({ timeboxes: getAllTimeboxes(state) });

const mapStateToPropsRemaining = (state) => ({
  timeboxes: getRemainingTimeboxes(state),
});

export const AllTimeboxesList = connect(mapStateToPropsAll)(TimeboxesList);

export const RemainingTimeboxesList = connect(mapStateToPropsRemaining)(
  TimeboxesList
);
