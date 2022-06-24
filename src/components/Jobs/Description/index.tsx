import { useField } from '@unform/core';
import { InputHTMLAttributes, useState, useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// import ReactInputMask from 'react-input-mask';

import type { JobData } from '../../../@types/job';
import { shiftsOptions } from '../../../constants/RegisterJob';
import { useAuth } from '../../../contexts/AuthContext';
import { useJob } from '../../../contexts/JobContext';
import ReactDropzoneInput from '../../Form/DropZoneInput/ReactDropzoneInput';

import * as S from './styles';

interface DescriptionContextState {
  currentJob: JobData | undefined;
  formRef: any;
  handleSubmit(data: any): Promise<void>;
  isAlreadyApplied(): number;
  applyJob(): void;
  deleteCandidacy(): void;
}

function Description({
  currentJob,
  formRef,
  handleSubmit,
  isAlreadyApplied,
  applyJob,
  deleteCandidacy,
}: DescriptionContextState) {
  const location = useLocation();
  const navigate = useNavigate();
  const isJobOwner = location.pathname === '/userJobs';

  const { user } = useAuth();
  const { jobs, jobDelete, getJobs, getUserJobs } = useJob();

  return (
    <>
      {currentJob?.picture && (
        <img
          src={currentJob?.picture}
          alt=" "
          style={{ width: '100%', height: '400px' }}
        />
      )}
      <S.Title>{currentJob?.nameVacancy}</S.Title>
      <S.JobInfoConteiner>
        <S.JobInfo>
          {shiftsOptions.map(shift => {
            if (shift.value === currentJob?.shifts) {
              return shift.label;
            }
            return null;
          })}
        </S.JobInfo>
        <S.JobInfo>R${currentJob?.salary}</S.JobInfo>
        <S.JobInfo>{currentJob?.cep}</S.JobInfo>
        <S.JobInfo>{currentJob?.typeHires}</S.JobInfo>
        <S.JobInfo>{currentJob?.nameCompany}</S.JobInfo>
      </S.JobInfoConteiner>
      <h5>Descrição da vaga</h5>
      <S.Description>
        {currentJob?.description}Lorem Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Nesciunt exercitationem ea eum distinctio molestiae
        omnis, numquam possimus autem ullam mollitia facere aliquam sapiente
        dolorem! Molestiae facere nam maxime laudantium voluptatibus. Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Iste quis explicabo
        reprehenderit mollitia deserunt blanditiis suscipit commodi et esse
        dolorum tenetur, cum doloremque pariatur? Neque ipsam aliquam asperiores
        qui tempore!
      </S.Description>

      {/* <h5>Contato</h5> */}

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
    </>
  );
}

export default Description;
