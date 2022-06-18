import { Form as unform } from '@unform/web';
import styled from 'styled-components';

import bg from '../../assets/login/bbg.png';
import profile from '../../assets/login/profile.png';

// Conteiners
export const Conteiner = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  /* menos o height do menu */
  height: calc(100vh - 71px);
  /* height: 100vh; */

  /* align-items: center; */
`;

// JobsSections
export const JobsSection = styled.div`
  padding: 0 50px;
  background-color: #e5e5e5;
`;

export const JobsConteinar = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin: 0 50px;

  background-color: #fff;
`;

export const JobList = styled.div`
  background-color: red;
`;

export const JobDescription = styled.div`
  background-color: aqua;
`;
