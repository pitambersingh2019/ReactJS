import { Status, Task } from "../../ts";
import AddAssignee from "./AddAssignee/AddAssignee";
import Assignee from "./Assignee/Assignee";
import Description from "./Description/Description";
import Level from "./Level/Level";
import Overdue from "./Overdue/Overdue";
import { StripedCard, StyledCard } from "./card.styles";
import { Draggable } from "react-beautiful-dnd";
import NoEntry from "./NoEntry/NoEntry";
import { useTaskModal } from "../../context/useTaskModal";
import React from "react";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import NewLabel from "./NewLabel/NewLabel";
import { useNewTaskId } from "../../context/useNewTaskId";
import { useStackBy } from "../../context/useStackBy";
import TaskStatus from "./Status/Status";
import SubjectRow from "./SubjectRow/SubjectRow";
import SubSubject from "./SubSubject/SubSubject";
import TaskId from "./TaskId/TaskId";
import { isStartOverdue } from "../../utils/date-time-helpers";
import TopRow from "./TopRow/TopRow";
import { loadStateLang } from "../../../../AppStart";

type CardProps = {
  task: Task;
  index: number;
  isDropDisabled: boolean;
};

function Card({ task, index, isDropDisabled }: CardProps) {
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();
  const { newTaskId } = useNewTaskId();
  const { stackBySelectedOption } = useStackBy();

  const isNewTask = newTaskId === task.ID;

  const isCreator = currentUserId === task.TaskCreateUser;
  const isAssignee = task.Assignee === currentUserId;

  const statusDisabled = (level3 || level2) && !isAssignee && !isCreator;

  const isOverdue = task.EndTimeException === 1 || isStartOverdue(task);

  const isDragDisabled =
    (stackBySelectedOption === "status" &&
      (task.TaskStatus === Status.Unassigned || !task.AssigneeDisplayName)) ||
    (statusDisabled &&
      stackBySelectedOption !== "priority" &&
      stackBySelectedOption !== "subject");

  const isSmallMargin = stackBySelectedOption === "assignee" && !task.Assignee;

  const { onModalOpen } = useTaskModal();

  const handleCardClick = () => {
    //open task modal only when add assignee modal is closed
    const addAssignee = document.getElementById("add-assignee");
    !addAssignee && onModalOpen(task);
  };

  const lang = JSON.parse(loadStateLang());

  return task.isEmpty ? (
    <StripedCard />
  ) : (
    <Draggable
      draggableId={task.TaskID.toString()}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <StyledCard
          isOverdue={isOverdue}
          isUnassigned={isDragDisabled}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleCardClick}
        >
          <TopRow task={task} />
          {stackBySelectedOption === "subject" && (
            <TaskStatus status={Status[task.TaskStatus]} />
          )}
          {!task.AssigneeDisplayName && <AddAssignee task={task} />}
          {stackBySelectedOption === "assignee" ? (
            <TaskStatus status={Status[task.TaskStatus]} />
          ) : task.AssigneeDisplayName ? (
            <Assignee name={task.AssigneeDisplayName} />
          ) : null}
          {stackBySelectedOption !== "subject" ? (
            <SubjectRow
              subject={task.SubjectTrans}
              subSubject={task.SubSubjects && task.SubSubjects[0].Text}
              isSmallMargin={isSmallMargin || isOverdue}
            />
          ) : (
            <SubSubject
              subSubject={task.SubSubjects && task.SubSubjects[0].Text}
              withTopMargin={task.AssigneeDisplayName !== null && !isOverdue}
            />
          )}
          <Description description={task.Text} />
          {task.TaskLevel && (
            <Level
              level={task.LevelName}
              name={lang === "eng" ? task.EName : task.LName}
              isSmallMargin={isSmallMargin}
            />
          )}
          {isOverdue ? <Overdue /> : null}
          {snapshot.isDragging &&
          isDropDisabled &&
          snapshot.draggingOver !== "Canceled" &&
          snapshot.draggingOver !== "To Do" ? (
            <NoEntry />
          ) : null}
          {isNewTask ? <NewLabel /> : <TaskId taskId={task.ID} />}
        </StyledCard>
      )}
    </Draggable>
  );
}

// function areEqual(prevProps: CardProps, nextProps: CardProps) {
//   console.log("PREV", prevProps);
//   console.log("NEXT", nextProps);
//   return true;
// }

export default React.memo(Card);

// export default Card;
