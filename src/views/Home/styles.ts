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

// SearchMenu
export const SearchMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 10px 50px;

  background-color: #fff;

  input {
    height: 40px;
    width: 500px;

    padding-left: 5px;

    border-radius: 5px;
    border-bottom: 1px solid #e5e5e5;
  }

  button {
    width: 120px;
    height: 40px;

    border-radius: 5px;

    background-color: #2eacdc;
    color: #fff;
  }
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
