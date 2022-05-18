import ShiftNameCheckbox from "../ShiftNameCheckbox/ShiftNameCheckbox";
import {
  ArrowIcon,
  ShiftItemsContainer,
  ShiftNameContainer,
  SingleShiftSettingsContainer,
} from "./single-shift-settings.styles";
import arrowIcon from "../../../../../../assets/icons/Arowdropdown.svg";
import CheckboxComponent from "../../../shared/Checkbox/Checkbox";
import { useCallback, useMemo, useState } from "react";
import Collapse from "@mui/material/Collapse";
import { Checked, SelectedPeriod } from "../../../../ts";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateLocalSelectedPeriods } from "../../../../redux/quantityTargetsManagementSlice";
import { getCheckedAllStatus } from "../../../../utils";

type SingleShiftSettingsProps = {
  shift: [string, SelectedPeriod[]];
};

export default function SingleShiftSettings({
  shift,
}: SingleShiftSettingsProps) {
  const [open, setOpen] = useState(false);

  const localSelectedShifts = useAppSelector(
    (state) => state.qtm.localSelectedPeriods
  );
  const dispatch = useAppDispatch();

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const updateShifts = useCallback(
    (updatedItem: SelectedPeriod) => {
      const updatedShifts = localSelectedShifts.map((shift) =>
        shift.name === updatedItem.name ? updatedItem : shift
      );
      dispatch(updateLocalSelectedPeriods(updatedShifts));
    },
    [dispatch, localSelectedShifts]
  );

  const onToggle = (item: SelectedPeriod) => {
    updateShifts({ ...item, checked: !item.checked });
  };

  const allChecked = useMemo(
    () => getCheckedAllStatus(shift[1].map((shift) => shift.checked)),
    [shift]
  );

  const toggleAll = (newChecked: boolean) => {
    return localSelectedShifts.map((item) => {
      const isInCurrentShift = shift[1].find(
        (shift) => shift.name === item.name
      );
      if (isInCurrentShift) {
        return { ...item, checked: newChecked };
      } else {
        return item;
      }
    });
  };

  const onToggleAll = () => {
    if (allChecked === Checked.All) {
      const updatedShifts = toggleAll(false);
      dispatch(updateLocalSelectedPeriods(updatedShifts));
    }
    if (allChecked === Checked.None || allChecked === Checked.Half) {
      const updatedShifts = toggleAll(true);
      dispatch(updateLocalSelectedPeriods(updatedShifts));
    }
  };

  return (
    <SingleShiftSettingsContainer>
      <ShiftNameContainer>
        <ArrowIcon
          src={arrowIcon}
          alt="arrow icon"
          opened={open}
          onClick={onToggleOpen}
        />
        <ShiftNameCheckbox
          name={shift[0]}
          isChecked={allChecked}
          onToggle={onToggleAll}
        />
      </ShiftNameContainer>
      <Collapse in={open}>
        <ShiftItemsContainer>
          {shift[1].map((item, idx) => (
            <CheckboxComponent
              key={idx}
              label={item.name}
              onToggle={() => onToggle(item)}
              isChecked={item.checked}
            />
          ))}
        </ShiftItemsContainer>
      </Collapse>
    </SingleShiftSettingsContainer>
  );
}
