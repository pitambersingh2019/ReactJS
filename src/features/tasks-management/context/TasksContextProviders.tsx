import { DepartmentMachineContextProvider } from "./useDepartmentMachine";
import { FilterContextProvider } from "./useFilter";
import { FilterDrawerContextProvider } from "./useFilterDrawer";
import { ImagePreviewContextProvider } from "./useImagePreview";
import { NewTaskIdContextProvider } from "./useNewTaskId";
import { SavedFiltersContextProvider } from "./useSavedFilters";
import { SearchContextProvider } from "./useSearch";
import { SelectedFilterSetContextProvider } from "./useSelectedFilterSet";
import { StackByContextProvider } from "./useStackBy";
import { TaskFormContextProvider } from "./useTaskForm";
import { TaskLevelObjectsContextProvider } from "./useTaskLevelObjects";
import { TaskModalContextProvider } from "./useTaskModal";
import { TaskObjectsContextProvider } from "./useTaskObjects";
import { TasksContextProvider } from "./useTasks";
import { TasksPermissionsLevelContextProvider } from "./useTasksPermissionsLevel";
import { UsersForTaskContextProvider } from "./useUsersForTask";

type TasksContextProvidersProps = {
  children: React.ReactNode;
};

export default function TasksContextProviders({
  children,
}: TasksContextProvidersProps) {
  return (
    <TasksPermissionsLevelContextProvider>
      <TasksContextProvider>
        <TaskModalContextProvider>
          <NewTaskIdContextProvider>
            <DepartmentMachineContextProvider>
              <TaskFormContextProvider>
                <TaskObjectsContextProvider>
                  <UsersForTaskContextProvider>
                    <ImagePreviewContextProvider>
                      <TaskLevelObjectsContextProvider>
                        <SavedFiltersContextProvider>
                          <FilterContextProvider>
                            <SearchContextProvider>
                              <StackByContextProvider>
                                <SelectedFilterSetContextProvider>
                                  <FilterDrawerContextProvider>
                                    {children}
                                  </FilterDrawerContextProvider>
                                </SelectedFilterSetContextProvider>
                              </StackByContextProvider>
                            </SearchContextProvider>
                          </FilterContextProvider>
                        </SavedFiltersContextProvider>
                      </TaskLevelObjectsContextProvider>
                    </ImagePreviewContextProvider>
                  </UsersForTaskContextProvider>
                </TaskObjectsContextProvider>
              </TaskFormContextProvider>
            </DepartmentMachineContextProvider>
          </NewTaskIdContextProvider>
        </TaskModalContextProvider>
      </TasksContextProvider>
    </TasksPermissionsLevelContextProvider>
  );
}
