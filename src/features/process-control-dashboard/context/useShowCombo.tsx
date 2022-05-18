import { createContext, useContext, useState } from "react";

type ShowComboState = {
  showCombo: boolean | undefined;
  setShowCombo: (show: boolean) => void;
};

type ShowComboContextProviderProps = {
  children: React.ReactNode;
};

const ShowComboContext = createContext<ShowComboState | undefined>(undefined);

const ShowComboContextProvider = ({
  children,
}: ShowComboContextProviderProps) => {
  const [showCombo, setShowCombo] = useState<boolean | undefined>(undefined);

  return (
    <ShowComboContext.Provider
      value={{
        showCombo,
        setShowCombo,
      }}
    >
      {children}
    </ShowComboContext.Provider>
  );
};

const useShowCombo = () => {
  const context = useContext(ShowComboContext);
  if (context === undefined) {
    throw new Error(
      "useShowCombo must be used within the ShowComboContextProvider"
    );
  }

  return context;
};

export { ShowComboContextProvider, useShowCombo };
