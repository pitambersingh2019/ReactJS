import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.5px 9px;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray6}`};
`;
