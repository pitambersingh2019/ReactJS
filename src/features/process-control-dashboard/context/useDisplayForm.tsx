import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { Display, PCDisplay } from "../ts";

type DisplayFormState = {
  spcDisplay: Display;
  setSPCDisplay: Dispatch<SetStateAction<Display>>;
  pcDisplay: PCDisplay;
  setPCDisplay: Dispatch<SetStateAction<PCDisplay>>;
  setInitialSPCDisplayValues: (display: any | undefined) => void;
  setInitialPCDisplayValues: (display: PCDisplay | undefined) => void;
};

type DisplayFormContextProviderProps = {
  children: React.ReactNode;
};

const DisplayFormContext = createContext<DisplayFormState | undefined>(
  undefined
);

const DisplayFormContextProvider = ({
  children,
}: DisplayFormContextProviderProps) => {
  const [spcDisplay, setSPCDisplay] = useState<Display>({} as Display);
  const [pcDisplay, setPCDisplay] = useState<PCDisplay>({} as PCDisplay);

  const setInitialSPCDisplayValues = useCallback(
    (initSPCDisplay: Display | undefined) => {
      if (initSPCDisplay) {
        setSPCDisplay(initSPCDisplay);
      } else {
        setSPCDisplay({
          id: 0,
          name: "",
          selectedMachine: undefined,
          selectedParam: undefined,
        });
      }
    },
    []
  );

  const setInitialPCDisplayValues = useCallback(
    (initPCDisplay: PCDisplay | undefined) => {
      if (initPCDisplay) {
        setPCDisplay(initPCDisplay);
      } else {
        setPCDisplay({
          DisplayID: 0,
          DisplayName: "",
          PCParams: [],
          UpsertType: 2,
        });
      }
    },
    []
  );

  return (
    <DisplayFormContext.Provider
      value={{
        spcDisplay,
        setSPCDisplay,
        pcDisplay,
        setPCDisplay,
        setInitialSPCDisplayValues,
        setInitialPCDisplayValues,
      }}
    >
      {children}
    </DisplayFormContext.Provider>
  );
};

const useDisplayForm = () => {
  const context = useContext(DisplayFormContext);
  if (context === undefined) {
    throw new Error(
      "useDisplayForm must be used within the DisplayFormContextProvider"
    );
  }

  return context;
};

export { DisplayFormContextProvider, useDisplayForm };
