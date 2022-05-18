import styled from "styled-components";
import { TaskPriority } from "../../../ts";

export const StyledLabel = styled.div`
  font-family: "ProximaNova";
  font-size: 16px;
  font-weight: 600;
  color: #101010;
  margin-bottom: 16px;
`;

export const StyledSelectPriority = styled.div`
  .priorities-row {
    display: flex;
  }
`;

export const StyledPriorityOption = styled.span<{
  isSelected: boolean;
  "data-name": TaskPriority;
  disabled: boolean;
}>`
  border-radius: 12px;
  border: ${(props) =>
    `solid 1px ${
      props.isSelected
        ? props.theme.colors.primaryBlue
        : props.theme.colors.black
    }`};
  padding: 1px 22px;
  font-size: 16px;
  font-weight: normal;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.white : props.theme.colors.black};
  margin-inline-end: 16px;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryBlue
      : props.theme.colors.white};
  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

export const PriotiryOptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-inline-end: 40px;
  line-height: normal;
`;

export const Radio = styled.input`
  &[type="radio"] {
    /* remove standard background appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 3px;
    background-clip: content-box;
    border: solid 1px #050709;
    border-radius: 50%;
    margin: 0 !important;
    top: 0px !important;
  }

  &[type="radio"]:checked {
    background-color: ${(props) => props.theme.colors.purple3};
    border-color: ${(props) => props.theme.colors.purple3};
  }
`;

export const Label = styled.div<{
  "data-name": TaskPriority;
}>`
  min-width: 56px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  margin-inline-start: 8px;
  color: ${(props) => getColor(props["data-name"]).color};
  background-color: ${(props) => getColor(props["data-name"]).bg};
  text-align: center;
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
