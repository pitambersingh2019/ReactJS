import styled from "styled-components";

export const ActionButtonsContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;

  &::after {
    flex: 1;
    content: "";
  }
`;

export const SideContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const RequiredContainer = styled.div`
  display: flex;
`;

export const Star = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-end: 4px;
`;

export const Required = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonsContainer = styled.div`
  display: flex;

  & > * {
    &:first-child {
      margin-inline-end: 24px;
    }
  }
`;
