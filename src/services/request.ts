// import { KEY } from '~/constants/api';

import api from './api';

export default {
  async get(path: string) {
    const url = `/${path}/`;

    return api.get(url);
  },

  async postUser(path: string, query: object) {
    const url = `/${path}/`;

    console.log(query);

    return api.post(url, query);
  },
};
