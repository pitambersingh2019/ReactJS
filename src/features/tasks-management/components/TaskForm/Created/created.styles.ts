import styled from "styled-components";

export const CreatedContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const CreatedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.white};
`;

export const TimeIcon = styled.img`
  margin-inline-start: 16px;
  height: 20px;
  margin-inline-end: 4px;
`;
