import { useCallback, useMemo, useState } from "react";
import Sort from "../components/MyTasksPanel/Actions/Sort";
import SortButton from "../components/Sort/SortButton/SortButton";
import SortIcon from "../components/Sort/SortIcon/SortIcon";
import { SortableProps, SortOption, Task } from "../ts";

type Order = "asc" | "desc";

export default function useSort(filteredTasks: Task[] | null) {
  const [sortOption, setSortOption] = useState<SortableProps>(
    "TaskStartTimeTarget"
  );
  const [sortOrder, setSortOrder] = useState<Order>("asc");

  const handleOptionClick = (option: SortOption) => {
    setSortOption(option.name);
  };

  const toggleSortOrder = () => {
    const isDesc = sortOrder === "desc";
    setSortOrder(isDesc ? "asc" : "desc");
  };

  const sorter = useCallback(
    (a: Task, b: Task, orderBy: SortableProps) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      if (a[orderBy] === b[orderBy]) return 0;
      else if (a[orderBy] === null) return 1;
      else if (b[orderBy] === null) return -1;
      else
        return (
          a[orderBy].toString().localeCompare(b[orderBy].toString()) *
          multiplier
        );
    },
    [sortOrder]
  );

  const sortedTasks = useMemo(
    () =>
      filteredTasks &&
      [...filteredTasks].sort((a, b) => sorter(a, b, sortOption)),
    [filteredTasks, sortOption, sorter]
  );

  const renderSortIcon = () => <SortIcon onClick={toggleSortOrder} />;

  const renderSortButton = () => (
    <SortButton selectedOption={sortOption} onOptionClick={handleOptionClick} />
  );

  const renderTasksPanelSortIcon = () => (
    <Sort selectedOption={sortOption} onOptionClick={handleOptionClick} />
  );

  return {
    renderSortButton,
    renderSortIcon,
    renderTasksPanelSortIcon,
    sortedTasks,
  };
}
