import { createContext, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";

type DisplayTypeOption = {
  value: 1 | 2;
  label: string;
  name: "SPC" | "PC";
};

type DisplayTypeState = {
  displayTypeOptions: DisplayTypeOption[];
  selectedDisplayType: DisplayTypeOption | undefined;
  setSelectedDisplayType: (option: DisplayTypeOption | undefined) => void;
};

type DisplayTypeContextProviderProps = {
  children: React.ReactNode;
};

const DisplayTypeContext = createContext<DisplayTypeState | undefined>(
  undefined
);

const DisplayTypeContextProvider = ({
  children,
}: DisplayTypeContextProviderProps) => {
  const { t } = useTranslation();

  const displayTypeOptions: DisplayTypeOption[] = useMemo(
    () => [
      {
        value: 1,
        label: t(translations.ProcessControlDashboard.ProcessControlDisplay),
        name: "PC",
      },
      // {
      //   value: 2,
      //   label: t(translations.ProcessControlDashboard.SPCDisplay),
      //   name: "SPC",
      // },
    ],
    [t]
  );

  const [selectedDisplayType, setSelectedDisplayType] = useState<
    DisplayTypeOption | undefined
  >(displayTypeOptions[0]);

  return (
    <DisplayTypeContext.Provider
      value={{
        displayTypeOptions,
        selectedDisplayType,
        setSelectedDisplayType,
      }}
    >
      {children}
    </DisplayTypeContext.Provider>
  );
};

const useDisplayType = () => {
  const context = useContext(DisplayTypeContext);
  if (context === undefined) {
    throw new Error(
      "useDisplayType must be used within the DisplayTypeContextProvider"
    );
  }

  return context;
};

export { DisplayTypeContextProvider, useDisplayType };
