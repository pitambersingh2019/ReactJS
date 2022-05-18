import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { getCurrentUserId } from "../../../../tasks-management/utils";
import { useDashboardId } from "../../../context/useDashboardId";
import { useDashboards } from "../../../context/useDashboards";
import { useDashboardView } from "../../../context/useDashboardView";
import { useEditMode } from "../../../context/useEditMode";
import {
  SAVING_STATE,
  useSavingChangesContext,
} from "../../../context/useSavingChanges";
import useDashboardUpdated from "../../../hooks/useDashboardUpdated";
import useSaveDashboard from "../../../hooks/useSaveDashboard";
import SaveDashboardModal from "../SaveDashboardModal/SaveDashboardModal";
import { ActionButtonsContainer } from "./action-buttons.styles";

export default function ActionButtons() {
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const { onShowDashboardView, onCloseDashboardView } = useDashboardView();
  const { activeDashboard, onCloseEditMode } = useEditMode();
  const { fetchDashboards, dashboards } = useDashboards();
  const { setNewDashboardId, setUpdatedDashboardId } = useDashboardId();
  const { setSaving } = useSavingChangesContext();
  const { saveDashboard } = useSaveDashboard();
  const { saveEnabled } = useDashboardUpdated(activeDashboard);

  const { t } = useTranslation();

  const isCreatedByOthers =
    activeDashboard.DashboardCreatorID !== getCurrentUserId();

  const onCancel = () => {
    onCloseEditMode();
    if (activeDashboard.PCDisplays.length === 0) {
      onCloseDashboardView();
    } else {
      onShowDashboardView(activeDashboard, isCreatedByOthers);
    }
  };

  const onSuccess = (dashboardId: number, dashboardName: string) => {
    setNewDashboardId(dashboardId);
    onCloseEditMode();
    onShowDashboardView(
      {
        ...activeDashboard,
        DashboardID: dashboardId,
        DashboardName: dashboardName,
      },
      isCreatedByOthers
    );
    fetchDashboards();
  };

  const getDashboardName = () => {
    if (!activeDashboard.DashboardName) {
      let suggestedName = `${t(
        translations.ProcessControlDashboard.Dashboard
      )} 1`;
      if (
        dashboards?.CurrentUserDashboards &&
        dashboards?.OtherUsersDashboards
      ) {
        const allDashboardsCount = [
          ...dashboards.CurrentUserDashboards,
          ...dashboards.OtherUsersDashboards,
        ].length;
        suggestedName = `${t(translations.ProcessControlDashboard.Dashboard)} ${
          allDashboardsCount + 1
        }`;
      }

      return suggestedName;
    }

    return activeDashboard.DashboardName;
  };

  const saveNewDashboard = () => {
    const dashboardName = getDashboardName();
    saveDashboard(
      { ...activeDashboard, DashboardID: 0, DashboardName: dashboardName },
      (id) => onSuccess(id, dashboardName)
    );
  };

  const afterUpdate = () => {
    fetchDashboards();
    setSaving(SAVING_STATE.SAVED);
    setUpdatedDashboardId(activeDashboard.DashboardID);
    onCloseEditMode();
    onShowDashboardView(activeDashboard, isCreatedByOthers);
  };

  const saveChanges = () => {
    setSaving(SAVING_STATE.SAVING);
    saveDashboard(activeDashboard, afterUpdate);
  };

  const onSave = () => {
    if (activeDashboard.DashboardID === 0) {
      saveNewDashboard();
    } else {
      setSaveModalOpen(true);
    }
  };

  const onModalCLose = () => {
    setSaveModalOpen(false);
  };

  return (
    <ActionButtonsContainer>
      <Button
        label={t(translations.ProcessControlDashboard.Discard)}
        variant="purple-secondary"
        onClick={onCancel}
      />
      <Button
        label={t(translations.ProcessControlDashboard.SaveView)}
        onClick={onSave}
        disabled={!saveEnabled}
        variant="purple"
      />
      <SaveDashboardModal
        isOpen={saveModalOpen}
        handleClose={onModalCLose}
        onSaveNew={saveNewDashboard}
        onSaveChanges={saveChanges}
      />
    </ActionButtonsContainer>
  );
}
