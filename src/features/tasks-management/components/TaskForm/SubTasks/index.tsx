import AddSubTask from "./AddSubTask/AddSubTask";
import SubTasksList from "./SubTasksList/SubTasksList";
import { useState } from "react";
import SubTaskInput from "./SubTaskInput/SubTaskInput";
import { Status, SubTask } from "../../../ts";
import SubTasksTitle from "./SubTasksTitle/SubTasksTitle";
import { Wrapper } from "./styles";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import useDeleteTaskStep from "../../../hooks/useDeleteTaskStep";
import { useTaskForm } from "../../../context/useTaskForm";
import { useTaskModal } from "../../../context/useTaskModal";

export default function SubTasks() {
  const [showInput, setShowInput] = useState(false);
  const [newSubTasks, setNewSubTasks] = useState<number[]>([]);

  const { creatorId, subTasks, setSubtasks } = useTaskForm();
  const { activeTask } = useTaskModal();

  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const { deleteTaskStep } = useDeleteTaskStep();

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  //can't mark subtasks if status is Done, or level2 or level3 and is not creator for a task status = canceled
  const uncheckNotAllowed =
    activeTask?.TaskStatus === Status.Done ||
    (activeTask?.TaskStatus === Status.Canceled && isDisabled);

  const assigneeId = activeTask?.Assignee;
  const isAssignee = assigneeId ? assigneeId === currentUserId : true;

  const onAddSubTask = () => {
    !isDisabled && setShowInput(true);
  };

  const generateId = (): number => {
    if (subTasks) {
      const maxId = Math.max(...subTasks.map((st) => st.ID), 0);
      return maxId + 1;
    } else {
      return 0;
    }
  };

  const onSaveSubTask = (text: string) => {
    const newId = generateId();
    setNewSubTasks((prevState) => [...prevState, newId]);
    const newSubTask: SubTask = { ID: newId, Text: text, IsOpen: true };
    if (subTasks) {
      const updatedSubTasks: SubTask[] = [...subTasks, newSubTask];
      setSubtasks(updatedSubTasks);
    } else {
      setSubtasks([{ ...newSubTask }]);
    }
    setShowInput(false);
  };

  const onDeleteNewSubTask = () => {
    setShowInput(false);
  };

  const onEditSubTask = ({
    taskId,
    text,
    isOpen,
  }: {
    taskId: SubTask["ID"];
    text: SubTask["Text"];
    isOpen: SubTask["IsOpen"];
  }) => {
    if (subTasks) {
      const updatedSubTasks = subTasks.map((st) =>
        st.ID === taskId
          ? {
              ...st,
              Text: text,
              IsOpen: isOpen,
            }
          : st
      );
      setSubtasks(updatedSubTasks);
    }
  };

  const onDeleteSubTask = async (subtaskId: number) => {
    if (!newSubTasks.includes(subtaskId)) {
      await deleteTaskStep(subtaskId);
    }
    if (subTasks) {
      const updatedSubTasks = [...subTasks].filter((st) => st.ID !== subtaskId);
      setSubtasks(updatedSubTasks);
      setNewSubTasks(newSubTasks.filter((id) => id !== subtaskId));
    }
  };

  const subTasksNames = subTasks?.map((st) => st.Text);

  return (
    <div>
      <SubTasksTitle />
      <Wrapper>
        {subTasks && subTasks.length ? (
          <SubTasksList
            subTasks={subTasks}
            onDeleteSubTask={onDeleteSubTask}
            onEditSubTask={onEditSubTask}
            isDisabled={isDisabled}
            isAssignee={isAssignee}
            uncheckNotAllowed={uncheckNotAllowed}
          />
        ) : null}
        {showInput && (
          <SubTaskInput
            onSaveSubTask={onSaveSubTask}
            subTasksCount={subTasks?.length}
            onDeleteSubTask={onDeleteNewSubTask}
            existingNames={subTasksNames}
          />
        )}
        <AddSubTask
          handleClick={onAddSubTask}
          hidden={showInput}
          isDisabled={isDisabled || uncheckNotAllowed}
        />
      </Wrapper>
    </div>
  );
}
