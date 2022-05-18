import { useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../../../../../assets/icons/Arowdropdown.svg";
import moment from "moment";
import { ClickAwayListener } from "@mui/material";
import {
  ArrowDownYear,
  ArrowLeftMonth,
  ArrowRightMonth,
  HeaderContainer,
  MonthYearContainer,
  Row,
  TitleDate,
  TodayTitle,
  TodayWrapper,
  Wrapper,
  YearItem,
  YearPickerContainer,
  YearTitle,
} from "./dates-select.styles";
import { loadDatePickerLang } from "../../../../../../AppStart";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateSelectedDates } from "../../../../redux/quantityTargetsManagementSlice";

export default function DatesSelect() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);

  const dispatch = useAppDispatch();
  const selectedDateStrings = useAppSelector(
    (state) => state.qtm.selectedDates
  );

  const onChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const selectedIndex = selectedDateStrings.indexOf(formattedDate);

      if (selectedIndex === -1) {
        setSelectedDates((prev) => [...prev, selectedDate]);
        dispatch(updateSelectedDates([...selectedDateStrings, formattedDate]));
      } else {
        const selectedDatesCopy = [...selectedDates];
        selectedDatesCopy.splice(selectedIndex, 1);
        setSelectedDates(selectedDatesCopy);

        const selectedDateStringsCopy = [...selectedDateStrings];
        selectedDateStringsCopy.splice(selectedIndex, 1);
        dispatch(updateSelectedDates(selectedDateStringsCopy));
      }
    }
  };

  const onTodayClick = () => {
    onChange(new Date());
  };

  return (
    <Wrapper>
      <DatePicker
        onChange={onChange}
        inline
        renderCustomHeader={(params: ReactDatePickerCustomHeaderProps) => (
          <Header params={params} />
        )}
        disabledKeyboardNavigation //with this prop unselect date works properly
        formatWeekDay={(nameOfDay) => nameOfDay.charAt(0)}
        highlightDates={selectedDates}
      >
        <TodayButton onTodayClick={onTodayClick} />
      </DatePicker>
    </Wrapper>
  );
}

type HeaderProps = {
  params: ReactDatePickerCustomHeaderProps;
};

function Header({ params }: HeaderProps) {
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
