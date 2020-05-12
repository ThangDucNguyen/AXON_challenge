import { REDUX_SUFFIXES } from 'appConstants';
import { filter, switchMap  } from 'rxjs//operators';
import { getAsync, postAsync, putAsync, deleteAsync } from 'utils/fetchHelpers';
import { split, head } from 'lodash';

const {
  GET_ALL_AJAX,
  GET_ALL_SUCCEEDED,
  GET_ALL_FAILED,

  GET_AJAX,
  GET_SUCCEEDED,
  GET_FAILED,

  INSERT_AJAX,
  INSERT_SUCCEEDED,
  INSERT_FAILED,

  UPDATE_AJAX,
  UPDATE_SUCCEEDED,
  UPDATE_FAILED,

  DELETE_AJAX,
  DELETE_SUCCEEDED,
  DELETE_FAILED,
} = REDUX_SUFFIXES;

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // credentials: 'include',
};

const getAllEpic = (action$) => {
  return action$.pipe(
    filter(({ type }) => { return type.endsWith(GET_ALL_AJAX); }),
    switchMap(({ type, payload: { url } }) => {
      return getAsync(url, options)
        .then(async ({ total_pages: totalPages }) => {
          const urls = [];
          for (let i = 1; i <= totalPages; i += 1) {
            urls.push(getAsync(`${url}/?page=${i}`, options));
          }
          const data = (await Promise.all(urls)).reduce((acc, items) => { return acc.concat(...items.data); }, []);
          return {
            type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_SUCCEEDED}`,
            payload: { data },
          };
        })
        .catch((error) => {
          return {
            type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_FAILED}`,
            payload: { error },
          };
        });
    }))
};

const getEpic = (action$) => {
  return action$.pipe(
    filter(({ type }) => { return type.endsWith(GET_AJAX); }),
    switchMap(({ type, payload: { url } }) => {
      return getAsync(url, options)
        .then((resp) => { return resp.json(); })
        .then((response) => {
          return {
            type: `${head(split(type, `${GET_AJAX}`))}${GET_SUCCEEDED}`,
            payload: { response },
          };
        })
        .catch((error) => {
          return {
            type: `${head(split(type, `${GET_AJAX}`))}${GET_FAILED}`,
            payload: { error },
          };
        });
    })
  )
};

const insertEpic = (action$) => {
  return action$.pipe(
    filter(({ type }) => { return type.endsWith(INSERT_AJAX); }),
    switchMap(({ type, payload: { url, data } }) => {
      return postAsync(url, JSON.stringify(data), options)
        .then((resp) => { return resp.json(); })
        .then((response) => {
          return {
            type: `${head(split(type, `_${INSERT_AJAX}`))}${INSERT_SUCCEEDED}`,
            payload: { response },
          };
        })
        .catch((error) => {
          return {
            type: `${head(split(type, `_${INSERT_AJAX}`))}${INSERT_FAILED}`,
            payload: { error },
          };
        });
    })
  )
};

const updateEpic = (action$) => {
  return action$.pipe(
    filter(({ type }) => { return type.endsWith(UPDATE_AJAX); }),
    switchMap(({ type, payload: { url, data } }) => {
      return putAsync(url, JSON.stringify(data), options)
        .then((resp) => { return resp.json(); })
        .then((response) => {
          return {
            type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_SUCCEEDED}`,
            payload: { response },
          };
        })
        .catch((error) => {
          return {
            type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_FAILED}`,
            payload: { error },
          };
        });
    })
  )
};

const deleteEpic = (action$) => {
  return action$.pipe(
    filter(({ type }) => { return type.endsWith(DELETE_AJAX); }),
    switchMap(({ type, payload: { url, data } }) => {
      return deleteAsync(url, JSON.stringify(data), options)
        .then((resp) => { return resp.json(); })
        .then((response) => {
          return {
            type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_SUCCEEDED}`,
            payload: { response },
          };
        })
        .catch((error) => {
          return {
            type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_FAILED}`,
            payload: { error },
          };
        });
    })
  )
};

export {
  getAllEpic,
  getEpic,
  insertEpic,
  updateEpic,
  deleteEpic,
};
