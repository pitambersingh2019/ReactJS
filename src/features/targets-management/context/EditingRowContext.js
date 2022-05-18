import { createContext, useContext, useState } from "react";

const EditingRowContext = createContext(undefined);

const EditingRowContextProvider = ({ children }) => {
  const [editingRowId, setEditingRowId] = useState(-1);

  return (
    <EditingRowContext.Provider value={{ editingRowId, setEditingRowId }}>
      {children}
    </EditingRowContext.Provider>
  );
};

const useEditingRowContext = () => {
  const context = useContext(EditingRowContext);
  if (context === undefined) {
    throw new Error(
      "useEditingRowContext must be used within an EditingRowContextProvider"
    );
  }
  return context;
};

export { EditingRowContextProvider, useEditingRowContext };
