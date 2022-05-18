import {
  CloseIcon,
  Icon,
  ModalHeaderContainer,
  Title,
} from "./modal-header.styles";
import closeIcon from "../../../assets/img/Close.svg";

type ModalHeaderProps = {
  onClose: () => void;
  icon?: string;
  title: string;
};

export default function ModalHeader({
  onClose,
  icon,
  title,
}: ModalHeaderProps) {
  return (
    <ModalHeaderContainer>
      {icon && <Icon src={icon} alt="icon" />}
      <Title>{title}</Title>
      <CloseIcon src={closeIcon} alt="close icon" onClick={onClose} />
    </ModalHeaderContainer>
  );
}
