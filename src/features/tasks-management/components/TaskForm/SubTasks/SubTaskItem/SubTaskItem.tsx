import {
  StyledCheckbox,
  StyledItemContainer,
  StyledPencil,
  StyledText,
} from "./subtask-item.styles";
import checkbox from "../../../../../../assets/icons/tasks-management/checkbox_default.svg";
import checkboxChecked from "../../../../../../assets/icons/checkbox-checked-purple.svg";
import pencil from "../../../../../../assets/icons/tasks-management/edit.svg";
import { useState } from "react";
import SubTaskInput from "../SubTaskInput/SubTaskInput";
import { SubTask } from "../../../../ts";

type SubTaskItemProps = {
  taskId: SubTask["ID"];
  text: SubTask["Text"];
  isOpen: SubTask["IsOpen"];
  onDeleteSubTask: () => void;
  onEditSubTask: ({
    taskId,
    text,
    isOpen,
  }: {
    taskId: SubTask["ID"];
    text: SubTask["Text"];
    isOpen: SubTask["IsOpen"];
  }) => void;
  isDisabled: boolean;
  isAssignee: boolean;
  uncheckNotAllowed: boolean;
};

export default function SubTaskItem({
  taskId,
  text,
  onDeleteSubTask,
  onEditSubTask,
  isOpen,
  isDisabled,
  isAssignee,
  uncheckNotAllowed,
}: SubTaskItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (value: string) => {
    onEditSubTask({ taskId, text: value, isOpen });
    setIsEditing(false);
  };

  //level2 or level3, not a creator, not an assignee - can't mark subtasks, plus if the current status is done
  const checkBoxDisabled = (isDisabled && !isAssignee) || uncheckNotAllowed;

  const toggleCheckbox = () => {
    !checkBoxDisabled && onEditSubTask({ taskId, text, isOpen: !isOpen });
  };

  if (isEditing) {
    return (
      <SubTaskInput
        initValue={text}
        onDeleteSubTask={onDeleteSubTask}
        onSaveSubTask={handleEdit}
      />
    );
  }

  return (
    <StyledItemContainer
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <StyledCheckbox
        src={isOpen ? checkbox : checkboxChecked}
        alt="checkbox"
        onClick={toggleCheckbox}
        checkboxDisabled={checkBoxDisabled}
      />
      <StyledText isCrossed={!isOpen}>{text}</StyledText>
      {!isDisabled && !uncheckNotAllowed && (
        <StyledPencil
          src={pencil}
          alt="pencil icon"
          isVisible={isHovering}
          onClick={() => setIsEditing(true)}
        />
      )}
    </StyledItemContainer>
  );
}
