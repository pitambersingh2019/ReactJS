import styled from "styled-components";

export const TableRowContainer = styled.tr<{
  depth: number | undefined;
  isBg: boolean;
}>`
  font-weight: ${(props) => (props.depth !== 2 ? 600 : "normal")};
  background: ${(props) => (props.isBg ? "#F5F6F7" : props.theme.colors.white)};
  border: ${(props) => (props.depth === 2 ? "1px solid #e3e3e3" : "none")};
`;
