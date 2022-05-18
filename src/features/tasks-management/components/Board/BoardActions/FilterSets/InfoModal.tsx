import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { InfoModalContainer } from "./styles";

export default function InfoModal() {
  const { t } = useTranslation();
  return (
    <InfoModalContainer>
      {t(translations.TasksManagement.NoFilterSetsInfo)}
    </InfoModalContainer>
  );
}
