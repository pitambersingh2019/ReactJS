import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { Spinner, SpinnerContainer, Text } from "./charts-spinner.styles";

export default function ChartsSpinner() {
  const { t } = useTranslation();
  return (
    <SpinnerContainer>
      <Spinner />
      <Text>{t(translations.ProcessControlDashboard.LoadingNewData)}...</Text>
    </SpinnerContainer>
  );
}
