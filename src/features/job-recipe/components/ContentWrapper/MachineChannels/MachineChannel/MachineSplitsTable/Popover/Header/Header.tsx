import closeIcon from "../../../../../../../../../assets/icons/closeIcon.svg";
import {
  CloseIcon,
  HeaderContainer,
  HeaderSubtitle,
  HeaderTitle,
} from "./header.styles";

type HeaderProps = {
  headerTitle: string;
  headerSubtitle: string;
  onClose: () => void;
};

export default function Header({
  headerTitle,
  headerSubtitle,
  onClose,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderTitle>{headerTitle}</HeaderTitle>
      <HeaderSubtitle>{headerSubtitle}</HeaderSubtitle>
      <CloseIcon src={closeIcon} alt="close icon" onClick={onClose} />
    </HeaderContainer>
  );
}
