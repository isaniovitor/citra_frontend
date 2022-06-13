import { Form as unform } from '@unform/web';
import { url } from 'inspector';
import styled from 'styled-components';

import bg from '../../assets/login/bbg.png';
import profile from '../../assets/login/profile.png';
import bgProfile from '../../assets/userProfile/bgUser.jpg';

interface ImageProps {
  imageURL: string;
}

// Conteiners
export const Conteiner = styled.div`
  /* display: flex; */

  width: 100%;

  padding: 32px 50px;

  > div {
    display: flex;
    gap: 20px;

    padding-top: 15px;
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

// Icon
export const ImageContainer = styled.div`
  display: flex;
  flex: 0.2;
  align-items: center;
  justify-content: center !important;
`;

export const IconConteiner = styled.div`
  width: 150px;
  height: 150px;

  border-radius: 50%;

  border: 1px solid rgba(0, 0, 0, 0.25);

  background-repeat: no-repeat, repeat-x;
  background-size: cover;
`;

// Form
export const FormConteiner = styled(unform)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  position: relative;

  width: 100%;
  /* height: 450px; */

  padding: 30px 40px;

  background: #ffffff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 15px;

  align-items: center;
  justify-content: flex-start;

  > div {
    display: flex;
    justify-content: flex-end;

    width: 100%;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      background-color: #2eacdc;
      color: #fff;

      padding: 15px;
    }
  }

  a {
    width: 100%;

    text-decoration: none;

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

// InputContainer
export const InputContainer = styled.div`
  display: flex;
  flex: 0.9;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  margin: 0px 0 10px 0;

  > div {
    display: flex;
    flex-direction: row;

    flex: 1;
    gap: 15px;
  }
`;
