import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

interface IWrapper {
  width: number;
  height: number;
  backgroundColor: string;
}

export const Wrapper = styled.div<IWrapper>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  ${rtl`
    margin-right: 10px;
  `};
`;
