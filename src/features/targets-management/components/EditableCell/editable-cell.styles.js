import NumberFormat from "react-number-format";
import styled from "styled-components";

const getTextColor = (props) => {
  const { willupdate, editing } = props;
  if (editing === "true") {
    return "#101010";
  }
  if (willupdate === "true") {
    return "#e28020";
  }
  return "inherit";
};

const bgStyles = ({ editing, isfocused }) => {
  if (isfocused === "true") {
    return "#fff";
  }
  if (editing === "true") {
    return "rgba(23, 136, 252, 0)";
  }

  return "inherit";
};

export const StyledEditableCell = styled(NumberFormat)`
  border: none;
  background-color: ${(props) => bgStyles(props)};
  border: ${(props) => borderStyles(props)};
  width: 70%;
  padding: 3px;
  text-align: center;
  color: ${(props) => getTextColor(props)};
  font-weight: inherit;
  border-radius: ${(props) => (props.editing ? "4px" : "0px")};

  &:focus {
    outline: none;
  }
`;

const borderStyles = (props) => {
  if (props.isvalid === "false") {
    return "solid 1px red";
  }
  if (props.editing === "true" && props.isvalid !== "false") {
    return "solid 1px #1580fc;";
  }
};
