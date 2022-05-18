import styled from "styled-components";

export const StyledSortOptionItem = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.purple : "#000"};

  &:hover {
    color: ${(props) => props.theme.colors.purple};
    font-weight: 600;
  }
`;
