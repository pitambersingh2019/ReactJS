import styled from "styled-components";

export const ChipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  min-height: 24px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.lightBlue3};

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #404d61;
`;
