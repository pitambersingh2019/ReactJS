import styled from "styled-components";

export const ExpandableCellContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleIcon = styled.img<{ depth: number | undefined }>`
  height: 12px;
  margin-inline-start: ${({ depth }) => `${depth}rem`};
`;

export const Text = styled.div<{
  canExpand: boolean;
}>`
  padding-inline-start: ${({ canExpand }) => (canExpand ? "0.5rem" : "3rem")};
`;
