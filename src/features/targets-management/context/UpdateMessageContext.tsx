import { createContext, useContext, useState } from "react";

type UpdateMessageContextState = {
  saving: string;
  setSaving: (state: string) => void;
};

const UpdateMessageContext = createContext<
  UpdateMessageContextState | undefined
>(undefined);

export const SAVING_STATE = {
  IDLE: "IDLE",
  SAVING: "SAVING",
  SAVED: "SAVED",
};

type UpdateMessageContextProviderProps = {
  children: React.ReactNode;
};

const UpdateMessageContextProvider = ({
  children,
}: UpdateMessageContextProviderProps) => {
  const [saving, setSaving] = useState(SAVING_STATE.IDLE);

  return (
    <UpdateMessageContext.Provider value={{ saving, setSaving }}>
      {children}
    </UpdateMessageContext.Provider>
  );
};

const useUpdateMessageContext = () => {
  const context = useContext(UpdateMessageContext);
  if (context === undefined) {
    throw new Error(
      "useUpdateMessageContext must be used within an UpdateMessageContextProvider"
    );
  }
  return context;
};

export { UpdateMessageContextProvider, useUpdateMessageContext };
