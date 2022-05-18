import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SecondColumn = styled.div`
  display: flex;
  ${rtl`
    border-left: 3px solid #e7e7e7;
     padding-left: 16px;
  `};
  width: 313px;
  @media (max-width: 800px) {
    ${rtl`
    border-left: unset;
  `};
    border-left: unset;
    display: block;
  }
`;

export const LastWizard = styled.div`
  font-size: 14px;
  width: 50%;
`;

export const FormulaName = styled.div`
  height: 40px;
  padding-top: 7px;
  line-height: 1.2;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: black;
  font-size: 14px;
  font-weight: 900;
  width: 100px;
  ${rtl`
    margin-right: 5px;
  `};
  @media (max-width: 800px) {
    padding-right: unset;
    width: unset;
  }
`;

export const WrapperDisplay = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  width: calc(100% - 105px);
`;
