import useSort from "../../hooks/useSort";
import Columns from "./Columns/Columns";
import Header from "../Header/Header";
import TaskFormModal from "../TaskForm/TaskFormModal/TaskFormModal";
import { ColumnsContainer, Container } from "./board.styles";
import useSearch from "../../context/useSearch";
import { Task } from "../../ts";
import { DepartmentMachineContextProvider } from "../../context/useDepartmentMachine";

import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Filters from "../Filters";
import { useFilter } from "../../context/useFilter";
import ActiveFilters from "../Filters/ActiveFilters/ActiveFilters";
import { FilterDrawerContextProvider } from "../../context/useFilterDrawer";
import { SelectedFilterSetContextProvider } from "../../context/useSelectedFilterSet";
import ImagePreview from "../TaskForm/Attachments/ImagePreview/ImagePreview";
import { useImagePreview } from "../../context/useImagePreview";
import BoardActions from "./BoardActions/BoardActions";
import { TaskFormContextProvider } from "../../context/useTaskForm";
import { NewTaskIdContextProvider } from "../../context/useNewTaskId";
import useGroupBy from "../../hooks/useGroupBy";

type BoardProps = {
  tasks: Task[];
};

export default function Board({ tasks }: BoardProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [visibleBoardHeight, setVisibleBoardHeight] = useState(0);
  const { filteredTask } = useSearch(tasks);
  const { renderSortButton, renderSortIcon, sortedTasks } =
    useSort(filteredTask);
  const { groupedTasks } = useGroupBy(sortedTasks);
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;
  const containerHeightRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { activeFilters } = useFilter();
  const { images, onImagePreviewClose, showPreview } = useImagePreview();

  const onToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const areActiveFilters = Object.values(activeFilters).some(Boolean);

  useEffect(() => {
    if (showFilters && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showFilters, scrollRef]);

  useLayoutEffect(() => {
    const updateBoardHeight = () => {
      setVisibleBoardHeight(containerHeightRef.current.clientHeight);
    };
    updateBoardHeight();
    window.addEventListener("resize", updateBoardHeight);
    return () => window.removeEventListener("resize", updateBoardHeight);
  }, []);

  return (
    <SelectedFilterSetContextProvider>
      <Header />
      <BoardActions
        renderSortButton={renderSortButton}
        renderSortIcon={renderSortIcon}
        onToggleFilters={onToggleFilters}
      />
      <NewTaskIdContextProvider>
        <FilterDrawerContextProvider>
          {areActiveFilters && <ActiveFilters />}
          <Container>
            <ColumnsContainer ref={containerHeightRef}>
              {groupedTasks && <Columns tasks={groupedTasks} />}
            </ColumnsContainer>
            {showFilters && (
              <Filters
                ref={scrollRef}
                onToggleFilters={onToggleFilters}
                containerHeight={visibleBoardHeight}
              />
            )}
          </Container>
        </FilterDrawerContextProvider>
        <DepartmentMachineContextProvider>
          <TaskFormContextProvider>
            <TaskFormModal />
          </TaskFormContextProvider>
        </DepartmentMachineContextProvider>
      </NewTaskIdContextProvider>
      {images && (
        <ImagePreview
          open={showPreview}
          handleClose={onImagePreviewClose}
          images={images}
        />
      )}
    </SelectedFilterSetContextProvider>
  );
}
