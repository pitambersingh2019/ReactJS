import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import {
  CloseIcon,
  Header,
  HeaderContainer,
  ScrollArea,
  SettingsPanelContainer,
  Wrapper,
} from "./settings-panel.styles";
import closeIcon from "../../../../assets/icons/closeIcon.svg";
import TimeRangeSelector from "./TimeRangeSelector/TimeRangeSelector";
import ShiftSettings from "./ShiftSettings/ShiftSettings";
import ActionButtons from "./ActionButtons/ActionButtons";
import { useAppSelector } from "../../redux/hooks";
import { SelectedTimeRange } from "../../ts";
import Divider from "../shared/Divider/Divider";
import DaySettings from "./DaySettings/DaySettings";
import WeekSettings from "./WeekSettings/WeekSettings";

type SettingsPanelProps = {
  onClose: () => void;
};

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { selectedTimeRange } = useAppSelector((state) => state.qtm);

  const { t } = useTranslation();

  return (
    <Wrapper>
      <SettingsPanelContainer>
        <HeaderContainer>
          <Header>{t(translations.QuantityTargetsManagement.TimeRange)}</Header>
          <CloseIcon src={closeIcon} alt="close icon" onClick={onClose} />
        </HeaderContainer>
        <ScrollArea>
          <TimeRangeSelector />
          <Divider />
          {selectedTimeRange === SelectedTimeRange.Shift && <ShiftSettings />}
          {selectedTimeRange === SelectedTimeRange.Day && <DaySettings />}
          {selectedTimeRange === SelectedTimeRange.Week && <WeekSettings />}
        </ScrollArea>
      </SettingsPanelContainer>
      <ActionButtons onClose={onClose} />
    </Wrapper>
  );
}
