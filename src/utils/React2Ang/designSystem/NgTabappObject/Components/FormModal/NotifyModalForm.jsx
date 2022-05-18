/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ModalTitle,
  ModalTitleContainer,
  NotifyModalContent,
  // NotifyModalInfo,
  WarningIcon,
  NotifyModalButtonsContainer,
} from "./styles";
import warning from "../../../../../../assets/icons/tasks-management/warning.svg";
import { translations } from "../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../Component/DesignSystem/Buttons";
import CustomPopover from "../CustomModal/CustomPopover";

export default function NotifyModal({ isOpen, handleClose, handleDiscard }) {
  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "340px",
        height: "280px",
        padding: "38px 20px 16px 20px",
      }}
    >
      <ModalTitleContainer>
        <WarningIcon src={warning} alt="icon" />
        <ModalTitle>{t(translations.JobRecipe.DiscardChanges)}</ModalTitle>
      </ModalTitleContainer>
      <NotifyModalContent>
        {t(translations.JobRecipe.DiscardChangesModalContent)}
      </NotifyModalContent>
      {/* <NotifyModalInfo>
        {t(translations.TasksManagement.NotifyModalInfo)}
      </NotifyModalInfo> */}

      <NotifyModalButtonsContainer>
        <Button
          label={t(translations.JobRecipe.NoStay)}
          onClick={handleClose}
          width="45%"
          size="md"
          variant="purple-secondary"
        />
        <Button
          label={t(translations.JobRecipe.YesLeave)}
          onClick={handleDiscard}
          width="45%"
          size="md"
          variant="purple"
        />
      </NotifyModalButtonsContainer>
    </CustomPopover>
  );
}
