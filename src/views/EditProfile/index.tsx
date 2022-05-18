import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ReactDropzoneInput from '../../components/Form/DropZoneInput/ReactDropzoneInput';
import Input from '../../components/Form/Input';
import { editUserSchema } from '../../constants/schemas';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

function EditProfile() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(data: any, { reset }: any) {
    if (await validationForm(data, editUserSchema, formRef)) {
      console.log('entrar');
    }
  }

  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
          }}
        >
          <S.ImageContainer style={{}}>
            <S.IconConteiner />
          </S.ImageContainer>

          <S.InputContainer>
            <div>
              <Input name="name" label="Name" />
              <Input name="email" label="Email" />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Input name="birthdate" label="Data de nascimento" type="date" />
              <Input name="cep" label="CEP" mask="99999-999" />
            </div>

            <div>
              <Input name="password" label="Senha" type="password" />
              <Input
                name="repeatPassword"
                label="Repitir senha"
                type="password"
              />
            </div>

            <div>
              <div style={{ flex: '1', display: 'flex', gap: '15px' }}>
                <Input name="fone" label="Telefone" mask="(99)99999-9999" />
                <Input name="cpf" label="CPF" mask="999.999.999-99" />
              </div>
              <div style={{ flex: '1', display: 'flex', gap: '15px' }}>
                <ReactDropzoneInput name="curr" label="Currículo" />
              </div>
            </div>

            {/* <hr /> */}
          </S.InputContainer>
        </div>

        <div>
          <Input name="description" label="Descrição" type="textarea" />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default EditProfile;
