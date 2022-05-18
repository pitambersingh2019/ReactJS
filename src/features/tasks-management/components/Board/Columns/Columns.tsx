import { GroupedTasks, Status, Task, TaskPriority } from "../../../ts";
import Column from "../Column/Column";
import { ColumnsContainer } from "./columns.styles";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import useCreateTask from "../../../hooks/useCreateTask";
import { useTasks } from "../../../context/useTasks";
import { useEffect, useState } from "react";
import NotCompleteModal from "../Modals/NotCompleteModal";
import useColumnHeaders from "../../../hooks/useColumnHeaders";
import useDroppableColumns from "../../../hooks/useDroppableColumns";
import { useStackBy } from "../../../context/useStackBy";
import { useUsersForTask } from "../../../context/useUsersForTask";
import { useTaskObjects } from "../../../context/useTaskObjects";
import NoPermissionModal from "../Modals/NoPermissionModal";
import Spinner from "../../../../targets-management/components/Spinner/Spinner";

type ColumnsProps = {
  tasks: GroupedTasks;
};

export default function Columns({ tasks }: ColumnsProps) {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>();
  const [draggableTask, setDraggableTask] = useState<Task | undefined>(
    undefined
  );

  const [isDoneDisabled, setIsDoneDisabled] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [noPermissionModalIsOpen, setNoPermissionModalIsOpen] = useState(false);

  const { headers } = useColumnHeaders(tasks);
  const { stackBySelectedOption } = useStackBy();
  const { users } = useUsersForTask();
  const { activeSubjectItems } = useTaskObjects();

  const { allowedColumns } = useDroppableColumns(draggableTask, tasks);

  const getIsDropDisabled = (headerName: string) => {
    return !allowedColumns.includes(headerName);
  };

  useEffect(() => {
    setGroupedTasks(tasks);
  }, [tasks]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { createTask } = useCreateTask();
  const { tasks: initTasks, fetchTasks, status } = useTasks();

  const getDraggableTask = (start: Task[], draggableId: string) => {
    const draggableTask = start.find((t) => t.ID.toString() === draggableId);
    setDraggableTask(draggableTask);
  };

  const hasUncompletedSubtasks = (
    start: Task[],
    taskId: string | undefined
  ) => {
    const draggingTask = start.find((t) => t.ID === Number(taskId));
    return (
      draggingTask &&
      draggingTask.TaskStatus === Status["In Progress"] &&
      draggingTask.NumOfOpenSubTasks > 0
    );
  };

  const onDragStart = (initial: DragStart) => {
    setIsDoneDisabled(false);
    setNoPermissionModalIsOpen(false);

    if (initTasks && groupedTasks) {
      //fake empty temporary task
      const emptyTask: Task = {
        ...initTasks[0],
        ID: 9999999999,
        TaskID: 9999999999,
        isEmpty: true,
      };
      //temporary add empty task to the start column (to render striped card)
      const start = [...groupedTasks[initial.source.droppableId]];
      getDraggableTask(start, initial.draggableId);
      start.splice(initial.source.index, 0, emptyTask);
      setGroupedTasks((prev) => ({
        ...prev,
        [initial.source.droppableId]: start,
      }));
      //drop is disabled for done column if there are not completed subtasks and current status is in progress
      if (hasUncompletedSubtasks(start, initial.draggableId)) {
        setIsDoneDisabled(true);
      }
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!groupedTasks) return;

    const start = [...groupedTasks[source.droppableId]];
    if (start) {
      if (!destination) {
        //remove fake empty task
        const index = start.findIndex((obj) => obj.isEmpty); //find index of an empty task
        index > -1 && start.splice(index, 1);
        setGroupedTasks((prev) => ({
          ...prev,
          [source.droppableId]: start,
        }));
        if (isDoneDisabled) {
          openModal();
          return;
        }
        if (stackBySelectedOption !== "status") {
          setNoPermissionModalIsOpen(true);
        }
        return;
      }

      if (source.droppableId !== destination.droppableId) {
        const finish = groupedTasks[destination.droppableId] || [];
        if (draggableTask) {
          const updatedTask: Task = {
            ...draggableTask,
            ...(stackBySelectedOption === "status" && {
              TaskStatus:
                Status[destination.droppableId as keyof typeof Status],
            }),
            ...(stackBySelectedOption === "status" && {
              StatusName: Status[
                Status[destination.droppableId as keyof typeof Status]
              ] as keyof typeof Status,
            }),
            ...(stackBySelectedOption === "assignee" &&
              draggableTask.TaskStatus === Status.Unassigned && {
                TaskStatus: Status["To Do"],
                StatusName: Status[Status["To Do"]] as keyof typeof Status,
              }),
            ...(stackBySelectedOption === "assignee" && {
              AssigneeDisplayName: destination.droppableId,
              Assignee: users?.find(
                (user) => user.DisplayName === destination.droppableId
              )?.ID,
            }),
            ...(stackBySelectedOption === "priority" && {
              TaskPriorityID:
                TaskPriority[
                  destination.droppableId as keyof typeof TaskPriority
                ],
            }),
            ...(stackBySelectedOption === "subject" && {
              SubjectID: activeSubjectItems?.find(
                (sub) => sub.label === destination.droppableId
              )?.value,
            }),
            ...(stackBySelectedOption === "subject" && {
              SubjectTrans: destination.droppableId,
            }),
          };
          //remove draggable and empty tasks from the start column and add updated draggable to the destination column
          const index = start.findIndex((obj) => obj.isEmpty); //find index of an empty task
          index > -1 && start.splice(index, 1);
          start.splice(source.index, 1);
          finish.splice(destination.index, 0, updatedTask);
          setGroupedTasks((prev) => {
            return {
              ...prev,
              [source.droppableId]: start,
              [destination.droppableId]: finish,
            };
          });

          const onSuccess = () => {
            fetchTasks();
          };

          await createTask(updatedTask, onSuccess);
        }
      } else {
        //remove fake empty task
        const index = start.findIndex((obj) => obj.isEmpty); //find index of an empty task
        index > -1 && start.splice(index, 1);
        setGroupedTasks((prev) => ({
          ...prev,
          [source.droppableId]: start,
        }));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {status === "loading" && stackBySelectedOption === "assignee" ? (
        <Spinner />
      ) : (
        <ColumnsContainer>
          {headers.map((header) => (
            <Column
              header={header}
              key={headers.indexOf(header)}
              tasks={
                groupedTasks && groupedTasks[header] ? groupedTasks[header] : []
              }
              isDoneDisabled={isDoneDisabled}
              isColumnDropDisabled={getIsDropDisabled(header)}
            />
          ))}
        </ColumnsContainer>
      )}
      <NotCompleteModal isOpen={modalIsOpen} handleClose={closeModal} />
      <NoPermissionModal
        isOpen={noPermissionModalIsOpen}
        handleClose={() => setNoPermissionModalIsOpen(false)}
      />
    </DragDropContext>
  );
}
