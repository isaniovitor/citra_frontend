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
import noCandidate from '../../assets/noCandidate.png';
import noData from '../../assets/noData.webp';
import { applySchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useCandidacy } from '../../contexts/CandicacyContext';
import { useJob } from '../../contexts/JobContext';
import { validationForm } from '../../helpers/validationFom';
import ReactDropzoneInput from '../Form/DropZoneInput/ReactDropzoneInput';
import User from '../User';
import Description from './Description';
import Job from './Job';

import * as S from './styles';

interface JobsContextState {
  jobsList: JobData[] | [];
}

function Jobs({ jobsList }: JobsContextState) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    jobs,
    userJobs,
    candidates,
    getUserCandidacies,
    applyToJob,
    getCandidates,
  } = useJob();
  const { candidacies, deleteCadidacy, getCandidacies } = useCandidacy();
  const { user } = useAuth();

  // console.log('aq', jobs[0]);
  // const [j, setJ] = useState<JobData[]>(jobs);

  const [currentJob, setCurrentJob] = useState<JobData>();
  const [alreadyApplied, setAlreadyApplied] = useState<CandidacyData[]>([]);
  // console.log('aq', currentJob, jobs[0]);

  async function handleSubmit(data: any) {
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

  useEffect(() => {
    async function getJobData() {
      // console.log(candidates, 'teste');

      if (currentJob) {
        await getCandidates(currentJob?.vacancyId, candidacies);
      }
    }

    getJobData();
  }, [currentJob]);

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
            {location.pathname === '/userJobs' ? (
              <div>
                {candidates.length > 0 ? (
                  candidates.map(currentUser => {
                    return <User user={currentUser} />;
                  })
                ) : (
                  <>
                    <img
                      src={noCandidate}
                      alt=" "
                      style={{ width: '100%', height: '100%' }}
                    />
                    <p>Sem candidaturas</p>
                  </>
                )}
              </div>
            ) : (
              <Description
                currentJob={currentJob}
                formRef={formRef}
                handleSubmit={handleSubmit}
                isAlreadyApplied={isAlreadyApplied}
                applyJob={applyJob}
                deleteCandidacy={deleteCandidacy}
              />
            )}
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
