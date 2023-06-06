import createThunkErrorCatchMiddleware from 'redux-thunk-error-handler';

import {setError} from '../actions';

const errorHandlerMiddleware = createThunkErrorCatchMiddleware({
  onError: setError,
});

export default errorHandlerMiddleware;
