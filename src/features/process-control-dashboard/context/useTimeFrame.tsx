import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";

export type TimeOption = {
  label: string;
  value:
    | "CurrentJob"
    | "CurrentShift"
    | "CurrentDay"
    | "Hour"
    | "Day"
    | "Yesterday"
    | "Week"
    | "Month"
    | "Year"
    | "Custom";
};

type TimeFrameOptionState = {
  timeFrameSelectedOption: TimeOption;
  setTimeFrameSelectedOption: (option: TimeOption) => void;
  timeFrameOptions: TimeOption[];
};

type TimeFrameContextProviderProps = {
  children: React.ReactNode;
};

const TimeFrameContext = createContext<TimeFrameOptionState | undefined>(
  undefined
);

const TimeFrameContextProvider = ({
  children,
}: TimeFrameContextProviderProps) => {
  const { t } = useTranslation();

  const timeFrameOptions: TimeOption[] = [
    {
      label: t(translations.ProcessControlDashboard.CurrentJob),
      value: "CurrentJob",
    },
    {
      label: t(translations.ProcessControlDashboard.CurrentShift),
      value: "CurrentShift",
    },
    {
      label: t(translations.ProcessControlDashboard.CurrentDay),
      value: "CurrentDay",
    },
    {
      label: t(translations.ProcessControlDashboard.Hour),
      value: "Hour",
    },
    {
      label: t(translations.ProcessControlDashboard.Last24Hours),
      value: "Day",
    },
    {
      label: t(translations.ProcessControlDashboard.Yesterday),
      value: "Yesterday",
    },
    {
      label: t(translations.ProcessControlDashboard.Last7Days),
      value: "Week",
    },
    {
      label: t(translations.ProcessControlDashboard.Custom),
      value: "Custom",
    },
  ];

  const [timeFrameSelectedOption, setTimeFrameSelectedOption] = useState<
    TimeFrameOptionState["timeFrameSelectedOption"]
  >({
    label: t(translations.ProcessControlDashboard.CurrentShift),
    value: "CurrentShift",
  });

  return (
    <TimeFrameContext.Provider
      value={{
        timeFrameSelectedOption,
        setTimeFrameSelectedOption,
        timeFrameOptions,
      }}
    >
      {children}
    </TimeFrameContext.Provider>
  );
};

const useTimeFrame = () => {
  const context = useContext(TimeFrameContext);
  if (context === undefined) {
    throw new Error(
      "useTimeFrame must be used within the TimeFrameContextProvider"
    );
  }

  return context;
};

export { TimeFrameContextProvider, useTimeFrame };
