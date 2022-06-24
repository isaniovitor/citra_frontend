import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import Filters from '../../components/Jobs/Filters';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';

import * as S from './styles';

function UserJobs() {
  const { getUserJobs, userJobs, filtedJobs } = useJob();
  // const { jobs, userCandidacies, userJobs, applyToJob, getJobs } = useJob();

  const { userUpdate, user } = useAuth();

  return (
    <S.Conteiner>
      <S.JobsSection>
        {/* filters */}

        {/* <Filters /> */}
        <Jobs jobsList={filtedJobs.length > 0 ? filtedJobs : userJobs} />
        {/* <Jobs jobsList={userJobs} /> */}
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default UserJobs;
