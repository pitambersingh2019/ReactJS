import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  width: max-content;
  cursor: pointer;
`;
const TooltipBox = styled.div<{ width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  width: ${(props) => props.width}px;
  z-index: 2;
  padding: 10px;
  position: absolute;
  top: -40px;
  border-radius: 4px;
  height: 30px;
  transition: visibility 0s;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  &:before {
    content: "";
    width: 0;
    height: 0;
    left: 100px;
    top: 0px;
    position: absolute;
    border: 10px solid transparent;
    transform: rotate(135deg);
    background-color: red;
    transition: border 0.4s ease-in-out;
  }
`;
// const TooltipCard = styled.div`

//    & ${TooltipContainer}:hover{
//      ${TooltipBox} {
//          visibility: visible;
//          color: #fff;
//          background-color: rgba(0, 0, 0, 0.8);
//       }
//    }
// `;
const TooltipCard = styled.div`
  position: relative;
  & ${TooltipContainer}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

interface ToolTipInterface {
  Text: string;
  width: number;
}
const ToolTip: React.FC<ToolTipInterface> = (props) => {
  return (
    <TooltipCard>
      <TooltipContainer>{props.children}</TooltipContainer>
      <TooltipBox width={props.width}>{props.Text}</TooltipBox>
    </TooltipCard>
  );
};
export default ToolTip;
