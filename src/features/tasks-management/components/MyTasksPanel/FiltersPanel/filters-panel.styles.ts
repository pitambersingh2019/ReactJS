import styled from "styled-components";

export const FiltersPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 16px;
  border-top: ${(props) => `1px solid ${props.theme.colors.lightGray6}`};
  height: calc(100vh - 56px - 32px);
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ClearContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -1px;
  margin-bottom: 17px;
  align-items: center;
`;
