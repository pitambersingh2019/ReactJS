import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import savedTick from "../../../../assets/icons/saved-tick.svg";
import { translations } from "../../../../locales/translations";
import {
  SAVING_STATE,
  useUpdateMessageContext,
} from "../../context/UpdateMessageContext";
import {
  StyledContainer,
  StyledIcon,
  StyledMessage,
} from "./changes-saved.styles";

export default function ChangesSaved() {
  const { setSaving } = useUpdateMessageContext();
  const { t } = useTranslation();

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSaving(SAVING_STATE.IDLE);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <StyledContainer>
      <StyledIcon src={savedTick} alt="saved" />
      <StyledMessage>
        {t(translations.TargetsManagement.ChangesSaved)}
      </StyledMessage>
    </StyledContainer>
  );
}
