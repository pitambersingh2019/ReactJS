import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { DisplayFormContextProvider } from "../../context/useDisplayForm";
import { useEditMode } from "../../context/useEditMode";
import { ScrollIntoViewContextProvider } from "../../context/useScrollIntoView";
import DashboardForm from "../DashboardForm/DashboardForm";
import ActionButtons from "./ActionButtons/ActionButtons";
import AddDisplay from "./AddDisplay/AddDisplay";
import DisplaysList from "./DisplaysList/DisplaysList";
import { EditModeContainer, Wrapper } from "./edit-mode.styles";
import Header from "./Header/Header";

export default function EditMode() {
  const [showNewForm, setShowNewForm] = useState(false);
  const {
    activeDashboard: { PCDisplays },
  } = useEditMode();

  const displays = [...PCDisplays];

  const { t } = useTranslation();

  const onAddDisplay = () => {
    setShowNewForm(true);
  };

  const onDoneEditing = () => {
    setShowNewForm(false);
  };

  const isProductionFloor = document.getElementById("production-pcd") !== null;

  return (
    <EditModeContainer isProductionFloor={isProductionFloor}>
      <Header />
      <ScrollIntoViewContextProvider>
        <Wrapper isProductionFloor={isProductionFloor}>
          <DisplaysList />
          {showNewForm && (
            <DisplayFormContextProvider>
              <DashboardForm initExpanded onDoneEditing={onDoneEditing} />
            </DisplayFormContextProvider>
          )}
        </Wrapper>
      </ScrollIntoViewContextProvider>
      {displays.length > 0 && !showNewForm && (
        <AddDisplay
          onAddDisplay={onAddDisplay}
          label={t(translations.ProcessControlDashboard.AddPCD)}
          withPadding
        />
      )}
      <ActionButtons />
    </EditModeContainer>
  );
}
