import styled, { css } from "styled-components";

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #101010;
  margin-inline-start: 7px;
`;

export const TitleIcon = styled.img`
  height: 22px;
`;

const BaseContent = css`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #101010;
`;

export const ModalContent = styled.div`
  ${BaseContent}
  padding: 16px 0 43px;
`;

const BaseButtonContainer = css`
  display: flex;
`;

export const ButtonContainer = styled.div`
  margin-top: 43px;
  ${BaseButtonContainer}
  gap: 5px;
`;

export const WarningIcon = styled.img`
  height: 30px;
`;

export const NotifyModalContent = styled.div`
  ${BaseContent}
  margin-top: 16px;
  padding-left: 4px;
  justify-content: left;
  & .filter-name {
    font-weight: 600;
  }
`;

export const NotifyModalInfo = styled.div`
  ${BaseContent}
  margin-top: 24px;
  padding-left: 4px;
  justify-content: left;
`;

export const NotifyModalButtonsContainer = styled.div`
  ${BaseButtonContainer}
  gap: 16px;
  margin-top: 88px;
`;

export const LimitText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: #8787d1;
`;
