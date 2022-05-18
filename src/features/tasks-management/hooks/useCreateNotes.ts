import { useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { getSessionID } from "../utils";

type CreateTaskNotesParams = {
  SessionID: number;
  task: {
    ID: number;
    TaskID: number;
    HistoryID: number;
    SourceTaskCreationPlatform: number;
    Text: string;
  };
};

type Note = {
  taskId: number;
  historyId: number;
  text: string;
};

export default function useCreateNotes() {
  const [status, setStatus] = useState("idle");

  const createNotes = async ({ taskId, historyId, text }: Note) => {
    const params: CreateTaskNotesParams = {
      SessionID: getSessionID(),
      task: {
        ID: 0,
        TaskID: taskId,
        HistoryID: historyId,
        SourceTaskCreationPlatform: 1,
        Text: text,
      },
    };
    try {
      setStatus("loading");
      await api.post(API_URLS.createTaskNotes, params).then((res) => res.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { createNotes, status };
}
