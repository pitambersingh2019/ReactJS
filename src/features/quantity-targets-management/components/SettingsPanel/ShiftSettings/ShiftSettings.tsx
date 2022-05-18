import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useAppSelector } from "../../../redux/hooks";
import { SelectedPeriod } from "../../../ts";
import SelectAll from "./SelectAll/SelectAll";
import SingleShiftSettings from "./SingleShiftSettings/SingleShiftSettings";
import {
  Header,
  HeaderRow,
  ShiftSettingsContainer,
} from "./shift-settings.styles";

export default function ShiftSettings() {
  const {
    unitsTargetValues: units,
    localSelectedPeriods: localSelectedShifts,
    loading,
  } = useAppSelector((state) => state.qtm);

  const { t } = useTranslation();

  const shifts = useMemo(() => {
    const periodNames = units[0].DepartmentPeriodTargets.map(
      (target) => target.PeriodName
    );
    return periodNames.reduce((result, item) => {
      const shift = `${t(
        translations.QuantityTargetsManagement.Shift
      )} ${item.slice(item.length - 1)}`;

      if (!result[shift]) {
        result[shift] = [];
      }

      const selectedShift = localSelectedShifts.find(
        (shift) => shift.name === item
      );

      selectedShift && result[shift].push(selectedShift);

      return result;
    }, {} as { [key: string]: SelectedPeriod[] });
  }, [localSelectedShifts, t, units]);

  return (
    <ShiftSettingsContainer>
      <HeaderRow>
        <Header>{t(translations.QuantityTargetsManagement.ShiftType)}</Header>
        <SelectAll />
      </HeaderRow>
      {!loading &&
        Object.entries(shifts).map((shift, id) => (
          <SingleShiftSettings shift={shift} key={id} />
        ))}
    </ShiftSettingsContainer>
  );
}
