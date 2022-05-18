import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  width: 190px;
  height: 220px;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
`;

export const KPISetting = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
`;

export const DisplayWrapper = styled.div`
  height: 70%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const KPINameWrapper = styled.div`
  overflow: hidden;
  height: 10%;
`;

export const KPIFooter = styled.div`
  height: 10%;
  display: flex;
  justify-content: right;
`;

export const KPIFormulaName = styled.div`
  overflow-wrap: break-word;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  &:dir(ltr) {
    text-align: left;
  }
  color: #101010;
`;

export const SettingFlag = styled.div`
  display: flex;
  align-items: center;
`;

interface IFlagWrapper {
  isActiveKPI: boolean;
}

export const FlagWrapper = styled.div<IFlagWrapper>`
  width: 10px;
  display: flex;
  align-items: center;
  ${rtl`
    margin-right: 5px;
  `}
  opacity: ${({ isActiveKPI }) => (isActiveKPI ? 1 : 0.4)};
  & > img {
    height: auto;
    width: 100%;
  }
`;

export const DotsWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  ${rtl`
    margin-left: 5px;
  `};
  & > img {
    width: auto;
    height: 120%;
  }
`;
