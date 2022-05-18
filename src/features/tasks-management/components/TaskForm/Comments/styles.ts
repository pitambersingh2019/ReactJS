import styled from "styled-components";

export const CommentsContainer = styled.div`
  & > {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
