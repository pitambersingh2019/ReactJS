import { EditIcon } from "./edit.styles";
import pencilIcon from "../../../../../../assets/icons/pencil.svg";
import { useEditMode } from "../../../../context/useEditMode";
import { useDashboardView } from "../../../../context/useDashboardView";
import { useDashboards } from "../../../../context/useDashboards";

export default function Edit() {
  const { onShowEditMode } = useEditMode();
  const { activeDashboard, resetDashboard } = useDashboardView();
  const { dashboards } = useDashboards();

  const showEditMode = () => {
    if (activeDashboard && dashboards) {
      const { CurrentUserDashboards, OtherUsersDashboards } = dashboards;
      const combined = [...CurrentUserDashboards, ...OtherUsersDashboards];
      const savedDashboard = combined.find(
        (dashboard) => dashboard.DashboardID === activeDashboard.DashboardID
      );
      onShowEditMode(savedDashboard);
      resetDashboard();
    }
  };
  return <EditIcon src={pencilIcon} alt="pencil icon" onClick={showEditMode} />;
}
