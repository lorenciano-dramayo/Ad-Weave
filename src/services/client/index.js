import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

class HttpClient {
  constructor(baseURL) {
    this.axios = axios.create({ baseURL });

    this.#initializeRequestInterceptor();
    this.#initializeResponseInterceptor();
  }

  // # - private accessor
  #initializeRequestInterceptor = () => {
    this.axios.interceptors.request.use(this.#handleRequest, this.handleError);
  };

  #initializeResponseInterceptor = () => {
    this.axios.interceptors.response.use(
      this.#handleResponse,
      this.handleError
    );
  };

  #handleRequest = (config) => {
    const newConfig = { ...config };
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig;
    }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params);
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }

    return newConfig;
  };

  #handleResponse = (response) => {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json'
    ) {
      response.data = camelizeKeys(response.data);
    }

    return response.data;
  };

  handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        success: false,
        message: 'Network Error. Please try again.',
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        message: error.message,
      };
    }
  };
}

export default HttpClient;
