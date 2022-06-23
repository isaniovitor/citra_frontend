import { useField } from '@unform/core';
import type { Dispatch, SetStateAction } from 'react';
import { InputHTMLAttributes, useState, useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Input as InputStrp } from 'reactstrap';

import type { UserData } from '~/@types/user';

import type { JobData } from '../../@types/job';
import noImage from '../../assets/login/profile.jpg';
import { useAuth } from '../../contexts/AuthContext';
import { useJob } from '../../contexts/JobContext';

import * as S from './styles';

interface JobContextState {
  user: UserData;
}

function User({ user }: JobContextState) {
  const location = useLocation();
  const navigate = useNavigate();

  const { jobs, jobDelete, getJobs, getUserJobs } = useJob();

  const downloadFile = (Donwloadfile: any) => {
    const link = document.createElement('a');
    link.download = 'Currículo';
    link.href = Donwloadfile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // if (!user) {
  //   return null;
  // }

  return (
    <S.JobConteinar>
      <img src={user.picture || noImage} alt="" />

      <S.JobDescription>
        <p>{user.name}</p>

        <p>
          {user.description.substr(0, 260).toLowerCase()}
          {user.description.length > 25 ? '...' : ''}
        </p>

        <div>
          <button
            type="submit"
            onClick={() => {
              downloadFile(user.cv);
            }}
          >
            Ver currículo
          </button>
        </div>
      </S.JobDescription>
    </S.JobConteinar>
  );
}

export default User;
