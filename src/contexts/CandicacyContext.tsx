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

interface CandidacyContextState {
  getCandidacies(): Promise<boolean>;
  deleteCadidacy({ userID, vacancyID }: CandidacyData): Promise<boolean>;

  // getUserCandidacies({ userID, currentJobs }: CandidacyData): Promise<boolean>;
  // getUserJobs({ userID, currentJobs }: CandidacyData): void;
  // applyToJob({ userID, vacancyID }: CandidacyData): Promise<boolean>;
  candidacies: CandidacyData[] | [];
}

interface deleteProps {
  vacancyId: string | undefined;
}

const CandidacyContext = createContext<CandidacyContextState>(
  {} as CandidacyContextState,
);

function CandidacyProvider({ children }: any) {
  const [candidacies, setCandidacies] = useState<CandidacyData[]>([]);

  const getCandidacies = useCallback(async () => {
    let success = false;

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });

    // console.log(response);
    // console.log(response.data.results);

    try {
      const response = await request.get('candidacy');

      if (response.status >= 200 && response.status < 300) {
        setCandidacies(response.data.results);
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

  const deleteCadidacy = useCallback(
    async ({ userID, vacancyID, currentCandidacies }: CandidacyData & any) => {
      let success = false;
      // console.log(vacancyId);
      const currentCandidacy: CandidacyData = currentCandidacies.filter(
        (candidacy: CandidacyData) => {
          return (
            candidacy.userID === userID && candidacy.vacancyID === vacancyID
          );
        },
      )[0];

      try {
        const response = await request.delete(
          'candidacy',
          currentCandidacy.candidaturaId,
        );

        if (response.status >= 200 && response.status < 300) {
          success = true;
          console.log(response.data);
        }
      } catch (err: any) {
        console.log(err);
      }

      return success;
    },
    [],
  );

  return (
    <CandidacyContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        getCandidacies,
        deleteCadidacy,
        candidacies,
      }}
    >
      {children}
    </CandidacyContext.Provider>
  );
}

function useCandidacy(): CandidacyContextState {
  const context = useContext(CandidacyContext);
  return context;
}

export { CandidacyProvider, useCandidacy };
