import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { HeaderContainer, Subtitle, Title } from "./header.styles";

export default function Header() {
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <Title>
        {t(translations.QuantityTargetsManagement.QuantityTargetsManagement)}
      </Title>
      <Subtitle>
        {t(translations.QuantityTargetsManagement.HeaderSubtitle)}
      </Subtitle>
    </HeaderContainer>
  );
}
