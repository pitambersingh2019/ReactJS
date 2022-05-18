import CustomPopover from "../../Components/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  CloseIcon,
  ModalContent,
  ModalContentWrapper,
  ModalTitle,
  TitleContainer,
  TitleIcon,
} from "./styles";
import icon from "../../../../../../assets/icons/tasks-management/warning.svg";
import close from "../../../../../../assets/icons/tasks-management/close.svg";
import { translations } from "../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../Component/DesignSystem/Buttons";

type DeleteFilterSetModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onDelete: () => void;
};

export default function DeleteFilterSetModal({
  isOpen,
  handleClose,
  onDelete,
}: DeleteFilterSetModalProps) {
  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "336px",
        height: "280px",
        padding: "32px 24px 16px",
      }}
    >
      <ModalContentWrapper>
        <CloseIcon src={close} alt="close icon" onClick={handleClose} />
        <TitleContainer>
          <TitleIcon src={icon} alt="icon" />
          <ModalTitle>
            {t(translations.TasksManagement.DeleteFilterSet)}
          </ModalTitle>
        </TitleContainer>
        <ModalContent>
          {t(translations.TasksManagement.DeleteFilterSetContent1)}
          <br />
          {t(translations.TasksManagement.DeleteFilterSetContent2)}
          <br />
          <div className="no-undo">
            {t(translations.TasksManagement.DeleteFilterSetContent3)}
          </div>
        </ModalContent>
        <ButtonsContainer>
          <Button
            label={t(translations.TasksManagement.Cancel)}
            variant="secondary"
            onClick={handleClose}
            width="128px"
            size="md"
          />
          <Button
            label={t(translations.TasksManagement.DeleteFilterSet)}
            onClick={onDelete}
            width="140px"
            size="md"
          />
        </ButtonsContainer>
      </ModalContentWrapper>
    </CustomPopover>
  );
}
