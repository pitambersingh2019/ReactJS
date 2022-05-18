import styled from "styled-components";

export const ChartTooltipContainer = styled.div<{
  color: string;
}>`
  border-color: ${(props) => props.color};
`;

export const ParamName = styled.p<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  border-bottom: ${(props) => `1px solid ${props.color}`};
`;

export const Date = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #000;
  padding-top: 8px;
`;

export const Value = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #000;
`;
