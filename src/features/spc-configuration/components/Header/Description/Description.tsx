import { useTranslation } from "react-i18next";

import { translations } from "../../../../../locales/translations";
import { StyledDescription } from "./description.styles";

const Description: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledDescription>
      {t(translations.SPC.SELECT_MACHINES_DESCRIPTION)}
    </StyledDescription>
  );
};

export default Description;
