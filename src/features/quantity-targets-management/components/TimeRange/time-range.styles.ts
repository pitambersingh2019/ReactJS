import styled from "styled-components";

export const TimeRangeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

export const TimeRangeIcon = styled.img`
  height: 22px;
  margin-inline-end: 8px;
`;

export const TimeRangeButton = styled.div`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray4};
  margin-inline-end: 4px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
