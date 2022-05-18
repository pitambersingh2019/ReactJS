import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Arowdropdown from "../../../assets/icons/Arowdropdown.svg";
import checkIcon from "../../../assets/icons/checkmark-purple.svg";
import Calendar from "../../../assets/icons/Calendar.svg";

import {
  Header,
  HeaderDays,
  DayRowItemNumber,
  DayRowItem,
  DayRowItemNumberWrapper,
  IconStyled,
  ContainerDate,
  Container,
  BodyWrapper,
  Body,
  ArrowRightMonth,
  ArrowLeftMonth,
  ContainerInput,
  InputFieldStyled,
  TitleText,
  TitleDate,
  TitleReq,
  TodayWrapper,
  Todaytitle,
  ClockWrapper,
  ClockContainer,
  ClockSection,
  ArrowUpClock,
  ArrowDownClock,
  ClockTitle,
  Divider,
  TitleDateYearPickerContainer,
  ArrowDownYear,
  YearPickerContainer,
  YearItem,
  YearTitle,
  FooterOkButton,
  Okbutton,
  CheckMarkIconStyled,
} from "./styles";
import {
  DatePickerInterface,
  DayDetails,
  UIDateInterface,
  monthDetailsInterface,
  DateFormat,
  DateReturned,
  POSITION,
} from "./types";
import { ClickAwayListener } from "@material-ui/core";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
import { loadDatePickerLang } from "../../../AppStart";
import { PositioningPortal } from "@codastic/react-positioning-portal";

const oneDay = 60 * 60 * 24 * 1000;

