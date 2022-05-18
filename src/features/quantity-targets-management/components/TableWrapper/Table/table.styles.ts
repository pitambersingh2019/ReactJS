import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
  height: calc(100vh - 250px);
  margin-top: 16px;
  max-width: fit-content;

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

  table {
    border: 1px solid #e3e3e3;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0px;
      z-index: 2;
      background: white;
    }
  }

  td {
    padding: 14px;
    font-size: 14px;
    text-align: center;
  }

  th:not(:last-child) {
    border-right: 1px solid white;
    padding: 9px;
  }

  th {
    font-size: 14px;
    background-color: #ecf1f7;
  }
`;
