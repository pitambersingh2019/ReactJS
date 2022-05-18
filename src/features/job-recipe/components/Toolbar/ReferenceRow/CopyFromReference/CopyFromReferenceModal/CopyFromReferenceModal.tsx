import CustomPopover from "../../../../../../../Component/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  ModalContent,
  ModalTitle,
  ModalTitleContainer,
  TitleIcon,
} from "./copy-from-reference-modal.styles";
import warningIcon from "../../../../../../../assets/icons/tasks-management/warning.svg";
import { translations } from "../../../../../../../locales/translations";
import Button from "../../../../../../../Component/DesignSystem/Buttons";
import { useTranslation } from "react-i18next";

type CopyFromReferenceProps = {
  isOpen: boolean;
  handleClose: () => void;
  onCopy: () => void;
};

export default function CopyFromReference({
  isOpen,
  handleClose,
  onCopy,
}: CopyFromReferenceProps) {
  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "480px",
        minHeight: "252px",
        padding: "24px",
      }}
    >
      <ModalTitleContainer>
        <TitleIcon src={warningIcon} alt="icon" />
        <ModalTitle>{t(translations.JobRecipe.CopyFromReference)}</ModalTitle>
      </ModalTitleContainer>
      <ModalContent>
        {t(translations.JobRecipe.CopyFromReferenceModalContent1)}{" "}
        {t(translations.JobRecipe.CopyFromReferenceModalContent2)}
      </ModalContent>
      <ModalContent>
        {t(translations.JobRecipe.CopyFromReferenceModalContent3)}
      </ModalContent>
      <ButtonsContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="purple-secondary"
          onClick={handleClose}
          size="md"
        />
        <Button
          label={t(translations.JobRecipe.Copy)}
          variant="purple"
          onClick={onCopy}
          size="md"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
