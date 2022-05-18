import CustomPopover from "../../../../../../Component/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  ModalContent,
  ModalTitle,
  TitleIcon,
} from "./delete-subtask-modal.styles";
import deleteIcon from "../../../../../../assets/icons/tasks-management/delete.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import Button from "../../../../../../Component/DesignSystem/Buttons";

type DeleteSubtaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onDelete: () => void;
};

export default function DeleteSubtaskModal({
  isOpen,
  handleClose,
  onDelete,
}: DeleteSubtaskModalProps) {
  const { t } = useTranslation();
  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "272px",
        minHeight: "216px",
        padding: "24px 16px 16px 24px",
      }}
    >
      <TitleIcon src={deleteIcon} alt="icon" />
      <ModalTitle>{t(translations.TasksManagement.DeleteSubTask)}</ModalTitle>
      <ModalContent>
        {t(translations.TasksManagement.DeleteSubTaskContent1)}
        <br />
        {t(translations.TasksManagement.DeleteSubTaskContent2)}
      </ModalContent>
      <ButtonsContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="secondary"
          onClick={handleClose}
          width="88px"
          size="md"
        />
        <Button
          label={t(translations.TasksManagement.Delete)}
          onClick={onDelete}
          width="88px"
          size="md"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
