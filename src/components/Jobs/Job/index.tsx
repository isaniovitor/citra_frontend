import { useField } from '@unform/core';
import type { Dispatch, SetStateAction } from 'react';
import { InputHTMLAttributes, useState, useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Input as InputStrp } from 'reactstrap';

import type { JobData } from '../../../@types/job';
import deleteIcon from '../../../assets/delete.svg';
import editIcon from '../../../assets/edit.svg';
import noImage from '../../../assets/login/profile.jpg';
import { useJob } from '../../../contexts/JobContext';

import * as S from './styles';

interface JobsContextState {
  job: JobData;
  currentJob: JobData;
  setCurrentJob: Dispatch<SetStateAction<JobData>>;
}

function Job({ job, currentJob, setCurrentJob }: JobsContextState) {
  const location = useLocation();
  const navigate = useNavigate();
  const isJobOwner = location.pathname === '/userJobs';

  const { jobs, jobDelete, applyToJob } = useJob();

  async function deleteJob() {
    if (
      await jobDelete({
        vacancyId: currentJob?.vacancyId,
      })
    ) {
      toast.success('Trabalho deletado com sucesso!');
    } else {
      toast.error('Falha ao deletar trabalho!');
    }
  }

  return (
    <S.JobConteinar>
      <img src={job.picture || noImage} alt="" />

      <S.JobDescription>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <div>
          <p>{job.nameVacancy}</p>
          {isJobOwner && (
            <div>
              <button
                type="button"
                onClick={() => {
                  navigate('/registerJob', {
                    state: { job: currentJob },
                  });
                }}
              >
                <img src={editIcon} alt="" />
              </button>

              <button
                type="button"
                onClick={() => {
                  deleteJob();
                }}
              >
                <img src={deleteIcon} alt="" />
              </button>
            </div>
          )}
        </div>

        <p>
          {job.description.substr(0, 260).toLowerCase()}
          {job.description.length > 25 ? '...' : ''}
        </p>

        <div>
          <button
            type="button"
            disabled={job === currentJob}
            onClick={() => {
              setCurrentJob(job);
            }}
          >
            ler mais
          </button>
        </div>
      </S.JobDescription>
    </S.JobConteinar>
  );
}

export default Job;
