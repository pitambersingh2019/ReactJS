import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const DeleteIconContainer = styled.div`
  position: relative;
`;

export const StyledDeleteIcon = styled.img`
  height: 20px;
  width: 20px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleTooltipPosition = (isLastChild: boolean, isOnlyChild: boolean) => {
  if (isOnlyChild) {
    return css`
      top: -5px;
      ${(props) => (props.theme.dir === "rtl" ? `left: 105%;` : `right: 105%;`)}
    `;
  }
  if (isLastChild) {
    return css`
      top: -30px;
      ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
    `;
  }

  return css`
    top: 20px;
    ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
  `;
};

export const ModalContentWrapper = styled.div`
  position: relative;
`;

export const CloseIcon = styled.img`
  height: 13px;
  position: absolute;
  top: -18px;
  right: -12px;
  cursor: pointer;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const TitleIcon = styled.img`
  height: 28px;
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
  margin-top: 16px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};

  & .no-undo {
    margin-top: 24px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 88px;
`;
