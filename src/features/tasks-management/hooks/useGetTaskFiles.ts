import { useCallback, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";

type APITaskFiles = {
  ResponseDictionaryDT: {
    TaskFiles: TaskFile[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type TaskFile = {
  FileID: number;
  TaskID: number;
  TaskHistoryID: number;
  LName: string;
  FilePath: string;
  FileType: string;
};

export default function useGetTaskFiles() {
  const [status, setStatus] = useState("idle");
  const [taskFiles, setTaskFiles] = useState<TaskFile[] | undefined>();

  const getTaskFiles = useCallback(async (taskId: number) => {
    try {
      setStatus("loading");
      const data = await api
        .post<APITaskFiles>(API_URLS.getTaskFiles, {
          SourceTaskCreationPlatform: 1,
          TaskID: taskId,
        })
        .then((res) => res.data);
      setTaskFiles(data.ResponseDictionaryDT.TaskFiles);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  return { getTaskFiles, status, taskFiles };
}
