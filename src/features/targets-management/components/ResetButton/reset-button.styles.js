import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: ${(props) => `${props.tableWidth}px`};
`;
