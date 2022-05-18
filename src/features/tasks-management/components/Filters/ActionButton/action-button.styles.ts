import styled from "styled-components";

export const ButtonContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.04);
  background-color: ${(props) => props.theme.colors.white};
  margin-top: auto;
  padding: 16px 0;
`;
