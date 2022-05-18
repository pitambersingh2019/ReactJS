import {
  ArrowIcon,
  CustomOptionItemContainer,
  Label,
  Row,
} from "./custom-option-item.styles";
import arrowDropdown from "../../../../../../../assets/icons/Arowdropdown.svg";
import { useState } from "react";
import ManualInputs from "../ManualInputs/ManualInputs";

type CustomOptionItemProps = {
  isSelected: boolean;
  label: string;
  onCloseModal: () => void;
};

export default function CustomOptionItem({
  isSelected,
  label,
  onCloseModal,
}: CustomOptionItemProps) {
  const [showManualInput, setShowManualInput] = useState(false);

  const onClose = () => {
    setShowManualInput(false);
    onCloseModal();
  };

  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
  };

  return (
    <CustomOptionItemContainer>
      <Row onClick={toggleManualInput}>
        <Label isSelected={isSelected}>{label}</Label>
        <ArrowIcon src={arrowDropdown} alt="arrow icon" />
      </Row>
      {showManualInput && <ManualInputs onClose={onClose} />}
    </CustomOptionItemContainer>
  );
}
