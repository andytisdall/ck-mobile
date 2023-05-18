import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ThunkMiddleware from 'redux-thunk-recursion-detect';
// import clearError from './middlewares/clearError';
// import errorHandlerMiddleware from './middlewares/errorHandler';
import reducers from './reducers';
import React from 'react';

const Root = ({
  children,
  initialState = {},
}: {
  children: JSX.Element;
  initialState: {};
}): JSX.Element => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(ThunkMiddleware)),
  );
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
