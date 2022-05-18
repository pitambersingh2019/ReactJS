import styled from "styled-components";

export const SectionsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px - 5px - 48px - 63px);
  //40px - nav bar
  //5px - arrow
  //48px - header
  //63px - actions icons
  overflow: auto;

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
