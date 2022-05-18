import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { CloseIcon, Container, Label } from "./styles";
import closeIcon from "../../../../../assets/icons/tasks-management/close-modal.svg";

type HeaderProps = {
  onFilterClose: () => void;
};

export default function Header({ onFilterClose }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Container>
      <Label>{t(translations.TasksManagement.Filters)}</Label>
      <CloseIcon src={closeIcon} alt="close icon" onClick={onFilterClose} />
    </Container>
  );
}
