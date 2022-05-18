import {
  AbortIcon,
  Container,
  FileName,
  Progress,
  ProgressBarWrapper,
  RowContainer,
} from "./styles";
import icon from "../../../assets/icons/tasks-management/close.svg";
import ProgressBar from "@ramonak/react-progress-bar";
import { useTheme } from "styled-components";

type UploadProgressBarProps = {
  fileName: string;
  completed: number;
  onAbort: () => void;
  info: string;
};

export default function UploadProgressBar({
  fileName,
  completed,
  onAbort,
  info,
}: UploadProgressBarProps) {
  const theme = useTheme();
  return (
    <Container>
      <FileName>{fileName}</FileName>
      <RowContainer>
        <ProgressBarWrapper>
          <ProgressBar
            completed={completed}
            height="8px"
            isLabelVisible={false}
            baseBgColor={theme.colors.lightGray5}
            bgColor={theme.colors.primaryBlue}
            transitionDuration="0.1s"
          />
        </ProgressBarWrapper>
        <AbortIcon src={icon} alt="close icon" onClick={onAbort} />
      </RowContainer>
      <Progress>{info}</Progress>
    </Container>
  );
}
