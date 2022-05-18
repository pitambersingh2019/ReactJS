import { useTranslation } from "react-i18next";
import saving from "../../../../assets/icons/saving.svg";
import { translations } from "../../../../locales/translations";
import {
  SpinningIcon,
  StyledContainer,
  StyledMessage,
} from "./saving-changes.styles";

export default function SavingChanges() {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <SpinningIcon src={saving} alt="saving" />
      <StyledMessage>
        {t(translations.TargetsManagement.SavingChanges)}
      </StyledMessage>
    </StyledContainer>
  );
}
