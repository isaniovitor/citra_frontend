// import { KEY } from '~/constants/api';

import type { UserData } from '../@types/user';
import api from './api';

export default {
  async get(path: string) {
    const url = `/${path}/`;

    return api.get(url);
  },

  async post(path: string, query: object) {
    const url = `/${path}/`;

    // console.log(query);

    return api.post(url, query);
  },

  async update(path: string, Id: string | undefined, query: object) {
    const url = `/${path}/${Id}/`;

    // console.log(query);
    return api.put(url, query);
  },

  async delete(path: string, Id: string | undefined) {
    const url = `/${path}/${Id}/`;

    // console.log(query);
    return api.delete(url);
  },
};
