import { useCallback, useEffect, useState } from "react";
import { deepEqual } from "../../tasks-management/utils";
import { useDashboards } from "../context/useDashboards";
import { Dashboard } from "../ts";

export default function useDashboardUpdated(activeDashboard: Dashboard) {
  const [saveEnabled, setSaveEnabled] = useState(false);
  const { dashboards } = useDashboards();

  const savedPCDisplays = activeDashboard.PCDisplays;
  const savedSPCDisplays = [];

  //init dashboard from main page
  const getInitDashboard = useCallback(() => {
    if (dashboards) {
      const combined = [
        ...dashboards.CurrentUserDashboards,
        ...dashboards.OtherUsersDashboards,
      ];
      return combined.find(
        (d) => d.DashboardID === activeDashboard.DashboardID
      );
    }
  }, [activeDashboard.DashboardID, dashboards]);

  useEffect(() => {
    const initDash = getInitDashboard();

    const getSaveEnabled = () => {
      if (initDash) {
        return !deepEqual<Dashboard>(initDash, activeDashboard);
      }
      return savedPCDisplays.length > 0 || savedSPCDisplays.length > 0;
    };

    setSaveEnabled(getSaveEnabled());
  }, [
    activeDashboard,
    getInitDashboard,
    savedPCDisplays.length,
    savedSPCDisplays.length,
  ]);

  return { saveEnabled };
}
