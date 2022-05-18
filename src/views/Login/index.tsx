import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Input from '../../components/Form/Input';
import { singInUserSchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

function Login() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { signIn } = useAuth();

  async function handleSubmit(data: any, { reset }: any) {
    if (await validationForm(data, singInUserSchema, formRef)) {
      if (await signIn({ email: data.email, password: data.password })) {
        navigate('/home', { replace: true });
        toast.success('Login feito com sucesso!');
      } else {
        toast.error('Falha ao fazer login!');
      }
    }
  }

  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        <S.IconConteiner />

        <S.InputContainer>
          <Input name="email" label="Email" />

          <Input name="password" label="Senha" type="password" />

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
