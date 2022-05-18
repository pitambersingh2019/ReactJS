import {
  ActionsContainer,
  DisplayOptionsContainer,
  SecondRow,
  SideContainer,
  TopRow,
  VerticalDivider,
} from "./actions.styles";
import Duplicate from "./Duplicate/Duplicate";
import Edit from "./Edit/Edit";
import LastUpdated from "./LastUpdated/LastUpdated";
import ExportTo from "./ExportTo/ExportTo";
import TimeFrame from "./TimeFrame/TimeFrame";
import Zoom from "./Zoom/Zoom";
import DisplayOption from "./DisplayOption/DisplayOption";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useJobActivation } from "../../../context/useJobActivation";
import { useShowParamLimits } from "../../../context/useParamLimits";

type ActionsProps = {
  isMyDashboard: boolean;
  onExportToPDF: () => void;
  updatedAt: Date | undefined;
  onRefetch: () => void;
  isLoading: boolean;
};

export default function Actions({
  isMyDashboard,
  onExportToPDF,
  updatedAt,
  onRefetch,
  isLoading,
}: ActionsProps) {
  const { isJobActivationEnabled, toggleJobActivationEnabled } =
    useJobActivation();
  const { isShowParamLimitsEnabled, toggleShowParamLimitsEnabled } =
    useShowParamLimits();

  const { t } = useTranslation();

  return (
    <ActionsContainer>
      <TopRow>
        <SideContainer>
          <TimeFrame />
          <LastUpdated
            updatedAt={updatedAt}
            onRefetch={onRefetch}
            isLoading={isLoading}
          />
        </SideContainer>
        <SideContainer>
          <ExportTo onExportToPDF={onExportToPDF} />
          <VerticalDivider />
          {isMyDashboard ? <Edit /> : <Duplicate />}
        </SideContainer>
      </TopRow>
      <SecondRow>
        <SideContainer>
          <Zoom />
        </SideContainer>
        <DisplayOptionsContainer>
          <DisplayOption
            text={t(translations.ProcessControlDashboard.JobActivation)}
            isEnabled={isJobActivationEnabled}
            onToggle={toggleJobActivationEnabled}
            tooltipText={t(
              translations.ProcessControlDashboard.JobActivationTooltip
            )}
          />
          <DisplayOption
            text={t(translations.ProcessControlDashboard.ParameterLimits)}
            isEnabled={isShowParamLimitsEnabled}
            onToggle={toggleShowParamLimitsEnabled}
            tooltipText={t(
              translations.ProcessControlDashboard.ParameterLimitsTooltip
            )}
          />
        </DisplayOptionsContainer>
      </SecondRow>
    </ActionsContainer>
  );
}
