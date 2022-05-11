import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Form/Input';

import * as S from './styles';

function Login() {
  const formRef = useRef(null);

  function handleSubmit(data: any, { reset }: any) {
    console.log(data, formRef, reset);
  }

  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        <S.IconConteiner />

        <S.InputContainer>
          <Input name="name" label="Email" />

          <Input name="password" label="Senha" />

          <button type="submit">Entrar</button>
          {/* <hr /> */}
        </S.InputContainer>

        <p>Esqueceu a senha?</p>
        <hr />

        <Link to="/userRegister">
          <button type="button">Cadastrar </button>
        </Link>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default Login;
