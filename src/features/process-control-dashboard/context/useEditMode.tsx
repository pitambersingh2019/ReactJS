import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getCurrentUserId } from "../../tasks-management/utils";
import useSaveDashboard from "../hooks/useSaveDashboard";
import { Dashboard, Display, isPCDisplay, PCDisplay } from "../ts";
import { getRandomId } from "../utils/export-utils";

type EditModeState = {
  showEditMode: boolean;
  activeDashboard: Dashboard;
  setActiveDashboard: Dispatch<SetStateAction<Dashboard>>;
  onShowEditMode: (dashboard?: Dashboard) => void;
  onCloseEditMode: () => void;
  onDeleteDisplay: (displayId: number, type: "PC" | "SPC") => void;
  onAddPCDisplay: (pcDisplay: PCDisplay) => void;
};

type EditModeContextProviderProps = {
  children: React.ReactNode;
};

const EditModeContext = createContext<EditModeState | undefined>(undefined);

const EditModeContextProvider = ({
  children,
}: EditModeContextProviderProps) => {
  const emptyDashboard: Dashboard = useMemo(
    () => ({
      DashboardID: 0,
      DashboardName: "",
      PCDisplays: [],
      DashboardCreatorName: "",
      DashboardCreatorID: getCurrentUserId(),
    }),
    []
  );
  const [showEditMode, setShowEditMode] = useState(false);
  const [activeDashboard, setActiveDashboard] =
    useState<Dashboard>(emptyDashboard);

  const { saveDashboard } = useSaveDashboard();

  const onCloseEditMode = useCallback(() => {
    setShowEditMode(false);
    setActiveDashboard(emptyDashboard);
  }, [emptyDashboard]);

  const onShowEditMode = useCallback(
    (dashboard?: Dashboard) => {
      setShowEditMode(true);
      setActiveDashboard(dashboard || emptyDashboard);
    },
    [emptyDashboard]
  );

  const savedPCDisplays = activeDashboard.PCDisplays;
  // const savedSPCDisplays = activeDashboard.spcDisplays;

  const updatePCDisplay = useCallback(
    (pcDisplay: PCDisplay) => {
      const idx = savedPCDisplays.findIndex(
        (d) => d.DisplayID === pcDisplay.DisplayID
      );
      if (idx !== -1) {
        const updatedDisplays = [...savedPCDisplays];
        updatedDisplays[idx] = {
          ...pcDisplay,
          UpsertType: 3,
        };
        setActiveDashboard((prev) => ({
          ...prev,
          PCDisplays: updatedDisplays,
        }));
      }
    },
    [savedPCDisplays]
  );

  const onUpdateDisplay = useCallback(
    (display: Display | PCDisplay) => {
      if (isPCDisplay(display)) {
        updatePCDisplay(display);
      } else {
        // updateSPCDisplay(display);
      }
    },
    [updatePCDisplay]
  );

  const onAddPCDisplay = useCallback(
    (display: PCDisplay) => {
      if (display.DisplayID === 0) {
        setActiveDashboard((prev) => ({
          ...prev,
          PCDisplays: [
            ...prev.PCDisplays,
            { ...display, DisplayID: getRandomId(), UpsertType: 2 },
          ],
        }));
      } else {
        onUpdateDisplay(display);
      }
    },
    [onUpdateDisplay]
  );

  const onDeleteDisplay = useCallback(
    (displayId: number, type: "PC" | "SPC") => {
      if (type === "PC") {
        const updatedDisplays = [...savedPCDisplays].filter(
          (d) => d.DisplayID !== displayId
        );
        setActiveDashboard((prev) => ({
          ...prev,
          PCDisplays: updatedDisplays,
        }));

        const displays = savedPCDisplays.map((display) =>
          display.DisplayID === displayId
            ? { ...display, UpsertType: 1 as PCDisplay["UpsertType"] }
            : display
        );

        saveDashboard({ ...activeDashboard, PCDisplays: displays });
      } else {
        // const updatedDisplays = [...savedSPCDisplays].filter(
        //   (d) => d.id !== displayId
        // );
        // setActiveDashboard((prev) => ({
        //   ...prev,
        //   spcDisplays: updatedDisplays,
        // }));
      }
    },
    [activeDashboard, saveDashboard, savedPCDisplays]
  );

  return (
    <EditModeContext.Provider
      value={{
        showEditMode,
        activeDashboard,
        setActiveDashboard,
        onCloseEditMode,
        onShowEditMode,
        onDeleteDisplay,
        onAddPCDisplay,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error(
      "useEditMode must be used within the EditModeContextProvider"
    );
  }

  return context;
};

export { EditModeContextProvider, useEditMode };
