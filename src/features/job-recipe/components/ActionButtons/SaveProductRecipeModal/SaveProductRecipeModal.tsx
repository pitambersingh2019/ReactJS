import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  ModalContent,
  ModalTitle,
  ModalTitleContainer,
  TitleIcon,
} from "./save-product-recipe-modal.styles";
import warningIcon from "../../../../../assets/icons/tasks-management/warning.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import Button from "../../../../../Component/DesignSystem/Buttons";

type SaveProductRecipeModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSaveProductRecipe: () => void;
  onSaveAsAlternativeRecipe: () => void;
};

export default function SaveProductRecipeModal({
  isOpen,
  handleClose,
  onSaveProductRecipe,
  onSaveAsAlternativeRecipe,
}: SaveProductRecipeModalProps) {
  const { t } = useTranslation();

  const handleSaveAsAlternativeRecipe = () => {
    onSaveAsAlternativeRecipe();
    handleClose();
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "480px",
        minHeight: "228px",
        padding: "24px",
      }}
    >
      <ModalTitleContainer>
        <TitleIcon src={warningIcon} alt="icon" />
        <ModalTitle>
          {t(translations.JobRecipe.ChangesToProductRecipe)}
        </ModalTitle>
      </ModalTitleContainer>
      <ModalContent>
        {t(translations.JobRecipe.SaveProductRecipeModalContent1)}
      </ModalContent>
      <ModalContent>
        {t(translations.JobRecipe.SaveProductRecipeModalContent2)}
      </ModalContent>
      <ButtonsContainer>
        <Button
          label={t(translations.JobRecipe.SaveAsAlternativeRecipe)}
          variant="purple-secondary"
          onClick={handleSaveAsAlternativeRecipe}
          width="auto"
          size="md"
        />
        <Button
          label={t(translations.JobRecipe.SaveAsProductRecipe)}
          variant="purple"
          onClick={onSaveProductRecipe}
          width="auto"
          size="md"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
