import styled from "styled-components";

export const DefaultCellContainer = styled.div<{ isSyncing: boolean }>`
  color: ${(props) => (props.isSyncing ? props.theme.colors.gray2 : "inherit")};
`;
