import styled, { keyframes, css, DefaultTheme } from "styled-components";

import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import NumberFormat from "react-number-format";
// @ts-ignore
import rtl from "styled-components-rtl";
import { POSITION } from "./types";
export const ArrowDownYear = styled.img`
  height: 16px;
  width: 16px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const ArrowRightYear = styled(DoubleArrowIcon)`
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;
export const ArrowLeftYear = styled(DoubleArrowIcon)`
  transform: rotate(180deg);
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const ArrowRightMonth = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(-90deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const ArrowLeftMonth = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(90deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const ArrowUpClock = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(180deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const Divider = styled.div`
  width: 100%;
  opacity: 0.3;
  background-color: #c5c9cf;
  height: 1px;
  margin-bottom: 16px;
`;
export const ArrowDownClock = styled.img`
  height: 16px;
  width: 16px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #5900d3;
  }
`;

export const ClockTitle = styled.div`
  width: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;

const HandleBorderColor = (disabled: boolean, error: boolean) => {
  if (disabled) {
    return `solid 1px #e4e7eb`;
  } else if (error) {
    return "solid 1px #c73431";
  } else {
    return "solid 1px #6c7481";
  }
};

const handleBorderColor_Hover = (disabled: boolean, error: boolean) => {
  if (disabled) {
    return `solid 1px #e4e7eb`;
  } else if (error) {
    return "solid 1px #c73431";
  } else {
    return "solid 1px #5900d3 ";
  }
};

export const ContainerInput = styled.div<{
  error: boolean;
  disabled: boolean;
  isSmall: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 360px; */
  height: 40px;
  padding: ${(props) => (props.isSmall ? "12px 8px" : "12px 16px")};
  border-radius: 4px;

  border: ${(props) => HandleBorderColor(props.disabled, props.error)};
  background-color: #ffffff;

  &:hover,
  &:focus-within {
    border: ${(props) => handleBorderColor_Hover(props.disabled, props.error)};
  }
`;

const HandleInputColor = (disabled: boolean) => {
  if (disabled) {
    return "#b9bec6";
  } else {
    return "#050709";
  }
};

export const TitleText = styled.div<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `}

  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;

  -webkit-box-orient: vertical;
  color: "#404d61";
`;
export const InputFieldStyled = styled(NumberFormat)<{
  disabled: boolean;
  issmall: string;
}>`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  direction: ltr;
  ${rtl`
      text-align: left;
  `}
  background-color: #ffffff;
  color: ${(p) => HandleInputColor(p.disabled)};

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  }
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6c7481;
    font-size: ${(props) => (props.issmall === "true" ? "14px" : "inherit")};
  }
`;

export const TitleReq = styled.div`
  ${rtl`
        margin: 4px 0 0 16px;
        text-align: left;
  `}

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;

  color: #6c7481;
`;

export const StyledIconDate = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const zoom = keyframes`
from {
transform: scale(0.5);
}
to {
transform: scale(1);
}

`;
export const slideright = keyframes`
from {
transform: translateX(-100%);
}
to {
transform: translateX(0%);
}
`;
export const slideleft = keyframes`
from {
transform: translateX(100%);
}
to {
transform: translateX(0%);
}
`;

export const YearPickerContainer = styled.div`
  width: 70px;
  padding: 0 0;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #404d61;
  background-color: #ffffff;
  position: absolute;
  top: 20px;
  right: 0;
  animation: ${zoom} 0.2s;
  z-index: 2;
`;

export const YearItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #5900d3;
  }
`;

export const YearTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
  `}
  color: #101010;
`;

const getCalendarPosition = (
  dir: DefaultTheme["dir"],
  alignCalendarRight: boolean
) => {
  if (alignCalendarRight) {
    return dir === "rtl" ? `right: 0px;` : `left: 0px;`;
  }

  return dir === "rtl"
    ? css`
        left: -16px;
      `
    : css`
        right: -16px;
      `;
};

export const ContainerDate = styled.div<{
  Placement: POSITION;
  alignCalendarRight: boolean;
}>`
  /* padding: 25px 16px 22px 15px; */
  width: 288px;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eeeff1;
  background-color: #ffffff;
  z-index: 2;
  ${(props) => getCalendarPosition(props.theme.dir, props.alignCalendarRight)}
  float: ${(p) => (p.theme.dir === "rtl" ? `left` : `right`)};
  animation: ${zoom} 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .animate-right {
    animation: ${slideright} 0.2s;
  }

  .animate-left {
    animation: ${slideleft} 0.2s;
  }
`;

export const TitleDate = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #404d61;
  width: 120px;
`;
export const Header = styled.div`
  position: relative;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  gap: 8px;
`;

export const ClockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: center;
  width: 25%;
`;

export const ClockSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderDays = styled.div`
  position: relative;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 20px;
`;

export const Body = styled.div`
  position: relative;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
`;

export const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DayRowItem = styled.div`
  position: relative;
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  font-weight: 700;
  color: #666;
  font-size: 13px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DayRowItemNumber = styled.div<{ selected: boolean }>`
  font-weight: 700;
  color: #666;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 28px;
  height: 28px;
  &:hover {
    background-color: #afafaf;
  }
  background-color: ${(p) => (p.selected ? "#5900d3" : "#ffffff")};
  border-radius: 50%;
  color: ${(p) => (p.selected ? "#ffffff" : "#050709")};
`;
export const DayRowItemNumberWrapper = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
export const TodayWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const TitleDateYearPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: nowrap;
  position: relative;
`;

export const Todaytitle = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
  `}
  color: #5900d3;
  cursor: pointer;
  margin-bottom: 16px;
`;

export const IconStyled = styled.img<{ disabled: boolean }>`
  width: 20px;
  height: 20px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export const FooterOkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 16px;
  cursor: pointer;
`;
export const Okbutton = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #5900d3;
  margin-inline-start: 4px;
  cursor: pointer;
`;
export const CheckMarkIconStyled = styled.img`
  height: 20px;
`;
