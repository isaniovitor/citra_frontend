import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import ReactDropzoneInput from '../../components/Form/DropZoneInput/ReactDropzoneInput';
import ImageInput from '../../components/Form/ImageInput/ImageInput';
import Input from '../../components/Form/Input';
import TextAreaInput from '../../components/Form/TextAreaInput';
import { editUserSchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

function EditProfile() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { userUpdate, user } = useAuth();

  const initialData = {
    name: user?.name,
    email: user?.Email,
    cep: user?.cep,
    password: user?.password,
    repeatPassword: user?.password,
    fone: user?.fone,
    cpf: user?.cpf,
    birthdate: user?.birthdate,
    picture: user?.picture,
    cv: user?.cv,
    description: user?.description,
  };

  async function handleSubmit(data: any, { reset }: any) {
    console.log(data);

    if (await validationForm(data, editUserSchema, formRef)) {
      if (
        await userUpdate({
          userId: user?.userId,
          name: data.name,
          Email: data.email,
          cep: data.cep,
          password: data.password,
          fone: data.fone,
          cpf: data.cpf,
          birthdate: data.birthdate,
          picture: data.picture,
          cv: data.cv,
          description: data.description,
        })
      ) {
        toast.success('Update feito com sucesso!');
      } else {
        toast.error('Falha ao fazer Update!');
      }
    }
  }

  return (
    <S.Conteiner>
      <S.FormConteiner
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
          }}
        >
          <S.ImageContainer style={{}}>
            <ImageInput name="picture" />
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
                <Input name="fone" label="Telefone" mask="99 99999-9999" />
                <Input name="cpf" label="CPF" disabled />
              </div>
              <div style={{ flex: '1', display: 'flex', gap: '15px' }}>
                <ReactDropzoneInput name="cv" label="Currículo" />
              </div>
            </div>
          </S.InputContainer>
        </div>

        <div>
          <TextAreaInput name="description" label="Descrição" />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default EditProfile;
