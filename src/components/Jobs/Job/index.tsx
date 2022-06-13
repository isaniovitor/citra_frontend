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
        <p>
          Necessário experiência mínima de 2 anos. Saber fazer desde a
          construção (assentamento de tijolo) ate serviços de acabamento (pisos,
          lajotas)...
        </p>
        <p style={{ textAlign: 'end' }}>ler mais</p>
      </S.JobDescription>
    </S.JobConteinar>
  );
}

export default Job;
