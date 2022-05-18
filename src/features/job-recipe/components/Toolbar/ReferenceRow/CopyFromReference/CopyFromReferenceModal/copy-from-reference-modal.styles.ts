import styled from "styled-components";

export const ModalTitleContainer = styled.div`
  display: flex;
  align-items: center;
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
  height: 28px;
`;

export const ModalContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  padding-top: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & > * {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
