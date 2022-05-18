import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const LogoText = styled.div`
  ${rtl`
    margin-right: 8px;
  `};
  white-space: nowrap;
  font-family: ProximaNova, sans-serif;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
`;

export const LogoTime = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoTimeImgWrapper = styled.div`
  width: 25px;
  cursor: pointer;
  ${rtl`
    margin-right: 4px;
  `};
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const LogoTimeText = styled.div`
  font-size: 14px;
`;

export const ActiveKPI = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `};
  color: #707070;
`;

export const CreateButton = styled.button`
  width: 170px;
  height: 45px;
  background-color: #5900d3;
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

export const WrapperLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
