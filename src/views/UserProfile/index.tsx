import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';
import { useAuth } from '../../contexts/AuthContext';

import * as S from './styles';

function UserProfile() {
  const formRef = useRef(null);

  const navigate = useNavigate();
  const { userUpdate, user } = useAuth();

  function handleSubmit(data: any, { reset }: any) {
    // console.log(data, formRef, reset);
    navigate('/home');
  }

  return (
    <S.Conteiner>
      <S.ImagesContainer>
        <img src={user?.picture} alt="user" />
      </S.ImagesContainer>

      <div>
        <S.Description>
          <div>
            <h1>{user?.name}</h1>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <p>{user?.Email}</p>
              <p>{user?.fone}</p>
              <p>{user?.birthdate}</p>
            </div>

            <h6>Descrição</h6>
            <p>{user?.description}</p>
          </div>
        </S.Description>
        <S.Menu>
          <Link to="/editProfile">
            <button type="button">Editar perfil</button>
          </Link>

          <Link to="/userJobs">
            <button type="button">Vagas</button>
          </Link>

          <Link to="/userCandidacies">
            <button type="button">Candidaturas</button>
          </Link>
        </S.Menu>
      </div>
    </S.Conteiner>
  );
}

export default UserProfile;
