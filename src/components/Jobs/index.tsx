import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Input as InputStrp } from 'reactstrap';

import { applySchema } from '../../constants/schemas';
import { validationForm } from '../../helpers/validationFom';
import ReactDropzoneInput from '../Form/DropZoneInput/ReactDropzoneInput';
import Job from './Job';

import * as S from './styles';

function Jobs() {
  const formRef = useRef(null);

  async function handleSubmit(data: any, { reset }: any) {
    if (await validationForm(data, applySchema, formRef)) {
      console.log('passou');
    }
  }

  return (
    <S.JobsConteinar>
      {/* jobList */}
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

      <S.JobDescription>
        <img
          src="https://media.istockphoto.com/photos/construction-mason-worker-bricklayer-picture-id478291108?k=20&m=478291108&s=612x612&w=0&h=41Py9noA4MA2RR09prCr1CEJOk0rZN4joELqNmkp4l0="
          alt=" "
          style={{ width: '100%', height: '400px' }}
        />

        <S.Title>Pedreiro em casa de banho</S.Title>
        <S.JobInfoConteiner>
          <S.JobInfo>Fortaleza</S.JobInfo>
          <S.JobInfo>Manha e tarde</S.JobInfo>
          <S.JobInfo>80 reais hora</S.JobInfo>
          <S.JobInfo>Pedreiro</S.JobInfo>
          <S.JobInfo>Pedreiro</S.JobInfo>
          <S.JobInfo>Pedreiro</S.JobInfo>
          {/* <S.JobInfo>Pedreiro</S.JobInfo> */}
        </S.JobInfoConteiner>

        <h5>Descrição da vaga</h5>

        <S.Description>
          Necessário experiência mínima de 2 anos. Saber fazer desde a
          construção (assentamento de tijolo) ate serviços de acabamento (pisos,
          lajotas), carpintaria. Saber interpretar desenhos técnicos, cálculo de
          área e volume. Lorem ipsum dolor sit amet consectetur adipisicing
          <br />
          <br />
          elit. Nihil, dolores. Rerum illum iusto adipisci eius error quisquam,
          amet molestias. Reprehenderit atque harum voluptatibus. Cumque atque
          consequuntur perspiciatis cum explicabo quod. Necessário experiência
          mínima de 2 anos. Saber fazer desde a construção (assentamento de
          tijolo) ate serviços de acabamento (pisos, lajotas), carpintaria.
          Saber interpretar desenhos técnicos, cálculo de área e volume. Lorem
          ipsum dolor sit amet consectetur adipisicing
          <br />
          <br />
          consequuntur perspiciatis cum explicabo quod. Necessário experiência
          mínima de 2 anos. Saber fazer desde a construção (assentamento de
          tijolo) ate serviços de acabamento (pisos, lajotas), carpintaria.
          Saber interpretar desenhos técnicos, cálculo de área e volume. Lorem
          ipsum dolor sit amet consectetur adipisicing
          <br />
          <br /> Necessário experiência mínima de 2 anos. Saber fazer desde a
          construção (assentamento de tijolo) ate serviços de acabamento (pisos,
          lajotas), carpintaria. Saber interpretar desenhos técnicos, cálculo de
          área e volume. Lorem ipsum dolor sit amet consectetur adipisicing
          <br />
          <br />
          elit. Nihil, dolores. Rerum illum iusto adipisci eius error quisquam,
          amet molestias. Reprehenderit atque harum voluptatibus. Cumque atque
          consequuntur perspiciatis cum explicabo quod. Necessário experiência
          mínima de 2 anos. Saber fazer desde a construção (assentamento de
          tijolo) ate serviços de acabamento (pisos, lajotas), carpintaria.
          Saber interpretar desenhos técnicos, cálculo de área e volume. Lorem
          ipsum dolor sit amet consectetur adipisicing
          <br />
          <br />
          consequuntur perspiciatis cum explicabo quod. Necessário experiência
          mínima de 2 anos. Saber fazer desde a construção (assentamento de
          tijolo) ate serviços de acabamento (pisos, lajotas), carpintaria.
          Saber interpretar desenhos técnicos, cálculo de área e volume. Lorem
          ipsum dolor sit amet consectetur adipisicing
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
          <button type="submit">Candidatar-se</button>
        </S.FormConteiner>
      </S.JobDescription>
    </S.JobsConteinar>
  );
}

export default Jobs;
