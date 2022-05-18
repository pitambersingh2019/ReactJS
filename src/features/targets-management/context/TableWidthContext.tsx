import { createContext, useContext, useState } from "react";

type TableWidthState = {
  tableWidth: number | undefined;
  setTableWidth: (value: number | undefined) => void;
};

type TableWidthProviderProps = {
  children: React.ReactNode;
};

const TableWidth = createContext<TableWidthState | undefined>(undefined);

const TableWidthProvider = ({ children }: TableWidthProviderProps) => {
  const [tableWidth, setTableWidth] = useState<number | undefined>(undefined);

  return (
    <TableWidth.Provider value={{ tableWidth, setTableWidth }}>
      {children}
    </TableWidth.Provider>
  );
};

const useTableWidth = () => {
  const context = useContext(TableWidth);
  if (context === undefined) {
    throw new Error("useTableWidth must be used within an TableWidthProvider");
  }
  return context;
};

export { TableWidthProvider, useTableWidth };
