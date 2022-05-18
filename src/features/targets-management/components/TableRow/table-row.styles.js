import styled from "styled-components";

export const StyledTableRow = styled.tr`
  border: ${(props) => (props.depth === 2 ? "1px solid #e3e3e3" : "none")};
  font-weight: ${(props) => (props.depth !== 2 ? 600 : "normal")};

  td {
    background-color: ${(props) => bgColor(props)};
  }

  td:first-child,
  td:last-child {
    position: sticky;
  }

  td:first-child {
    left: 0px;
    box-shadow: ${(props) =>
      props.isScrolling ? "inset -7px 0 3px -7px rgba(0,0,0,0.4)" : undefined};
  }

  td:last-child {
    right: 0px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const bgColor = (props) => {
  if (props.isScrolling && props.greyBg) {
    return "#F5F6F7";
  }
  if (props.isScrolling) {
    return "#fff";
  }
  if (props.isEditing) {
    return "#f4f2ff";
  }
  if (props.isHovering) {
    return "#f4f2ff";
  }
  if (props.greyBg) {
    return "#F5F6F7";
  }
  return "#fff";
};
