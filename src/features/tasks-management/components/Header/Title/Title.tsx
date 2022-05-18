import { useTranslation } from "react-i18next";

import { translations } from "../../../../../locales/translations";
import { StyledTitle } from "./title.styles";

export default function Title() {
  const { t } = useTranslation();
  return (
    <StyledTitle>{t(translations.TasksManagement.TaskManagement)}</StyledTitle>
  );
}
