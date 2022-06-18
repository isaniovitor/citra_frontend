import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';

import * as S from './styles';

function UserCandidacies() {
  const { getUserCandidacies, jobs } = useJob();
  const { userUpdate, user } = useAuth();

  // console.log(isLogged, user);

  useEffect(() => {
    async function getUserCandidacy() {
      await getUserCandidacies({ userID: user?.userId, currentJobs: jobs });
    }

    getUserCandidacy();
  }, []);

  return (
    <S.Conteiner>
      <S.JobsSection>
        <div
          style={{
            backgroundColor: 'aqua',
            margin: '10px 0',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Filtros
        </div>
        {/* filters */}
        <Jobs />
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default UserCandidacies;