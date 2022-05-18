import { createContext, useContext, useState } from "react";
import { Task } from "../ts";

type TaskModalState = {
  opened: boolean;
  activeTask: Task | undefined;
  onModalOpen: (task?: Task) => void;
  onModalClose: () => void;
};

type TaskModalContextProviderProps = {
  children: React.ReactNode;
};

const TaskModalContext = createContext<TaskModalState | undefined>(undefined);

const TaskModalContextProvider = ({
  children,
}: TaskModalContextProviderProps) => {
  const [opened, setOpened] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);

  const onModalClose = () => {
    setOpened(false);
    setActiveTask(undefined);
  };

  const onModalOpen = (task?: Task) => {
    setOpened(true);
    setActiveTask(task);
  };

  return (
    <TaskModalContext.Provider
      value={{ opened, activeTask, onModalClose, onModalOpen }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};

const useTaskModal = () => {
  const context = useContext(TaskModalContext);
  if (context === undefined) {
    throw new Error(
      "useTaskModal must be used within the TaskModalContextProvider"
    );
  }

  return context;
};

export { TaskModalContextProvider, useTaskModal };