const DatePicker: React.FC<DatePickerInterface> = (props) => {
  const [UIDate, setUIDate] = useState<UIDateInterface>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    monthDetailsRen: [],
  });
  const [isShow, setisShow] = useState<boolean>(false);
  const [selectedTimestamp, setselectedTimestamp] = useState<number>(
    new Date().getTime()
  );
  const [error, seterror] = useState<boolean>(false);
  const [animate, setanimate] = useState<string>("");
  const [YearPicker, setYearPicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const CalenderRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Placement, _] = useState<POSITION>(POSITION.BOTTOM);
  const [manualInputValue, setManualInputValue] = useState("");

  const onDateChange = props.onDateChange;
  const daysMap = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );

  const disabled = props.disabled ?? false;
  const required = props.required ?? false;
  const isSmall = props.isSmall ?? false;
  const isValid = props.isValid ?? true;
  const alignCalendarRight = props.alignCalendarRight ?? false;

  const { t } = useTranslation();

  const datePickerLang = JSON.parse(loadDatePickerLang());
  //get the Month String 0 => jan.. 1 => February...
  const getMonthStr = (month: number) =>
    moment(month + 1, "MM")
      .locale(datePickerLang || "en")
      .format("MMMM");

  const toggling = () => {
    if (!disabled) setisShow((prev) => !prev);
  };
  //returns a day details based on it's index and firstday of month
  const getDayDetails = useCallback(
    (args: DayDetails) => {
      const date = args.index - args.firstDay;
      const day = args.index % 7;
      let prevMonth = args.month - 1;
      let prevYear = args.year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
      const _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) +
        1;
      const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
      const timestamp = new Date(args.year, args.month, _date).getTime();
      return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: daysMap[day],
      };
    },
    [daysMap]
  );

  const getNumberOfDays = (year: number, month: number) => {
    return 40 - new Date(year, month, 40).getDate();
  };
  const getMonthDetails = useCallback(
    (year: number, month: number) => {
      const firstDay = new Date(year, month).getDay();
      const numberOfDays = getNumberOfDays(year, month);
      let monthArray: monthDetailsInterface[] = [];
      const monthArrayDetails: monthDetailsInterface[] = [];
      const rows = 6;
      let currentDay = null;
      let index = 0;
      const cols = 7;

      const mat: monthDetailsInterface[][] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          currentDay = getDayDetails({
            index,
            numberOfDays,
            firstDay,
            year,
            month,
          });
          monthArray.push(currentDay);
          if (!currentDay.month) monthArrayDetails.push(currentDay);
          index++;
        }
        mat.push(monthArray);
        monthArray = [];
      }

      return { monthArrayDetails: monthArrayDetails, mat: mat };
    },
    [getDayDetails]
  );

  //maybe will be used when there are year navigations
  // const setYear = (offset: number) => {
  //   if (offset > 0) setanimate("animate-left");
  //   else setanimate("animate-right");
  //   setUIDate((prev) => ({
  //     ...prev,
  //     year: prev.year + offset,
  //     monthDetails: getMonthDetails(prev.year + offset, prev.month)
  //       .monthArrayDetails,
  //     monthDetailsRen: getMonthDetails(prev.year + offset, prev.month).mat,
  //   }));
  // };

  const setMonth = (offset: number) => {
    if (UIDate) {
      if (offset > 0) setanimate("animate-left");
      else setanimate("animate-right");
      let year = UIDate.year;
      let month = UIDate.month + offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      setUIDate({
        year: year,
        month: month,
        monthDetailsRen: getMonthDetails(year, month).mat,
      });
    }
  };

  const getDateStringFromTimestamp = (timestamp: number) => {
    // let dateObject = new Date(timestamp);
    // let month = dateObject.getMonth() + 1;
    // let date = dateObject.getDate();
    // return (date < 10 ? '0' + date : date) + '/' + (month < 10 ? '0' + month : month) + '/' + dateObject.getFullYear();
    return moment(timestamp).format(DateFormat.DD_MM_YYYY_HH_MM);
  };

  // const determineDropUp = () => {
  //   if (!inputRef.current) return;

  //   const windowHeight = window.innerHeight;
  //   const instOffsetWithMenu =
  //     inputRef.current.getBoundingClientRect().bottom + 380;
  //   console.log(instOffsetWithMenu, "  ", windowHeight);
  //   if (instOffsetWithMenu >= windowHeight) {
  //     setPlacement(PlacementEnum.top);
  //   } else {
  //     setPlacement(PlacementEnum.bottom);
  //   }
  // };

  // useEffect(() => {
  //   if (isShow) {
  //     document.addEventListener("resize", determineDropUp);
  //     document.addEventListener("scroll", determineDropUp);
  //   }
  //   return () => {
  //     document.removeEventListener("resize", determineDropUp);
  //     document.removeEventListener("scroll", determineDropUp);
  //   };
  // }, [isShow]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction);
  //   if (CalenderRef.current) observer.observe(CalenderRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [CalenderRef]);

  const getDateFromDateString = (dateValue: string, format: string) => {
    const momentDate = moment(dateValue, format);
    if (!momentDate.isValid()) return false;

    const month = momentDate.get("month");
    const year = momentDate.get("year");
    const date = momentDate.get("date");
    const hour = momentDate.get("hour");
    const mins = momentDate.get("minute");
    return {
      dateString: dateValue,
      format: DateFormat.DD_MM_YY_HH_MM,
      month: month,
      year: year,
      date: date,
      hour: hour,
      minute: mins,
    };
    // const timestamp = new Date(year, month, date, hour, mins).getTime();
    // return { month, year, date, hour, mins, timestamp };
  };

  const handleDateClicked = (timestamp: number) => {
    if (selectedTimestamp) {
      const momentDate = moment(selectedTimestamp);
      const hour = momentDate.get("hour");
      const mins = momentDate.get("minute");
      timestamp = timestamp + 60 * 1000 * (60 * hour + mins);
    }

    // if (inputRef.current) {
    //   inputRef.current.value = getDateStringFromTimestamp(timestamp);
    // }
    setselectedTimestamp(timestamp);
    // SendSelectedDate(timestamp);
    // setisShow(false);
    seterror(false);
  };

  const setTodayHandle = () => {
    const dateObj = new Date();
    const momentDate = moment(dateObj);
    const month = momentDate.get("month");
    const year = momentDate.get("year");
    const date = momentDate.get("date");
    const timestamp = new Date(year, month, date).getTime();
    SendSelectedDate(timestamp);
    const monthDetails = getMonthDetails(year, month);
    setUIDate({
      month: month,
      year: year,
      monthDetailsRen: monthDetails.mat,
    });

    setselectedTimestamp(timestamp);
    if (inputRef.current) {
      inputRef.current.value = getDateStringFromTimestamp(timestamp);
    }
  };

  const SendSelectedDate = useCallback(
    (timestamp: number) => {
      const dateStringWithTime = moment(timestamp).format(
        DateFormat.DD_MM_YYYY_HH_MM
      );
      const DatefromString = getDateFromDateString(
        dateStringWithTime,
        DateFormat.DD_MM_YYYY_HH_MM
      );
      if (DatefromString) {
        const date: DateReturned = {
          dateString: dateStringWithTime,
          format: DateFormat.DD_MM_YYYY_HH_MM,
          month: DatefromString.month,
          year: DatefromString.year,
          date: DatefromString.date,
          hour: DatefromString.hour,
          minute: DatefromString.minute,
        };
        onDateChange(date);
      }
    },
    [onDateChange]
  );

  const ChangeClockByOffset = (timeOffset: number) => {
    // const prevTimestamp = selectedTimestamp;
    setselectedTimestamp((prev) => prev + timeOffset);
    // SendSelectedDate(prevTimestamp + timeOffset);

    // if (inputRef.current) {
    //   inputRef.current.value = getDateStringFromTimestamp(
    //     prevTimestamp + timeOffset
    //   );
    // }
  };

  const setCalenderToCurrentMonthYear = useCallback(() => {
    if (inputRef.current) {
      const date = new Date();
      inputRef.current.value = DateFormat.DD_MM_YYYY_HH_MM;

      setUIDate({
        month: date.getMonth(),
        year: date.getFullYear(),
        monthDetailsRen: getMonthDetails(date.getFullYear(), date.getMonth())
          .mat,
      });
    }
  }, [getMonthDetails]);

  const YearClicked = (year: number) => {
    setYearPicker(false);
    setUIDate((prev) => ({
      ...prev,
      year: year,
      monthDetails: getMonthDetails(year, prev.month).monthArrayDetails,
      monthDetailsRen: getMonthDetails(year, prev.month).mat,
    }));
  };

  useEffect(() => {
    if (props.selected) {
      setManualInputValue(props.selected.inputString);
      const TYPEFORMAT = props.selected.format;
      const dateFromInput = getDateFromDateString(
        props.selected.inputString,
        TYPEFORMAT
      );
      if (dateFromInput) {
        setUIDate({
          month: dateFromInput.month,
          year: dateFromInput.year,
          monthDetailsRen: getMonthDetails(
            dateFromInput.year,
            dateFromInput.month
          ).mat,
        });
        const timestamp = new Date(
          dateFromInput.year,
          dateFromInput.month,
          dateFromInput.date,
          dateFromInput.hour,
          dateFromInput.minute
        ).getTime();
        setselectedTimestamp(timestamp);
        // SendSelectedDate(timestamp);
        // props.onDateChange(dateFromInput);
        // setManualInputValue(getDateStringFromTimestamp(timestamp));
        seterror(false);
      } else {
        setCalenderToCurrentMonthYear();

        // seterror(true);
        // setManualInputValue(props.selected.inputString);
      }
    } else {
      setCalenderToCurrentMonthYear();
      setselectedTimestamp(0);
      setManualInputValue("");
    }
  }, [getMonthDetails, props.selected, setCalenderToCurrentMonthYear, isShow]);

  //for validations in form!
  // useEffect(() => {
  //   if (inputRef.current) {
  //     if (error) {
  //       inputRef.current.setCustomValidity("Please check the Date");
  //     } else {
  //       inputRef.current.setCustomValidity("");
  //     }
  //   }
  // }, [error]);

  const getDate = (dateString: string) => {
    const isValidInput = /^[0-9/: ]*$/.test(dateString);

    //check that input completed -> date and time are entered
    if (!isValidInput) {
      return false;
    }

    const momentDate = moment(dateString, DateFormat.DD_MM_YY_HH_MM);
    if (!momentDate.isValid()) {
      if (required) seterror(true);
      return false;
    }

    const month = momentDate.get("month");
    const year = momentDate.get("year");
    const date = momentDate.get("date");
    const hour = momentDate.get("hour");
    const mins = momentDate.get("minute");
    const timestamp = new Date(year, month, date, hour, mins).getTime();
    return { month, year, date, hour, mins, timestamp };
  };

  const onManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setManualInputValue(inputValue);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dateFromInput = getDate(inputValue);

    if (dateFromInput) {
      const monthDetails = getMonthDetails(
        dateFromInput.year,
        dateFromInput.month
      );
      setUIDate({
        month: dateFromInput.month,
        year: dateFromInput.year,
        monthDetailsRen: monthDetails.mat,
      });

      setselectedTimestamp(dateFromInput.timestamp);
      SendSelectedDate(dateFromInput.timestamp);
      seterror(false);
    } else {
      props.onDateChange(inputValue);
    }
  };

  const positionStrategy = useCallback(
    (preferredPosition: POSITION) => (parentRect: any, portalRect: any) => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const body = window.document.documentElement || window.document.body;

      const horizontalCenter = (parentRect.width - portalRect.width) / 2;
      const additionalPadding = 0;

      const positions = {
        [POSITION.BOTTOM]: {
          position: POSITION.BOTTOM,
          top: parentRect.top + parentRect.height + scrollY + additionalPadding,
          left: parentRect.left + scrollX + horizontalCenter,
          enoughSpace:
            parentRect.top +
              parentRect.height +
              portalRect.height +
              additionalPadding <
            body.clientHeight,
        },
        [POSITION.TOP]: {
          position: POSITION.TOP,
          top: parentRect.top - portalRect.height + scrollY - additionalPadding,
          left: parentRect.left + scrollX + horizontalCenter,
          enoughSpace:
            parentRect.top - portalRect.height - additionalPadding > 0,
        },
      };

      // Horizontal fallback preferred
      let sortedPositions = [
        positions[preferredPosition],
        positions[POSITION.BOTTOM],
        positions[POSITION.TOP],
      ];

      const pickedPosition =
        sortedPositions.find(({ enoughSpace }) => enoughSpace) ||
        positions[preferredPosition];

      const finalTop = Math.max(
        Math.min(
          pickedPosition.top,
          body.clientHeight + scrollY - portalRect.height
        ),
        scrollY
      );
      const shiftY = Math.max(
        Math.min(
          finalTop - pickedPosition.top,
          portalRect.height / 2 - additionalPadding
        ),
        portalRect.height / -2 + additionalPadding
      );

      const finalLeft = Math.max(
        Math.min(
          pickedPosition.left,
          body.clientWidth + scrollX - portalRect.width
        ),
        scrollX
      );
      const shiftX = Math.max(
        Math.min(
          finalLeft - pickedPosition.left,
          portalRect.width / 2 - additionalPadding
        ),
        portalRect.width / -2 + additionalPadding
      );

      const demensions = {
        top: Math.max(
          Math.min(
            pickedPosition.top,
            body.clientHeight + scrollY - portalRect.height
          ),
          scrollY
        ),
        left: Math.max(
          Math.min(
            pickedPosition.left,
            body.clientWidth + scrollX - portalRect.width
          ),
          scrollX
        ),
        strategy: {
          position: pickedPosition.position,
          shift:
            pickedPosition.position === "top" ||
            pickedPosition.position === "bottom"
              ? shiftX
              : shiftY,
        },
      };
      // setStrategy(demensions.strategy.position);
      return demensions;
    },
    []
  );

  const handleButtonOkClick = () => {
    if (inputRef.current) {
      inputRef.current.value = getDateStringFromTimestamp(selectedTimestamp);
    }
    SendSelectedDate(selectedTimestamp);
    setisShow(false);
    seterror(false);
  };

  return (
    <Container>
      <TitleText disabled={disabled}>{props.Title}</TitleText>
      <PositioningPortal
        positionStrategy={positionStrategy(POSITION.BOTTOM)}
        isOpen={isShow}
        portalElement={
          <div style={{ position: "absolute", zIndex: 9999999 }} />
        }
        onShouldClose={() => setisShow(false)}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        portalContent={({ relatedWidth, strategy }) => (
          <div style={{ width: `${relatedWidth}px` }}>
            <ContainerDate
              ref={CalenderRef}
              alignCalendarRight={alignCalendarRight}
              Placement={strategy ? strategy.position : POSITION.BOTTOM}
            >
              <Header>
                {/* <ArrowLeftYear onClick={() => setYear(-1)} /> */}
                <ArrowLeftMonth
                  src={Arowdropdown}
                  onClick={() => setMonth(-1)}
                />
                {UIDate && (
                  <TitleDateYearPickerContainer>
                    <TitleDate>
                      {getMonthStr(UIDate.month)} {UIDate.year}
                    </TitleDate>
                    <ArrowDownYear
                      src={Arowdropdown}
                      onClick={() => setYearPicker((prev) => !prev)}
                    />

                    {YearPicker && (
                      <ClickAwayListener
                        onClickAway={() => setYearPicker(false)}
                      >
                        <YearPickerContainer>
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <YearItem
                              key={index}
                              onClick={() =>
                                YearClicked(new Date().getFullYear() + index)
                              }
                            >
                              <YearTitle>
                                {new Date().getFullYear() + index}
                              </YearTitle>
                            </YearItem>
                          ))}
                        </YearPickerContainer>
                      </ClickAwayListener>
                    )}
                  </TitleDateYearPickerContainer>
                )}
                <ArrowRightMonth
                  src={Arowdropdown}
                  onClick={() => setMonth(1)}
                />
                {/* <ArrowRightYear onClick={() => setYear(1)} /> */}
              </Header>
              <HeaderDays>
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <DayRowItemNumberWrapper key={i}>
                    <DayRowItem>{d}</DayRowItem>
                  </DayRowItemNumberWrapper>
                ))}
              </HeaderDays>
              <BodyWrapper
                className={animate}
                onAnimationEnd={() => setanimate("")}
              >
                {UIDate &&
                  UIDate.monthDetailsRen.map((row, i) => (
                    <Body key={i}>
                      {row.map((elem, index) => (
                        <DayRowItemNumberWrapper key={index}>
                          {!elem.month && (
                            <DayRowItemNumber
                              selected={
                                selectedTimestamp >= elem.timestamp &&
                                selectedTimestamp < elem.timestamp + oneDay
                              }
                              onClick={() => handleDateClicked(elem.timestamp)}
                            >
                              {elem.date}
                            </DayRowItemNumber>
                          )}
                        </DayRowItemNumberWrapper>
                      ))}
                    </Body>
                  ))}
              </BodyWrapper>
              <TodayWrapper>
                <Todaytitle onClick={setTodayHandle}>
                  {t(translations.RulesContainer.CARD.TODAY)}
                </Todaytitle>
              </TodayWrapper>
              <Divider />
              <ClockWrapper>
                <ClockContainer>
                  <ClockSection>
                    <ArrowUpClock
                      src={Arowdropdown}
                      onClick={() => ChangeClockByOffset(60 * 60 * 1000)}
                    />
                    <ArrowUpClock
                      src={Arowdropdown}
                      onClick={() => ChangeClockByOffset(60 * 1000)}
                    />
                  </ClockSection>
                  <ClockSection>
                    <ClockTitle>
                      {moment(selectedTimestamp).format("HH") ?? "-"}
                    </ClockTitle>
                    <ClockTitle>:</ClockTitle>
                    <ClockTitle>
                      {moment(selectedTimestamp).format("mm") ?? "-"}
                    </ClockTitle>
                  </ClockSection>
                  <ClockSection>
                    <ArrowDownClock
                      src={Arowdropdown}
                      onClick={() => ChangeClockByOffset(-60 * 60 * 1000)}
                    />
                    <ArrowDownClock
                      src={Arowdropdown}
                      onClick={() => ChangeClockByOffset(-60 * 1000)}
                    />
                  </ClockSection>
                </ClockContainer>
              </ClockWrapper>
              <FooterOkButton onClick={handleButtonOkClick}>
                <CheckMarkIconStyled src={checkIcon} />
                <Okbutton>OK</Okbutton>
              </FooterOkButton>
            </ContainerDate>
          </div>
        )}
      >
        <ContainerInput
          disabled={disabled}
          error={error || !isValid}
          isSmall={isSmall}
        >
          <InputFieldStyled
            format="##/##/## ##:##"
            placeholder={t(translations.TasksManagement.DateTimePlaceholder)}
            mask={["d", "d", "m", "m", "y", "y", "o", "o", "o", "o"]}
            onChange={onManualInputChange}
            value={manualInputValue}
            disabled={disabled}
            // @ts-ignore
            ref={inputRef}
            issmall={isSmall.toString()}
          />
          {/* {style={{ color: '#404d61', cursor: 'pointer' }}} */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              position: "relative",
            }}
          >
            {!disabled && (
              <IconStyled
                disabled={disabled}
                src={Calendar}
                onClick={toggling}
              />
            )}
          </div>
        </ContainerInput>
      </PositioningPortal>

      {required && <TitleReq>* Required</TitleReq>}
    </Container>
  );
};

export default DatePicker;
