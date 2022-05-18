import InputMask from 'react-input-mask';
import styled from 'styled-components';

interface DropProps {
  isDragActive: boolean;
}

export const DropConteiner = styled.div<DropProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  width: 100%;
  height: 40px;

  background-color: ${props =>
    props.isDragActive ? 'rgba(0, 0, 0, 0.3)' : '#fff'};
  padding-left: 12px;
  border-radius: 6px;

  font-size: 14px;

  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  /* border-radius: 0.25rem; */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  p {
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    margin: 0;

    .greenText {
      color: ${props => props.theme.primary};
    }
  }
`;

export const Input = styled.input`
  border: none;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;

  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
