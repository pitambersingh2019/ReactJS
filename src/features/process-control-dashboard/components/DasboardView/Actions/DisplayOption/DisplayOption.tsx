import {
  DisplayOptionContainer,
  Icon,
  Label,
  Tooltip,
} from "./display-option.styles";
import showIcon from "../../../../../../assets/icons/Show.svg";
import hideIcon from "../../../../../../assets/icons/Hide.svg";
import { useState } from "react";

type DisplayOptionProps = {
  text: string;
  isEnabled: boolean;
  onToggle: () => void;
  tooltipText: string;
};

export default function DisplayOption({
  text,
  isEnabled,
  onToggle,
  tooltipText,
}: DisplayOptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const onShowTooltip = () => {
    setShowTooltip(true);
  };

  const onHideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <DisplayOptionContainer
      onMouseEnter={onShowTooltip}
      onMouseLeave={onHideTooltip}
    >
      <Icon
        src={isEnabled ? showIcon : hideIcon}
        alt="hide show icon"
        onClick={onToggle}
      />
      <Label>{text}</Label>
      {showTooltip && <Tooltip>{tooltipText}</Tooltip>}
    </DisplayOptionContainer>
  );
}
