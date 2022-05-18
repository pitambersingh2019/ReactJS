import { useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../ts";

export default function useDeleteUploadedFile() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const deleteFile = async (fileId: number, onSucces?: () => void) => {
    try {
      setStatus("loading");

      await api.post(`${API_URLS.deleteUploadedFile}/${fileId}`);

      setStatus("success");
      onSucces && onSucces();
    } catch (err) {
      setStatus("error");
    }
  };
  return { deleteFile, status };
}
