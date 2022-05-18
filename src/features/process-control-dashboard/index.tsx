import styled from "styled-components";
import DashboardsWrapper from "./components/DashboardsWrapper/DashboardsWrapper";
import { DashboardIdContextProvider } from "./context/useDashboardId";
import { DashboardsContextProvider } from "./context/useDashboards";
import { DashboardViewContextProvider } from "./context/useDashboardView";
import { EditModeContextProvider } from "./context/useEditMode";
import { ParamsContextProvider } from "./context/useParams";
import { SavingChangesContextProvider } from "./context/useSavingChanges";
import { SearchContextProvider } from "./context/useSearch";

export default function ProcessControlDashboard() {
  return (
    <Wrapper>
      <DashboardsContextProvider>
        <DashboardViewContextProvider>
          <EditModeContextProvider>
            <DashboardIdContextProvider>
              <SearchContextProvider>
                <SavingChangesContextProvider>
                  <ParamsContextProvider>
                    <DashboardsWrapper />
                  </ParamsContextProvider>
                </SavingChangesContextProvider>
              </SearchContextProvider>
            </DashboardIdContextProvider>
          </EditModeContextProvider>
        </DashboardViewContextProvider>
      </DashboardsContextProvider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 56px 0px 0px 24px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: relative;
  overflow: hidden;
`;
