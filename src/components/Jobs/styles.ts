import { Form as unform } from '@unform/web';
import styled from 'styled-components';

export const JobsConteinar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  background-color: #fff;

  margin: 10px 0;
`;

// Job description
export const JobDescription = styled.div`
  width: 100%;

  padding: 15px;
  /* borderRight: '1px solid gray', */
  border-left: 1px solid gray;
`;
