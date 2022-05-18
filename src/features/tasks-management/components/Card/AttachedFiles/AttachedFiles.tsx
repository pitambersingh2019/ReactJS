import icon from "../../../../../assets/icons/tasks-management/attach_gray.svg";
import { AttachedFilesContainer } from "./attached-files.styles";

type AttachedFilesProps = {
  numOfFiles: number;
};

export default function AttachedFiles({ numOfFiles }: AttachedFilesProps) {
  return (
    <AttachedFilesContainer>
      <img src={icon} alt="Files icon" />
      <span>{numOfFiles}</span>
    </AttachedFilesContainer>
  );
}
