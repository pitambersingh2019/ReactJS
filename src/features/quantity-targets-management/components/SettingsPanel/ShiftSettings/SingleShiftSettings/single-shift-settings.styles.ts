import styled from "styled-components";

export const SingleShiftSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const ShiftNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowIcon = styled.img<{ opened: boolean }>`
  height: 16px;
  margin-inline-end: 8px;
  transform: ${(props) => (props.opened ? `rotate(0deg)` : `rotate(-90deg)`)};
  transition: all 0.3s ease-out;
  cursor: pointer;
`;

export const ShiftItemsContainer = styled.div`
  padding-inline-start: 48px;
  margin-top: 12px;

  & > * {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;
