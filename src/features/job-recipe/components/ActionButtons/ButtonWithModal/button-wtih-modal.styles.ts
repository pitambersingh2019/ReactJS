import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  background-color: #692de4;
  border-radius: 4px;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 40px;
  position: relative;
`;

export const ArrowIcon = styled.img`
  height: 20px;
`;

export const Modal = styled.div`
  position: absolute;
  bottom: 32px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 0px;" : "right: 0px;")};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  padding: 12px 16px 0px;

  > * {
    &:first-child {
      color: ${(props) => props.theme.colors.purple};
      font-weight: 600;
    }
  }
`;

export const ModalItem = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  margin-bottom: 16px;
`;
