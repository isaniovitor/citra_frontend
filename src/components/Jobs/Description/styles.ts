import { Form as unform } from '@unform/web';
import styled from 'styled-components';

export const Title = styled.h2`
  padding: 15px 0 10px 0;
  margin: 0;
`;

export const JobInfoConteiner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;

  width: 100%;
  padding-bottom: 30px;
`;

export const JobInfo = styled.p`
  color: white;
  background-color: #2eacdc;

  padding: 15px;
  border-radius: 6px;
  margin: 0;
`;

export const Description = styled.p`
  padding-bottom: 30px;
  margin: 0;
`;

// Form
export const FormConteiner = styled(unform)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    width: 120px;
    height: 40px;

    border-radius: 5px;
    margin-top: 20px;

    background-color: #2eacdc;
    color: #fff;
  }

  a {
    text-decoration: none !important;
    color: #2eacdc !important;
    :hover {
      text-decoration: underline !important;
      color: #2eacdc;
    }
  }
`;
