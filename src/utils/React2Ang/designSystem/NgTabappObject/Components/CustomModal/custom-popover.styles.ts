import { CSSProperties } from "react";
import styled, { css } from "styled-components";

export const OverlayStyles = styled.div`
  background-color: rgba(16, 16, 16, 0.7);
  position: fixed;
  inset: 0px;
  z-index: 11000;
`;

const BaseModalStyles = css`
  position: absolute;
  inset: 50% auto auto 50%;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  background: ${(props) => props.theme.colors.white};
  outline: none;
`;

export const ModalStyles = styled.div<{
  customStyles: {
    width: CSSProperties["width"];
    height: CSSProperties["height"];
    padding: CSSProperties["padding"];
  };
  withBorder?: boolean;
}>`
  width: ${(props) => props.customStyles.width};
  min-height: ${(props) => props.customStyles.height};
  padding: ${(props) => props.customStyles.padding};
  border: ${(props) => (props.withBorder ? "solid 1px #f3f3f4" : "none")};
  ${BaseModalStyles}
`;
