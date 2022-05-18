import styled from "styled-components";

export const TitleIcon = styled.img`
  height: 28px;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ModalContent = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;

  > * {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
