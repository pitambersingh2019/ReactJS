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
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";
import useSaveFilterSet from "../../../hooks/useSaveFilterSet";
import { useSavedFilters } from "../../../context/useSavedFilters";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";

type NotifyModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSaveAsNew: () => void;
};

export default function NotifyModal({
  isOpen,
  handleClose,
  onSaveAsNew,
}: NotifyModalProps) {
  const { selectedFilterSet } = useSelectedFilterSet();
  const { saveFilterSet } = useSaveFilterSet();
  const { fetchSavedFilters } = useSavedFilters();

  const { t } = useTranslation();

  const onSaveChanges = () => {
    if (selectedFilterSet) {
      saveFilterSet(selectedFilterSet.label, fetchSavedFilters);
      handleClose();
    }
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "360px",
        minHeight: "280px",
        padding: "32px 16px 16px",
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
        />
        <Button
          label={t(translations.TasksManagement.SaveChanges)}
          onClick={onSaveChanges}
          width="auto"
          size="md"
        />
      </NotifyModalButtonsContainer>
    </CustomPopover>
  );
}
