// import { KEY } from '~/constants/api';

import type { UserData } from '../@types/user';
import api from './api';

export default {
  async get(path: string) {
    const url = `/${path}/`;

    return api.get(url);
  },

  async postUser(path: string, query: object) {
    const url = `/${path}/`;

    // console.log(query);

    return api.post(url, query);
  },

  // erro no nome aq
  async postUpdateUserr(
    path: string,
    UserId: string | undefined,
    query: UserData,
  ) {
    // const url = 'http://localhost:8000/api/posts/';
    // axios
    //   .post(url, form_data, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));

    const url = `/${path}/${UserId}/`;

    // console.log(query);
    return api.put(url, query);
  },
};
