import { useCallback, useEffect, useRef, useState } from "react";
import { useFilter } from "../context/useFilter";
import { StackByOption, useStackBy } from "../context/useStackBy";
import { useTaskObjects } from "../context/useTaskObjects";
import { useTasksPermissionsLevel } from "../context/useTasksPermissionsLevel";
import { useUsersForTask } from "../context/useUsersForTask";
import { GroupedTasks, Status, Task, TaskPriority } from "../ts";
import { areAllChecked, arrayCompare } from "../utils";

export default function useColumnHeaders(tasks?: GroupedTasks) {
  const [headers, setHeaders] = useState<string[]>([]);
  const { stackBySelectedOption } = useStackBy();
  const { users } = useUsersForTask();
  const { activeSubjectItems } = useTaskObjects();
  const { level3, currentUserId } = useTasksPermissionsLevel();
  const {
    statuses,
    assigneeDisplayName,
    priorityLevels,
    subjects,
    filtersApplied,
  } = useFilter();

  const makeStatusHeaders = useCallback(() => {
    if (stackBySelectedOption === "status") {
      const statusHeaders = Object.keys(Status).filter((value) =>
        isNaN(Number(value))
      ) as Array<keyof typeof Status>;

      //when stack by status and filters applied -> show only selected columns
      if (statuses && filtersApplied) {
        const activeStatus = Object.keys(statuses)
          .filter((key) => statuses[Number(key) as Status])
          .map((status) => Status[status as keyof typeof Status].toString());
        setHeaders(activeStatus);
        return;
      }

      setHeaders(statusHeaders);
    }
  }, [filtersApplied, stackBySelectedOption, statuses]);

  const sortAssigneeHeaders = (currentUser: string | undefined) => {
    if (!tasks || !users) return;

    const assigneeHeaders = users
      .map(({ DisplayName }) => DisplayName)
      .filter(Boolean);

    const sortedByNumberOfTasks = Object.keys(tasks)
      .map((key) => ({
        assingee: key,
        numberOfTasks: tasks[key].length || 0,
      }))
      .sort((a, b) => b.numberOfTasks - a.numberOfTasks)
      .map(({ assingee }) => assingee);

    const zeroTasksAssignees = assigneeHeaders.filter(
      (header) => !sortedByNumberOfTasks.includes(header)
    );
    currentUser &&
      zeroTasksAssignees.indexOf(currentUser) !== -1 &&
      zeroTasksAssignees.splice(zeroTasksAssignees.indexOf(currentUser), 1);

    currentUser &&
      sortedByNumberOfTasks.indexOf(currentUser) !== -1 &&
      sortedByNumberOfTasks.splice(
        sortedByNumberOfTasks.indexOf(currentUser),
        1
      );
    sortedByNumberOfTasks.indexOf("Unassigned") !== -1 &&
      sortedByNumberOfTasks.splice(
        sortedByNumberOfTasks.indexOf("Unassigned"),
        1
      );

    const otherAssignees = [...sortedByNumberOfTasks, ...zeroTasksAssignees];

    //when stack by assignee and filters applied -> show only selected columns
    if (
      assigneeDisplayName &&
      filtersApplied &&
      !areAllChecked(Object.values(assigneeDisplayName))
    ) {
      const activeAssignees = Object.keys(assigneeDisplayName)
        .filter((key) => assigneeDisplayName[key])
        .filter((assignee) => assignee !== "null");
      const sorted = sortedByNumberOfTasks.filter((assignee) =>
        activeAssignees.includes(assignee)
      );

      //when assignee filters includes current user
      const isCurrentUserActive =
        currentUser && activeAssignees.includes(currentUser);

      if (isCurrentUserActive) {
        setHeaders([currentUser, ...sorted]);
        return;
      }

      setHeaders([...sorted]);
      return;
    }
    setHeaders(["Unassigned", currentUser || "", ...otherAssignees]);
  };

  const makeAssigneeHeaders = () => {
    if (stackBySelectedOption === "assignee") {
      if (!tasks || !users) return;

      const currentUser = users.find(
        (user) => user.ID === currentUserId
      )?.DisplayName;

      if (level3 && currentUser) {
        setHeaders(["Unassigned", currentUser]);
        return;
      }

      sortAssigneeHeaders(currentUser);
    }
  };

  const makePriorityHeaders = () => {
    if (stackBySelectedOption === "priority") {
      const priorityHeaders = Object.keys(TaskPriority).filter((value) =>
        isNaN(Number(value))
      );

      //when stack by priority and filters applied -> show only selected columns
      if (priorityLevels && filtersApplied) {
        const activePriority = Object.keys(priorityLevels)
          .filter((key) => priorityLevels[Number(key) as TaskPriority])
          .map((priority) =>
            TaskPriority[priority as keyof typeof TaskPriority].toString()
          );
        setHeaders(activePriority.reverse());
        return;
      }

      setHeaders(priorityHeaders.reverse());
    }
  };

  const makeSubjectHeaders = () => {
    if (stackBySelectedOption === "subject") {
      if (!activeSubjectItems) return;
      const subjectHeaders = activeSubjectItems.map(({ label }) => label);

      //when stack by subjects and filters applied -> show only selected columns
      if (filtersApplied && subjects) {
        const activeSubjects = Object.keys(subjects)
          .filter((key) => subjects[Number(key)])
          .map(
            (activeId) =>
              activeSubjectItems.find((item) => item.value === Number(activeId))
                ?.label || ""
          );
        setHeaders(activeSubjects);
        return;
      }
      setHeaders(subjectHeaders);
    }
  };

  useEffect(() => {
    makeStatusHeaders();
  }, [makeStatusHeaders]);

  const makeHeaders = () => {
    makeStatusHeaders();
    makeAssigneeHeaders();
    makePriorityHeaders();
    makeSubjectHeaders();
  };

  //create new headers only when tasks are updated (filtered) or stackByOption changed
  useEffect(() => {
    if (tasks && prevTasks.current) {
      const isEqual = arrayCompare<Task>(
        Object.values(tasks).flat(),
        prevTasks.current
      );
      const isStackByOptionChanged =
        stackBySelectedOption !== prevStackBySelectedOption.current;
      if (!isEqual || isStackByOptionChanged) {
        makeHeaders();
      }
    }
  });

  const prevTasks = useRef<Task[] | undefined | null>(null);
  const prevStackBySelectedOption = useRef<StackByOption["name"] | null>(null);
  useEffect(() => {
    if (tasks) {
      prevTasks.current = Object.values(tasks).flat();
    }
    if (stackBySelectedOption !== prevStackBySelectedOption.current) {
      prevStackBySelectedOption.current = stackBySelectedOption;
    }
  });

  return { headers };
}
