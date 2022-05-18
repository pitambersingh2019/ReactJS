import { useEffect, useRef } from "react";
import { useFilter } from "../../../context/useFilter";
import { useImagePreview } from "../../../context/useImagePreview";
import { useTasks } from "../../../context/useTasks";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import useFetchAllData from "../../../hooks/useFetchAllData";
import useOnScreen from "../../../hooks/useOnScreen";
import ImagePreview from "../../TaskForm/Attachments/ImagePreview/ImagePreview";
import TaskFormModal from "../../TaskForm/TaskFormModal/TaskFormModal";
import Header from "../Header/Header";
import SectionsWrapper from "../SectionsWrapper/SectionsWrapper";
import { MyTasksPanelContainer } from "../styles";
import Triangle from "../Triangle/Triangle";
import Slide from "@mui/material/Slide";

type PanelWrapperProps = {
  onUpdate?: () => void;
};

export default function PanelWrapper({ onUpdate }: PanelWrapperProps) {
  const { tasks, fetchTasks } = useTasks();
  const { filteredTasks } = useFilter();
  const { currentUserId } = useTasksPermissionsLevel();
  const { images, onImagePreviewClose, showPreview } = useImagePreview();

  useFetchAllData();

  const ref = useRef<HTMLDivElement>(null);
  const { isVisible } = useOnScreen(ref);

  const getMyTasks = () => {
    if (filteredTasks) {
      return filteredTasks.filter((task) => task.Assignee === currentUserId);
    }
    if (tasks) {
      return tasks.filter((task) => task.Assignee === currentUserId);
    }
  };

  const myTasks = getMyTasks();

  useEffect(() => {
    if (isVisible) {
      fetchTasks();
      onUpdate && onUpdate();
    }
  }, [fetchTasks, isVisible, onUpdate]);

  return (
    <Slide timeout={300} in={isVisible}>
      <MyTasksPanelContainer ref={ref}>
        <Triangle />
        <Header />
        {myTasks && <SectionsWrapper tasks={myTasks} />}

        <TaskFormModal onUpdate={onUpdate} />
        {images && (
          <ImagePreview
            open={showPreview}
            handleClose={onImagePreviewClose}
            images={images}
          />
        )}
      </MyTasksPanelContainer>
    </Slide>
  );
}
