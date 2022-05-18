import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const LogoTime = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled.img`
  height: 20px;
  margin: 0px 8px;
  cursor: pointer;
`;

export const LogoTimeText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray1};
`;

export const ActiveKPI = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
`;

export const CreateButton = styled.button`
  height: 45px;
  padding-right: 20px;
  background-color: #016df4;
  border-radius: 5px;
  border: unset;
  display: flex;
  align-items: center;
  padding: 10px;
  @media (max-width: 1000px) {
    margin-top: 15px;
  }
`;

export const ImgWrapper = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
`;

export const ImgButton = styled.img`
  width: 100%;
  height: auto;
`;

export const ButtonText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;

  & > {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
