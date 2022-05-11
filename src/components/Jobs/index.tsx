import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Input as InputStrp } from 'reactstrap';

import Job from './Job';

import * as S from './styles';

function Jobs() {
  return (
    <S.JobsConteinar>
      <div
        style={{
          width: '100%',
          borderRight: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '15px',
        }}
      >
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
      </div>

      <div style={{ width: '100%' }} />

      {/* <S.JobList>lista aq</S.JobList>
      <S.JobDescription>descrição</S.JobDescription> */}
    </S.JobsConteinar>
  );
}

export default Jobs;
