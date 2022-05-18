import styled from "styled-components";

export const Container = styled.div`
  height: calc(80vh - 40px);
  margin-top: 40px;
`;

export const StyledTaskForm = styled.form<{ existingTask: boolean }>`
  padding-left: 25px;
  padding-right: 25px;
  padding-top: ${(props) => (props.existingTask ? "16px" : "18px")};
  padding-bottom: 16px;
  height: calc(
    80vh - 40px - 48px
  ); //40px - title height, 48px - buttons container
  overflow-y: auto;

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

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 16px 16px 16px;

  > * {
    &:first-child {
      margin-inline-end: 24px;
    }
  }
`;

export const DatesEstimateContainer = styled.div`
  display: flex;
  padding-top: 24px;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding-inline-start: 24px;
  width: 353px;

  > * {
    &:first-child {
      margin-inline-end: 12px;
    }
  }
`;
