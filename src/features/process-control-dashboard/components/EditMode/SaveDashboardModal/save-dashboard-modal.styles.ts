import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
`;

export const TitleIcon = styled.img`
  height: 30px;
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

export const ModalContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  padding-top: 8px;
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
