import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const WrapperBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 1036px;
  height: 952px;
  background-color: white;
  border-radius: 5px;
  @media (max-width: 1920px) {
    width: 896px;
    height: 640px;
  }
  @media (max-width: 1366px) {
    width: 86%;
    height: 83%;
  }
`;

export const WrapperTabs = styled.div`
  display: flex;
  padding: 12px 25px;
  overflow-y: auto;
  & > div {
    margin-bottom: unset;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const WrapperContent = styled.div`
  height: calc(100% - 130px);
  display: flex;
  border-top: 1px solid #e4e7eb;
`;

export const LineWrapper = styled.div`
  min-height: 100%;
  border-right: 1px solid #d1d1d1;
`;

export const WrapperMenu = styled.div`
  width: 200px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const WrapperFilter = styled.div`
  width: calc(100% - 205px);
  height: 100%;
  ${rtl`
      padding-left: 48px;
    `};
  @media (max-width: 1920px) {
    ${rtl`
      padding-left: 40px;
    `};
  }
  @media (max-width: 1366px) {
    ${rtl`
      padding-left: 24px;
    `};
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  ${rtl`
    right: 20px;
  `};
`;

export const Button = styled.div`
  width: 104px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5900d3;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #fff;
  cursor: pointer;
`;
