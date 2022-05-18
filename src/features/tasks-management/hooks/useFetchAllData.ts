import { useEffect } from "react";
import { useSavedFilters } from "../context/useSavedFilters";
import { useTaskLevelObjects } from "../context/useTaskLevelObjects";
import { useTaskObjects } from "../context/useTaskObjects";
import { useTasks } from "../context/useTasks";
import { useUsersForTask } from "../context/useUsersForTask";

export default function useFetchAllData() {
  const { fetchTasks } = useTasks();
  const { fetchUsersForTask } = useUsersForTask();
  const { fetchTaskObjects } = useTaskObjects();
  const { fetchTaskLevelObjects } = useTaskLevelObjects();
  const { fetchSavedFilters } = useSavedFilters();

  useEffect(() => {
    fetchTasks();
    fetchUsersForTask();
    fetchTaskObjects();
    fetchTaskLevelObjects();
    fetchSavedFilters();
  }, [
    fetchTasks,
    fetchUsersForTask,
    fetchTaskObjects,
    fetchTaskLevelObjects,
    fetchSavedFilters,
  ]);
}
