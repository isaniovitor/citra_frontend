import {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import type { CandidacyData } from '../@types/candidacy';
import type { JobData } from '../@types/job';
import api from '../services/api';
import request from '../services/request';
import { useAuth } from './AuthContext';
// import { useHistory } from 'react-router-dom';

interface JobContextState {
  getJobs(): Promise<boolean>;
  getUserCandidacies({ userID, currentJobs }: CandidacyData): Promise<boolean>;
  getUserJobs({ userID, currentJobs }: CandidacyData): void;
  applyToJob({ userID, vacancyID }: CandidacyData): Promise<boolean>;
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
    userIdVacancy,
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
    let success = false;

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });

    // console.log(response);
    // console.log(response.data.results);

    try {
      const response = await request.get('vacancy');

      if (response.status >= 200 && response.status < 300) {
        setJobs(response.data.results);
        success = true;
      }
    } catch (err: any) {
      console.log(err);
    }

    return success;

    // console.log('aqa');
    // deu ruim
    // alert('ruim');
    // toast.error('Falha ao fazer login!');
  }, []);

  const getUserCandidacies = useCallback(
    async ({ userID, currentJobs }: CandidacyData) => {
      let success = false;

      try {
        const response = await request.get('candidacy');

        if (response.status >= 200 && response.status < 300) {
          const userJobsIds = response.data.results.map(
            (candidacy: CandidacyData) => {
              if (candidacy.userID === userID) {
                return candidacy.vacancyID;
              }

              return null;
            },
          );

          const userJobs = currentJobs.filter(job => {
            console.log(userJobsIds, job.vacancyId);

            return userJobsIds.includes(job.vacancyId);
          });

          // const ne = currentJobs.filter((job: JobData) => {
          //   // console.log('job', job);

          //   // if (userJobs.includes(job)) {
          //   //   console.log('job', job);

          //   return userJobs.filter(job.vacancyId ===);
          //   // }

          //   return false;
          // });

          // console.log(currentJobs, userJobs);

          setJobs(userJobs);
          success = true;
        }

        // setJobs(userJobs);

        return success;
      } catch (err: any) {
        console.log(err);
        return success;

        // console.log(response.data.results);

        // const { token, usuario } = response.data;
        // setUserToken(token);
        // const { data } = response.data;
        // console.log(response.data);

        // console.log('aqa');
        // deu ruim
        // alert('ruim');
        // toast.error('Falha ao fazer login!');
      }
    },
    [],
  );

  // n pe calllback
  const getUserJobs = useCallback(
    async ({ userID, currentJobs }: CandidacyData) => {
      const userJobs = currentJobs.filter((job: JobData) => {
        console.log(job.userIdVacancy, userID);

        return job.userIdVacancy === userID;
      });

      setJobs(userJobs);

      // const response = await api.post('/sessions', {
      //   username,
      //   password,
      // });
    },
    [],
  );

  const applyToJob = useCallback(
    async ({ userID, vacancyID }: CandidacyData) => {
      const dataForm = new FormData();
      let success = false;

      dataForm.append('vacancyID', vacancyID);
      dataForm.append('userID', userID);

      try {
        const response = await request.post('candidacy', dataForm);

        if (response.status >= 200 && response.status < 300) {
          console.log(response.status);
          success = true;
        }

        return success;
      } catch (err: any) {
        console.log(err);
        return success;
      }
    },
    [],
  );

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
      userIdVacancy,
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
      dataForm.append('userIdVacancy', userIdVacancy);

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

      const candidacyResponse = await request.get('candidacy');
      if (candidacyResponse.status >= 200 && candidacyResponse.status < 300) {
        success = true;

        response.data.results.map(async (candidacy: CandidacyData) => {
          if (candidacy.vacancyID === vacancyId) {
            const deleteCandidacyResponse = await request.delete(
              'vacancy',
              candidacy.candidaturaId,
            );

            console.log(deleteCandidacyResponse);
          }

          return null;
        });
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
        getUserCandidacies,
        getUserJobs,
        applyToJob,
        jobRegister,
        jobUpdate,
        jobDelete,
        jobs,
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
