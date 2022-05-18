import styled, { css } from "styled-components";

export const TableContainer = styled.div<{ showReference: boolean }>`
  table {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray5}`};
    border-collapse: collapse;
    width: 100%;
    border-top: 0 solid black;
  }

  thead {
    position: sticky;
    top: 0px;
    z-index: 10;
    border-top: 0 solid black;
    background: white;
  }

  td {
    border: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
    ${(props) =>
      props.showReference &&
      css`
        border-bottom: ${(props) =>
          `1px solid ${props.theme.colors.lightGray7}`};
      `}
  }

  th:not(:last-child) {
    border-right: 1px solid white;
  }
`;
