import { useEffect, useState } from "react";
import { TaskFile } from "../../../../hooks/useGetTaskFiles";

import AttachedFileItem from "../AttachedFileItem/AttachedFileItem";
import { FilesList } from "./attached-files-list.styles";

type AttachedFilesListProps = {
  taskFiles: TaskFile[];
  onOpenPreview: (file: TaskFile) => void;
};

export default function AttachedFilesList({
  taskFiles,
  onOpenPreview,
}: AttachedFilesListProps) {
  const [files, setFiles] = useState<TaskFile[] | undefined>(undefined);

  const onDeleteFile = (fileId: number) => {
    const updatedFiles = files?.filter((file) => file.FileID !== fileId);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    setFiles(taskFiles);
  }, [taskFiles]);

  return files ? (
    <FilesList>
      {files.map((file) => (
        <AttachedFileItem
          file={file}
          key={file.FileID}
          openPreview={() => onOpenPreview(file)}
          onDeleteFile={onDeleteFile}
        />
      ))}
    </FilesList>
  ) : null;
}
