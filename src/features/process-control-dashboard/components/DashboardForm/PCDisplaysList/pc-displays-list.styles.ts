import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  & > {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
