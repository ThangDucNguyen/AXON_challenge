import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import * as defaultEpics from 'utils/reduxObservableHelpers';
import { connectRouter } from 'connected-react-router';
import { reducer as localeReducer } from './locale';
import { reducer as ajaxReducer } from './ajax';
import { reducer as userReducer } from './users';

const epics = {
  ...defaultEpics,
};

const createRootReducer = (history) => combineReducers({
  form: formReducer,
  locale: localeReducer,
  ajax: ajaxReducer,
  users: userReducer,
  router: connectRouter(history)
})

export {
  epics,
  createRootReducer ,
};
