import { Icon, Label, UploadButtonContainer } from "./styles";
import attachIcon from "../../../../assets/icons/attach.svg";

type UploadButtonProps = {
  label: string;
  onButtonClick: () => void;
};

export default function UploadButton({
  label,
  onButtonClick,
}: UploadButtonProps) {
  return (
    <UploadButtonContainer onClick={onButtonClick}>
      <Icon src={attachIcon} alt="attach icon" />
      <Label>{label}</Label>
    </UploadButtonContainer>
  );
}
