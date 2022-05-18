import {
  DeleteIcon,
  EyeIcon,
  FileIcon,
  PreviewBlock,
  SideContainer,
} from "../AttachedFileItem/attached-file-item.styled";
import { Container, Filename, Preview } from "./just-added-files-list.styles";
import eyeIcon from "../../../../../../assets/icons/tasks-management/eye-purple.svg";
import deleteIcon from "../../../../../../assets/icons/tasks-management/delete-purple.svg";
import fileIcon from "../../../../../../assets/icons/tasks-management/file.svg";
import { FilesList } from "../AttachedFilesList/attached-files-list.styles";

export type FileWithUrl = File & {
  url: string;
};

type JustAddedFilesListProps = {
  files: FileWithUrl[];
  onOpenPreview: (file: File) => void;
  onDeleteFile: (fileId: number) => void;
};

export default function JustAddedFilesList({
  files,
  onOpenPreview,
  onDeleteFile,
}: JustAddedFilesListProps) {
  return (
    <FilesList>
      {files.map((file) => (
        <Container key={file.lastModified}>
          <SideContainer>
            {file.type.includes("image") ? (
              <Preview src={file.url} alt="image preview" />
            ) : (
              <PreviewBlock>
                <FileIcon src={fileIcon} alt="file icon" />
              </PreviewBlock>
            )}
            <Filename>{file.name}</Filename>
          </SideContainer>
          <SideContainer>
            <EyeIcon
              src={eyeIcon}
              alt="eye icon"
              onClick={() => onOpenPreview(file)}
            />
            <DeleteIcon
              src={deleteIcon}
              alt="delete icon"
              onClick={() => onDeleteFile(file.lastModified)}
            />
          </SideContainer>
        </Container>
      ))}
    </FilesList>
  );
}
