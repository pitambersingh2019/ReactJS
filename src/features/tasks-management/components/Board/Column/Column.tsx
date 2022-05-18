import { Droppable } from "react-beautiful-dnd";
import { useStackBy } from "../../../context/useStackBy";
import { Task } from "../../../ts";
import Card from "../../Card/Card";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import { ColumnContainer } from "./column.styles";

type ColumnProps = {
  header: string;
  tasks: Task[];
  isDoneDisabled: boolean;
  isColumnDropDisabled: boolean;
};

export default function Column({
  header,
  tasks,
  isDoneDisabled,
  isColumnDropDisabled,
}: ColumnProps) {
  const { stackBySelectedOption } = useStackBy();
  const isUnassigned =
    header === "Unassigned" && stackBySelectedOption !== "assignee";
  const notEmptyTasks = tasks.filter((task) => !task.isEmpty);

  const isDropDisabled =
    isColumnDropDisabled || (isDoneDisabled && header === "Done");

  return (
    <Droppable
      droppableId={header}
      isDropDisabled={isDropDisabled || isUnassigned}
    >
      {(provided, snapshot) => (
        <ColumnContainer
          isUnassigned={isUnassigned}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <ColumnHeader
            title={header}
            count={notEmptyTasks.length}
            isDraggingOver={snapshot.isDraggingOver}
          />
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <Card
                task={task}
                key={task.TaskID}
                index={index}
                isDropDisabled={
                  isDoneDisabled &&
                  header === "In Progress" &&
                  !snapshot.isDraggingOver
                }
              />
            ))}
          {provided.placeholder}
        </ColumnContainer>
      )}
    </Droppable>
  );
}
