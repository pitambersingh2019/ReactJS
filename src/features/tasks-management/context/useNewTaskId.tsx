import { createContext, useContext, useState } from "react";

type NewTaskIdState = {
  newTaskId: number | undefined;
  setNewTaskId: (id: number | undefined) => void;
};

type NewTaskIdContextProviderProps = {
  children: React.ReactNode;
};

const NewTaskIdContext = createContext<NewTaskIdState | undefined>(undefined);

const NewTaskIdContextProvider = ({
  children,
}: NewTaskIdContextProviderProps) => {
  const [newTaskId, setNewTaskId] =
    useState<NewTaskIdState["newTaskId"]>(undefined);

  return (
    <NewTaskIdContext.Provider value={{ newTaskId, setNewTaskId }}>
      {children}
    </NewTaskIdContext.Provider>
  );
};

const useNewTaskId = () => {
  const context = useContext(NewTaskIdContext);
  if (context === undefined) {
    throw new Error(
      "useNewTaskId must be used within the NewTaskIdContextProvider"
    );
  }

  return context;
};

export { NewTaskIdContextProvider, useNewTaskId };
