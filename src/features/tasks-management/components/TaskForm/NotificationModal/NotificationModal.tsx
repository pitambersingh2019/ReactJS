import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  ModalContent,
  ModalTitle,
  ModalTitleContainer,
} from "./notification-modal.styles";
import warning from "../../../../../assets/icons/tasks-management/warning.svg";
import { WarningIcon } from "../../Filters/SaveFilterSetButton/styles";

type NotificationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onContinue: () => void;
};

export default function NotificationModal({
  isOpen,
  handleClose,
  onContinue,
}: NotificationModalProps) {
  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "336px",
        minHeight: "280px",
        padding: "32px 24px 16px",
      }}
    >
      <ModalTitleContainer>
        <WarningIcon src={warning} alt="icon" />
        <ModalTitle>
          {t(translations.TasksManagement.CloseWithoutSaving)}
        </ModalTitle>
      </ModalTitleContainer>
      <ModalContent>
        {t(translations.TasksManagement.TaskSaveNotification)}
      </ModalContent>
      <ButtonsContainer>
        <Button
          label={t(translations.TasksManagement.CloseWithoutSaving)}
          variant="secondary"
          onClick={handleClose}
          width="auto"
        />
        <Button
          label={t(translations.TasksManagement.ContinueEditing)}
          onClick={onContinue}
          width="auto"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
