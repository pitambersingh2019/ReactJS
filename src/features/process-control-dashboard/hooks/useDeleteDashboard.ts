import { useState } from "react";

import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";

export default function useDeleteDashboard() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const deleteDashboard = async (
    dashboardId: number,
    onSuccess?: () => void
  ) => {
    try {
      setStatus("loading");
      await api
        .post(API_URLS.deleteProcessControlDashboard, {
          ID: dashboardId,
        })
        .then((res) => res.data);
      setStatus("success");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return { deleteDashboard, status };
}
