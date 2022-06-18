import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { JobData } from '~/@types/job';

import Checkbox from '../../components/Form/CheckBox';
import ReactDropzoneInput from '../../components/Form/DropZoneInput/ReactDropzoneInput';
import ImageInput from '../../components/Form/ImageInput/ImageInput';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import TextAreaInput from '../../components/Form/TextAreaInput';
import {
  shiftsOptions,
  typeRemunerationOptions,
} from '../../constants/RegisterJob';
import { editUserSchema, registerJobSchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

function RegisterJob() {
  const formRef = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  const { userUpdate, user } = useAuth();
  const { jobRegister, jobUpdate } = useJob();

  const jobInitialData = {
    vacancyId: state.job ? state.job.vacancyId : '',
    nameVacancy: state.job ? state.job.nameVacancy : '',
    nameCompany: state.job ? state.job.nameCompany : '',
    shifts: state.job
      ? shiftsOptions.filter(shift => {
          return shift.value === state.job.shifts;
        })
      : '',
    fone: state.job ? state.job.fone : '',
    cep: state.job ? state.job.cep : '',
    salary: state.job ? state.job.salary : '',
    picture: state.job ? state.job.picture : '',
    // ajeitar
    typeRemuneration: state.job ? state.job.typeRemuneration : '',
    description: state.job ? state.job.description : '',
  };

  async function handleSubmit(data: any, { reset }: any) {
    // schema e toast
    if (await validationForm(data, registerJobSchema, formRef)) {
      // if has a job in the state so user is editing
      const apiRequest = state.job ? jobUpdate : jobRegister;

      if (
        await apiRequest({
          vacancyId: state.job ? state.job.vacancyId : null,
          nameVacancy: data.nameVacancy,
          nameCompany: data.nameCompany,
          shifts: data.shifts,
          fone: data.fone,
          cep: data.cep,
          salary: data.salary,
          picture: data.picture,
          typeRemuneration: data.typeRemuneration,
          description: data.description,
        })
      ) {
        toast.success(
          `Trabalho ${state.job ? 'editado' : 'cadastrado'} com sucesso!`,
        );
      } else {
        toast.error(
          `Falha ao ${state.job ? 'editadar' : 'cadastrar'}  Trabalho!`,
        );
      }
    }
  }

  return (
    <S.Conteiner>
      <S.FormConteiner
        ref={formRef}
        initialData={jobInitialData}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
          }}
        >
          <S.ImageContainer>
            <ImageInput name="picture" />
          </S.ImageContainer>

          <S.InputContainer>
            <div>
              <Input name="nameVacancy" label="Nome da vaga" />
              <Input name="salary" label="Salário" />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Input name="nameCompany" label="Empresa" />
              <Input name="cnpj" label="CNPJ" />
            </div>

            <div>
              <Select
                name="typeRemuneration"
                label="Tipo de remuneração"
                placeholder=""
                noOptionMessage="Sem opções"
                options={typeRemunerationOptions}
              />
              <Select
                name="shifts"
                label="Turno"
                placeholder=""
                noOptionMessage="Sem opções"
                options={shiftsOptions}
              />
            </div>

            <div>
              <Input name="fone" label="Telefone" mask="99 99999-9999" />
              <Input name="cep" label="CEP" mask="99999-999" />
            </div>
          </S.InputContainer>
        </div>

        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Checkbox
            name="cv"
            value="consent"
            label="Desejo que o currículo seja anexado"
          />
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

export default RegisterJob;
