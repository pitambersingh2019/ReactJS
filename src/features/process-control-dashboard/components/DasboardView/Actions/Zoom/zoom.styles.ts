import styled from "styled-components";

export const ZoomContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  margin-inline-end: 8px;
`;

export const ToggleContainer = styled.div`
  margin-bottom: -5px; //overrides Angular styles
`;
