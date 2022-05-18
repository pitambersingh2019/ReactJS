import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../../Component/DesignSystem/DatePicker";
import {
  DateFormat,
  DateReturned,
  SelectedDate,
} from "../../../../Component/DesignSystem/DatePicker/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { DATETIME_REGEX, formatDate } from "../../utils/date-time-helpers";
import { FlexContainer } from "./task-form.styles";
import { ErrorState } from "./TaskForm";

type DatesProps = {
  errors: ErrorState | undefined;
  setErrors: (errors: ErrorState | undefined) => void;
};

export default function Dates({ errors, setErrors }: DatesProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<
    SelectedDate | undefined
  >(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<
    SelectedDate | undefined
  >(undefined);

  const { startDate, setStartDate, endDate, setEndDate, creatorId } =
    useTaskForm();
  const { t } = useTranslation();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const onStartDateChange = (date: DateReturned | string) => {
    const formattedDate =
      typeof date === "string" ? date : date ? formatDate(date) : undefined;
    setErrors({
      ...errors,
      dateError: {
        ...errors?.dateError,
        startDateError: false,
      },
    });
    setStartDate(formattedDate);
  };

  const onEndDateChange = (date: DateReturned | string) => {
    const formattedDate =
      typeof date === "string" ? date : date ? formatDate(date) : undefined;
    setErrors({
      ...errors,
      dateError: {
        ...errors?.dateError,
        endDateError: false,
      },
    });
    setEndDate(formattedDate);
  };

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  useEffect(() => {
    if (startDate && DATETIME_REGEX.test(startDate)) {
      setSelectedStartDate({
        format: DateFormat.DD_MM_YYYY_HH_MM,
        inputString: moment(startDate).format(DateFormat.DD_MM_YYYY_HH_MM),
      });
    } else {
      setSelectedStartDate(undefined);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate && DATETIME_REGEX.test(endDate)) {
      setSelectedEndDate({
        format: DateFormat.DD_MM_YYYY_HH_MM,
        inputString: moment(endDate).format(DateFormat.DD_MM_YYYY_HH_MM),
      });
    } else {
      setSelectedEndDate(undefined);
    }
  }, [endDate]);

  return (
    <FlexContainer>
      <DatePicker
        Title={t(translations.TasksManagement.StartDate)}
        onDateChange={onStartDateChange}
        selected={selectedStartDate}
        disabled={isDisabled}
        isSmall
        isValid={!errors?.dateError?.startDateError}
        alignCalendarRight
      />
      <DatePicker
        Title={t(translations.TasksManagement.EndDate)}
        onDateChange={onEndDateChange}
        selected={selectedEndDate}
        disabled={isDisabled}
        isSmall
        isValid={!errors?.dateError?.endDateError}
        alignCalendarRight
      />
    </FlexContainer>
  );
}
