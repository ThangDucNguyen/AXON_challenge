import 'rxjs';
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import { createBrowserHistory } from 'history';
import { reduce } from 'lodash';
import {createRootReducer, epics } from '../../reduxResources';
const history = createBrowserHistory();

const createStore = (initialState) => {
  const state = initialState || {};
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [
    epicMiddleware,
    routerMiddleware(history),
  ];
  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createReduxStore(
    createRootReducer(history),
    fromJS(state),
    composeEnhancers(...enhancers),
  );

  const Epics = combineEpics(...reduce(epics, (acc, epic) => { return acc.concat(epic); }, []));
  epicMiddleware.run(Epics)
  return store;
};

export {
  createStore,
  history
};
