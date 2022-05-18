import styled from "styled-components";

export const TimeFrameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CalendarIcon = styled.img`
  height: 20px;
  margin-bottom: 2px;
  cursor: pointer;
`;

export const TimeFrameLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  margin-inline-start: 8px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const ArrowIcon = styled.img`
  height: 20px;
  margin-inline-start: 4px;
`;
