import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import TaskForm from "../TaskForm";
import { HeaderContainer, Title } from "./task-form-modal.styles";
import { useDepartmentMachine } from "../../../context/useDepartmentMachine";
import { useEffect, useState } from "react";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import Created from "../Created/Created";
import { useTaskModal } from "../../../context/useTaskModal";
import { useTaskForm } from "../../../context/useTaskForm";
import useFetchAllData from "../../../hooks/useFetchAllData";

type TaskFormModalProps = {
  onUpdate?: () => void;
  open?: boolean;
};

export default function TaskFormModal({ onUpdate, open }: TaskFormModalProps) {
  const [showNotification, setShowNotification] = useState(false);

  const { onModalClose, onModalOpen, opened, activeTask } = useTaskModal();
  const { clearForm, isUpdated } = useTaskForm();
  const { t } = useTranslation();
  const { fetchDepartmentMachine } = useDepartmentMachine();
  useFetchAllData();

  useEffect(() => {
    fetchDepartmentMachine();
  }, [fetchDepartmentMachine]);

  useEffect(() => {
    //close modal on clicking back or forward browser buttons
    window.onpopstate = () => {
      onModalClose();
      clearForm();
    };
  }, [onModalClose, clearForm]);

  const handleClose = () => {
    if (isUpdated) {
      //show confirmation modal
      setShowNotification(true);
    } else {
      onModalClose();
      clearForm();
      onUpdate && onUpdate();
    }
  };

  const onNotificationClose = () => {
    setShowNotification(false);
  };

  const taskId = activeTask ? ` - ${activeTask.ID}` : null;

  useEffect(() => {
    if (open !== undefined) {
      open ? onModalOpen() : onModalClose();
    }
  }, [onModalClose, onModalOpen, open]);

  return (
    <>
      <CustomPopover
        isOpen={opened}
        handleClose={handleClose}
        customStyles={{
          width: "768px",
          minHeight: "80vh",
          padding: "0px",
        }}
        withBorder={false}
      >
        <HeaderContainer>
          <Title>
            {t(translations.TasksManagement.Task)}
            {taskId}
          </Title>
          <Created />
        </HeaderContainer>
        <TaskForm
          showNotification={showNotification}
          onNotificationClose={onNotificationClose}
          onUpdate={onUpdate}
        />
      </CustomPopover>
    </>
  );
}
