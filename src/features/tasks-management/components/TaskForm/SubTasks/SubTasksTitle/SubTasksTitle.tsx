import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { SubTasksTitleContainer } from "./subtasks-title.styles";

export default function SubTasksTitle() {
  const { t } = useTranslation();
  return (
    <SubTasksTitleContainer>
      {t(translations.TasksManagement.SubTasks)}
    </SubTasksTitleContainer>
  );
}
