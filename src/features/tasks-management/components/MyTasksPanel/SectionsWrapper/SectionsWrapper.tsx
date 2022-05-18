import { useState } from "react";
import useSearch from "../../../context/useSearch";
import useGroupBy from "../../../hooks/useGroupBy";
import useSort from "../../../hooks/useSort";
import { Task } from "../../../ts";
import Actions from "../Actions/Actions";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import SectionsList from "../SectionsList/SectionsList";

type SectionsWrapperProps = {
  tasks: Task[];
};

export default function SectionsWrapper({ tasks }: SectionsWrapperProps) {
  const [showFilters, setShowfilters] = useState(false);
  const { filteredTask } = useSearch(tasks);
  const { sortedTasks, renderTasksPanelSortIcon } = useSort(filteredTask);
  const { groupedTasks } = useGroupBy(sortedTasks);

  const onToggeFilters = () => {
    setShowfilters((prev) => !prev);
  };

  return (
    <>
      {showFilters ? (
        <FiltersPanel onToggleFilters={onToggeFilters} />
      ) : (
        <>
          <Actions
            renderTasksPanelSortIcon={renderTasksPanelSortIcon}
            onShowFilters={() => setShowfilters(true)}
          />
          {groupedTasks && <SectionsList groupedTasks={groupedTasks} />}
        </>
      )}
    </>
  );
}
