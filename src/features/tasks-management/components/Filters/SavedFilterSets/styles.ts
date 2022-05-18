import styled, { css } from "styled-components";

export const Container = styled.div`
  margin-bottom: 25px;
`;

export const DeleteIconContainer = styled.div`
  position: relative;
`;

export const StyledDeleteIcon = styled.img`
  height: 20px;
  width: 20px;
`;

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

export const StyledDeleteTooltip = styled.div<{
  isLastChild: boolean;
  isOnlyChild: boolean;
}>`
  width: fit-content;
  height: 32px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${(props) => props.theme.colors.lightGray4};
  position: absolute;
  z-index: 100;
  ${(props) => handleTooltipPosition(props.isLastChild, props.isOnlyChild)}
  padding: 8px;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
`;

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
