import { useState } from "react";
import { useTranslation } from "react-i18next";
import info from "../../../../../assets/icons/info.svg";
import { translations } from "../../../../../locales/translations";
import { HeaderFixedContainer, InfoIcon, Tooltip } from "./header-fixed.styles";

export default function HeaderFixed() {
  const [showTooltip, setShowTooltip] = useState(false);

  const { t } = useTranslation();
  return (
    <HeaderFixedContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span>{t(translations.QuantityTargetsManagement.Fixed)}</span>
      <InfoIcon src={info} alt="info-icon" />
      {showTooltip && (
        <Tooltip>{t(translations.TargetsManagement.FixedTooltip)}</Tooltip>
      )}
    </HeaderFixedContainer>
  );
}
