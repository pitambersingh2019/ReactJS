import { DeleteIconContainer } from "./delete-icon.styles";
import deleteIcon from "../../../../../assets/icons/tasks-management/delete.svg";

type DeleteIconProps = {
  onDelete: () => void;
};

export default function DeleteIcon({ onDelete }: DeleteIconProps) {
  const handleDeleteDisplay = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <DeleteIconContainer
      src={deleteIcon}
      alt="Delete icon"
      onClick={handleDeleteDisplay}
    />
  );
}
