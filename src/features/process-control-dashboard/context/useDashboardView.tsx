import { createContext, useContext, useState } from "react";
import { Dashboard } from "../ts";

type ActiveDashboard = Dashboard & { isCreatedByOthers: boolean };

type DashboardViewState = {
  showDashboardView: boolean;
  activeDashboard: ActiveDashboard | undefined;
  onShowDashboardView: (
    dashboard: Dashboard,
    isCreatedByOthers: boolean
  ) => void;
  onCloseDashboardView: () => void;
  resetDashboard: () => void;
};

type DashboardViewContextProviderProps = {
  children: React.ReactNode;
};

const DashboardViewContext = createContext<DashboardViewState | undefined>(
  undefined
);

const DashboardViewContextProvider = ({
  children,
}: DashboardViewContextProviderProps) => {
  const [showDashboardView, setShowDashboardView] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<
    ActiveDashboard | undefined
  >(undefined);

  const onCloseDashboardView = () => {
    setShowDashboardView(false);
    setActiveDashboard(undefined);
  };

  const onShowDashboardView = (
    dashboard: Dashboard,
    isCreatedByOthers: boolean
  ) => {
    const updatedDisplays = dashboard.PCDisplays.map((display) => ({
      ...display,
      PCParams: display.PCParams.filter((param) => param.UpsertType !== 1),
    }));
    Promise.resolve()
      .then(() => {
        setActiveDashboard({
          ...dashboard,
          PCDisplays: updatedDisplays,
          isCreatedByOthers,
        });
      })
      .then(() => {
        setShowDashboardView(true);
      });
  };

  const resetDashboard = () => {
    setActiveDashboard(undefined);
  };

  return (
    <DashboardViewContext.Provider
      value={{
        showDashboardView,
        activeDashboard,
        onCloseDashboardView,
        onShowDashboardView,
        resetDashboard,
      }}
    >
      {children}
    </DashboardViewContext.Provider>
  );
};

const useDashboardView = () => {
  const context = useContext(DashboardViewContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardView must be used within the DashboardViewContextProvider"
    );
  }

  return context;
};

export { DashboardViewContextProvider, useDashboardView };
