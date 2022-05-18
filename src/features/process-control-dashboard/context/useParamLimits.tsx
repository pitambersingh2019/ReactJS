import { createContext, useContext, useState } from "react";

type ShowParamLimitsState = {
  isShowParamLimitsEnabled: boolean;
  toggleShowParamLimitsEnabled: () => void;
};

type ShowParamLimitsContextProviderProps = {
  children: React.ReactNode;
};

const ShowParamLimitsContext = createContext<ShowParamLimitsState | undefined>(
  undefined
);

const ShowParamLimitsContextProvider = ({
  children,
}: ShowParamLimitsContextProviderProps) => {
  const [isShowParamLimitsEnabled, setShowParamLimitsEnabled] =
    useState<boolean>(false);

  const toggleShowParamLimitsEnabled = () => {
    setShowParamLimitsEnabled((prev) => !prev);
  };

  return (
    <ShowParamLimitsContext.Provider
      value={{
        isShowParamLimitsEnabled,
        toggleShowParamLimitsEnabled,
      }}
    >
      {children}
    </ShowParamLimitsContext.Provider>
  );
};

const useShowParamLimits = () => {
  const context = useContext(ShowParamLimitsContext);
  if (context === undefined) {
    throw new Error(
      "useShowParamLimits must be used within the ShowParamLimitsContextProvider"
    );
  }

  return context;
};

export { ShowParamLimitsContextProvider, useShowParamLimits };
