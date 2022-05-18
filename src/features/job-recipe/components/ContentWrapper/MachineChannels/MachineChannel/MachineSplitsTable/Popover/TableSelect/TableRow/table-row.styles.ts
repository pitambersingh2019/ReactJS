import styled from "styled-components";

export const TableRowContainer = styled.tr<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? "#f4f2ff" : props.theme.colors.white};
`;
