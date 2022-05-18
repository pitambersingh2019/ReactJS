import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { CommentsTitleContainer } from "./comments-title.styles";

export default function CommentsTitle() {
  const { t } = useTranslation();
  return (
    <CommentsTitleContainer>
      {t(translations.TasksManagement.Comments)}
    </CommentsTitleContainer>
  );
}
