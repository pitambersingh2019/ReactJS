import styled from "styled-components";

export const TopRowContainer = styled.div<{ smallMargin: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.smallMargin ? "10px" : "20px")};
  align-items: center;
`;

export const TopRowRightContainer = styled.div`
  display: flex;

  & > {
    &:not(:last-child) {
      margin-inline-end: 8px;
    }
  }
`;
