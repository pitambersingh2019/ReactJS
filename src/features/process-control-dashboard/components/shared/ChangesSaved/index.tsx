import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import savedTick from "../../../../../assets/icons/saved-tick.svg";
import {
  SAVING_STATE,
  useSavingChangesContext,
} from "../../../context/useSavingChanges";
import { Container, Icon, Message } from "./styles";

export default function ChangesSaved() {
  const { setSaving } = useSavingChangesContext();
  const { t } = useTranslation();

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSaving(SAVING_STATE.IDLE);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, [setSaving]);

  return (
    <Container>
      <Icon src={savedTick} alt="saved" />
      <Message>{t(translations.TargetsManagement.ChangesSaved)}</Message>
    </Container>
  );
}
