import styled from "styled-components";

export const StyledSortIcon = styled.img<{ isRotate: boolean }>`
  height: 30px;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.isRotate ? `rotate(180deg)` : "")};

  &:hover {
    cursor: pointer;
  }
`;
