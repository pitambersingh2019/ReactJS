import styled from "styled-components";

export const FilesList = styled.div`
  margin-top: 16px;

  & > {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;
