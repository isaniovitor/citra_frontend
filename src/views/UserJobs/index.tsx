import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';

import * as S from './styles';

function UserJobs() {
  const { getUserJobs, userJobs } = useJob();
  // const { jobs, userCandidacies, userJobs, applyToJob, getJobs } = useJob();

  const { userUpdate, user } = useAuth();

  // console.log(isLogged, user);

  // useEffect(() => {
  //   async function getUserJobData() {
  //     console.log('aq', user?.userId);
  //     await getUserJobs({ userID: user?.userId, currentJobs: jobs });
  //   }

  //   getUserJobData();
  // }, []);

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
        <Jobs jobsList={userJobs} />
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default UserJobs;
