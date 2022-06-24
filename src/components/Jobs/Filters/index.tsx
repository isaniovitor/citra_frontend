import { useField } from '@unform/core';
import {
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import {
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import type { CandidacyData } from '../../../@types/candidacy';
import type { JobData } from '../../../@types/job';
import {
  salaryOptions,
  shiftsOptions,
  typeRemunerationOptions,
} from '../../../constants/RegisterJob';
// import type { UserData } from '../../@types/user';
// import noCandidate from '../../assets/noCandidate.png';
// import noData from '../../assets/noData.webp';
// import { applySchema } from '../../constants/schemas';
import { useAuth } from '../../../contexts/AuthContext';
import { useCandidacy } from '../../../contexts/CandicacyContext';
import { useJob } from '../../../contexts/JobContext';
import { validationForm } from '../../../helpers/validationFom';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
// import ReactDropzoneInput from '../Form/DropZoneInput/ReactDropzoneInput';
// import User from '../User';
// import Description from './Description';
// import Job from './Job';

import * as S from './styles';

function Filters() {
  const formRef = useRef(null);

  const { getFiltedJobs, getCandidates, setFiltedJobs } = useJob();
  const { candidacies } = useCandidacy();
  const { user } = useAuth();

  // console.log('aq', jobs[0]);
  // const [j, setJ] = useState<JobData[]>(jobs);
  const [isCleaning, setIsCleaning] = useState(false);
  const [currentJob, setCurrentJob] = useState<JobData>();
  const [alreadyApplied, setAlreadyApplied] = useState<CandidacyData[]>([]);
  // console.log('aq', currentJob, jobs[0]);

  async function handleSubmit(data: any, { reset }: any) {
    if (isCleaning) {
      setIsCleaning(!isCleaning);
      setFiltedJobs([]);
      reset();
    } else {
      await getFiltedJobs(data);
    }
  }

  // useEffect(() => {
  //   setCurrentJob(jobsList[0]);
  // }, [jobsList]);

  useEffect(() => {
    setAlreadyApplied(candidacies);
  }, [candidacies]);

  useEffect(() => {
    async function getJobData() {
      if (currentJob) {
        await getCandidates(currentJob?.vacancyId, candidacies);
      }
    }

    getJobData();
  }, [currentJob]);

  return (
    <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
      <Input name="search" label="Pesquisar vaga" />

      <Select
        name="shifts"
        label="Turno"
        placeholder=""
        noOptionMessage="Sem opções"
        options={shiftsOptions}
      />

      <Select
        name="typeHires"
        label="Tipo de remuneração"
        placeholder=""
        noOptionMessage="Sem opções"
        options={typeRemunerationOptions}
      />

      <Select
        name="salary"
        label="Salário"
        placeholder=""
        noOptionMessage="Sem opções"
        options={salaryOptions}
      />

      <div>
        <button type="submit">Filtrar</button>
      </div>

      <div>
        <button
          type="submit"
          className="caution"
          onClick={() => {
            setIsCleaning(!isCleaning);
          }}
        >
          limpar
        </button>
      </div>
    </S.FormConteiner>
  );
}

export default Filters;
