import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  height: 75%;
  margin: 20px 20px 20px 0;
  /* This will make the table scrollable when it gets too small */
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 100%;
  }

  table thead,
  table tbody tr {
    display: table;
    table-layout: fixed;
  }

  table tbody tr {
    width: 100%;
  }

  table {
    /* Make sure the inner table is always as wide as needed */

    ${rtl`
      box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
    `}
    width: 100%;
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    border-spacing: 0em;
    thead {
      flex: 0 0 auto;
      width: -webkit-calc(100% - 10px);
    }

    tbody {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.01);
      ${rtl`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.01);
      `}
      /* body takes all the remaining available space */
    flex: 1 1 auto;
      display: block;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 10px;
        margin: 5px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #e3e3e3;
      }
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;

export const Col = styled.th`
  color: #4a4a4a;
  height: 40px;
  text-align: center;
  background-color: white;
  font-size: 16px;
  font-weight: 700;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin: 10px;
  padding: 1px;
  width: 10%;
  user-select: none;
  color: #4a4a4a;
  /* But "collapsed" cells should be as small as possible */
  &.collapseReactTable_Checkbox {
    width: 1.5%;
  }
  &.collapseReactTable_status {
    width: 3%;
  }
  &.collapseReactTable_menu {
    width: 1%;
  }

  :last-child {
    ${rtl`
          border-right: 0;
      `}
  }
`;

export const ColContainer = styled.div`
  //style={{backgroundColor: '#f3f3f4', width: '100%', height: '100%'}}
  background-color: #f3f3f4;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  padding: 10px;
`;
export const Row = styled.td<{ isSelected: boolean }>`
  font-size: 16px;
  border-bottom: 1px solid #e3e3e3;
  padding: 10px;
  background-color: ${(props) =>
    props.isSelected ? "rgba(0, 128, 255, 0.08)" : "white"};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  /* The secret sauce */
  /* Each cell should grow equally */
  width: 10%;
  /* But "collapsed" cells should be as small as possible */
  &.collapseReactTable_Checkbox {
    width: 1.5%;
  }
  &.collapseReactTable_status {
    width: 3%;
  }
  &.collapseReactTable_menu {
    width: 1%;
  }

  :last-child {
    ${rtl`
          border-right: 0;
      `}
  }
`;

export const CheckBoxContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: solid 0.5px #101010;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "#1268fb" : "#fafafa")};
  border-radius: 2px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CheckMark = styled.div<{ checkd: boolean }>`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  > * {
    font-size: 5px;
    visibility: ${(props) => (props.checkd ? "visible" : "hidden")};
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${rtl`
      margin-left: 10px;
  `}
`;
export const ArrowDown = styled.div`
  width: 0px;
  height: 0px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #d1d1d1;
  margin: 2px;
  &:hover {
    border-top: 6px solid #4a4a4a;
  }
`;

export const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin: 2px;
  border-bottom: 6px solid #d1d1d1;

  &:hover {
    border-bottom: 6px solid #4a4a4a;
  }
`;
