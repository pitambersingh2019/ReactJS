import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import saving from "../../../../../assets/icons/saving.svg";
import { Container, Message, SpinningIcon } from "./styles";

export default function SavingChanges() {
  const { t } = useTranslation();
  return (
    <Container>
      <SpinningIcon src={saving} alt="saving" />
      <Message>{t(translations.TargetsManagement.SavingChanges)}</Message>
    </Container>
  );
}
