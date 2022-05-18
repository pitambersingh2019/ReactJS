import { useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../ts";

export default function useDeleteFilterSet() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const deleteFilterSet = async (filterId: number) => {
    try {
      setStatus("loading");
      await api
        .post(API_URLS.deleteFilterSet, { FilterID: filterId })
        .then((res) => res.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { deleteFilterSet, status };
}
