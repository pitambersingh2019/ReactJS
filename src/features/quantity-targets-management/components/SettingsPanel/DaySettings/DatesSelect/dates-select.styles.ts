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
    font-family: "ProximaNova";
    border: none;
  }

  & .react-datepicker__header {
    background-color: ${(props) => props.theme.colors.white};
    border: none;
    padding: 24px 0px 0px;
  }

  & .react-datepicker__day-names {
    margin: 24px 0 0;
  }

  & .react-datepicker__day-name {
    color: ${(props) => props.theme.colors.gray3};
    display: inline-block;
    width: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    margin: 5px;
  }

  & .react-datepicker__day {
    color: #000;
    display: inline-block;
    width: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border-radius: 50%;
    margin: 5px;

    &:hover {
      background-color: #afafaf;
    }
  }

  & .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--highlighted,
  .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.colors.primaryBlue};
    color: ${(props) => props.theme.colors.white};
  }

  /* & .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.colors.primaryBlue};
    color: ${(props) => props.theme.colors.white};
  } */

  & .react-datepicker__day.react-datepicker__day--keyboard-selected {
    /* background: none;
    color: black; */
  }

  /* & .react-datepicker__day--highlighted {
    background-color: ${(props) => props.theme.colors.primaryBlue};
    color: ${(props) => props.theme.colors.white};
  } */
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  color: ${(props) => props.theme.colors.primaryBlue};
  cursor: pointer;
  text-transform: capitalize;
`;
