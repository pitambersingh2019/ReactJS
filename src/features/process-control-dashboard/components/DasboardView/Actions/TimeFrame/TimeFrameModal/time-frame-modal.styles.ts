import styled from "styled-components";

export const TimeFrameModalContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray3}`};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  white-space: nowrap;
  min-width: 120px;
  padding: 6px 0;
`;

export const OptionItem = styled.div<{ isSelected: boolean }>`
  height: 32px;
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.purple : "#000"};

  &:hover {
    background-color: #f0edff;
  }
`;
