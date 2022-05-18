import styled from "styled-components";

export const TableViewContent = styled.div`
  display: block;
  max-width: 100%;
  /* overflow-x: scroll; */
  // overflow-y: hidden;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #d1d1d1;
    border-top: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-collapse: separate;

    thead {
      position: -webkit-sticky;
      position: -moz-sticky;
      position: -ms-sticky;
      position: -o-sticky;
      position: sticky;
      top: 0;
      z-index: 2;

      .propertyName {
        width: 400px;
      }
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    td {
      margin: 0;
      border-bottom: 1px solid #e4e7eb;
      ${(props) =>
        props.theme.dir === "rtl"
          ? `border-left: 1px solid #e4e7eb;`
          : `border-right: 1px solid #e4e7eb;`}

      :last-child {
        ${(props) =>
          props.theme.dir === "rtl" ? `border-left: 0;` : `border-right: 0;`}
      }
    }
  }
`;
