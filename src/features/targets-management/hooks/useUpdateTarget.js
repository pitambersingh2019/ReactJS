import { useErrorContext } from "../context/ErrorContext";
import {
  SAVING_STATE,
  useUpdateMessageContext,
} from "../context/UpdateMessageContext";
import { useState } from "react";
import { api } from "../../api/api";
import { prepareRequestData } from "../utils/prepare-update";

export default function useUpdateTarget() {
  const [status, setStatus] = useState("idle");
  const { setError } = useErrorContext();
  const { setSaving } = useUpdateMessageContext();

  const updateTarget = async ({ row, cells }) => {
    const { endpoint, params } = prepareRequestData(row, cells);
    try {
      setStatus("loading");
      const resp = await api
        .post(endpoint, {
          ...params,
        })
        .then((res) => res.data);
      setError(resp.error?.ErrorMessage);
      if (!resp.error?.ErrorMessage) {
        setSaving(SAVING_STATE.SAVED);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      throw err;
    }
  };

  return [updateTarget, status];
}
