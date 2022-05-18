import { Form as unform } from '@unform/web';
import styled from 'styled-components';

import bg from '../../assets/login/bbg.png';
import profile from '../../assets/login/profile.png';

// Conteiners
export const Conteiner = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;

  align-items: center;
  justify-content: center;

  background-image: url(${bg});

  background-position: bottom;
  background-repeat: no-repeat, repeat-x;
  background-size: cover;

  /* border: 1px solid red; */
`;

export const FormConteiner = styled(unform)`
  display: flex;
  flex-direction: column;

  position: relative;

  /* width: 400px; */
  /* height: 450px; */

  padding: 0 40px;
  padding-bottom: 30px;

  background: #ffffff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 15px;

  align-items: center;
  justify-content: flex-start;

  button {
    width: 100%;

    margin-top: 20px;

    height: 40px;
    background-color: #2eacdc;
  }

  > hr {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  p {
    font-size: 14px;
  }
`;

// Icon
export const IconConteiner = styled.div`
  position: absolute;
  top: -75px;

  width: 150px;
  height: 150px;

  border-radius: 50%;

  border: 1px solid rgba(0, 0, 0, 0.25);

  background-image: url(${profile});

  background-repeat: no-repeat, repeat-x;
  background-size: cover;
`;

// InputContainer
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  margin: 125px 0 10px 0;
`;

export const ColInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  width: 100%;
  /* margin: 125px 0 10px 0; */
`;
