import { createContext, useContext, useState } from "react";

type EditingState = {
  editing: boolean | undefined;
  setEditing: (show: boolean) => void;
};

type EditingContextProviderProps = {
  children: React.ReactNode;
};

//to disable / enable Done button
const EditingContext = createContext<EditingState | undefined>(undefined);

const EditingContextProvider = ({ children }: EditingContextProviderProps) => {
  const [editing, setEditing] = useState<boolean | undefined>(undefined);

  return (
    <EditingContext.Provider
      value={{
        editing,
        setEditing,
      }}
    >
      {children}
    </EditingContext.Provider>
  );
};

const useEditing = () => {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error(
      "useEditing must be used within the EditingContextProvider"
    );
  }

  return context;
};

export { EditingContextProvider, useEditing };
