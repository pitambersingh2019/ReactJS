import { useState } from "react";

import { api } from "../../api/api";

export default function useShowHideTargets() {
  const [status, setStatus] = useState("idle");

  const toggleTarget = async ({ targetName, checked }) => {
    try {
      setStatus("loading");
      await api
        .post("ShowHideTargets ", {
          TargetName: targetName,
          TargetState: checked,
        })
        .then((res) => res.data);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      throw err;
    }
  };

  return [toggleTarget, status];
}
