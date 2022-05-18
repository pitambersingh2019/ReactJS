import styled from "styled-components";

export const ActionButtonsContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: flex-end;
  padding-inline-end: 16px;

  & > {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
