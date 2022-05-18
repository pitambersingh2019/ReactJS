import styled from "styled-components";

export const StyledTable = styled.div`
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
    border-top: 0 solid black;

    thead {
      position: sticky;
      top: 0px;
      z-index: 2;
      background: white;
      border-top: 0 solid black;
    }

    tr {
      th:first-child,
      th:last-child {
        position: sticky;
        z-index: 40;
      }

      th:first-child {
        left: 0px;
        box-shadow: ${(props) =>
          props.isScrolling
            ? "inset -7px 0 3px -7px rgba(0,0,0,0.4)"
            : undefined};
        border-right: ${(props) => props.isScrolling && "0px"};
      }

      th:last-child {
        right: 0px;
      }
    }
  }

  td {
    padding: 14px;
    font-size: 14px;
  }

  th:not(:last-child) {
    border-right: 1px solid white;
    padding: 9px;
  }

  th {
    text-align: center;
  }
`;

export const StyledHeader = styled.th`
  font-size: 14px;
  background-color: ${(props) =>
    props.lightBg ? "rgba(236, 241, 247, 0.3)" : "#ecf1f7"};
  min-width: ${(props) => `${columnsMinWidth[props.columnId]}px`};
  width: ${(props) => (props.columnId === "levels" ? "160px" : "unset")};
`;

const columnsMinWidth = {
  levels: 160,
  IsFixedTarget: 64,
  MachineRank: 64,
  CycleTimeEfficiencyTarget: 120,
  RejectsEfficiencyTarget: 64,
  CavitiesEfficiencyTarget: 120,
  DownTimeEfficiencyTarget: 80,
  PEETarget: 48,
  DownTimeEfficiencyOEETarget: 86,
  OEETarget: 48,
  chooser: 80,
};
