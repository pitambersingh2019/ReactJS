import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import {
  ButtonContainer,
  CalendarIcon,
  ClearIcon,
  InputContainer,
  InputField,
  Label,
  ManualInputsContainer,
  SideContainer,
} from "./manual-inputs.styles";
import calendarIcon from "../../../../../../../assets/icons/Calendar.svg";
import clearIcon from "../../../../../../../assets/icons/closeIcon.svg";
import { useEffect, useState } from "react";
import moment from "moment";
import { DateFormat } from "../../../../../../../Component/DesignSystem/DatePicker/types";
import { useCustomTimeFrame } from "../../../../../context/useCustomTimeFrame";
import Button from "../../../../../../../Component/DesignSystem/Buttons";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";

type ManualInputsProps = {
  onClose: () => void;
};

export default function ManualInputs({ onClose }: ManualInputsProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [period, setPeriod] = useState<"start" | "end">("start");

  const onShowDatePicker = (period: "start" | "end") => {
    setPeriod(period);
    setShowDatePicker(true);
  };

  const { t } = useTranslation();

  const { dates, setDates } = useCustomTimeFrame();

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

  const datesValid = () => {
    const startDateValid = checkValid(startDate);
    const endDateValid = checkValid(endDate);
    return startDateValid && endDateValid;
  };

  const isApplyDisabled = !datesValid();

  const onApply = () => {
    const startDateValid = checkValid(startDate);
    const endDateValid = checkValid(endDate);
    if (startDateValid && endDateValid) {
      setDates((prev) => ({
        ...prev,
        customStartDate: startDateValid.toDate(),
        customEndDate: endDateValid.toDate(),
      }));
    }
    onClose();
  };

  const onUpdate = (dateString: string, period: "start" | "end") => {
    period === "start" ? setStartDate(dateString) : setEndDate(dateString);
  };

  useEffect(() => {
    const initStartDate = dates.customStartDate;
    const initEndDate = dates.customEndDate;
    if (moment(initStartDate).isValid()) {
      setStartDate(moment(initStartDate).format(DateFormat.DD_MM_YY_HH_MM));
    }
    if (moment(initEndDate).isValid()) {
      setEndDate(moment(initEndDate).format(DateFormat.DD_MM_YY_HH_MM));
    }
  }, [dates.customEndDate, dates.customStartDate]);

  return showDatePicker ? (
    <TimeRangePicker
      onClose={() => setShowDatePicker(false)}
      period={period}
      onUpdate={onUpdate}
      selectedDate={period === "start" ? startDate : endDate}
    />
  ) : (
    <ManualInputsContainer>
      <ManualInput
        manualInputValue={startDate}
        onShowDatePicker={() => onShowDatePicker("start")}
        period="start"
        onChange={setStartDate}
      />
      <ManualInput
        manualInputValue={endDate}
        onShowDatePicker={() => onShowDatePicker("end")}
        period="end"
        onChange={setEndDate}
      />
      <ButtonContainer>
        <Button
          label={t(translations.ProcessControlDashboard.Apply)}
          size="md"
          width="auto"
          onClick={onApply}
          disabled={isApplyDisabled}
        />
      </ButtonContainer>
    </ManualInputsContainer>
  );
}

type ManualInputProps = {
  manualInputValue: string;
  onShowDatePicker: () => void;
  period: "start" | "end";
  onChange: (value: string) => void;
};

function ManualInput({
  onShowDatePicker,
  period,
  onChange,
  manualInputValue,
}: ManualInputProps) {
  const onManualInputChange = (value: string) => {
    onChange(value);
  };

  const onClearInput = () => {
    onChange("");
  };

  const { t } = useTranslation();

  const label =
    period === "start"
      ? t(translations.TasksManagement.StartDate)
      : t(translations.TasksManagement.EndDate);

  return (
    <div>
      <Label>{label}</Label>
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
    </div>
  );
}
