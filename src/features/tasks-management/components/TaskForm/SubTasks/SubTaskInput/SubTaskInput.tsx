import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import checkbox from "../../../../../../assets/icons/tasks-management/checkbox_disabled.svg";
import deleteIcon from "../../../../../../assets/icons/tasks-management/delete.svg";
import { translations } from "../../../../../../locales/translations";
import DeleteSubtaskModal from "../DeleteSubtaskModal/DeleteSubtaskModal";
import {
  CheckBox,
  Container,
  DeleteIcon,
  StyledInput,
  StyledSave,
} from "./subtask-input.styles";

type SubTaskInputProps = {
  onSaveSubTask: (value: string) => void;
  onDeleteSubTask: () => void;
  subTasksCount?: number;
  initValue?: string;
  existingNames?: string[];
};

export default function SubTaskInput({
  onSaveSubTask,
  subTasksCount,
  onDeleteSubTask,
  initValue,
  existingNames,
}: SubTaskInputProps) {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const inputElement = useRef<HTMLInputElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    e.target.select();

  const handleSaveSubTask = () => {
    if (value.trim().length > 1) {
      onSaveSubTask(value);
      setSelected(false);
    }
  };

  const onModalOpen = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const translatedSubTask = t(translations.TasksManagement.SubTask);

    const createName = () => {
      let start = 0;
      let result = "";

      do {
        result = (start < 10 ? "0" : "") + (start + 1);
        start++;
      } while (existingNames?.includes(`${translatedSubTask} ${result}`));
      return result;
    };

    const getCountWithPadding = (count?: number) => {
      let stNumber = "";
      if (!count) {
        stNumber = "01";
      } else {
        stNumber = (count < 10 ? "0" : "") + (count + 1);
      }
      if (!existingNames?.includes(`${translatedSubTask} ${stNumber}`)) {
        return stNumber;
      } else {
        return createName();
      }
    };

    if (initValue) {
      setValue(initValue);
    } else {
      const numberWithPadding = getCountWithPadding(subTasksCount);
      setValue(`${translatedSubTask} ${numberWithPadding}`);
    }

    setSelected(true);
  }, [subTasksCount, initValue, existingNames, t]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [selected]);

  return (
    <Container>
      <CheckBox src={checkbox} alt="checkbox" />
      {selected ? (
        <StyledInput
          ref={inputElement}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
        />
      ) : (
        <StyledInput value={value} onChange={(e) => setValue(e.target.value)} />
      )}
      <StyledSave onClick={handleSaveSubTask}>
        {t(translations.TasksManagement.SaveSubTask)}
      </StyledSave>
      <DeleteIcon src={deleteIcon} alt="delete icon" onClick={onModalOpen} />
      <DeleteSubtaskModal
        isOpen={showModal}
        handleClose={onModalClose}
        onDelete={onDeleteSubTask}
      />
    </Container>
  );
}
