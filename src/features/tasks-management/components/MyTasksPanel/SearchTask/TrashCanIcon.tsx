import trashCanIcon from "../../../../../assets/icons/tasks-management/delete.svg";
import disabledTrashCanIcon from "../../../../../assets/icons/tasks-management/delete-disabled.svg";
import { DeleteIcon, DisabledDeleteIcon } from "./search-task.styles";

type TrashIconProps = {
  onClear: () => void;
  isDisabled: boolean;
};

export default function TrashCanIcon({ onClear, isDisabled }: TrashIconProps) {
  return isDisabled ? (
    <DisabledDeleteIcon src={disabledTrashCanIcon} alt="trash can icon" />
  ) : (
    <DeleteIcon src={trashCanIcon} alt="trash can icon" onClick={onClear} />
  );
}
