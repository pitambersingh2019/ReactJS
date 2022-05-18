import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const HeaderCreate = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding-left: 5px;
`;

export const WrapperKPIName = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  color: black;
`;
interface IKPINameInput {
  width: number;
}

export const KPINameInput = styled.input<IKPINameInput>`
  width: ${({ width }) => width * 21 + "px"};
  max-width: 100%;
  min-width: 250px;
  color: black;
  font-size: 24px;
  font-weight: 900;
  border-radius: 4px;
  border: 2px solid #1d6df7;
  outline: none;
  padding: 0;
`;

interface IKPINameImgWrapper {
  cursor: boolean;
}

export const KPINameImgWrapper = styled.div<IKPINameImgWrapper>`
  width: 15px;
  cursor: ${({ cursor }) => (cursor ? "pointer" : "initial")};
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const KPIName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 50px);
  font-size: 24px;
  font-weight: 900;
  line-height: 1.6;
`;

export const StepWrapper = styled.div`
  text-align: center;
`;

export const StepName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #5aca96;
  border-left: 2px solid #5aca96;
  border-radius: 1px;
  padding-left: 10px;
`;

export const FirstColumn = styled.div`
  max-width: 75%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const StepNumber = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #757575;
`;

interface IStepPoint {
  active: boolean;
}

export const StepPoint = styled.div<IStepPoint>`
  height: 7px;
  width: 35px;
  border-radius: 15px;
  background-color: ${(props) => (props.active ? "#5900d3" : "#AFAFAF")};
  margin-left: 7px;
  ${rtl`
    :first-child {
      margin-left: 0;
    }
  `}
`;

export const StepPointWrapper = styled.div`
  display: flex;
`;

export const WrapperTooltip = styled.div`
  max-height: 300px;
  overflow-y: auto;
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
