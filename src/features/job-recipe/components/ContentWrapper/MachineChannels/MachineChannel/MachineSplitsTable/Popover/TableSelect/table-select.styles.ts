import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 0px 24px 16px;
  table {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray5}`};
    border-collapse: collapse;
    width: 100%;
    border-top: 0 solid black;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
    border-top: 0 solid black;
    background: white;
  }

  td {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
  }

  th:not(:last-child) {
    border-right: 1px solid white;
  }
`;
