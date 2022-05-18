import styled from "styled-components";

import { Task } from "../../../ts";

const getBgColor = (
  priority: Task["TaskPriorityID"]
): { bg: string; color: string } => {
  if (priority === 1) {
    return { bg: "#cffbe5", color: "#166750" };
  }
  if (priority === 2) {
    return { bg: "#fef4c5", color: "#864523" };
  }
  if (priority === 3) {
    return { bg: "#fee2e2", color: "#862523" };
  }
  return { bg: "#fff", color: "#000" };
};

export const StyledPriority = styled.div<{ priority: Task["TaskPriorityID"] }>`
  width: 56px;
  height: 16px;
  border-radius: 16px;
  background-color: ${(props) => getBgColor(props.priority).bg};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: ${(props) => getBgColor(props.priority).color};
`;
