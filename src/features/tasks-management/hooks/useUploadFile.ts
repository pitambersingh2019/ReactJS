import axios from "axios";
import { useRef, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../ts";
import { getFileNameAndExt } from "../utils";

type UploadParams = {
  fullFileName: string;
  taskId: number;
  file: File;
};

export default function useUploadFile() {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [progress, setProgress] = useState(0);
  const cancelFileUpload = useRef<any>(null);

  const CancelToken = axios.CancelToken;

  const onAbort = () => {
    if (cancelFileUpload.current) {
      cancelFileUpload.current("User has canceled the file upload.");
      setStatus("idle");
    }
  };

  const uploadFile = async (
    { fullFileName, taskId, file }: UploadParams,
    onSucces?: () => void
  ) => {
    const { fileName, fileExt } = getFileNameAndExt(fullFileName);

    const shorterFileName =
      fileName.length > 50
        ? fileName.substring(0, 40) +
          "..." +
          fileName.substring(fileName.length - 7, fileName.length)
        : fileName;

    const data = new FormData();
    data.append("file", file);
    try {
      setStatus("loading");

      await api.post(
        `${API_URLS.createTaskFilesFromWeb}/0/${shorterFileName}/${fileExt}/${taskId}/false/0`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(uploadPercentage);
          },
          cancelToken: new CancelToken(
            (cancel) => (cancelFileUpload.current = cancel)
          ),
        }
      );
      setStatus("success");
      setProgress(0);
      onSucces && onSucces();
    } catch (err) {
      setStatus("error");
    }
  };
  return { status, uploadFile, progress, onAbort };
}
