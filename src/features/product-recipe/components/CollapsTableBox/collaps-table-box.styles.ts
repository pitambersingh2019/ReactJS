import styled from "styled-components";

export const ContentWrapper = styled.div`
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7eb;
  margin-bottom: 16px;
`;

export const TableContainer = styled.div`
  margin-top: 8px;
  padding: 0 16px 16px;
  max-height: calc(100vh - 86px - 48px - 55px - 24px - 24px);
  // 100vh - angularHeader - header - collapseHeader - sectionMargin&Space - next_section_showing
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;
