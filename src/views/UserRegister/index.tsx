import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Input from '../../components/Form/Input';
import { registerUserSchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

function UserRegister() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { userRegister } = useAuth();

  async function handleSubmit(data: any, { reset }: any) {
    console.log(await validationForm(data, registerUserSchema, formRef));

    if (await validationForm(data, registerUserSchema, formRef)) {
      console.log('entrou');

      if (
        await userRegister({
          NomeCompleto: data.name,
          Email: data.email,
          CEP: data.cep,
          Senha: data.password,
          Celular: data.fone,
          CPF: data.cpf,
          DataNasc: data.birthdate,
          Foto: null,
          Curriculo: null,
          Descricao: 'teste',
        })
      ) {
        navigate('/', { replace: true });
        toast.success('Cadastro feito com sucesso!');
      } else {
        toast.error('Falha ao fazer o cadastro!');
      }
    }
  }

  // 'Olá mundo'.includes('mundo'); // true
  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        <S.IconConteiner />

        <S.InputContainer>
          <Input name="name" label="Nome compleo" />

          <S.ColInputContainer>
            <Input name="email" label="Email" />
            <Input name="cep" label="CEP" mask="99999-999" />
          </S.ColInputContainer>

          <S.ColInputContainer>
            <Input name="password" label="Senha" type="password" />
            <Input
              name="repeatPassword"
              label="Repetir senha"
              type="password"
            />
          </S.ColInputContainer>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
            <S.ColInputContainer>
              <Input name="fone" label="Telefone" mask="99 99999-9999" />
              {/* mask="999.999.999-99" */}
              <Input name="cpf" label="CPF" />
              <Input name="birthdate" label="Data nascimento" type="date" />
            </S.ColInputContainer>
          </div>
        </S.InputContainer>

        <button type="submit">Cadastrar</button>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default UserRegister;
