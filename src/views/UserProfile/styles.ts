import { Form as unform } from '@unform/web';
import styled from 'styled-components';

import bg from '../../assets/login/bbg.png';
import bgProfile from '../../assets/userProfile/bgUser.jpg';

// Conteiners
export const Conteiner = styled.div`
  /* display: flex; */

  width: 100%;

  padding: 32px 50px;

  > div {
    display: flex;
    gap: 20px;

    padding-top: 15px;

    > div:first-child {
      width: 100%;
    }

    > div:last-child {
      width: 300px;
    }
  }
`;

// hero
export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;

  height: 240px;

  background-image: url(${bgProfile});

  background-position: bottom;
  background-repeat: no-repeat, repeat-x;
  background-size: cover;

  background-color: #fff;

  img {
    width: 200px;
    height: 200px;

    margin-left: 30px;

    border-radius: 50%;
    border: 2px solid #2eacdc;
  }
`;

// Description
export const Description = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 20px;

  background-color: #fff;
`;

// Menu
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 350px;
  height: fit-content;

  background-color: #fff;
  padding: 20px;

  button {
    width: 100%;

    height: 40px;
    background-color: #2eacdc;
    color: #fff;
  }
`;
