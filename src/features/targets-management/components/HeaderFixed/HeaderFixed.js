import { useTranslation } from "react-i18next";
import info from "../../../../assets/icons/info.svg";
import { translations } from "../../../../locales/translations";
import Tooltip from "../Tooltip/Tooltip";
import { StyledContainer } from "./header-fixed.styles.js";

export default function HeaderFixed() {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <span>{t(translations.TargetsManagement.Fixed)}</span>
      <Tooltip isWide text={t(translations.TargetsManagement.FixedTooltip)}>
        <img src={info} alt="info-icon" />
      </Tooltip>
    </StyledContainer>
  );
}
