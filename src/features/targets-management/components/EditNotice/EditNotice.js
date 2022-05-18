import { StyledEditNotice } from "./edit-notice.styles";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

export default function EditNotice() {
  const { t } = useTranslation();
  return (
    <StyledEditNotice>
      <span className="text">
        {t(translations.TargetsManagement.EditNotice)}
      </span>
    </StyledEditNotice>
  );
}
