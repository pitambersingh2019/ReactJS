import { ClickAwayListener } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { loadDatePickerLang } from "../../../../../AppStart";
import { translations } from "../../../../../locales/translations";
import {
  ArrowDownClock,
  ArrowDownYear,
  ArrowLeftMonth,
  ArrowRightMonth,
  ArrowUpClock,
  CheckIcon,
  ClockContainer,
  ClockSection,
  ClockTitle,
  ClockWrapper,
  Divider,
  HeaderContainer,
  Label,
  MonthYearContainer,
  OkButtonContainer,
  Row,
  TimeTitle,
  Title,
  TitleDate,
  TodayTitle,
  TodayWrapper,
  Visibile,
  Wrapper,
  YearItem,
  YearPickerContainer,
  YearTitle,
} from "./date-time-picker.styles";
import arrowIcon from "../../../../../assets/icons/Arowdropdown.svg";
import checkIcon from "../../../../../assets/icons/checkmark-purple.svg";

type DateTimePickerProps = {
  onClose: () => void;
  onChange: (date: Date) => void;
  initDate?: Date;
};

export default function DateTimePicker({
  onClose,
  onChange,
  initDate,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const onDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onTodayClick = () => {
    setSelectedDate(new Date());
  };

  const onSelect = () => {
    selectedDate && onChange(selectedDate);
    onClose();
  };

  useEffect(() => {
    if (initDate && moment(initDate).isValid()) {
      setSelectedDate(initDate);
    }
  }, [initDate]);

  return (
    <Wrapper>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        inline
        renderCustomHeader={(params: ReactDatePickerCustomHeaderProps) => (
          <Header params={params} />
        )}
        formatWeekDay={(nameOfDay) => nameOfDay.charAt(0)}
        onClickOutside={onClose}
      >
        <TodayButton onTodayClick={onTodayClick} />
        <Divider />
        <TimePicker onChange={onChange} curDate={selectedDate} />
        <OkButton onClick={onSelect} />
      </DatePicker>
    </Wrapper>
  );
}

type HeaderProps = {
  params: ReactDatePickerCustomHeaderProps;
  headerTitle?: string;
};

function Header({ params, headerTitle }: HeaderProps) {
  const { date, decreaseMonth, changeYear, increaseMonth } = params;

  const [showYearPicker, setShowYearPicker] = useState(false);

  const datePickerLang = JSON.parse(loadDatePickerLang());
  // const datePickerLang = "en";

  const getMonthStr = (date: Date) => {
    const month = moment(date).month();
    return moment(month + 1, "MM")
      .locale(datePickerLang || "en")
      .format("MMMM");
  };

  const onYearClick = (index: number) => {
    setShowYearPicker(false);
    changeYear(new Date().getFullYear() - index);
  };

  return (
    <HeaderContainer>
      {headerTitle && <Title>{headerTitle}</Title>}
      <Row>
        <ArrowLeftMonth src={arrowIcon} onClick={decreaseMonth} />
        <MonthYearContainer>
          <TitleDate>
            {getMonthStr(date)} {date.getFullYear()}
          </TitleDate>
          <ArrowDownYear
            src={arrowIcon}
            onClick={() => setShowYearPicker((prev) => !prev)}
          />
          {showYearPicker && (
            <ClickAwayListener onClickAway={() => setShowYearPicker(false)}>
              <YearPickerContainer>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <YearItem key={index}>
                    <YearTitle onClick={() => onYearClick(5 - index)}>
                      {new Date().getFullYear() - (5 - index)}
                    </YearTitle>
                  </YearItem>
                ))}
              </YearPickerContainer>
            </ClickAwayListener>
          )}
        </MonthYearContainer>
        <ArrowRightMonth src={arrowIcon} onClick={increaseMonth} />
      </Row>
    </HeaderContainer>
  );
}

function TodayButton({ onTodayClick }: { onTodayClick: () => void }) {
  const { t } = useTranslation();
  return (
    <TodayWrapper>
      <TodayTitle onClick={onTodayClick}>
        {t(translations.RulesContainer.CARD.TODAY)}
      </TodayTitle>
    </TodayWrapper>
  );
}

type TimePickerProps = {
  curDate: Date | null;
  onChange: (date: Date) => void;
  timeTitle?: string;
};

function TimePicker({ curDate, onChange, timeTitle }: TimePickerProps) {
  const changeTime = ({
    offset,
    date,
  }: {
    offset: number;
    date: Date | null;
  }) => {
    if (!date) return;
    const timestamp = date.getTime();
    const updatedDate = new Date(timestamp + offset);
    onChange(updatedDate);
  };

  return (
    <ClockWrapper>
      <TimePickerItem
        date={curDate}
        changeClockByOffset={(offset) => changeTime({ offset, date: curDate })}
        title={timeTitle}
      />
    </ClockWrapper>
  );
}

type TimePickerItemProps = {
  changeClockByOffset: (time: number) => void;
  date: Date | null;
  title?: string;
};

function TimePickerItem({
  changeClockByOffset,
  date,
  title,
}: TimePickerItemProps) {
  const selectedTimestamp = date?.getTime();
  return (
    <ClockContainer>
      <TimeTitle>{title}</TimeTitle>
      <ClockSection>
        <ArrowUpClock
          src={arrowIcon}
          onClick={() => changeClockByOffset(60 * 60 * 1000)}
        />
        <ArrowUpClock
          src={arrowIcon}
          onClick={() => changeClockByOffset(60 * 1000)}
        />
      </ClockSection>
      <ClockSection>
        <ClockTitle>{moment(selectedTimestamp).format("HH") ?? "-"}</ClockTitle>
        <ClockTitle>:</ClockTitle>
        <ClockTitle>{moment(selectedTimestamp).format("mm") ?? "-"}</ClockTitle>
      </ClockSection>
      <ClockSection>
        <ArrowDownClock
          src={arrowIcon}
          onClick={() => changeClockByOffset(-60 * 60 * 1000)}
        />
        <ArrowDownClock
          src={arrowIcon}
          onClick={() => changeClockByOffset(-60 * 1000)}
        />
      </ClockSection>
    </ClockContainer>
  );
}

function OkButton({ onClick }: { onClick: () => void }) {
  const visibleRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  return (
    <>
      <OkButtonContainer onClick={onClick}>
        <CheckIcon src={checkIcon} alt="Check icon" />
        <Label>{t(translations.ProcessControlDashboard.OK)}</Label>
      </OkButtonContainer>
      <Visibile ref={visibleRef} />
    </>
  );
}
