import styled from "styled-components";

export const TableContainer = styled.div`
  margin-top: 16px;
  max-height: calc(100vh - 250px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e3e3e3;
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }

  table {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray5}`};
    border-collapse: collapse;
    width: 100%;
    border-top: 0 solid black;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 2;
    background: white;
    border-top: 0 solid black;
  }

  td {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.black};
    height: 48px;
    display: flex;
    align-items: center;
    padding-inline-start: 8px;
  }

  th:not(:last-child) {
    border-right: 1px solid white;
  }
`;
