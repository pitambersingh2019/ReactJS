import styled from "styled-components";

const getBorder = (isUnassigned: boolean, isDraggingOver: boolean) => {
  if (isDraggingOver) {
    return "solid 1px #1268fb";
  }
  if (isUnassigned) {
    return "unset";
  }

  return "solid 1px #d1d1d1";
};

export const ColumnContainer = styled.div<{
  isUnassigned: boolean;
  ref: (element: HTMLElement | null) => any;
  isDraggingOver: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-width: 254px;
  width: 254px;
  margin: 0 8.5px;
  border-radius: 8px;
  border: ${({ isUnassigned, isDraggingOver }) =>
    getBorder(isUnassigned, isDraggingOver)};
  background-color: ${(props) => (props.isUnassigned ? "#fff" : "#f6f7fc")};
  min-height: 75vh;
  border-top: none;
`;
