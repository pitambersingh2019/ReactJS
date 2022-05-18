import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import {
  CardMenuModalContainer,
  ActionIcon,
  ItemLabel,
  ModalItem,
} from "./card-menu.styles";
import pencilIcon from "../../../../../assets/icons/edit_thin_pencil.svg";
import duplicateIcon from "../../../../../assets/icons/Duplicate.svg";
import deleteIcon from "../../../../../assets/icons/tasks-management/delete.svg";

type CardMenuModalProps = {
  isCreatedByOthers?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  hideModal: () => void;
};

export default function CardMenuModal({
  isCreatedByOthers,
  onEdit,
  onDelete,
  onDuplicate,
  hideModal,
}: CardMenuModalProps) {
  const { t } = useTranslation();

  const onEditClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    hideModal();
    onEdit();
  };

  const onDuplicateClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    hideModal();
    onDuplicate();
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    hideModal();
    onDelete();
  };

  const MENU_OPTIONS = [
    {
      label: t(translations.ProcessControlDashboard.Edit),
      icon: () => <ActionIcon src={pencilIcon} alt="Edit icon" />,
      onClick: onEditClick,
    },
    {
      label: t(translations.ProcessControlDashboard.Duplicate),
      icon: () => <ActionIcon src={duplicateIcon} alt="Copy icon" />,
      onClick: onDuplicateClick,
      showOnlyForCreatedByOthers: true,
    },
    {
      label: t(translations.ProcessControlDashboard.Delete),
      icon: () => <ActionIcon src={deleteIcon} alt="Delete icon" />,
      onClick: onDeleteClick,
    },
  ];
  return (
    <CardMenuModalContainer>
      {MENU_OPTIONS.filter((option) =>
        isCreatedByOthers ? option.showOnlyForCreatedByOthers : option
      ).map(({ label, icon: Icon, onClick }) => (
        <ModalItem onClick={onClick} key={label}>
          <Icon />
          <ItemLabel>{label}</ItemLabel>
        </ModalItem>
      ))}
    </CardMenuModalContainer>
  );
}
