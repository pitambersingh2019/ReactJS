import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ZoomedState = {
  isZoomed: number;
  setIsZoomed: Dispatch<SetStateAction<number>>;
};

type ZoomedContextProviderProps = {
  children: React.ReactNode;
};

const ZoomedContext = createContext<ZoomedState | undefined>(undefined);

const ZoomedContextProvider = ({ children }: ZoomedContextProviderProps) => {
  const [isZoomed, setIsZoomed] = useState(-1);

  return (
    <ZoomedContext.Provider
      value={{
        isZoomed,
        setIsZoomed,
      }}
    >
      {children}
    </ZoomedContext.Provider>
  );
};

const useZoomed = () => {
  const context = useContext(ZoomedContext);
  if (context === undefined) {
    throw new Error("useZoomed must be used within the ZoomedContextProvider");
  }

  return context;
};

export { ZoomedContextProvider, useZoomed };
