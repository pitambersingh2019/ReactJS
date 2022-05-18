import HighchartsReact from "highcharts-react-official";
import React, {
  useCallback,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";

type ChartsState = {
  charts: Map<string, React.RefObject<HighchartsReact.RefObject>>;
  setRef: (key?: string) => React.RefObject<HighchartsReact.RefObject>;
  getRef: (
    key: string
  ) => React.RefObject<HighchartsReact.RefObject> | undefined | void;
};

type ChartsContextProviderProps = {
  children: React.ReactNode;
};

const ChartsContext = createContext<ChartsState | undefined>(undefined);

const ChartsContextProvider = ({ children }: ChartsContextProviderProps) => {
  const initState = new Map<
    string,
    React.RefObject<HighchartsReact.RefObject>
  >();
  const [charts, setCharts] =
    useState<Map<string, React.RefObject<HighchartsReact.RefObject>>>(
      initState
    );
  const chartsSize = useRef(0);

  const setRef = useCallback((key?: string) => {
    const chartKey = key ? key : `chart${chartsSize.current}`;
    const ref = React.createRef<HighchartsReact.RefObject>();
    setCharts((prev) => {
      const prevCharts = new Map(prev);
      return prevCharts.set(chartKey, ref);
    });
    chartsSize.current++;
    return ref;
  }, []);

  const getRef = useCallback(
    (key: string) => {
      if (!key) {
        throw new Error("useCharts: Cannot get ref without key");
      }
      return charts.get(key) as React.RefObject<HighchartsReact.RefObject>;
    },
    [charts]
  );

  return (
    <ChartsContext.Provider
      value={{
        charts,
        setRef,
        getRef,
      }}
    >
      {children}
    </ChartsContext.Provider>
  );
};

const useCharts = () => {
  const context = useContext(ChartsContext);
  if (context === undefined) {
    throw new Error("useCharts must be used within the ChartsContextProvider");
  }

  return context;
};

export { ChartsContextProvider, useCharts };
