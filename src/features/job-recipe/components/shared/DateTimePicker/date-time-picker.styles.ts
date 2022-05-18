import styled, { keyframes } from "styled-components";

const zoom = keyframes`
from {
transform: scale(0.5);
}
to {
transform: scale(1);
}`;

export const Wrapper = styled.div`
  & .react-datepicker {
    background-color: ${(props) => props.theme.colors.white};
    position: absolute;
    z-index: 2;
    ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
    top: -200px;
    font-family: "ProximaNova";
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #eeeff1;
    width: 325px;
  }

  & .react-datepicker__header {
    background-color: ${(props) => props.theme.colors.white};
    border: none;
    padding: 16px 0px 0px;
  }

  & .react-datepicker__day-names {
    margin: 24px 0 0;
  }

  & .react-datepicker__day-name {
    color: ${(props) => props.theme.colors.gray3};
    display: inline-block;
    width: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0.166rem;
    font-size: 13px;
  }

  & .react-datepicker__day {
    color: #000;
    display: inline-block;
    width: 28px;
    line-height: 28px;
    text-align: center;
    margin: 0.166rem;
    cursor: pointer;
    font-size: 14px;
    border-radius: 50%;
    margin: 6px 8px;

    &:hover {
      background-color: #afafaf;
    }
  }

  & .react-datepicker__day--in-range {
    background-color: #ebf7ff;
  }

  & .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${(props) => props.theme.colors.primaryBlue};
    color: ${(props) => props.theme.colors.white};
  }

  & .react-datepicker__day--in-selecting-range {
    background-color: #ebf7ff;
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: ${(props) => props.theme.colors.primaryBlue};
    color: ${(props) => props.theme.colors.white};
  }

  & .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.colors.purple};
    color: ${(props) => props.theme.colors.white};
  }

  & .react-datepicker__day.react-datepicker__day--keyboard-selected {
    background: none;
    color: black;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 32px;
`;

export const Row = styled.div`
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 28px;
`;

export const ArrowLeftMonth = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(90deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: #1268fb;
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

export const MonthYearContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: nowrap;
  position: relative;
`;

export const ArrowDownYear = styled.img`
  height: 16px;
  width: 16px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #1268fb;
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
    background-color: ${(props) => props.theme.colors.primaryBlue};
  }
`;

export const YearTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${(props) => props.theme.dir === "rtl" && "text-align: left;"}
  color: ${(props) => props.theme.colors.black};
`;

export const ArrowRightMonth = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(-90deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primaryBlue};
  }
`;

export const HeaderDays = styled.div`
  position: relative;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
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

export const DayRowItem = styled.div`
  position: relative;
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  color: #666;
  font-size: 13px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TodayWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 18px 0 16px;
  padding-inline-end: 20px;
`;

export const TodayTitle = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${(props) => props.theme.dir === "rtl" && "text-align: left;"}
  color: ${(props) => props.theme.colors.purple};
  cursor: pointer;
  text-transform: capitalize;
`;

export const Divider = styled.div`
  width: 100%;
  opacity: 0.3;
  background-color: #c5c9cf;
  height: 1px;
  margin-bottom: 16px;
`;

export const ClockWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: center;
  width: 20%;
`;

export const ClockSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ArrowUpClock = styled.img`
  height: 16px;
  width: 16px;
  transform: rotate(180deg);
  color: black;
  cursor: pointer;
  &:hover {
    color: #1268fb;
  }
`;

export const ClockTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ArrowDownClock = styled.img`
  height: 16px;
  width: 16px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #1268fb;
  }
`;

export const TimeTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};
`;

export const OkButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const CheckIcon = styled.img`
  height: 20px;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.purple};
  margin-inline-start: 4px;
`;

export const Visibile = styled.div`
  height: 20px;
  width: 20px;
  position: absolute;
  top: 580px;
  z-index: 10;
`;
