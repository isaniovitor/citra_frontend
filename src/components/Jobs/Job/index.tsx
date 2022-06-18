import { useField } from '@unform/core';
import type { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Input as InputStrp } from 'reactstrap';

import type { JobData } from '~/@types/job';

import noImage from '../../../assets/login/profile.jpg';

import * as S from './styles';

interface JobsContextState {
  job: JobData;
  currentJob: JobData;
  setCurrentJob: Dispatch<SetStateAction<JobData>>;
}

function Job({ job, currentJob, setCurrentJob }: JobsContextState) {
  // console.log(setCurrentJob);

  return (
    <S.JobConteinar>
      <img src={job.picture || noImage} alt="" />

      <S.JobDescription>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>{job.nameVacancy}</label>
        <p>
          {job.description.substr(0, 260).toLowerCase()}
          {job.description.length > 25 ? '...' : ''}
        </p>
        <button
          type="button"
          disabled={job === currentJob}
          onClick={() => {
            setCurrentJob(job);
          }}
        >
          ler mais
        </button>
      </S.JobDescription>
    </S.JobConteinar>
  );
}

export default Job;
