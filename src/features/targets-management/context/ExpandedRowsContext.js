import { createContext, useContext, useState } from "react";

const ExpandedRowsContext = createContext(undefined);

const ExpandedRowsContextProvider = ({ children }) => {
  //factory level row expanded by default
  const [expandedRows, setExpandedRows] = useState({
    0: true,
  });

  return (
    <ExpandedRowsContext.Provider value={{ expandedRows, setExpandedRows }}>
      {children}
    </ExpandedRowsContext.Provider>
  );
};

const useExpandedRowsContext = () => {
  const context = useContext(ExpandedRowsContext);
  if (context === undefined) {
    throw new Error(
      "useExpandedRowsContext must be used within an ExpandedRowsContextProvider"
    );
  }
  return context;
};

export { ExpandedRowsContextProvider, useExpandedRowsContext };
