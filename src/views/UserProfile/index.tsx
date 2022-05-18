import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';

import * as S from './styles';

function UserProfile() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(data: any, { reset }: any) {
    console.log(data, formRef, reset);
    navigate('/home');
  }

  return (
    <S.Conteiner>
      <S.ImagesContainer>
        <img
          src="https://i.pinimg.com/280x280_RS/cb/b2/80/cbb280fa8c687cf3b137df878bf82d08.jpg"
          alt="ss"
        />
      </S.ImagesContainer>

      <div>
        <S.Description>
          <div>
            <h1>Joaos</h1>
            <p>Mestre de obras</p>

            <p>
              Trabalho a 4 anos como Pedreiro e a 2 anos como Mestre de Obras.
            </p>

            <p>Mestre de obras</p>

            <p>
              Trabalho a 4 anos como Pedreiro e a 2 anos como Mestre de Obras.
            </p>

            <p>Mestre de obras</p>

            <p>
              Trabalho a 4 anos como Pedreiro e a 2 anos como Mestre de Obras.
            </p>
            <p>Mestre de obras</p>

            <p>
              Trabalho a 4 anos como Pedreiro e a 2 anos como Mestre de Obras.
            </p>
            <p>Mestre de obras</p>

            <p>
              Trabalho a 4 anos como Pedreiro e a 2 anos como Mestre de Obras.
            </p>
          </div>
        </S.Description>
        <S.Menu>
          <Link to="/editProfile">
            <button type="button">Editart perfil</button>
          </Link>

          <button type="button">Minhas vagas</button>
          <button type="button">Minhas Candidaturas</button>
        </S.Menu>
      </div>
    </S.Conteiner>
  );
}

export default UserProfile;
