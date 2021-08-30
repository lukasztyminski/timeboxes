import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';

export function useForceUpdate() {
  let [updateCounter, setUpdateCounter] = useState(0);
  function forceUpdate() {
    updateCounter = updateCounter - 1;
    setUpdateCounter((updateCounter) => updateCounter + 1);
  }
  return forceUpdate;
}

export function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const connectToRedux = (mapStateToProps) => {
  return function (Component) {
    const ConnectedComponent = (props) => {
      const store = useStore();
      const state = store.getState();
      const forceUpdate = useForceUpdate();
      useEffect(() => store.subscribe(forceUpdate, []));
      const mappedProps = mapStateToProps(state);
      const newProps = {
        ...props,
        ...mappedProps,
      };
      return <Component {...newProps} />;
    };
    return ConnectedComponent;
  };
};
