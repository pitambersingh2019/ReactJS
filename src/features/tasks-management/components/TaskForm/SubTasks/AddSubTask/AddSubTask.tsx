import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import icon from "../../../../../../assets/icons/plus-purple.svg";
import { StyledAddSubtask } from "./add-sub-task.styles";

type AddSubTaskProps = {
  handleClick: () => void;
  hidden: boolean;
  isDisabled: boolean;
};

export default function AddSubTask({
  handleClick,
  hidden,
  isDisabled,
}: AddSubTaskProps) {
  const { t } = useTranslation();

  const onClick = () => {
    !isDisabled && handleClick();
  };

  return (
    <StyledAddSubtask onClick={onClick} hidden={hidden} isDisabled={isDisabled}>
      <div className="add-subtask-button">
        <img src={icon} alt="add icon" />
        <span>{t(translations.TasksManagement.AddSubTask)}</span>
      </div>
    </StyledAddSubtask>
  );
}
