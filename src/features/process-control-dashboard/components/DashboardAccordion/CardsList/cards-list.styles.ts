import styled from "styled-components";

export const CardsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-inline-start: 24px;

  & > {
    &:not(:last-child) {
      margin-inline-end: 24px;
    }
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
