import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;
interface IViewWrapper {
  isActive: boolean;
  color: string;
}

interface ICheckBox extends IViewWrapper {
  isHalf: boolean;
}

export const CheckBox = styled.div<ICheckBox>`
  width: 16px;
  height: 16px;
  border: 0.5px solid;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: ${({ isActive, isHalf, color }) =>
    isActive || isHalf ? color : "#101010"};
  background-color: ${({ isActive, color }) => (isActive ? color : "#fafafa")};
  cursor: pointer;
  & > img {
    width: 10px;
    height: auto;
  }
`;

interface ICheckBoxLine {
  color: string;
}

export const CheckBoxLine = styled.div<ICheckBoxLine>`
  width: 9px;
  height: 1px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const Curcle = styled.div<IViewWrapper>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid;
  outline-color: ${({ isActive, color }) => (isActive ? color : "#050709")};
  border: 4px solid white;
  background-color: ${({ isActive, color }) => (isActive ? color : "white")};
  cursor: pointer;
`;

export const Text = styled.div`
  ${rtl`
      margin-left: 8px;
  `}
  white-space: nowrap;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #050709;
`;
