import styled from 'styled-components';

export const TextoAndLogoStyles = styled.div`
    display: inline-flex;
    align-items: center;
`;

export const NavbarStyles = styled.div`
    background-color: ${(props) => props.theme.white};
    height: 71px;
    color: white;
    display: flex;
    justify-content: space-between;
    border-bottom: 5px solid ${(props) => props.theme.primary};
`;

export const NavOptionStyles = styled.div`
  display: flex;
  padding: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.white};
`;

export const ImgStyles = styled.img`
  height: 40%;
  align-items: center;
  padding-left: 10px;
`;

export const NavTextStyles = styled.li`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #008442;
  padding-left: 25px;  
  padding-right: 25px;   
  text-decoration: none;

  a {
    text-decoration: none;
    color: #008442;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .a:hover {
    text-decoration: underline;
    color: white;
  }
`;

export const NavItemStyles = styled.div`
  display: flex;  
  margin-left: -20%;
`;

export const TitleStyles = styled.h1`
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 3.5px;
  margin-left: 10px;
  margin-bottom: 0px;
  color: #008442;
`;

