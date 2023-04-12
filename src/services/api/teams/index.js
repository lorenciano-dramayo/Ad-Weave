import HttpClient from 'services/client';
import { apiUrl } from 'config';

class TeamsAPI extends HttpClient {
  static #instance;
  constructor() {
    super(apiUrl);
  }

  static get instance() {
    if (!this.#instance) {
      this.#instance = new TeamsAPI();
    }

    return this.#instance;
  }

  getList = (resource, { search = '', page = 1, limit = 10 }) => {
    return this.axios.get(`/admin/${resource}`, {
      params: { search, page, limit },
    });
  };
}

export default TeamsAPI.instance;
