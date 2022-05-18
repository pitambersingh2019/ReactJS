import { useState } from "react";
import { api } from "../../api/api";

export default function useResetTargets() {
  const [status, setStatus] = useState("idle");

  const resetTargets = async () => {
    try {
      setStatus("loading");
      await api.post("ResetTargets").then((res) => res.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      throw err;
    }
  };

  return [resetTargets, status];
}
