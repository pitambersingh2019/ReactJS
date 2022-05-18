import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CustomTimeFrameState = {
  dates: {
    customStartDate: Date | null;
    customEndDate: Date | null;
  };
  setDates: Dispatch<
    SetStateAction<{
      customStartDate: Date | null;
      customEndDate: Date | null;
    }>
  >;
};

type CustomTimeFrameContextProviderProps = {
  children: React.ReactNode;
};

const CustomTimeFrameContext = createContext<CustomTimeFrameState | undefined>(
  undefined
);

const CustomTimeFrameContextProvider = ({
  children,
}: CustomTimeFrameContextProviderProps) => {
  const [dates, setDates] = useState<CustomTimeFrameState["dates"]>({
    customStartDate: null,
    customEndDate: null,
  });

  return (
    <CustomTimeFrameContext.Provider
      value={{
        dates,
        setDates,
      }}
    >
      {children}
    </CustomTimeFrameContext.Provider>
  );
};

const useCustomTimeFrame = () => {
  const context = useContext(CustomTimeFrameContext);
  if (context === undefined) {
    throw new Error(
      "useCustomTimeFrame must be used within the CustomTimeFrameContextProvider"
    );
  }

  return context;
};

export { CustomTimeFrameContextProvider, useCustomTimeFrame };
