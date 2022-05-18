import styled from "styled-components";

export const Divider = styled.div`
  margin: 14px 0 24px;
  width: 100%;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
`;

export const TableWrapper = styled.div<{ tableWrapperHeight: number }>`
  height: ${(props) => props.tableWrapperHeight}px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
