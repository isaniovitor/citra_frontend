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
  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    p {
      font-size: 20px;
      font-weight: 600;
    }

    div {
      display: flex;
      flex-direction: row;
      gap: 10px;

      button {
        background-color: #fff;
      }

      img {
        cursor: pointer;
        width: 20px;
        height: 20px;

        padding: 3px;

        :hover {
          border-radius: 50%;
          background-color: #c5c5c5c5;
        }
      }
    }
  }

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
  }

  button {
    width: 120px;
    height: 40px;

    border-radius: 5px;
    margin-top: 20px;

    background-color: #2eacdc;
    color: #fff;
  }
`;
