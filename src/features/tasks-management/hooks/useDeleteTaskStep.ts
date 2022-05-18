import { useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../ts";

export default function useDeleteTaskStep() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const deleteTaskStep = async (stepId: number) => {
    try {
      setStatus("loading");
      await api
        .post(`${API_URLS.deleteTaskStep}/${stepId}`)
        .then((res) => res.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { deleteTaskStep, status };
}
