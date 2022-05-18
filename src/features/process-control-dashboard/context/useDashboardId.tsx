import { createContext, useContext, useState } from "react";

type DashboardIdState = {
  newDashboardId: number | undefined;
  setNewDashboardId: (id: number | undefined) => void;
  updatedDashboardId: number | undefined;
  setUpdatedDashboardId: (id: number | undefined) => void;
};

type DashboardIdContextProviderProps = {
  children: React.ReactNode;
};

const DashboardIdContext = createContext<DashboardIdState | undefined>(
  undefined
);

const DashboardIdContextProvider = ({
  children,
}: DashboardIdContextProviderProps) => {
  const [newDashboardId, setNewDashboardId] =
    useState<DashboardIdState["newDashboardId"]>(undefined);
  const [updatedDashboardId, setUpdatedDashboardId] =
    useState<DashboardIdState["updatedDashboardId"]>(undefined);

  return (
    <DashboardIdContext.Provider
      value={{
        newDashboardId,
        setNewDashboardId,
        updatedDashboardId,
        setUpdatedDashboardId,
      }}
    >
      {children}
    </DashboardIdContext.Provider>
  );
};

const useDashboardId = () => {
  const context = useContext(DashboardIdContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardId must be used within the DashboardIdContextProvider"
    );
  }

  return context;
};

export { DashboardIdContextProvider, useDashboardId };
