import styled from "styled-components";
import { device } from "../../../../utils/devices";

export const StyledSelectionBoxWrapper = styled.div`
  display: flex;
`;

export const StyledSelectionBoxContainer = styled.div`
  display: bolck;
`;

export const StyledSelectionBox = styled.div`
  display: flex;
  height: calc(100vh - 289px);
  gap: 48px;
  @media ${device.laptop} {
    gap: 40px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  padding-top: 24px;
  gap: 16px;
`;
