import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateLocalSelectedPeriods } from "../../../../redux/quantityTargetsManagementSlice";
import { areAllChecked } from "../../../../utils";
import CheckboxComponent from "../../../shared/Checkbox/Checkbox";
import { SelectAllContainer } from "./select-all.styles";

export default function SelectAll() {
  const dispatch = useAppDispatch();
  const localSelectedShifts = useAppSelector(
    (state) => state.qtm.localSelectedPeriods
  );

  const isSelected = areAllChecked(
    localSelectedShifts.map((item) => item.checked)
  );

  const { t } = useTranslation();

  const onToggle = () => {
    const updatedShifts = localSelectedShifts.map((shift) => ({
      ...shift,
      checked: !isSelected,
    }));
    dispatch(updateLocalSelectedPeriods(updatedShifts));
  };

  return (
    <SelectAllContainer>
      <CheckboxComponent
        isChecked={isSelected}
        onToggle={onToggle}
        label={t(translations.QuantityTargetsManagement.SelectAll)}
      />
    </SelectAllContainer>
  );
}
