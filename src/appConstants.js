import keyMirror from 'keymirror';

const REDUX_SUFFIXES = keyMirror({
  GET_ALL_AJAX: null,
  GET_ALL_SUCCEEDED: null,
  GET_ALL_FAILED: null,
  GET_ALL_CLEAN: null,

  GET_AJAX: null,
  GET_SUCCEEDED: null,
  GET_FAILED: null,
  GET_CLEAN: null,

  INSERT_AJAX: null,
  INSERT_SUCCEEDED: null,
  INSERT_FAILED: null,
  INSERT_CLEAN: null,

  UPDATE_AJAX: null,
  UPDATE_SUCCEEDED: null,
  UPDATE_FAILED: null,
  UPDATE_CLEAN: null,

  DELETE_AJAX: null,
  DELETE_SUCCEEDED: null,
  DELETE_FAILED: null,
  DELETE_CLEAN: null,
});

const AJAX_SUFFIXES = {
  BEGIN_AJAX_CALL_SUFFIX: '_AJAX',
  AJAX_CALL_SUCCEEDED_SUFFIX: '_SUCCEEDED',
  AJAX_CALL_FAILED_SUFFIX: '_FAILED',
};

export const PATHS = {
  NOT_FOUND: '/404',
}

export {
  REDUX_SUFFIXES,
  AJAX_SUFFIXES,
};
