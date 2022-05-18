import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

interface IWrapper {
  isActive: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  background-color: ${(props) => (props.isActive ? "#f4f2ff" : "unset")};
  color: ${(props) => (props.isActive ? "#340656" : "#050709")};
  border-right: ${(props) => (props.isActive ? "4px solid #340656" : "unset")};
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  cursor: pointer;
  ${rtl`
    padding-left: 48px;
  `};
`;
