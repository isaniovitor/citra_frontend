import { Form as unform } from '@unform/web';
import { url } from 'inspector';
import styled from 'styled-components';

// Form
export const FormConteiner = styled(unform)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;

  width: 100%;
  /* height: 50px; */
  margin: 10px 0;

  /* background: #ffff; */

  button {
    width: 120px !important;
    height: 40px;

    border-radius: 5px;

    background-color: #2eacdc;
    color: #fff;
  }

  .caution {
    background-color: red;
  }
`;
