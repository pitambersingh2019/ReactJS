import styled from "styled-components";

export const FileNameCellContainer = styled.div<{ isSyncing: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => (props.isSyncing ? props.theme.colors.gray2 : "inherit")};
`;
