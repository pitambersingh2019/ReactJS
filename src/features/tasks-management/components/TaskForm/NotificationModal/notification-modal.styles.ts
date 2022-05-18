import styled from "styled-components";

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: center;
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

export const ModalContent = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 88px;

  > * {
    &:first-child {
      margin-inline-end: 8px;
    }
  }
`;
