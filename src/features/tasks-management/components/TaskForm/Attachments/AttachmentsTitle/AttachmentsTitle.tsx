import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { AttachmentsTitleContainer } from "./attachments-title.styles";

export default function AttachmentsTitle() {
  const { t } = useTranslation();
  return (
    <AttachmentsTitleContainer>
      {t(translations.TasksManagement.Attachments)}
    </AttachmentsTitleContainer>
  );
}
