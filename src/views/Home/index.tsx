import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import { useAuth } from '../../contexts/AuthContext';
import { useCandidacy } from '../../contexts/CandicacyContext';
import { useJob } from '../../contexts/JobContext';
import Carousel from './components/Carousel';

import * as S from './styles';

function Home() {
  const { jobs, getJobs, getUserCandidacies, getUserJobs } = useJob();
  const { user } = useAuth();
  // const { jobs, userCandidacies, userJobs, applyToJob, getJobs } = useJob();

  const { getCandidacies } = useCandidacy();

  // console.log(isLogged, user);
  // useEffect(() => {
  //   async function getJobData() {
  //     await getJobs();
  //   }

  //   getJobData();
  // }, []);

  // useEffect(() => {
  //   async function getJobData() {
  //     // await getJobs();
  //     await getUserCandidacies({ userID: user?.userId, currentJobs: jobs });
  //     await getUserJobs({ userID: user?.userId, currentJobs: jobs });
  //     await getCandidacies();
  //   }

  //   getJobData();
  // }, [jobs]);

  return (
    <S.Conteiner>
      <Carousel />

      <S.SearchMenuContainer>
        <input placeholder="Pesquise uma vaga" />
        <Link to="/registerJob">
          <button type="submit">Anunciar vaga</button>
        </Link>
      </S.SearchMenuContainer>

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
        <Jobs jobsList={jobs} />
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default Home;
