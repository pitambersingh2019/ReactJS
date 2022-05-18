import { TaskIdContainer } from "./task-id.styles";

type TaskIdProps = {
  taskId: number;
};

export default function TaskId({ taskId }: TaskIdProps) {
  return <TaskIdContainer>{taskId}</TaskIdContainer>;
}
