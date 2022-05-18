import { useState } from "react";

import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";
import { APIDuplicateDashboard } from "../ts";

export default function useDuplicateDashboard() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const duplicateDashboard = async (
    dashboardId: number,
    onSuccess?: (dashboardId: number) => void
  ) => {
    try {
      setStatus("loading");
      const { LeaderRecordID } = await api
        .post<APIDuplicateDashboard>(
          API_URLS.duplicateProcessControlDashboard,
          {
            ID: dashboardId,
          }
        )
        .then((res) => res.data);
      setStatus("success");
      if (onSuccess) {
        onSuccess(LeaderRecordID);
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return { duplicateDashboard, status };
}
