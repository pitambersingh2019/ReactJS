import {
  AttachedFileItemContainer,
  DeleteIcon,
  EyeIcon,
  FileIcon,
  Filename,
  Preview,
  PreviewBlock,
  SideContainer,
} from "./attached-file-item.styled";
import eyeIcon from "../../../../../../assets/icons/tasks-management/eye-purple.svg";
import deleteIcon from "../../../../../../assets/icons/tasks-management/delete-purple.svg";
import fileIcon from "../../../../../../assets/icons/tasks-management/file.svg";
import { TaskFile } from "../../../../hooks/useGetTaskFiles";
import useDeleteUploadedFile from "../../../../hooks/useDeleteUploadedFile";

type AttachedFileItemProps = {
  file: TaskFile;
  openPreview: (file: TaskFile) => void;
  onDeleteFile: (fileId: number) => void;
};

export default function AttachedFileItem({
  file,
  openPreview,
  onDeleteFile,
}: AttachedFileItemProps) {
  const { deleteFile } = useDeleteUploadedFile();

  const handleDeleteFile = () => {
    deleteFile(file.FileID, () => onDeleteFile(file.FileID));
  };

  return (
    <AttachedFileItemContainer>
      <SideContainer>
        {file.FileType === "Picture" ? (
          <Preview src={file.FilePath} alt="file preview" />
        ) : (
          <PreviewBlock>
            <FileIcon src={fileIcon} alt="file icon" />
          </PreviewBlock>
        )}
        <Filename>{file.LName}</Filename>
      </SideContainer>
      <SideContainer>
        <EyeIcon
          src={eyeIcon}
          alt="eye icon"
          onClick={() => openPreview(file)}
        />
        <DeleteIcon
          src={deleteIcon}
          alt="delete icon"
          onClick={handleDeleteFile}
        />
      </SideContainer>
    </AttachedFileItemContainer>
  );
}
