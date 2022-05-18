import styled from "styled-components";

export const ActiveFiltersContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
  & > {
    &:not(:last-child) {
      margin-inline-end: 8px;
    }
  }
`;
