import { createContext, useContext, useEffect, useState, useRef } from "react";
import { api } from "../../api/api";
const ValuesContext = createContext(undefined);

const ValuesContextProvider = ({ children }) => {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const activePromiseRef = useRef(false);

  const fetchValues = () => {
    if (!activePromiseRef.current) {
      activePromiseRef.current = (async () => {
        try {
          setIsLoading(true);
          setError(undefined);
          setValues(undefined);
          const values = await api
            .get("GetAllKpiTargetValues")
            .then((res) => res.data);
          setValues(values);
          setError();
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
          activePromiseRef.current = false;
        }
      })();
    }

    return activePromiseRef.current;
  };

  useEffect(() => {
    fetchValues();
  }, []);

  return (
    <ValuesContext.Provider value={{ values, fetchValues, isLoading, error }}>
      {children}
    </ValuesContext.Provider>
  );
};

const useValues = () => {
  const context = useContext(ValuesContext);
  if (context === undefined) {
    throw new Error(
      "useValuesContext must be used within an ValuesContextProvider"
    );
  }

  return context;
};

export { ValuesContextProvider, useValues };
