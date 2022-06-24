/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import type { CandidacyData } from '../@types/candidacy';
import type { JobData } from '../@types/job';
import type { UserData } from '../@types/user';
import api from '../services/api';
import request from '../services/request';
import { useAuth } from './AuthContext';
// import { useHistory } from 'react-router-dom';

interface JobContextState {
  getJobs(): Promise<boolean>;
  getFiltedJobs(data: any): Promise<boolean>;
  getUserCandidacies({ userID, currentJobs }: CandidacyData): Promise<boolean>;
  getUserJobs({ userID, currentJobs }: CandidacyData): void;
  getCandidates(
    vacancyId: string | undefined,
    candidacies: CandidacyData[] | [],
  ): Promise<boolean>;
  applyToJob({ userID, vacancyID }: CandidacyData): Promise<boolean>;
  jobUpdate({
    vacancyId,
    nameVacancy,
    nameCompany,
    shifts,
    cep,
    salary,
    picture,
    typeHires,
    description,
  }: JobData): Promise<boolean>;
  jobRegister({
    nameVacancy,
    nameCompany,
    shifts,
    cep,
    salary,
    picture,
    typeHires,
    description,
    userIdVacancy,
  }: JobData): Promise<boolean>;
  jobDelete({ vacancyId }: deleteProps): Promise<boolean>;
  setFiltedJobs: Dispatch<SetStateAction<JobData[]>>;
  jobs: JobData[] | [];
  filtedJobs: JobData[] | [];
  userCandidacies: JobData[] | [];
  userJobs: JobData[] | [];
  candidates: UserData[] | [];
}

interface deleteProps {
  vacancyId: string | undefined;
}

const JobContext = createContext<JobContextState>({} as JobContextState);

function JobProvider({ children }: any) {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [filtedJobs, setFiltedJobs] = useState<JobData[]>([]);
  const [userCandidacies, setUserCandidacies] = useState<JobData[]>([]);
  const [userJobs, setUserJobs] = useState<JobData[]>([]);
  const [candidates, setCandidates] = useState<UserData[] | []>([]);

  const getJobs = useCallback(async () => {
    let success = false;

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
  }, []);

  // mudar toast pra filtros
  const getFiltedJobs = useCallback(async (data?: any) => {
    let success = false;
    console.log(data);

    try {
      const response = await request.getFiltedJobs('vacancy', data);
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setFiltedJobs(response.data.results);

        if (response.data.results.length === 0) {
          success = true;
          toast.error('Vagas com esses filtros não encontrada!');
        } else {
          success = false;
          toast.success('Filtragem feita!');
        }
      }
    } catch (err: any) {
      console.log(err);
    }

    return success;
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

          const appliedjobs = currentJobs.filter(job => {
            return userJobsIds.includes(job.vacancyId);
          });

          setUserCandidacies(appliedjobs);
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

  const getUserJobs = ({ userID, currentJobs }: CandidacyData) => {
    const newUserJobs = currentJobs.filter((job: JobData) => {
      // console.log(job.userIdVacancy, userID);

      return job.userIdVacancy === userID;
    });

    // console.log('entoru userJob', newUserJobs);
    setUserJobs(newUserJobs);

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });
  };

  // deveria estar em candiday
  const getCandidates = useCallback(
    async (vacancyId: string, candidacies: CandidacyData[] | []) => {
      let success = false;

      const newCandidates = candidacies.filter((candidacy: CandidacyData) => {
        // console.log(candidacy);
        // console.log(candidacy.vacancyID, vacancyId);

        if (candidacy.vacancyID === vacancyId) {
          return candidacy.userID;
        }

        return null;
      });

      if (newCandidates.length === 0) {
        return setCandidates([]);
      }

      try {
        newCandidates.map(async candidate => {
          const response = await request.get('users', candidate.userID);

          if (response.status >= 200 && response.status < 300) {
            console.log(response.data);

            setCandidates([...candidates, response.data]);
          }

          // console.log('candidatos', candidates);
          success = true;
        });
      } catch (err: any) {
        console.log(err);
      }

      // setCandidates(mewCandidates);

      // const response = await api.post('/sessions', {
      //   username,
      //   password,
      // });

      return success;
    },
    [],
  );

  // deveria estar em candiday
  const applyToJob = useCallback(
    async ({ userID, vacancyID }: CandidacyData) => {
      const dataForm = new FormData();
      let success = false;

      dataForm.append('vacancyID', vacancyID);
      dataForm.append('userID', userID);

      try {
        const response = await request.post('candidacy', dataForm);

        if (response.status >= 200 && response.status < 300) {
          // console.log(response.status);
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
      typeHires,
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
      dataForm.append('typeHires', typeHires);
      dataForm.append('description', description);
      dataForm.append('userIdVacancy', userIdVacancy);

      try {
        const response = await request.post('vacancy', dataForm);
        // console.log(response.status);

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
      typeHires,
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
      dataForm.append('typeHires', typeHires);
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
    // console.log(vacancyId);

    try {
      const response = await request.delete('vacancy', vacancyId);

      if (response.status >= 200 && response.status < 300) {
        success = true;
        // console.log(response.data);
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

            // console.log(deleteCandidacyResponse);
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
        getFiltedJobs,
        getUserCandidacies,
        getUserJobs,
        getCandidates,
        applyToJob,
        jobRegister,
        jobUpdate,
        jobDelete,
        setFiltedJobs,
        jobs,
        filtedJobs,
        userCandidacies,
        userJobs,
        candidates,
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
