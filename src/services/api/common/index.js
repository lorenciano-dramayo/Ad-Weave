import HttpClient from 'services/client';
import { apiUrl } from 'config';

class CommonApi extends HttpClient {
  static #instance;
  constructor() {
    super(apiUrl);
  }

  static get instance() {
    if (!this.#instance) {
      this.#instance = new CommonApi();
    }

    return this.#instance;
  }

  updateRequestInterceptor = (token) => {
    this.axios.interceptors.request.use((config) => {
      const newConfig = { ...config };
      newConfig.headers['Authorization'] = `Bearer ${token}`;

      return newConfig;
    }, this.handleError);
  };

  // generic requests
  get = (endpoint) => {
    return this.axios.get(`/admin/${endpoint}`);
  };

  post = (endpoint, data) => {
    return this.axios.post(`/admin/${endpoint}`, { ...data });
  };

  put = (endpoint, data) => {
    return this.axios.put(`/admin/${endpoint}`, { ...data });
  };

  update = (resource, data) => {
    return this.axios.put(`/admin/${resource}/${data.id}`, { ...data });
  };
}

export default CommonApi.instance;
