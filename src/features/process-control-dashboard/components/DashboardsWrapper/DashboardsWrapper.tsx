import { useEffect } from "react";
import Spinner from "../../../targets-management/components/Spinner/Spinner";
import { CustomTimeFrameContextProvider } from "../../context/useCustomTimeFrame";
import { useDashboards } from "../../context/useDashboards";
import { useDashboardView } from "../../context/useDashboardView";
import { useEditMode } from "../../context/useEditMode";
import { TimeFrameContextProvider } from "../../context/useTimeFrame";
import DashboardView from "../DasboardView/DashboardView";
import Dashboards from "../Dashboards/Dashboards";
import { DashboardsContainer } from "../Dashboards/dashboards.styles";
import EditMode from "../EditMode/EditMode";
import EmptyDashboards from "../EmptyDashboards/EmptyDashboards";
import Header from "../Header/Header";

export default function DashboardsWrapper() {
  const { showDashboardView } = useDashboardView();
  const { showEditMode } = useEditMode();
  const { dashboards, fetchDashboards, status } = useDashboards();

  useEffect(() => {
    fetchDashboards();
  }, [fetchDashboards]);

  if (status === "loading" && !dashboards) {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Spinner />
      </div>
    );
  }

  if (showEditMode) {
    return <EditMode />;
  }

  if (showDashboardView) {
    return (
      <TimeFrameContextProvider>
        <CustomTimeFrameContextProvider>
          <DashboardView />
        </CustomTimeFrameContextProvider>
      </TimeFrameContextProvider>
    );
  }

  if (dashboards) {
    const { CurrentUserDashboards, OtherUsersDashboards } = dashboards;
    const count = CurrentUserDashboards.length + OtherUsersDashboards.length;
    return (
      <DashboardsContainer>
        <Header count={count} />
        {count > 0 ? (
          <Dashboards dashboards={dashboards} />
        ) : (
          <EmptyDashboards />
        )}
      </DashboardsContainer>
    );
  }

  return null;
}
