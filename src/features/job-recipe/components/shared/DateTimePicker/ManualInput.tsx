import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateFormat } from "../../../../../Component/DesignSystem/DatePicker/types";
import { translations } from "../../../../../locales/translations";
import {
  CalendarIcon,
  ClearIcon,
  InputContainer,
  InputField,
  Label,
  SideContainer,
} from "./manual-input.styles";
import calendarIcon from "../../../../../assets/icons/Calendar.svg";
import clearIcon from "../../../../../assets/icons/closeIcon.svg";

type ManualInputProps = {
  onShowDatePicker: () => void;
  initDate?: Date;
  label?: string;
  onChange: (date: Date) => void;
};

export default function ManualInput({
  onShowDatePicker,
  initDate,
  label,
  onChange,
}: ManualInputProps) {
  const [manualInputValue, setManualInputValue] = useState("");

  const checkValid = (dateString: string) => {
    const isValidInput = /^[0-9/:, ]*$/.test(dateString);
    if (!isValidInput) {
      return false;
    }

    const momentDate = moment(dateString, DateFormat.DD_MM_YY_HH_MM_comma);
    if (!momentDate.isValid()) {
      return false;
    }

    return momentDate;
  };

  const onManualInputChange = (value: string) => {
    setManualInputValue(value);
    const momentDate = checkValid(value);
    if (momentDate) {
      onChange(momentDate.toDate());
    }
  };

  const onClearInput = () => {
    setManualInputValue("");
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (initDate && moment(initDate).isValid()) {
      setManualInputValue(moment(initDate).format(DateFormat.DD_MM_YY_HH_MM));
    }
  }, [initDate]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <InputField
          format="##/##/##, ##:##"
          placeholder={t(translations.TasksManagement.DateTimePlaceholder)}
          mask={["M", "M", "M", "M", "Y", "Y", "H", "H", "m", "m"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onManualInputChange(e.target.value)
          }
          value={manualInputValue}
        />
        <SideContainer>
          {manualInputValue !== "" && (
            <ClearIcon
              src={clearIcon}
              alt="clear icon"
              onClick={onClearInput}
            />
          )}
          <CalendarIcon
            src={calendarIcon}
            alt="calendar icon"
            onClick={onShowDatePicker}
          />
        </SideContainer>
      </InputContainer>
    </>
  );
}
