import styled from "styled-components";
import { TaskPriority } from "../../../ts";

const getBorder = (isUnassigned: boolean, isDraggingOver: boolean) => {
  if (isDraggingOver) {
    return "solid 1px #1268fb";
  }
  if (isUnassigned) {
    return "unset";
  }

  return "solid 1px #d1d1d1";
};

export const StyledHeader = styled.div<{
  isUnassigned: boolean;
  isDraggingOver: boolean;
}>`
  position: sticky;
  top: 0px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: #101010;
  padding: 8px 11px;
  box-shadow: ${(props) =>
    props.isUnassigned ? "unset" : "0 2px 4px 0 rgba(0, 0, 0, 0.04)"};
  border-top: ${({ isUnassigned, isDraggingOver }) =>
    getBorder(isUnassigned, isDraggingOver)};
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: ${(props) =>
    props.isUnassigned ? "1px solid #eeeff4" : "unset"};

  &::before,
  &::after {
    width: 1px;
    height: 5px;
    background: white;
    content: "";
    display: block;
    position: absolute;
    top: -1px;
  }

  &::before {
    left: -1px;
  }

  &::after {
    right: -1px;
  }

  .count-box {
    width: 32px;
    height: 24px;
    padding: 4px;
    border-radius: 4px;
    background-color: ${(props) => (props.isUnassigned ? "#fff" : "#edeffa")};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderTitle = styled.div`
  //max 1 line, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PriorityHeaderContainer = styled.div<{ priority: TaskPriority }>`
  min-width: 46px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => getColor(props.priority).color};
  background-color: ${(props) => getColor(props.priority).bg};
  text-align: center;
  padding: 2px 8px;
`;

const getColor = (value: TaskPriority): { bg: string; color: string } => {
  if (value === TaskPriority.Low) {
    return { bg: "#cffbe5", color: "#166750" };
  }
  if (value === TaskPriority.Medium) {
    return { bg: "#fef4c5", color: "#864523" };
  }
  if (value === TaskPriority.High) {
    return { bg: "#fee2e2", color: "#862523" };
  }
  return { bg: "#fff", color: "#101010" };
};
