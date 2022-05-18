import icon from "../../../../../../assets/icons/Duplicate.svg";
import { translations } from "../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../Component/DesignSystem/Buttons";
import CustomPopover from "../../../../../../Component/CustomModal/CustomPopover";
import {
  TitleContainer,
  TitleIcon,
  ModalTitle,
  ModalContent,
  ButtonsContainer,
  IconContainer,
} from "./duplicate-modal.styles";
import ShowAgain from "./ShowAgain/ShowAgain";

type DuplicateModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onDuplicate: () => void;
};

export default function DuplicateModal({
  isOpen,
  handleClose,
  onDuplicate,
}: DuplicateModalProps) {
  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "280px",
        minHeight: "208px",
        padding: "32px 16px 16px 24px",
      }}
    >
      <TitleContainer>
        <IconContainer>
          <TitleIcon src={icon} alt="icon" />
        </IconContainer>
        <ModalTitle>
          {t(translations.ProcessControlDashboard.DuplicateDashboard)}
        </ModalTitle>
      </TitleContainer>
      <ModalContent>
        {t(translations.ProcessControlDashboard.DuplicateDashboardModalContent)}
      </ModalContent>
      <ShowAgain text={t(translations.TasksManagement.ShowAgain)} />
      <ButtonsContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="secondary"
          onClick={handleClose}
          width="98px"
          size="md"
        />
        <Button
          label={t(translations.ProcessControlDashboard.Duplicate)}
          onClick={onDuplicate}
          width="104px"
          size="md"
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
