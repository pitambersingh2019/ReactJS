import styled from "styled-components";

export const DividerContainer = styled.div`
  width: 100%;
  height: 15px;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray5}`};
`;
