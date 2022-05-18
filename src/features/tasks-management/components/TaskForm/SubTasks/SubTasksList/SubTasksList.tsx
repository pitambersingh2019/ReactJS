import { SubTask } from "../../../../ts";
import SubTaskItem from "../SubTaskItem/SubTaskItem";

type SubTasksListProps = {
  subTasks: SubTask[];
  onDeleteSubTask: (taskId: SubTask["ID"]) => void;
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

export default function SubTasksList({
  subTasks,
  onDeleteSubTask,
  onEditSubTask,
  isDisabled,
  isAssignee,
  uncheckNotAllowed,
}: SubTasksListProps) {
  return (
    <div>
      {subTasks.map((item) => (
        <SubTaskItem
          taskId={item.ID}
          text={item.Text}
          key={item.ID}
          onDeleteSubTask={() => onDeleteSubTask(item.ID)}
          onEditSubTask={onEditSubTask}
          isOpen={item.IsOpen}
          isDisabled={isDisabled}
          isAssignee={isAssignee}
          uncheckNotAllowed={uncheckNotAllowed}
        />
      ))}
    </div>
  );
}
