import { reduce, toUpper, snakeCase, flow } from 'lodash';
import { fromJS } from 'immutable';
import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { REDUX_SUFFIXES, AJAX_SUFFIXES } from 'appConstants';

const { AJAX_CALL_SUCCEEDED_SUFFIX, AJAX_CALL_FAILED_SUFFIX } = AJAX_SUFFIXES;

const upperCase = flow(snakeCase, toUpper);

const reduxGenerator = (featureName) => {
  const featureNameUpperCase = upperCase(featureName);

  const actionTypes = reduce(REDUX_SUFFIXES, (acc, value, key) => {
    return {
      ...acc,
      [key]: `${featureNameUpperCase}_${key}`,
    };
  }, {});

  const actions = createActions(reduce(actionTypes, (acc, value, key) => {
    let func = null;
    if (key.endsWith(AJAX_CALL_SUCCEEDED_SUFFIX)) {
      func = (data) => { return { data }; };
    } else if (key.endsWith(AJAX_CALL_FAILED_SUFFIX)) {
      func = (error) => { return { error }; };
    }

    return {
      ...acc,
      [value]: func,
    };
  }, {}));

  const reducer = handleActions({
    [actionTypes.GET_ALL_SUCCEEDED]: (state, { payload: { data } }) => { return state.set('items', fromJS(data)); },
    [actionTypes.GET_ALL_FAILED]: (state, { payload: { error } }) => {
      return state.set('getAllError', fromJS(error));
    },
    [actionTypes.GET_ALL_CLEAN]: (state) => {
      return state.set('items', fromJS([]))
        .set('getAllError', fromJS({}));
    },
    [actionTypes.GET_SUCCEEDED]: (state, { payload: { data } }) => { return state.set('item', fromJS(data)); },
    [actionTypes.GET_FAILED]: (state, { payload: { error } }) => { return state.set('getError', fromJS(error)); },
    [actionTypes.GET_CLEAN]: (state) => {
      return state.set('item', fromJS({}))
        .set('getError', fromJS({}));
    },
    [actionTypes.INSERT_AJAX]: (state) => {
      return state
        .set('isInsertSucceeded', undefined)
        .set('insertError', undefined);
    },
    [actionTypes.INSERT_SUCCEEDED]: (state) => { return state.set('isInsertSucceeded', true); },
    [actionTypes.INSERT_FAILED]: (state, { payload: { error } }) => { return state.set('insertError', fromJS(error)); },
    [actionTypes.INSERT_CLEAN]: (state) => {
      return state
        .set('insertError', fromJS({}))
        .set('isInsertSucceeded', false);
    },
    [actionTypes.UPDATE_AJAX]: (state) => {
      return state
        .set('isUpdateSucceeded', undefined)
        .set('updateError', undefined);
    },
    [actionTypes.UPDATE_SUCCEEDED]: (state) => { return state.set('isUpdateSucceeded', true); },
    [actionTypes.UPDATE_FAILED]: (state, { payload: { error } }) => {
      return state
        .set('updateError', fromJS(error))
        .set('isUpdateSucceeded', false);
    },
    [actionTypes.UPDATE_CLEAN]: (state) => {
      return state
        .set('updateError', fromJS({}))
        .set('isUpdateSucceeded', false);
    },
    [actionTypes.DELETE_AJAX]: (state) => {
      return state
        .set('isDeleteSucceeded', undefined)
        .set('deleteError', undefined);
    },
    [actionTypes.DELETE_SUCCEEDED]: (state) => { return state.set('isDeleteSucceeded', true); },
    [actionTypes.DELETE_FAILED]: (state, { payload: { error } }) => { return state.set('deleteError', fromJS(error)); },
    [actionTypes.DELETE_CLEAN]: (state) => {
      return state
        .set('deleteError', fromJS({}))
        .set('isDeleteSucceeded', false);
    },
  }, fromJS({}));

  const select = (state) => { return state.get(featureName); };
  const selectAjax = (state) => { return state.get('ajax'); };
  const selectors = {
    items: createSelector(select, (f) => { return f.get('items'); }),
    item: createSelector(select, (f) => { return f.get('item'); }),
    insertError: createSelector(select, (f) => { return f.get('insertError'); }),
    isInsertSucceeded: createSelector(select, (f) => { return f.get('isInsertSucceeded'); }),
    isUpdateSucceeded: createSelector(select, (f) => { return f.get('isUpdateSucceeded'); }),
    isDeleteSucceeded: createSelector(select, (f) => { return f.get('isDeleteSucceeded'); }),
    isLoadingItems: createSelector(selectAjax, (ajax) => { return ajax.get(`${featureNameUpperCase}_GET_ALL`); }),
    isLoadingItem: createSelector(selectAjax, (ajax) => { return ajax.get(`${featureNameUpperCase}_GET`) === 1; }),
    isInserting: createSelector(selectAjax, (ajax) => { return ajax.get(`${featureNameUpperCase}_INSERT`) === 1; }),
    isUpdating: createSelector(selectAjax, (ajax) => { return ajax.get(`${featureNameUpperCase}_UPDATE`) === 1; }),
    isDeleting: createSelector(selectAjax, (ajax) => { return ajax.get(`${featureNameUpperCase}_DELETE`) === 1; }),
  };

  return {
    actionTypes,
    actions,
    reducer,
    select,
    selectors,
  };
};

export {
  reduxGenerator,
};
