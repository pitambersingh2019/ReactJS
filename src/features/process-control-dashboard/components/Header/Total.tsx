import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { TotalContainer } from "./styles";

type TotalProps = {
  count: number;
};

export default function Total({ count }: TotalProps) {
  const { t } = useTranslation();

  return (
    <TotalContainer>
      {count} {t(translations.ProcessControlDashboard.Total)}
    </TotalContainer>
  );
}
