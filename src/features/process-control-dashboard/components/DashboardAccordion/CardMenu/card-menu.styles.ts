import styled from "styled-components";

export const CardMenuContainer = styled.div`
  position: relative;
  margin-inline-start: auto;
`;

export const MenuIcon = styled.img`
  height: 20px;
  padding-inline-start: 25px;
`;

export const CardMenuModalContainer = styled.div`
  position: absolute;
  right: 14px;
  top: 5px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray3}`};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  white-space: nowrap;
  min-width: 104px;

  > * {
    &:not(:last-child) {
      border-bottom: ${(props) =>
        `solid 0.5px ${props.theme.colors.lightGray3}`};
    }
  }
`;

export const ActionIcon = styled.img`
  height: 16px;
`;

export const ModalItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
  padding-inline-start: 8px;
`;

export const ItemLabel = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray4};
  margin-inline-start: 8px;
`;
