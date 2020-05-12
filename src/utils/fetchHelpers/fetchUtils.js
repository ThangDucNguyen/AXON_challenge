import axios from 'axios';
import HttpStatus from 'http-status';
import { get } from 'lodash';

export const internalFetch = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // axios.request({ url, ...options, timeout: 20000, withCredentials: true })
      axios.request({ url, ...options, timeout: 20000 })
        .then((resp) => {
          if (resp.status === 204) {
            resolve(null);
          } else if (resp.status === HttpStatus.NOT_FOUND) {
            reject({ status: resp.status });
          } else {
            resolve(resp.data);
          }
        }).catch((err) => {
          const status = get(err, 'response.status');
          const error = get(err, 'response.data');
          reject({ status, error });
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const internalFetchWithUrl = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      axios.request({ url, ...options, timeout: 20000, withCredentials: true })
        .then((resp) => {
          if (resp.status === 204) {
            resolve(null);
          } else if (resp.status === HttpStatus.NOT_FOUND) {
            reject({ status: resp.status });
          } else {
            resolve({ data: resp.data, originalUrl: url });
          }
        }).catch((err) => {
          const status = get(err, 'response.status');
          const error = get(err, 'response.data');
          reject({ status, error });
        });
    } catch (error) {
      reject(error);
    }
  });
};
