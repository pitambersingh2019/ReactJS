import { useState } from "react";

import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import {
  APICreateTask,
  APIStatus,
  CreateTaskParams,
  Status,
  Task,
  TaskLevel as TaskLevelEnum,
} from "../ts";

function mapRequestParams(
  task: Partial<Task> & {
    TaskSubSubjectId?: number | undefined;
  }
): CreateTaskParams {
  const {
    ID,
    HistoryID,
    TaskCreateUser,
    SubjectID,
    TaskSubSubjectId,
    Text,
    TaskLevel,
    TaskPriorityID,
    TaskStartTimeTarget,
    TaskEndTimeTarget,
    ObjectID,
    Assignee,
    TaskStatus,
    TaskSteps,
    EstimatedExecutionTime,
  } = task;

  const getStatus = () => {
    if (!Assignee && TaskLevel === TaskLevelEnum.Machine) {
      return Status["To Do"];
    }
    if (!Assignee) {
      return Status.Unassigned;
    }
    if (TaskStatus) {
      return TaskStatus;
    }
    if (Assignee) {
      return Status["To Do"];
    }
    return Status.Unassigned;
  };

  return {
    task: {
      ID,
      HistoryID,
      CreateUser: TaskCreateUser,
      Subject: SubjectID,
      SubSubjects: TaskSubSubjectId ? [TaskSubSubjectId] : [],
      Text,
      ...(TaskLevel && { TaskLevel }),
      ...(ObjectID && { TaskLevelObjectID: ObjectID }),
      Priority: TaskPriorityID,
      Assignee,
      StartTimeTarget: TaskStartTimeTarget,
      EndTimeTarget: TaskEndTimeTarget,
      SourceTaskCreationPlatform: 1,
      Status: getStatus(),
      TaskSteps,
      EstimatedExecutionTime,
    },
    isDateModified: false,
  };
}

export default function useCreateTask() {
  const [status, setStatus] = useState<APIStatus>("idle");

  const createTask = async (
    task: Partial<Task> & {
      TaskSubSubjectId?: number | undefined;
    },
    onSuccess?: (taskId: number) => void
  ) => {
    const params = mapRequestParams(task);

    try {
      setStatus("loading");
      const { LeaderRecordID } = await api
        .post<APICreateTask>(API_URLS.createTask, params)
        .then((res) => res.data);
      setStatus("success");
      if (onSuccess) {
        onSuccess(LeaderRecordID);
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return { createTask, status };
}
