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
  const { jobRegister, jobUpdate, getJobs } = useJob();
  console.log(state);

  const jobInitialData = {
    vacancyId: state ? state.job.vacancyId : '',
    nameVacancy: state ? state.job.nameVacancy : '',
    nameCompany: state ? state.job.nameCompany : '',
    shifts: state
      ? shiftsOptions.filter(shift => {
          return shift.value === state.job.shifts;
        })
      : '',
    fone: state ? state.job.fone : '',
    cep: state ? state.job.cep : '',
    salary: state ? state.job.salary : '',
    picture: state ? state.job.picture : '',
    // ajeitar
    typeHires: state
      ? typeRemunerationOptions.filter(remuneration => {
          return remuneration.value === state.job.typeHires;
        })
      : '',
    description: state ? state.job.description : '',
  };

  async function handleSubmit(data: any, { reset }: any) {
    // schema e toast
    if (await validationForm(data, registerJobSchema, formRef)) {
      // if has a job in the state so user is editing
      const apiRequest = state ? jobUpdate : jobRegister;

      if (
        await apiRequest({
          vacancyId: state ? state.job.vacancyId : null,
          nameVacancy: data.nameVacancy,
          nameCompany: data.nameCompany,
          shifts: data.shifts,
          fone: data.fone,
          cep: data.cep,
          salary: data.salary,
          picture: data.picture,
          typeHires: data.typeHires,
          description: data.description,
          userIdVacancy: user?.userId || '',
        })
      ) {
        await getJobs();

        navigate('/userJobs', { replace: true });
        toast.success(
          `Trabalho ${state ? 'editado' : 'cadastrado'} com sucesso!`,
        );
      } else {
        toast.error(`Falha ao ${state ? 'editadar' : 'cadastrar'}  Trabalho!`);
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
              <Input name="salary" label="Sal??rio" />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Input name="nameCompany" label="Empresa" />
              <Input name="cnpj" label="CNPJ" />
            </div>

            <div>
              <Select
                name="typeHires"
                label="Tipo de remunera????o"
                placeholder=""
                noOptionMessage="Sem op????es"
                options={typeRemunerationOptions}
              />
              <Select
                name="shifts"
                label="Turno"
                placeholder=""
                noOptionMessage="Sem op????es"
                options={shiftsOptions}
              />
            </div>

            <div>
              <Input name="fone" label="Telefone" mask="99 99999-9999" />
              <Input name="cep" label="CEP" mask="99999-999" />
            </div>
          </S.InputContainer>
        </div>

        <div>
          <TextAreaInput name="description" label="Descri????o" />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default RegisterJob;
