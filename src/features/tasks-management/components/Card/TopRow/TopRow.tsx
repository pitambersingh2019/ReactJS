import { useStackBy } from "../../../context/useStackBy";
import { Status, Task, TaskLevel } from "../../../ts";
import AttachedFiles from "../AttachedFiles/AttachedFiles";
import Comments from "../Comments/Comments";
import OpenedSubtasks from "../OpenedSubtasks/OpenedSubtasks";
import Priority from "../Priority/Priority";
import TaskStatus from "../Status/Status";
import { TopRowContainer, TopRowRightContainer } from "./top-row.styles";

type TopRowProps = {
  task: Task;
};

export default function TopRow({ task }: TopRowProps) {
  const { stackBySelectedOption } = useStackBy();

  const {
    TaskPriorityID,
    TaskPriorityTrans,
    NumOfOpenSubTasks,
    HasSubTasks,
    NumOfFiles,
    NumOfComments,
  } = task;

  const showSubTasks = HasSubTasks > 0;
  const showAttached = NumOfFiles > 0;
  const showComments = NumOfComments > 0;

  const isSmallMargin =
    stackBySelectedOption === "subject" ||
    (!task.Assignee && task.TaskLevel === TaskLevel.Machine);

  return (
    <TopRowContainer smallMargin={isSmallMargin}>
      {stackBySelectedOption === "priority" ? (
        <TaskStatus status={Status[task.TaskStatus]} />
      ) : (
        <Priority label={TaskPriorityTrans} priority={TaskPriorityID} />
      )}
      <TopRowRightContainer>
        {showSubTasks && (
          <OpenedSubtasks opened={NumOfOpenSubTasks} total={HasSubTasks} />
        )}
        {showAttached && <AttachedFiles numOfFiles={NumOfFiles} />}
        {showComments && <Comments numOfComments={NumOfComments} />}
      </TopRowRightContainer>
    </TopRowContainer>
  );
}
