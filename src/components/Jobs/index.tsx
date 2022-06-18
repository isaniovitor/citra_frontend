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
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import type { JobData } from '../../@types/job';
import type { UserData } from '../../@types/user';
import noData from '../../assets/noData.webp';
import { applySchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';
import { validationForm } from '../../helpers/validationFom';
import ReactDropzoneInput from '../Form/DropZoneInput/ReactDropzoneInput';
import Job from './Job';

import * as S from './styles';

function Jobs() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const { jobs, jobDelete, applyToJob } = useJob();
  const { user } = useAuth();

  // console.log('aq', jobs[0]);
  // const [j, setJ] = useState<JobData[]>(jobs);

  const [currentJob, setCurrentJob] = useState<JobData>();
  const [sameUser, setSameUser] = useState(false);

  // console.log('aq', currentJob, jobs[0]);

  async function handleSubmit(data: any, { reset }: any) {
    if (await validationForm(data, applySchema, formRef)) {
      console.log('passou');
    }
  }

  async function applyJob() {
    if (
      await applyToJob({
        userID: user?.userId,
        vacancyID: currentJob?.vacancyId,
      })
    ) {
      toast.success('Candidatura realizada com sucesso!');
    } else {
      toast.error('Falha ao se candidatar!');
    }
  }

  useEffect(() => {
    setCurrentJob(jobs[0]);
  }, [jobs]);

  return (
    <S.JobsConteinar>
      {jobs.length > 0 ? (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '15px',
              marginBottom: '30px',
            }}
          >
            {jobs.length > 0 &&
              jobs.map(job => {
                return (
                  <Job
                    job={job}
                    key={Math.floor(Math.random() * 100)}
                    currentJob={currentJob}
                    setCurrentJob={setCurrentJob}
                  />
                );
              })}
          </div>

          <S.JobDescription>
            {currentJob?.picture && (
              <img
                src={currentJob?.picture}
                alt=" "
                style={{ width: '100%', height: '400px' }}
              />
            )}

            <S.Title>{currentJob?.nameVacancy}</S.Title>
            <S.JobInfoConteiner>
              <S.JobInfo>{currentJob?.shifts}</S.JobInfo>
              <S.JobInfo>{currentJob?.salary}</S.JobInfo>
              <S.JobInfo>{currentJob?.cep}</S.JobInfo>
              <S.JobInfo>{currentJob?.typeRemuneration}</S.JobInfo>
              <S.JobInfo>{currentJob?.nameCompany}</S.JobInfo>
            </S.JobInfoConteiner>

            <h5>Descrição da vaga</h5>
            <S.Description>
              {currentJob?.description}Lorem Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Nesciunt exercitationem ea eum
              distinctio molestiae omnis, numquam possimus autem ullam mollitia
              facere aliquam sapiente dolorem! Molestiae facere nam maxime
              laudantium voluptatibus. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Iste quis explicabo reprehenderit mollitia
              deserunt blanditiis suscipit commodi et esse dolorum tenetur, cum
              doloremque pariatur? Neque ipsam aliquam asperiores qui tempore!
            </S.Description>

            <h5>Documentos exigidos</h5>
            <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  gap: '15px',
                  width: '100%',
                }}
              >
                <ReactDropzoneInput name="cv" label="Currículo" />
              </div>
              {/* <h1>oi</h1> */}

              {/* <h1>oi</h1> */}

              {user?.userId !== currentJob?.userIdVacancy ? (
                <button
                  type="submit"
                  disabled={user?.userId === currentJob?.userIdVacancy}
                  onClick={() => {
                    applyJob();
                  }}
                >
                  Candidatar-se
                </button>
              ) : (
                <span className="text-danger" style={{ paddingTop: '10px' }}>
                  Não se pode candidatar em vagas que voce criou!
                </span>
              )}
            </S.FormConteiner>
          </S.JobDescription>
        </>
      ) : (
        <div>
          <img
            src={noData}
            alt=""
            style={{ width: '1000px', height: '1000px' }}
          />
        </div>
      )}
    </S.JobsConteinar>
  );
}

export default Jobs;
