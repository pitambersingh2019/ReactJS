import { createContext, useContext, useState } from "react";

type ErrorContextState = {
  error: string | undefined;
  setError: (value: string | undefined) => void;
};

type ErrorContextProviderProps = {
  children: React.ReactNode;
};

const ErrorContext = createContext<ErrorContextState | undefined>(undefined);

const ErrorContextProvider = ({ children }: ErrorContextProviderProps) => {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error(
      "useErrorContext must be used within an ErrorContextProvider"
    );
  }
  return context;
};

export { ErrorContextProvider, useErrorContext };
