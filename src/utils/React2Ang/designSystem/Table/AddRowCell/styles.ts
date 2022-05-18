import styled from "styled-components";
import IconCheckMark from "../SVG/SaveRowIcon";
import IconClose from "../SVG/CancelRowIcon";
export const CheckMarkStyled = styled(IconCheckMark)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const CloseIconStyled = styled(IconClose)`
  width: 24px;
  height: 24px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #1268fb;
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
