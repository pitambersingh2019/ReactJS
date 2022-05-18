import { useTranslation } from "react-i18next";
import {
  Label,
  TimeRangeButton,
  TimeRangeContainer,
  TimeRangeIcon,
} from "./time-range.styles";
import icon from "../../assets/time-range.svg";
import { translations } from "../../../../locales/translations";
import { useState } from "react";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import { useAppSelector } from "../../redux/hooks";
import { SelectedTimeRange } from "../../ts";

export default function TimeRange() {
  const [showPicker, setShowPicker] = useState(false);

  const { selectedTimeRange } = useAppSelector((state) => state.qtm);

  const { t } = useTranslation();

  const onShowPicker = () => {
    setShowPicker(true);
  };

  const onHidePicker = () => {
    setShowPicker(false);
  };

  return (
    <TimeRangeContainer>
      <TimeRangeIcon src={icon} alt="time range icon" />
      <TimeRangeButton onClick={onShowPicker}>
        {t(translations.QuantityTargetsManagement.TimeRange)}:
      </TimeRangeButton>
      <Label>
        {t(
          translations.QuantityTargetsManagement[
            SelectedTimeRange[selectedTimeRange]
          ]
        )}
      </Label>
      {showPicker && <SettingsPanel onClose={onHidePicker} />}
    </TimeRangeContainer>
  );
}
