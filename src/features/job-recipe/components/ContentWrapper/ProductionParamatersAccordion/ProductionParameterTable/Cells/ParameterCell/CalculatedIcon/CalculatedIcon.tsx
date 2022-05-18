import { CalcIcon, Container } from "./calculated-icon.styles";
import calcIcon from "../../../../../../../../../assets/icons/Auto_Calculated.svg";
import { useState } from "react";
import Tooltip from "../../../../../../shared/Tooltip";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../../../locales/translations";

export default function CalculatIcon() {
  const [showTooltip, setShowTooltip] = useState(false);

  const onShowTooltip = () => {
    setShowTooltip(true);
  };

  const onHideTooltip = () => {
    setShowTooltip(false);
  };

  const { t } = useTranslation();

  return (
    <Container>
      <CalcIcon
        src={calcIcon}
        alt="calculated icon"
        onMouseEnter={onShowTooltip}
        onMouseLeave={onHideTooltip}
      />
      {showTooltip && <Tooltip text={t(translations.JobRecipe.Calculated)} />}
    </Container>
  );
}
