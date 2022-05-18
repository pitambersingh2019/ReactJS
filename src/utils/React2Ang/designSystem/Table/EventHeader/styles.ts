import styled, { keyframes } from "styled-components";
import CloseIcon from "../SVG/CloseIcon";
// @ts-ignore
import rtl from "styled-components-rtl";
export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const animationShowShareTable = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  background: white;
  border-radius: 4px;
  width: 700px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${animationShowShareTable} 0.2s linear;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}

  color: #050709;
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 60px;
  display: flex;
  margin-bottom: 60px;
  word-wrap: break-word;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: start;
`;
export const ContentWrapper2 = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 60px;
  display: flex;
  margin-bottom: 60px;
  word-wrap: break-word;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

export const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  top: 16px;
  ${rtl`
    right: 16px;
  `}

  width: 20px;
  height: 20px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;

export const Header = styled.div`
  height: 72px;
  width: 100%;
  padding: 16px 46px 16px 0px;
  border: solid 1px #f3f3f4;
  background-color: #fafafa;
  position: relative;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-left: 24px;
  gap: 4px;
  align-items: center;
`;

export const FooterStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 16px;
  gap: 16px;
`;

export const CancelButton = styled.div`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  border: solid 1px #5900d3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #5900d3;
  cursor: pointer;
  user-select: none;

  /* &:hover {
    border: solid 1px #104fbc;
    color: #104fbc;
  } */
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}
  color: #050709;
  padding: 0px 0px 0px 46px;
`;

export const CloseIconItemStyled = styled(CloseIcon)`
  width: 8px;
  height: 8px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;
