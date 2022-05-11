import React, { useRef } from 'react';

import Input from '../../components/Form/Input';

import * as S from './styles';

function UserRegister() {
  const formRef = useRef(null);

  function handleSubmit(data: any, { reset }: any) {
    console.log(data);
  }

  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        <S.IconConteiner />

        <S.InputContainer>
          <S.ColInputContainer>
            <Input name="name" label="Nome compleo" />

            <Input name="email" label="Email" />

            <Input name="password" label="Senha" />
          </S.ColInputContainer>

          <S.ColInputContainer>
            <Input name="repeatPassword" label="Repetir senha" />

            <Input name="cpf" label="CPF" />

            <Input name="birthday" label="Data nascimento" type="date" />
          </S.ColInputContainer>
        </S.InputContainer>

        <button type="submit">Cadastrar</button>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default UserRegister;
