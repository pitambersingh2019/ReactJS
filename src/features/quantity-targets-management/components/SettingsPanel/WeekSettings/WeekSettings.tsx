import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import PeriodToggle from "../../shared/PeriodToggle/PeriodToggle";
import { Subtitle, WeekSettingsContainer } from "./week-settings.styles";

export default function WeekSettings() {
  const [selectEveryWeek, setSelectEveryWeek] = useState(false);

  const { t } = useTranslation();

  const onToggleSelect = () => {
    setSelectEveryWeek((prev) => !prev);
  };
  return (
    <WeekSettingsContainer>
      <PeriodToggle
        label={t(translations.QuantityTargetsManagement.EveryWeek)}
        toggleIsOn={selectEveryWeek}
        onToggle={onToggleSelect}
      />
      <Subtitle>
        {t(translations.QuantityTargetsManagement.CalendarWeeks)}
      </Subtitle>
    </WeekSettingsContainer>
  );
}
