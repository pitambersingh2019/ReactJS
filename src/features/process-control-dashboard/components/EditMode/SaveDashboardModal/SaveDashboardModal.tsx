import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import warningIcon from "../../../../../assets/icons/tasks-management/warning.svg";
import {
  TitleContainer,
  TitleIcon,
  ModalTitle,
  ModalContent,
  ButtonsContainer,
  Name,
} from "./save-dashboard-modal.styles";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { useEditMode } from "../../../context/useEditMode";
import { useRef } from "react";

type SaveDashboardModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSaveNew: () => void;
  onSaveChanges: () => void;
};

export default function SaveDashboardModal({
  isOpen,
  handleClose,
  onSaveNew,
  onSaveChanges,
}: SaveDashboardModalProps) {
  const { activeDashboard } = useEditMode();
  const { t } = useTranslation();

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSaveChanges = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    onSaveChanges();
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "380px",
        minHeight: "280px",
        padding: "32px 16px 16px 24px",
      }}
    >
      <TitleContainer>
        <TitleIcon src={warningIcon} alt="icon" />
        <ModalTitle>
          {t(translations.ProcessControlDashboard.SaveDashboard)}
        </ModalTitle>
      </TitleContainer>
      <ModalContent>
        {t(translations.ProcessControlDashboard.SaveDashboardModalContent1)}
      </ModalContent>
      <Name>{activeDashboard.DashboardName}</Name>
      <ModalContent>
        {t(translations.ProcessControlDashboard.SaveDashboardModalContent2)}
      </ModalContent>
      <ButtonsContainer>
        <Button
          label={t(translations.ProcessControlDashboard.SaveAsNewDashboard)}
          variant="purple-secondary"
          onClick={onSaveNew}
          width="auto"
          size="md"
        />
        <Button
          label={t(translations.ProcessControlDashboard.SaveChanges)}
          onClick={handleSaveChanges}
          width="auto"
          size="md"
          ref={btnRef}
          variant="purple"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
