import styled, { keyframes } from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
const animation = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const ColumnMenuStyled = styled.div`
  top: 30px;
  ${rtl`
        right: 0px;
  `}

  z-index: 2;
  position: absolute;
  width: 108px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  background-color: #ffff;
  animation: ${animation} 0.2s linear;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: start;
  ${rtl`
        padding-left: 16px;
        text-align: left;
  `}

  padding-bottom: 14px;
  padding-top: 14px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  color: #4a4a4a;
  cursor: pointer;

  color: ${(p) => (p.selected ? "#5900d3" : "#4a4a4a")};
  &:hover {
    color: #5900d3;
  }
`;
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eeeff1;
`;

export const DividerStroke = styled.div`
  height: 1px;
  width: 100%;
  background-color: #797e8d;
`;
