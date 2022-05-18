import infoIcon from "../../../../../assets/img/info.svg";
import { useState } from "react";
import {
  FieldDescriptionContainer,
  InfoIcon,
  InfoTooltip,
} from "./field-description.styles";

type FieldDescriptionProps = {
  description: string | null;
};

export default function FieldDescription({
  description,
}: FieldDescriptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const onShowTooltip = () => {
    setShowTooltip(true);
  };

  const onHideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <FieldDescriptionContainer>
      <InfoIcon
        src={infoIcon}
        alt="info icon"
        onMouseEnter={onShowTooltip}
        onMouseLeave={onHideTooltip}
      />
      {showTooltip && <InfoTooltip>{description}</InfoTooltip>}
    </FieldDescriptionContainer>
  );
}
