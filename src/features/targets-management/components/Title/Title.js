import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import {
  SAVING_STATE,
  useUpdateMessageContext,
} from "../../context/UpdateMessageContext";
import ChangesSaved from "../ChangesSaved/ChangesSaved";
import SavingChanges from "../SavingChanges/SavingChanges";
import { StyledSubtitle, StyledTitle, TitleContainer } from "./title.styles";

export default function Title() {
  const { saving } = useUpdateMessageContext();
  const { t } = useTranslation();
  return (
    <>
      <TitleContainer>
        <StyledTitle>{t(translations.TargetsManagement.Title)}</StyledTitle>
        {saving === SAVING_STATE.SAVING ? (
          <SavingChanges />
        ) : saving === SAVING_STATE.SAVED ? (
          <ChangesSaved />
        ) : null}
      </TitleContainer>
      <StyledSubtitle>
        {t(translations.TargetsManagement.Subtitle)}
      </StyledSubtitle>
    </>
  );
}
