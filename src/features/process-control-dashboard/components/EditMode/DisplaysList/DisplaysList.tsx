import { DisplayFormContextProvider } from "../../../context/useDisplayForm";
import { useEditMode } from "../../../context/useEditMode";
import DashboardForm from "../../DashboardForm/DashboardForm";
import { DisplaysListContainer } from "./displays-list.styles";

export default function DisplaysList() {
  const {
    activeDashboard: { PCDisplays },
  } = useEditMode();

  const displays = [...PCDisplays];

  return (
    <DisplaysListContainer>
      {displays.length > 0 ? (
        displays.map((display) => (
          <DisplayFormContextProvider key={display.DisplayID}>
            <DashboardForm initExpanded={false} display={display} />
          </DisplayFormContextProvider>
        ))
      ) : (
        <DisplayFormContextProvider>
          <DashboardForm initExpanded />
        </DisplayFormContextProvider>
      )}
    </DisplaysListContainer>
  );
}
