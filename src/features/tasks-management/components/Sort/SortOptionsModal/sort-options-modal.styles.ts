import styled from "styled-components";

export const StyledSortOptionsModal = styled.div<{ isTasksPanel?: boolean }>`
  position: absolute;
  left: ${(props) => !props.isTasksPanel && "0"};
  top: ${(props) => props.isTasksPanel && "25px"};
  ${(props) =>
    props.isTasksPanel && props.theme.dir === "rtl"
      ? "left: 0px;"
      : "right: 0px;"}
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: #fff;
  padding: 9px 16px;
  z-index: 100;
  min-width: ${(props) => (props.theme.dir === "rtl" ? "120px" : "112px")};

  .option {
    &:not(:first-child) {
      margin-top: 17px;
    }
  }
`;
