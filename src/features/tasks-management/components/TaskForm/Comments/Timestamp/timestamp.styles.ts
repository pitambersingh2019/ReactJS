import styled from "styled-components";

export const TimestampContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const StyledTimestamp = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray4};
  margin-inline-start: 16px;
`;
