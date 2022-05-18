import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const EndLineWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const EndLineText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
    margin-right: 24px;
  `};
`;
