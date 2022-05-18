import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useTaskModal } from "../../../context/useTaskModal";
import Button from "../../../../../Component/DesignSystem/Buttons";

export default function CreateTaskButton() {
  const { onModalOpen } = useTaskModal();
  const { t } = useTranslation();

  const openModal = () => {
    onModalOpen(undefined);
  };
  return (
    <Button
      label={t(translations.TasksManagement.CreateNewTask)}
      onClick={openModal}
      withIcon
      width="auto"
    />
  );
}
