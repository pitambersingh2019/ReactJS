import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useTaskModal } from "../../../context/useTaskModal";
import { getTooltipFormattedDate } from "../../../utils/date-time-helpers";
import { CreatedContainer, CreatedText, TimeIcon } from "./created.styles";
import timeIcon from "../../../../../assets/icons/tasks-management/time.svg";

export default function Created() {
  const { activeTask } = useTaskModal();
  const { t } = useTranslation();

  const user = activeTask?.CreateUserName;
  const text = `${t(translations.TasksManagement.Created)} ${t(
    translations.TasksManagement.By
  )}: ${user}`;

  const formattedDate = activeTask
    ? getTooltipFormattedDate(activeTask.TaskCreateDate)
    : "";

  return activeTask ? (
    <CreatedContainer>
      <CreatedText>{text}</CreatedText>
      <TimeIcon src={timeIcon} alt="time icon" />
      <CreatedText>{formattedDate}</CreatedText>
    </CreatedContainer>
  ) : null;
}
