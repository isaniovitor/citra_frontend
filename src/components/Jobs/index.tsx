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

import type { CandidacyData } from '../../@types/candidacy';
import type { JobData } from '../../@types/job';
import type { UserData } from '../../@types/user';
import noData from '../../assets/noData.webp';
import { applySchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useCandidacy } from '../../contexts/CandicacyContext';
import { useJob } from '../../contexts/JobContext';
import { validationForm } from '../../helpers/validationFom';
import ReactDropzoneInput from '../Form/DropZoneInput/ReactDropzoneInput';
import Job from './Job';

import * as S from './styles';

interface JobsContextState {
  jobsList: JobData[] | [];
}

function Jobs({ jobsList }: JobsContextState) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { jobs, getUserCandidacies, applyToJob } = useJob();
  const { candidacies, deleteCadidacy, getCandidacies } = useCandidacy();
  const { user } = useAuth();

  // console.log('aq', jobs[0]);
  // const [j, setJ] = useState<JobData[]>(jobs);

  const [currentJob, setCurrentJob] = useState<JobData>();
  const [alreadyApplied, setAlreadyApplied] = useState<CandidacyData[]>([]);
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
      await getCandidacies();
      await getUserCandidacies({ userID: user?.userId, currentJobs: jobs });
      toast.success('Candidatura realizada com sucesso!');
    } else {
      toast.error('Falha ao se candidatar!');
    }
  }

  async function deleteCandidacy() {
    if (
      await deleteCadidacy({
        userID: user?.userId,
        vacancyID: currentJob?.vacancyId,
        currentCandidacies: candidacies,
      })
    ) {
      await getCandidacies();
      await getUserCandidacies({ userID: user?.userId, currentJobs: jobs });
      toast.success('deletação realizada com sucesso!');
    } else {
      toast.error('Falha ao deletar!');
    }
  }

  function isAlreadyApplied() {
    const count = alreadyApplied.filter(candidacy => {
      return (
        candidacy.userID === user?.userId &&
        candidacy.vacancyID === currentJob?.vacancyId
      );
    });

    return count.length;
  }

  useEffect(() => {
    setCurrentJob(jobsList[0]);
  }, [jobsList]);

  useEffect(() => {
    setAlreadyApplied(candidacies);
  }, [candidacies]);

  return (
    <S.JobsConteinar>
      {jobsList.length > 0 ? (
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
            {jobsList.length > 0 &&
              jobsList.map(job => {
                return (
                  <Job
                    job={job}
                    key={job.vacancyId}
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
                <div>
                  {isAlreadyApplied() === 0 ? (
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
                    <div>
                      {location.pathname === '/userCandidacies' ? (
                        <button
                          type="button"
                          disabled={user?.userId === currentJob?.userIdVacancy}
                          onClick={() => {
                            deleteCandidacy();
                          }}
                        >
                          Cancelar
                        </button>
                      ) : (
                        <Link to="/userCandidacies">
                          <div className="link">
                            <span style={{ paddingTop: '10px' }}>
                              Já se candidatou! Ir para candidaturas
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
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
