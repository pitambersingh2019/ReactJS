import styled from "styled-components";
import { StyledToastContainer } from "../../Component/Toast/ToastContainer";

import BoardWrapper from "./components/BoardWrapper/BoardWrapper";
import { FilterContextProvider } from "./context/useFilter";
import { SavedFiltersContextProvider } from "./context/useSavedFilters";
import { TaskLevelObjectsContextProvider } from "./context/useTaskLevelObjects";
import { TaskObjectsContextProvider } from "./context/useTaskObjects";
import { TasksContextProvider } from "./context/useTasks";
import { TasksPermissionsLevelContextProvider } from "./context/useTasksPermissionsLevel";
import { UsersForTaskContextProvider } from "./context/useUsersForTask";

export default function TasksManagement() {
  return (
    <TasksPermissionsLevelContextProvider>
      <TasksContextProvider>
        <UsersForTaskContextProvider>
          <TaskObjectsContextProvider>
            <TaskLevelObjectsContextProvider>
              <SavedFiltersContextProvider>
                <FilterContextProvider>
                  <Wrapper>
                    <BoardWrapper />
                  </Wrapper>
                  <StyledToastContainer />
                </FilterContextProvider>
              </SavedFiltersContextProvider>
            </TaskLevelObjectsContextProvider>
          </TaskObjectsContextProvider>
        </UsersForTaskContextProvider>
      </TasksContextProvider>
    </TasksPermissionsLevelContextProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 0px 0px;
  flex-direction: column;
`;
