import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import Jobs from '../../components/Jobs';
import { useAuth } from '../../contexts/AuthContext';
import Carousel from './components/Carousel';

import * as S from './styles';

function Home() {
  const { isLogged, user } = useAuth();
  // console.log(isLogged, user);

  return (
    <S.Conteiner>
      <Carousel />

      <S.SearchMenuContainer>
        <input placeholder="Pesquise uma vaga" />
        <button type="submit">Anunciar vaga</button>
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
