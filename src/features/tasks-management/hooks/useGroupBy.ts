import { useCallback, useMemo } from "react";
import { useStackBy } from "../context/useStackBy";
import { Task } from "../ts";
import {
  groupTasksByAssignee,
  groupTasksByPriority,
  groupTasksByStatus,
  groupTasksBySubject,
} from "../utils/stackBy.helpers";

export default function useGroupBy(sortedTasks: Task[] | null) {
  const { stackBySelectedOption } = useStackBy();

  const groupBy = useCallback(() => {
    if (!sortedTasks) return;

    if (stackBySelectedOption === "status") {
      return groupTasksByStatus(sortedTasks);
    }

    if (stackBySelectedOption === "assignee") {
      return groupTasksByAssignee(sortedTasks);
    }

    if (stackBySelectedOption === "priority") {
      return groupTasksByPriority(sortedTasks);
    }

    if (stackBySelectedOption === "subject") {
      return groupTasksBySubject(sortedTasks);
    }
  }, [sortedTasks, stackBySelectedOption]);

  const groupedTasks = useMemo(() => groupBy(), [groupBy]);

  return { groupedTasks };
}
