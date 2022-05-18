import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import CreateDashboardButton from "./CreateDashboardButton";
import { HeaderContainer, Row, Title } from "./styles";
import Total from "./Total";

type HeaderProps = {
  count: number;
};

export default function Header({ count }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <Row>
        <Title>
          {t(translations.ProcessControlDashboard.ProcessControlDashboards)}
        </Title>
        <CreateDashboardButton />
      </Row>
      <Total count={count} />
    </HeaderContainer>
  );
}
