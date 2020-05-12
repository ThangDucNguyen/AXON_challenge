import { internalFetch, internalFetchWithUrl } from './fetchUtils';

const getAsync = (url, options = {}) => { return internalFetch(url, { ...options, method: 'GET' }); };

const getWithUrlAsync = (url, options = {}) => { return internalFetchWithUrl(url, { ...options, method: 'GET' }); };

const postAsync = (url, data, options = {}) => {
  return internalFetch(url, { ...options, method: 'POST', data });
};
const putAsync = (url, data, options = {}) => {
  return internalFetch(url, { ...options, method: 'PUT', data });
};
const patchAsync = (url, data, options = {}) => {
  return internalFetch(url, { ...options, method: 'PATCH', data });
};
const deleteAsync = (url, data, options = {}) => {
  return internalFetch(url, {
    ...options,
    method: 'DELETE',
    [data ? 'data' : null]: data,
  });
};

export {
  getAsync,
  postAsync,
  putAsync,
  patchAsync,
  deleteAsync,
  getWithUrlAsync,
};
