import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const IconContainer = styled.div`
  height: 24px;
  width: 24px;
  border: solid 1px #06388e;
  border-radius: 50%;
  padding: 2px;
`;

export const TitleIcon = styled.img``;

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
  justify-content: space-between;
  margin-top: 26px;
`;
