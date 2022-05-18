import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";

export type SortFieldOption = {
  value: "required" | "alphabetical" | "default";
  label: string;
};

type SortFieldState = {
  selectedOption: SortFieldOption["value"];
  sortOptions: SortFieldOption[];
};

type SortFieldUpdater = {
  setSelectedOption: Dispatch<SetStateAction<SortFieldOption["value"]>>;
};

const SortFieldStateContext = createContext<SortFieldState | undefined>(
  undefined
);

const SortFieldUpdaterContext = createContext<SortFieldUpdater | undefined>(
  undefined
);

type SortFieldContextProviderProps = {
  children: React.ReactNode;
};

const SortFieldContextProvider = ({
  children,
}: SortFieldContextProviderProps) => {
  const { t } = useTranslation();

  const sortOptions: SortFieldOption[] = [
    {
      value: "required",
      label: t(translations.SyncTool.Required),
    },
    {
      value: "alphabetical",
      label: t(translations.SyncTool.Alphabetically),
    },
    {
      value: "default",
      label: t(translations.SyncTool.DefaultOrder),
    },
  ];

  const [selectedOption, setSelectedOption] =
    useState<SortFieldState["selectedOption"]>("required");

  return (
    <SortFieldStateContext.Provider
      value={{
        selectedOption,
        sortOptions,
      }}
    >
      <SortFieldUpdaterContext.Provider value={{ setSelectedOption }}>
        {children}
      </SortFieldUpdaterContext.Provider>
    </SortFieldStateContext.Provider>
  );
};

const useSortFieldState = () => {
  const sortFieldState = useContext(SortFieldStateContext);
  if (typeof sortFieldState === "undefined") {
    throw new Error(
      "useSortFieldState must be used within a SortFieldContextProvider"
    );
  }
  return sortFieldState;
};

const useSortFieldUpdaterState = () => {
  const sortFieldUpdaterState = useContext(SortFieldUpdaterContext);
  if (typeof sortFieldUpdaterState === "undefined") {
    throw new Error(
      "useSortFieldUpdaterState must be used within a SortFieldContextProvider"
    );
  }
  return sortFieldUpdaterState;
};

export {
  SortFieldContextProvider,
  useSortFieldState,
  useSortFieldUpdaterState,
};
