import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import { ReferenceRecipeOption } from "../../../../../ts";
import Tooltip from "../../../../shared/Tooltip";
import {
  AlternativeRecipe,
  Label,
  LabelContainer,
} from "./product-recipe-label.styles";

type ProductRecipeLabelProps = {
  onShowModal: () => void;
  selectedOption: ReferenceRecipeOption | undefined;
};

export default function ProductRecipeModalLabel({
  onShowModal,
  selectedOption,
}: ProductRecipeLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const isOverflowActive = () => {
    if (textRef.current) {
      return textRef.current.offsetWidth < textRef.current.scrollWidth;
    }
    return false;
  };

  const handleHover = () => {
    setShowTooltip(isOverflowActive());
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  const { t } = useTranslation();

  const isAlternative = selectedOption?.recipeRefType === 6;
  return (
    <LabelContainer
      onClick={onShowModal}
      onMouseEnter={handleHover}
      onMouseLeave={hideTooltip}
    >
      {isAlternative && (
        <AlternativeRecipe>
          {t(translations.JobRecipe.AlternativeRecipe)}:
        </AlternativeRecipe>
      )}
      <Label isAlternative={isAlternative} ref={textRef}>
        {selectedOption?.label}
      </Label>
      {showTooltip && (
        <Tooltip text={selectedOption?.label || ""} position="BOTTOM" />
      )}
    </LabelContainer>
  );
}
