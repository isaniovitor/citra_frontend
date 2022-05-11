import styled from 'styled-components';

export const JobConteinar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  width: 100%;

  padding: 10px;

  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  img {
    width: 90px;
    height: 115px;
  }
`;

export const JobDescription = styled.div`
  display: flex;

  justify-content: space-between;

  width: 100%;
  flex-direction: column;
  /* background-color: aqua; */
`;
