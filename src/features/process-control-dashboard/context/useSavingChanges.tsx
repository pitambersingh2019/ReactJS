import { createContext, useContext, useState } from "react";

type SavingChangesContextState = {
  saving: string;
  setSaving: (state: string) => void;
};

const SavingChangesContext = createContext<
  SavingChangesContextState | undefined
>(undefined);

export const SAVING_STATE = {
  IDLE: "IDLE",
  SAVING: "SAVING",
  SAVED: "SAVED",
};

type SavingChangesContextProviderProps = {
  children: React.ReactNode;
};

const SavingChangesContextProvider = ({
  children,
}: SavingChangesContextProviderProps) => {
  const [saving, setSaving] = useState(SAVING_STATE.IDLE);

  return (
    <SavingChangesContext.Provider value={{ saving, setSaving }}>
      {children}
    </SavingChangesContext.Provider>
  );
};

const useSavingChangesContext = () => {
  const context = useContext(SavingChangesContext);
  if (context === undefined) {
    throw new Error(
      "useSavingChangesContext must be used within an SavingChangesContextProvider"
    );
  }
  return context;
};

export { SavingChangesContextProvider, useSavingChangesContext };
