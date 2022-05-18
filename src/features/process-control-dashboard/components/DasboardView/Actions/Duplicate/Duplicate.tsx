import { DuplicateContainer, DuplicateIcon, Tooltip } from "./duplicate.styles";
import copyIcon from "../../../../../../assets/icons/Duplicate.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import DuplicateModal from "./DuplicateModal";
import { useDashboardView } from "../../../../context/useDashboardView";
import { useDashboardId } from "../../../../context/useDashboardId";
import useDuplicateDashboard from "../../../../hooks/useDuplicateDashboard";
import { useDashboards } from "../../../../context/useDashboards";

export default function Duplicate() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { activeDashboard, onCloseDashboardView } = useDashboardView();
  const { setNewDashboardId } = useDashboardId();
  const { duplicateDashboard } = useDuplicateDashboard();
  const { fetchDashboards } = useDashboards();

  const { t } = useTranslation();
  const content = `${t(
    translations.ProcessControlDashboard.DashboardCreatedBy
  )} ${activeDashboard?.DashboardCreatorName}. ${t(
    translations.ProcessControlDashboard.DuplicateToEdit
  )}`;

  const onSuccess = (dashboardId: number) => {
    setNewDashboardId(dashboardId);
    fetchDashboards();
    onCloseDashboardView();
  };

  const handleDuplicate = () => {
    activeDashboard &&
      duplicateDashboard(activeDashboard.DashboardID, onSuccess);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setShowTooltip(false);
  };

  return (
    <DuplicateContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <DuplicateIcon
        src={copyIcon}
        alt="Duplicate icon"
        onClick={handleShowModal}
      />
      {showTooltip && <Tooltip>{content}</Tooltip>}
      {showModal && (
        <DuplicateModal
          isOpen={showModal}
          onDuplicate={handleDuplicate}
          handleClose={() => setShowModal(false)}
        />
      )}
    </DuplicateContainer>
  );
}
