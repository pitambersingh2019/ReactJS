import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateLocalSelectedPeriods } from "../../../../redux/quantityTargetsManagementSlice";
import { SelectedPeriod } from "../../../../ts";
import { areAllChecked } from "../../../../utils";
import CheckboxComponent from "../../../shared/Checkbox/Checkbox";
import PeriodToggle from "../../../shared/PeriodToggle/PeriodToggle";
import { DaysItemsContainer, DaysPickerContainer } from "./days-picker.styles";

export default function DaysPicker() {
  const dispatch = useAppDispatch();
  const { localSelectedPeriods: localSelectedDays } = useAppSelector(
    (state) => state.qtm
  );

  const { t } = useTranslation();

  const allSelected = useMemo(
    () => areAllChecked(localSelectedDays.map((day) => day.checked)),
    [localSelectedDays]
  );

  const toggleAll = (newChecked: boolean) =>
    localSelectedDays.map((item) => ({ ...item, checked: newChecked }));

  const onToggleSelectAll = () => {
    const updatedDays = toggleAll(!allSelected);
    dispatch(updateLocalSelectedPeriods(updatedDays));
  };

  const updateDays = useCallback(
    (updatedItem: SelectedPeriod) => {
      const updatedDays = localSelectedDays.map((day) =>
        day.name === updatedItem.name ? updatedItem : day
      );
      dispatch(updateLocalSelectedPeriods(updatedDays));
    },
    [dispatch, localSelectedDays]
  );

  const onToggle = (item: SelectedPeriod) => {
    updateDays({ ...item, checked: !item.checked });
  };

  return (
    <DaysPickerContainer>
      <PeriodToggle
        label={t(translations.QuantityTargetsManagement.EveryDay)}
        toggleIsOn={allSelected}
        onToggle={onToggleSelectAll}
      />
      <DaysItemsContainer>
        {localSelectedDays.map((item, idx) => (
          <CheckboxComponent
            key={idx}
            label={item.name}
            onToggle={() => onToggle(item)}
            isChecked={item.checked}
          />
        ))}
      </DaysItemsContainer>
    </DaysPickerContainer>
  );
}
