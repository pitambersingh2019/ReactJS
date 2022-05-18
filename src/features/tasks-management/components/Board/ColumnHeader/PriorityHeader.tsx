import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { TaskPriority } from "../../../ts";
import { PriorityHeaderContainer } from "./column-header.styles";

type PriorityHeaderProps = {
  priority: TaskPriority;
};

export default function PriorityHeader({ priority }: PriorityHeaderProps) {
  const { t } = useTranslation();

  const translatedPriority = t(
    translations.TasksManagement[TaskPriority[priority]]
  );
  return (
    <PriorityHeaderContainer priority={priority}>
      {translatedPriority}
    </PriorityHeaderContainer>
  );
}
