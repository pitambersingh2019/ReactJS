import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import savedTick from "../../../../../assets/icons/saved-tick.svg";
import { Container, Icon, Message } from "./styles";
import { useAppDispatch } from "../../../redux/hooks";
import { setSavingState } from "../../../redux/slice";
import { SAVING_STATE } from "../../../ts";

export default function ChangesSaved() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const timeId = setTimeout(() => {
      dispatch(setSavingState(SAVING_STATE.IDLE));
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [dispatch]);

  return (
    <Container>
      <Icon src={savedTick} alt="saved" />
      <Message>{t(translations.TargetsManagement.ChangesSaved)}</Message>
    </Container>
  );
}
