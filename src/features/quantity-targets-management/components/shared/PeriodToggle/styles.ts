import styled from "styled-components";

export const PeriodToggleContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-end: 38px;
`;
