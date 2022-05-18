import styled from "styled-components";

export const DaysPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline-start: 35px;
  margin-top: 16px;
`;

export const DaysItemsContainer = styled.div`
  margin-top: 16px;

  & > * {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;
