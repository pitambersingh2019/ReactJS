import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UploadButton from "../../../../../Component/DesignSystem/Buttons/UploadButton";
import { translations } from "../../../../../locales/translations";
import AttachmentsTitle from "./AttachmentsTitle/AttachmentsTitle";
import UploadZone from "./UploadZone/UploadZone";
import { AttachmentsContainer } from "./styles";
import useGetTaskFiles, { TaskFile } from "../../../hooks/useGetTaskFiles";
import AttachedFilesList from "./AttachedFilesList/AttachedFilesList";
import JustAddedFilesList, {
  FileWithUrl,
} from "./JustAddedFilesList/JustAddedFilesList";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import { SliderImage, useImagePreview } from "../../../context/useImagePreview";
import { useTaskForm } from "../../../context/useTaskForm";

type AttachmentsProps = {
  taskId?: number;
};

export default function Attachments({ taskId }: AttachmentsProps) {
  const [showUploadZone, setShowUploadZone] = useState(false);

  const { attachedFiles, setAttachedFiles, creatorId } = useTaskForm();
  const { taskFiles, getTaskFiles } = useGetTaskFiles();
  const { onImagePreviewOpen } = useImagePreview();
  const { t } = useTranslation();

  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  const onUploadClick = () => {
    !isDisabled && setShowUploadZone(true);
  };

  const images = taskFiles?.reduce((result, file) => {
    file.FileType === "Picture" &&
      result.push({ path: file.FilePath, name: file.LName, id: file.FileID });
    return result;
  }, [] as SliderImage[]);

  const onOpenPreview = (file: TaskFile) => {
    if (file.FileType === "Picture") {
      images && onImagePreviewOpen(images, file.FileID);
    } else {
      //open file in a new tab
      window.open(file.FilePath, "_blank")?.focus();
    }
  };

  const newTaskPreviews = attachedFiles.reduce((result, file) => {
    file.type.includes("image") &&
      result.push({
        path: file.url,
        name: file.name,
        id: file.lastModified,
      });
    return result;
  }, [] as SliderImage[]);

  const onNewTaskOpenPreview = (file: File) => {
    if (file.type.includes("image")) {
      onImagePreviewOpen(newTaskPreviews, file.lastModified);
    } else {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank")?.focus();
    }
  };

  const onAddFile = (addedFiles: File[]) => {
    //@ts-ignore
    const newFile: FileWithUrl = addedFiles[0];
    const url = URL.createObjectURL(addedFiles[0]);
    newFile.url = url;
    setAttachedFiles([...attachedFiles, newFile]);
  };

  const onDeleteNewFile = (fileId: number) => {
    const updatedAttachedFiles = attachedFiles.filter(
      (file) => file.lastModified !== fileId
    );
    setAttachedFiles(updatedAttachedFiles);
  };

  useEffect(() => {
    if (taskId) {
      getTaskFiles(taskId);
    }
  }, [taskId, getTaskFiles]);

  return (
    <AttachmentsContainer>
      <AttachmentsTitle />
      {!isDisabled && (
        <>
          {showUploadZone || (taskFiles && taskFiles.length > 0) ? (
            <UploadZone
              taskId={taskId}
              getTaskFiles={(taskId) => getTaskFiles(taskId)}
              onAddFile={onAddFile}
            />
          ) : (
            <UploadButton
              label={t(translations.TasksManagement.UploadFile)}
              onButtonClick={onUploadClick}
            />
          )}
        </>
      )}
      {taskFiles && taskId && (
        <AttachedFilesList
          taskFiles={taskFiles}
          onOpenPreview={onOpenPreview}
        />
      )}
      {/* when new task is created */}
      {attachedFiles && (
        <JustAddedFilesList
          files={attachedFiles}
          onOpenPreview={onNewTaskOpenPreview}
          onDeleteFile={onDeleteNewFile}
        />
      )}
    </AttachmentsContainer>
  );
}
