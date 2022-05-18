import Spinner from "../../../targets-management/components/Spinner/Spinner";
import { useFilter } from "../../context/useFilter";
import { ImagePreviewContextProvider } from "../../context/useImagePreview";
import { SearchContextProvider } from "../../context/useSearch";
import { StackByContextProvider } from "../../context/useStackBy";
import { TaskModalContextProvider } from "../../context/useTaskModal";
import { useTasks } from "../../context/useTasks";
import useFetchAllData from "../../hooks/useFetchAllData";
import Board from "../Board/Board";

export default function BoardWrapper() {
  const { status, error, tasks, errorAPI } = useTasks();
  const { filteredTasks } = useFilter();
  useFetchAllData();

  if (!tasks && status === "loading") return <Spinner />;

  if (error || errorAPI)
    return (
      <div>
        {`An error has occurred: ${
          errorAPI ? errorAPI : (error as Error).message
        }`}
      </div>
    );

  if (tasks) {
    return (
      <TaskModalContextProvider>
        <SearchContextProvider>
          <ImagePreviewContextProvider>
            <StackByContextProvider>
              <Board tasks={filteredTasks || tasks} />
            </StackByContextProvider>
          </ImagePreviewContextProvider>
        </SearchContextProvider>
      </TaskModalContextProvider>
    );
  }

  return null;
}
