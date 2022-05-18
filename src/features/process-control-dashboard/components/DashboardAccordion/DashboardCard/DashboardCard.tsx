import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useDashboardView } from "../../../context/useDashboardView";
import CardMenu from "../CardMenu/CardMenu";
import Chip from "../../shared/Chip/Chip";
import {
  ChipsRow,
  ContentContainer,
  DashboardCardContainer,
} from "./dashboard-card.styles";
import DashboardTitle from "./DashboardTitle/DashboardTitle";
import { Dashboard } from "../../../ts";
import { useEditMode } from "../../../context/useEditMode";
import { useDashboards } from "../../../context/useDashboards";
import DashboardChip from "./DashboardChip/DashboardChip";
import { useDashboardId } from "../../../context/useDashboardId";
import useDeleteDashboard from "../../../hooks/useDeleteDashboard";
import useDuplicateDashboard from "../../../hooks/useDuplicateDashboard";
import DashboardCreator from "./DashboardCreator/DashboardCreator";

type DashboardCardProps = {
  dashboard: Dashboard;
  isCreatedByOthers?: boolean;
};

export default function DashboardCard({
  dashboard,
  isCreatedByOthers = false,
}: DashboardCardProps) {
  const { t } = useTranslation();
  const { onShowDashboardView } = useDashboardView();
  const { onShowEditMode } = useEditMode();
  const { fetchDashboards } = useDashboards();
  const { newDashboardId, updatedDashboardId, setNewDashboardId } =
    useDashboardId();
  const { deleteDashboard } = useDeleteDashboard();
  const { duplicateDashboard } = useDuplicateDashboard();

  const showDashboard = () => {
    onShowDashboardView(dashboard, isCreatedByOthers);
  };

  const isChanged =
    updatedDashboardId === dashboard.DashboardID ||
    newDashboardId === dashboard.DashboardID;

  // const countSPC = dashboard.spcDisplays.length;
  const countSPC = 0;
  const countPC = dashboard.PCDisplays.length;

  const onEdit = () => {
    onShowEditMode(dashboard);
  };

  const onDelete = () => {
    deleteDashboard(dashboard.DashboardID, () => fetchDashboards());
  };

  const onSuccess = (dashboardId: number) => {
    setNewDashboardId(dashboardId);
    fetchDashboards();
  };

  const onDuplicate = () => {
    duplicateDashboard(dashboard.DashboardID, onSuccess);
  };

  return (
    <DashboardCardContainer onClick={showDashboard}>
      <ChipsRow>
        {countSPC > 0 && (
          <Chip
            label={t(translations.ProcessControlDashboard.SPC)}
            count={countSPC}
          />
        )}
        {countPC > 0 && (
          <Chip
            label={t(translations.ProcessControlDashboard.PC)}
            count={countPC}
          />
        )}
        <CardMenu
          isCreatedByOthers={isCreatedByOthers}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </ChipsRow>
      <ContentContainer>
        <DashboardTitle title={dashboard.DashboardName} />
        {isCreatedByOthers && (
          <DashboardCreator creator={dashboard.DashboardCreatorName} />
        )}
      </ContentContainer>
      {isChanged && <DashboardChip dashboardId={dashboard.DashboardID} />}
    </DashboardCardContainer>
  );
}
