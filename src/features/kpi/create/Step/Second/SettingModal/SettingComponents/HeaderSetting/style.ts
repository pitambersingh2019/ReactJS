import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Header = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  margin-bottom: 8px;
`;

export const HeaderTitle = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
    margin-right: 62px;
  `}
`;

export const WrapperCheckBox = styled.div`
  display: flex;
  align-items: center;
  & > input {
    margin-top: 0;
  }
  & > label {
    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 60px;
    font-family: ProximaNova, sans-serif;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    color: #404d61;
  }
`;

export const HeaderCheckBox = styled.input`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #000;
  cursor: pointer;
`;
