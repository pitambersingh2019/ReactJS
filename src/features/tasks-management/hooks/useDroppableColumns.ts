import { useCallback, useEffect, useState } from "react";
import { useStackBy } from "../context/useStackBy";
import { useTasksPermissionsLevel } from "../context/useTasksPermissionsLevel";
import { useUsersForTask } from "../context/useUsersForTask";
import { GroupedTasks, Status, Task } from "../ts";
import { getAllowedStatus } from "../utils";
import useColumnHeaders from "./useColumnHeaders";

export default function useDroppableColumns(
  draggingTask: Task | undefined,
  tasks: GroupedTasks
) {
  const [allowedColumns, setAllowedColumns] = useState<string[]>([]);

  const { level2, level3, currentUserId } = useTasksPermissionsLevel();
  const { stackBySelectedOption } = useStackBy();
  const { headers } = useColumnHeaders(tasks);
  const { users } = useUsersForTask();

  const isCreator = currentUserId === draggingTask?.TaskCreateUser;
  const isAssignee = draggingTask?.Assignee === currentUserId;

  const makeAllowedStatusColumns = useCallback(() => {
    if (!draggingTask) return [];

    let notAllowedStatus = [] as string[];
    const currentStatus = draggingTask.TaskStatus;
    const possibleStatus = getAllowedStatus(currentStatus);

    //level2 or level3, is not a creator => can't move task to TODO
    if (
      (level2 || level3) &&
      (currentStatus === Status.Canceled || currentStatus === Status.Done) &&
      !isCreator &&
      isAssignee
    ) {
      notAllowedStatus.push(Status[Status["To Do"]]);
    }

    //level3 or level2, is not task creator, can't cancel a task
    if ((level3 || level2) && !isCreator) {
      notAllowedStatus.push(Status[Status.Canceled]);
    }

    return possibleStatus
      .map((st) => Status[st])
      .filter((st) => !notAllowedStatus.includes(st));
  }, [draggingTask, isAssignee, isCreator, level2, level3]);

  const makeAllowedAssigneeColumns = useCallback(() => {
    if (users) {
      if (level3) {
        return users
          ?.filter(
            (user) =>
              user.ID === currentUserId || user.ID === draggingTask?.Assignee
          )
          .map((u) => u.DisplayName);
      }
      if (level2 && !isCreator) {
        return users
          ?.filter((user) => user.ID === currentUserId)
          .map((u) => u.DisplayName);
      }
    }
    return headers;
  }, [
    currentUserId,
    draggingTask?.Assignee,
    headers,
    isCreator,
    level2,
    level3,
    users,
  ]);

  const makeAllowedPriorityColumns = useCallback(() => {
    if ((level3 || level2) && !isCreator) {
      return [];
    }
    return headers;
  }, [headers, isCreator, level2, level3]);

  const makeAllowedSubjectColumns = useCallback(() => {
    if ((level3 || level2) && !isCreator) {
      return [];
    }
    return headers;
  }, [headers, isCreator, level2, level3]);

  useEffect(() => {
    if (stackBySelectedOption === "status") {
      const allowedStatus = makeAllowedStatusColumns();
      setAllowedColumns(allowedStatus);
    }
    if (stackBySelectedOption === "assignee") {
      const allowedAssignee = makeAllowedAssigneeColumns();
      setAllowedColumns(allowedAssignee);
    }
    if (stackBySelectedOption === "priority") {
      const allowedPriority = makeAllowedPriorityColumns();
      setAllowedColumns(allowedPriority);
    }
    if (stackBySelectedOption === "subject") {
      const allowedSubject = makeAllowedSubjectColumns();
      setAllowedColumns(allowedSubject);
    }
  }, [
    makeAllowedAssigneeColumns,
    makeAllowedPriorityColumns,
    makeAllowedStatusColumns,
    makeAllowedSubjectColumns,
    stackBySelectedOption,
  ]);

  return { allowedColumns };
}
