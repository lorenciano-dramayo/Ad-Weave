// Axios
import axios from 'axios';
// import * as AxiosLogger from 'axios-logger';
// Utilities
import { getToken, deauthenticateUser } from '../session';
import { apiUrl } from 'config';

axios.defaults.baseURL = apiUrl;

// axios.interceptors.request.use(
//   AxiosLogger.requestLogger,
//   AxiosLogger.errorLogger
// );

// axios.interceptors.response.use(
//   AxiosLogger.responseLogger,
//   AxiosLogger.errorLogger
// );

// AxiosLogger.setGlobalConfig({
//   status: true,
//   headers: true,
// });

const getAuthenticationHeaders = (headers = {}) => ({
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  ...headers,
});
const getConfig = (params, options = {}, _headers = {}) => {
  const headers = getAuthenticationHeaders(_headers);

  if (headers) {
    return {
      params,
      headers,
      ...options,
    };
  }

  return {
    params,
    ...options,
  };
};

const getResponse = (request) =>
  request
    .then((response) => response.data)
    .catch((error) => {
      if (
        error.response.data?.message.toLowerCase().includes('unauthenticated')
      ) {
        deauthenticateUser();
      }

      return {
        success: false,
        message: error.response.data?.message ?? error.response?.message,
      };
    });

const callGetWithResponseHeaders = (path, params, options) =>
  axios
    .get(path, getConfig(params, options))
    .then((response) => [response.headers, response.data])
    .catch(() => null);

const callGet = (path, params, options) =>
  getResponse(axios.get(path, getConfig(params, options)));

const callPut = (path, data, params, options) =>
  getResponse(axios.put(path, data, getConfig(params, options)));

const callPost = (path, data, options) =>
  getResponse(axios.post(path, data, getConfig(options)));

const callPostFormData = (path, data, options) =>
  getResponse(
    axios.post(
      path,
      data,
      getConfig(data, options, { 'content-type': 'multipart/form-data' })
    )
  );

const callDelete = (path, options) =>
  getResponse(axios.delete(path, getConfig(options)));

export default {
  getAuthenticationHeaders,
  callGetWithResponseHeaders,
  callGet,
  callPut,
  callPost,
  callPostFormData,
  callDelete,
};
