import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getUnitsTargetValues,
  updateSelectedPeriods,
} from "../../../redux/quantityTargetsManagementSlice";
import { SelectedTimeRange } from "../../../ts";
import {
  ActionButtonsContainer,
  ButtonsContainer,
  InfoText,
} from "./action-buttons.styles";

type ActionButtonsProps = {
  onClose: () => void;
};

export default function ActionButtons({ onClose }: ActionButtonsProps) {
  const dispatch = useAppDispatch();
  const {
    localSelectedPeriods,
    selectedDates,
    daySettingsSelectedOption,
    selectedTimeRange,
  } = useAppSelector((state) => state.qtm);

  const { t } = useTranslation();

  const onApply = () => {
    if (selectedTimeRange === SelectedTimeRange.Shift) {
      dispatch(updateSelectedPeriods(localSelectedPeriods));
    } else if (selectedTimeRange === SelectedTimeRange.Day) {
      daySettingsSelectedOption === "DaysOfWeek"
        ? dispatch(updateSelectedPeriods(localSelectedPeriods))
        : dispatch(
            getUnitsTargetValues({
              recurringPeriod: 5,
              manualPeriod: 2,
              periodStart: selectedDates.map((date) => ({
                key: date,
                value: "0",
                value2: "0",
              })),
            })
          );
    }
  };

  return (
    <ActionButtonsContainer>
      <InfoText>
        {t(translations.QuantityTargetsManagement.SettingsInfo)}
        {selectedTimeRange === SelectedTimeRange.Week &&
          `. ${t(translations.QuantityTargetsManagement.WeekSettingsInfo)}`}
      </InfoText>
      <ButtonsContainer>
        <Button
          variant="secondary"
          label={t(translations.TasksManagement.Cancel)}
          onClick={onClose}
          size="md"
          width="98px"
        />
        <Button
          label={t(translations.TasksManagement.Apply)}
          onClick={onApply}
          width="98px"
          size="md"
        />
      </ButtonsContainer>
    </ActionButtonsContainer>
  );
}
