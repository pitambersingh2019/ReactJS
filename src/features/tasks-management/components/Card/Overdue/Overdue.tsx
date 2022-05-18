import { useTranslation } from "react-i18next";

import icon from "../../../../../assets/icons/tasks-management/overdue.svg";
import { translations } from "../../../../../locales/translations";
import { StyledOverdue } from "./overdue.styles";

export default function Overdue() {
  const { t } = useTranslation();
  return (
    <StyledOverdue>
      <img src={icon} alt="exclamation icon" />
      <span>{t(translations.TasksManagement.Overdue)}</span>
    </StyledOverdue>
  );
}
