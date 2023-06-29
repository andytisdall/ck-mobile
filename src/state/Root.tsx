import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ThunkMiddleware from 'redux-thunk-recursion-detect';
import clearError from '../middlewares/clearError';
import errorHandlerMiddleware from '../middlewares/errorHandler';
import reducers from './reducers';
import React from 'react';

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(clearError, errorHandlerMiddleware, ThunkMiddleware)),
);

const Root = ({
  children,
}: {
  children: JSX.Element;
  initialState: {};
}): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default Root;
