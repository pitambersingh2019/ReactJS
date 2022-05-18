import {
  ModalTitle,
  ModalTitleContainer,
  NotifyModalContent,
  NotifyModalInfo,
  WarningIcon,
  NotifyModalButtonsContainer,
} from "./styles";
import warning from "../../../../../assets/icons/tasks-management/warning.svg";
import { translations } from "../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import CustomPopover from "../Components/CustomModal/CustomPopover";

export default function NotifyModal({
  isOpen,
  handleClose,
  onSaveAsNew,
  selectedFilterSet,
  handleUpdateFilterSet,
  ListItems,
  hideFilterSaveButton,
}) {
  const { t } = useTranslation();

  const onSaveChanges = () => {
    handleUpdateFilterSet(
      selectedFilterSet.value,
      ListItems,
      selectedFilterSet.label
    );
    hideFilterSaveButton();
    handleClose();
  };

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
        <ModalTitle>
          {t(translations.TasksManagement.ChangesToFilterSet)}
        </ModalTitle>
      </ModalTitleContainer>
      <NotifyModalContent>
        {t(translations.TasksManagement.NotifyModalContent)}{" "}
        <span className="filter-name">{selectedFilterSet?.label}</span>
      </NotifyModalContent>
      <NotifyModalInfo>
        {t(translations.TasksManagement.NotifyModalInfo)}
      </NotifyModalInfo>

      <NotifyModalButtonsContainer>
        <Button
          label={t(translations.TasksManagement.SaveNewFilterSet)}
          onClick={onSaveAsNew}
          width="auto"
          size="md"
          variant="purple-secondary"
        />
        <Button
          label={t(translations.TasksManagement.SaveChanges)}
          onClick={onSaveChanges}
          width="auto"
          size="md"
          variant="purple"
        />
      </NotifyModalButtonsContainer>
    </CustomPopover>
  );
}
