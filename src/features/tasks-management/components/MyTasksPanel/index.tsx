import TasksContextProviders from "../../context/TasksContextProviders";
import PanelWrapper from "./PanelWrapper/PanelWrapper";

type MyTasksPanelProps = {
  onUpdate?: () => void;
};

export default function MyTasksPanel({ onUpdate }: MyTasksPanelProps) {
  return (
    <TasksContextProviders>
      <PanelWrapper onUpdate={onUpdate} />
    </TasksContextProviders>
  );
}
