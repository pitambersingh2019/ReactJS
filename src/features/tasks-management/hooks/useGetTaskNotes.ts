import { useCallback, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";

type APITaskNotes = {
  ResponseDictionaryDT: {
    TaskNotes: TaskNote[];
  };
  error: {
    ErrorMessage?: string;
  };
};

type TaskNote = {
  ID: number;
  TaskID: number;
  TaskHistoryID: number;
  Note: string;
  CreateDate: string;
  UserID: number;
  UserName: string;
};

export default function useGetTaskNotes() {
  const [status, setStatus] = useState("idle");
  const [taskNotes, setTaskNotes] = useState<TaskNote[] | undefined>();

  const getTaskNotes = useCallback(async (taskId: number) => {
    try {
      setStatus("loading");
      const data = await api
        .post<APITaskNotes>(API_URLS.getTaskNotes, {
          SourceTaskCreationPlatform: 1,
          TaskID: taskId,
        })
        .then((res) => res.data);
      setTaskNotes(data.ResponseDictionaryDT.TaskNotes);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  return { getTaskNotes, status, taskNotes };
}
