import styled from "styled-components";

export const CustomOptionItemContainer = styled.div`
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  height: 32px;
  padding: 16px 8px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f0edff;
  }
`;

export const Label = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.purple : "#000"};
`;

export const ArrowIcon = styled.img`
  height: 16px;
  transform: rotate(-90deg);
  position: absolute;
  right: 8px;
`;
