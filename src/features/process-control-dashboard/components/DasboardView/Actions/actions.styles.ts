import styled from "styled-components";

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 16px;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VerticalDivider = styled.div`
  border-right: 1px solid #e3e3e3;
  height: 16px;
  margin-inline-end: 4px;
  margin-top: 2px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
`;

export const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.lightGray4};
  height: 40px;
  align-items: center;
  padding-inline-start: 16px;
  padding-inline-end: 16px;
`;

export const DisplayOptionsContainer = styled.div`
  display: flex;
  align-items: center;

  & > {
    &:first-child {
      margin-inline-end: 32px;
    }
  }
`;
