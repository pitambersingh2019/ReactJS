import { useState } from "react";

import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";
import { APISaveDashboard, Dashboard } from "../ts";

function createParams(dashboard: Dashboard): Dashboard {
  if (dashboard.DashboardID === 0) {
    return {
      ...dashboard,
      PCDisplays: dashboard.PCDisplays.map((display) => ({
        ...display,
        DisplayID: 0,
        PCParams: display.PCParams.map((param) => ({
          ...param,
          ParamID: 0,
          UpsertType: 2,
        })),
        UpsertType: 2,
      })),
    };
  }
  return {
    ...dashboard,
    PCDisplays: dashboard.PCDisplays.map((display) => ({
      ...display,
      DisplayID: display.UpsertType === 2 ? 0 : display.DisplayID,
      // PCParams: display.PCParams.map((param) => ({
      //   ...param,
      //   ParamID: param.UpsertType === 2 ? 0 : param.ParamID,
      // })),
      PCParams: display.PCParams.filter((param) => param.UpsertType !== 0).map(
        (param) => ({
          ...param,
          ParamID: param.UpsertType === 2 ? 0 : param.ParamID,
        })
      ),
    })),
  };
}

export default function useSaveDashboard() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const saveDashboard = async (
    dashboard: Dashboard,
    onSuccess?: (dashboardId: number) => void
  ) => {
    const params = createParams(dashboard);

    try {
      setStatus("loading");
      const { LeaderRecordID } = await api
        .post<APISaveDashboard>(API_URLS.saveSimpleProcessControlDashboard, {
          Dashboard: params,
        })
        .then((res) => res.data);
      setStatus("success");
      if (onSuccess) {
        onSuccess(LeaderRecordID);
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return { saveDashboard, status };
}
