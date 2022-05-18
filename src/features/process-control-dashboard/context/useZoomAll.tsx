import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ZoomAllState = {
  zoomAll: boolean;
  setZoomAll: Dispatch<SetStateAction<boolean>>;
};

type ZoomAllContextProviderProps = {
  children: React.ReactNode;
};

const ZoomAllContext = createContext<ZoomAllState | undefined>(undefined);

const ZoomAllContextProvider = ({ children }: ZoomAllContextProviderProps) => {
  const [zoomAll, setZoomAll] = useState(false);

  return (
    <ZoomAllContext.Provider
      value={{
        zoomAll,
        setZoomAll,
      }}
    >
      {children}
    </ZoomAllContext.Provider>
  );
};

const useZoomAll = () => {
  const context = useContext(ZoomAllContext);
  if (context === undefined) {
    throw new Error(
      "useZoomAll must be used within the ZoomAllContextProvider"
    );
  }

  return context;
};

export { ZoomAllContextProvider, useZoomAll };
