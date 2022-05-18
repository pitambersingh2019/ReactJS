import styled from "styled-components";

export const OptionsRowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;

  > * {
    &:first-child {
      margin-inline-end: 32px;
    }
  }
`;
