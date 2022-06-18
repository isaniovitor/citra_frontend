import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';
import Carousel from './components/Carousel';

import * as S from './styles';

function Home() {
  const { getJobs } = useJob();
  // console.log(isLogged, user);

  useEffect(() => {
    async function getJobData() {
      await getJobs();
    }

    getJobData();
  }, []);

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
        <Jobs />
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default Home;
