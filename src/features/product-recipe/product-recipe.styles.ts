import styled from "styled-components";

export const Wrapper = styled.div<{ editMode: boolean }>`
  display: flex;
  // width: calc(100% + 50px);
  // transform: translateX(-25px);
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  height: ${(props) => (props.editMode ? "calc(100% - 48px);" : "100%")};

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
