import styled from "styled-components";

export const TriangleContainer = styled.div`
  height: 5px;
  background-color: black;
  opacity: 0.5;
  position: relative;
`;

export const Arrow = styled.div`
  position: absolute;
  ${(props) => (props.theme.dir === "rtl" ? `right: 165px;` : `left: 160px;`)}
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
`;
