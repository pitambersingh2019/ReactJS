import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";

export type StackByOption = {
  name: "status" | "assignee" | "priority" | "subject";
  value: string;
};

type StackByState = {
  stackBySelectedOption: StackByOption["name"];
  setStackBySelectedOption: (option: StackByOption["name"]) => void;
  stackByOptions: StackByOption[];
};

type StackByContextProviderProps = {
  children: React.ReactNode;
};

const StackByContext = createContext<StackByState | undefined>(undefined);

const StackByContextProvider = ({ children }: StackByContextProviderProps) => {
  const { t } = useTranslation();

  const stackByOptions: StackByOption[] = [
    {
      name: "status",
      value: t(translations.TasksManagement.Status),
    },
    {
      name: "assignee",
      value: t(translations.TasksManagement.Assignee),
    },
    {
      name: "priority",
      value: t(translations.TasksManagement.Priority),
    },
    {
      name: "subject",
      value: t(translations.TasksManagement.Subject),
    },
  ];

  const [stackBySelectedOption, setStackBySelectedOption] =
    useState<StackByState["stackBySelectedOption"]>("status");

  return (
    <StackByContext.Provider
      value={{
        stackBySelectedOption,
        setStackBySelectedOption,
        stackByOptions,
      }}
    >
      {children}
    </StackByContext.Provider>
  );
};

const useStackBy = () => {
  const context = useContext(StackByContext);
  if (context === undefined) {
    throw new Error(
      "useStackBy must be used within the StackByContextProvider"
    );
  }

  return context;
};

export { StackByContextProvider, useStackBy };
