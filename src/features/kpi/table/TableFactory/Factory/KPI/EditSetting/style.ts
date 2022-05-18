import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  ${rtl`
    right: 22px;
  `};
  z-index: 9;
`;

export const WrapperBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
`;

export const WrapperPoints = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.16);
  border: solid 1px #eeeff1;
  z-index: 100;
  & > div:first-child {
    border-radius: 4px 4px 0 0;
  }
  & > div:last-child {
    border-radius: 0 0 4px 4px;
  }
`;
