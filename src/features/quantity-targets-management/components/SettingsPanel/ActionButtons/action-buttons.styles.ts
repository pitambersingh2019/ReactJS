import styled from "styled-components";

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.04);
  padding: 9px 0 16px;
`;

export const InfoText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #7aa5ef;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 12px;

  & > * {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
