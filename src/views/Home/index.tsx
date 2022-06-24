import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Jobs from '../../components/Jobs';
import Filters from '../../components/Jobs/Filters';
import {
  shiftsOptions,
  typeRemunerationOptions,
} from '../../constants/RegisterJob';
import { useAuth } from '../../contexts/AuthContext';
import { useCandidacy } from '../../contexts/CandicacyContext';
import { useJob } from '../../contexts/JobContext';
import Carousel from './components/Carousel';

import * as S from './styles';

function Home() {
  const { jobs, filtedJobs, getJobs, getUserCandidacies, getUserJobs } =
    useJob();
  const { user } = useAuth();
  const { getCandidacies } = useCandidacy();

  return (
    <S.Conteiner>
      <Carousel />

      <S.SearchMenuContainer>
        <Link to="/registerJob">
          <button type="button">Anunciar vaga</button>
        </Link>
      </S.SearchMenuContainer>

      <S.JobsSection>
        <Filters />
        <Jobs jobsList={filtedJobs.length > 0 ? filtedJobs : jobs} />
      </S.JobsSection>
    </S.Conteiner>
  );
}

export default Home;
