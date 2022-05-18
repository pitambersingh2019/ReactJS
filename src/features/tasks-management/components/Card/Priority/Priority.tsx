import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { Task } from "../../../ts";
import { StyledPriority } from "./priority.styles";

type PriorityProps = {
  label: string;
  priority: Task["TaskPriorityID"];
};

export default function Priority({ label, priority }: PriorityProps) {
  const { t } = useTranslation();
  const translatedPriority = t(translations.TasksManagement[label]);
  return (
    <StyledPriority priority={priority}>{translatedPriority}</StyledPriority>
  );
}
