import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Input as InputStrp } from 'reactstrap';

import * as S from './styles';

function Job() {
  return (
    <S.JobConteinar>
      <img
        src="https://i.pinimg.com/280x280_RS/cb/b2/80/cbb280fa8c687cf3b137df878bf82d08.jpg"
        alt=""
      />

      <S.JobDescription>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Pedreiro</label>
        <div>
          CVENGENHARIA Fortaleza - CE R$ 2,400,00 Fortaleza - CE R$ 2,400,00
          Fortaleza - CE R$ 2,400,00
        </div>
        <div style={{ textAlign: 'end' }}>ler mais</div>
      </S.JobDescription>
    </S.JobConteinar>
  );
}

export default Job;
