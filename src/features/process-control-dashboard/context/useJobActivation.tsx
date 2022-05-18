import { createContext, useContext, useState } from "react";

type JobActivationState = {
  isJobActivationEnabled: boolean;
  toggleJobActivationEnabled: () => void;
};

type JobActivationContextProviderProps = {
  children: React.ReactNode;
};

const JobActivationContext = createContext<JobActivationState | undefined>(
  undefined
);

const JobActivationContextProvider = ({
  children,
}: JobActivationContextProviderProps) => {
  const [isJobActivationEnabled, setJobActivationEnabled] =
    useState<boolean>(false);

  const toggleJobActivationEnabled = () => {
    setJobActivationEnabled((prev) => !prev);
  };

  return (
    <JobActivationContext.Provider
      value={{
        isJobActivationEnabled,
        toggleJobActivationEnabled,
      }}
    >
      {children}
    </JobActivationContext.Provider>
  );
};

const useJobActivation = () => {
  const context = useContext(JobActivationContext);
  if (context === undefined) {
    throw new Error(
      "useJobActivation must be used within the JobActivationContextProvider"
    );
  }

  return context;
};

export { JobActivationContextProvider, useJobActivation };
