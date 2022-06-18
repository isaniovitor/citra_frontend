import {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import type { JobData } from '../@types/job';
import api from '../services/api';
import request from '../services/request';
// import { useHistory } from 'react-router-dom';

interface JobContextState {
  getJobs(): Promise<boolean>;
  jobUpdate({
    vacancyId,
    nameVacancy,
    nameCompany,
    shifts,
    cep,
    salary,
    picture,
    typeRemuneration,
    description,
  }: JobData): Promise<boolean>;
  jobRegister({
    nameVacancy,
    nameCompany,
    shifts,
    cep,
    salary,
    picture,
    typeRemuneration,
    description,
  }: JobData): Promise<boolean>;
  jobDelete({ vacancyId }: deleteProps): Promise<boolean>;
  jobs: JobData[] | [];
}

interface deleteProps {
  vacancyId: string | undefined;
}

const JobContext = createContext<JobContextState>({} as JobContextState);

function JobProvider({ children }: any) {
  const [jobs, setJobs] = useState<JobData[]>([]);

  const getJobs = useCallback(async () => {
    const success = false;

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });

    const response = await request.get('vacancy');
    // console.log(response);
    setJobs(response.data.results);
    // console.log(response.data.results);

    // const { token, usuario } = response.data;
    // setUserToken(token);
    // const { data } = response.data;
    // console.log(response.data);

    return success;

    // console.log('aqa');
    // deu ruim
    // alert('ruim');
    // toast.error('Falha ao fazer login!');
  }, []);

  const jobRegister = useCallback(
    async ({
      nameVacancy,
      nameCompany,
      shifts,
      fone,
      cep,
      salary,
      picture,
      typeRemuneration,
      description,
    }: JobData) => {
      let success = false;
      const dataForm = new FormData();

      // solution for the error: O dado submetido não é um arquivo. Certifique-se do tipo de codificação no formulário.
      // tirar cv e picture como obg
      if (picture !== undefined) dataForm.append('picture', picture);

      dataForm.append('nameVacancy', nameVacancy);
      dataForm.append('nameCompany', nameCompany);
      dataForm.append('shifts', shifts);
      dataForm.append('fone', fone);
      dataForm.append('cep', cep);
      dataForm.append('salary', salary);
      dataForm.append('typeRemuneration', typeRemuneration);
      dataForm.append('description', description);

      try {
        const response = await request.post('vacancy', dataForm);
        console.log(response.status);

        if (response.status >= 200 && response.status < 300) {
          // console.log('aq');
          success = true;
        }
      } catch (err: any) {
        const { data } = err.response;
        console.log(data);
      }

      return success;
    },
    [],
  );

  // getUserJobs
  const jobUpdate = useCallback(
    async ({
      vacancyId,
      nameVacancy,
      nameCompany,
      shifts,
      fone,
      cep,
      salary,
      picture,
      typeRemuneration,
      description,
    }: JobData) => {
      let success = false;
      const dataForm = new FormData();

      // solution for the error: O dado submetido não é um arquivo. Certifique-se do tipo de codificação no formulário.
      // tirar cv e picture como obg
      // solution for the error: O dado submetido não é um arquivo. Certifique-se do tipo de codificação no formulário.
      // tirar cv e picture como obg
      if (picture !== undefined) dataForm.append('picture', picture);

      dataForm.append('nameVacancy', nameVacancy);
      dataForm.append('nameCompany', nameCompany);
      dataForm.append('shifts', shifts);
      dataForm.append('fone', fone);
      dataForm.append('cep', cep);
      dataForm.append('salary', salary);
      dataForm.append('typeRemuneration', typeRemuneration);
      dataForm.append('description', description);

      try {
        const response = await request.update('vacancy', vacancyId, dataForm);

        if (response.status >= 200 && response.status < 300) {
          success = true;
          // setUser(response.data);
        }
      } catch (err: any) {
        console.log(err);
      }

      return success;
    },
    [],
  );

  const jobDelete = useCallback(async ({ vacancyId }: deleteProps) => {
    let success = false;
    console.log(vacancyId);

    try {
      const response = await request.delete('vacancy', vacancyId);

      if (response.status >= 200 && response.status < 300) {
        success = true;
        console.log(response.data);
      }
    } catch (err: any) {
      console.log(err);
    }

    return success;
  }, []);

  return (
    <JobContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        getJobs,
        jobs,
        jobRegister,
        jobUpdate,
        jobDelete,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

function useJob(): JobContextState {
  const context = useContext(JobContext);
  return context;
}

export { JobProvider, useJob };
