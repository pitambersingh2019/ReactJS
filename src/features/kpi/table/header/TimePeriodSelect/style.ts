import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const TimePeriodSelectField = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  white-space: nowrap;
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: inherit;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: inherit;
`;

interface IWrapper {
  activeField: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 5px;
  padding-right: 5px;
  color: ${(props) => (props.activeField ? "#5900d3" : "unset")};
  font-weight: ${(props) => (props.activeField ? "600" : "normal")};
  cursor: pointer;
  &:hover {
    background-color: #f4f2ff;
  }
  &:active {
    color: white;
    background-color: #5900d3;
  }
`;

export const SelectImg = styled.div`
  width: 16px;
  margin-left: 10px;
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const BlackWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
`;

export const TimePeriodSelect = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.16);
  position: absolute;
  background-color: white;
  margin-top: 10px;
  z-index: 3;
  ${rtl`
    right: 0;
  `}
  & > div:first-child {
    border-radius: 5px 5px 0 0;
  }
  & > div:last-child {
    border-radius: 0 0 5px 5px;
  }
`;
