// import { KEY } from '~/constants/api';

import type { UserData } from '../@types/user';
import { salaryOptions } from '../constants/RegisterJob';
import api from './api';

interface JobFiltersState {
  search?: string;
  shifts?: string;
  typeHires?: string;
  salary?: string;
}

export default {
  async get(path: string, query?: string) {
    const url = `/${path}/${query || ''}`;

    return api.get(url);
  },

  // gambiarra para o formato da url
  async getFiltedJobs(path: string, query?: JobFiltersState) {
    const salary: any = salaryOptions.filter((currentSalary: any) => {
      return currentSalary.value === query?.salary;
    });

    console.log(salary);

    const url = `/${path}/?${
      query?.search || query?.typeHires
        ? `search=${query?.search || query?.typeHires}`
        : ''
    }${
      query?.shifts
        ? `${query?.search || query?.typeHires ? '&' : ''}shifts=${
            query?.shifts
          }`
        : ''
    }${
      query?.salary
        ? `${query?.search || query?.typeHires ? '&' : ''}min_salary=${
            salary[0].min
          }&max_salary=${salary[0].max}`
        : ''
    } `;
    // search_fields = ['nameVacancy', 'nameCompany', 'salary', 'cep', 'typeHires']

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
