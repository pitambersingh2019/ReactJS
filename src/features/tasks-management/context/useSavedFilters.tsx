import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APISavedFilters, APIStatus, Filter } from "../ts";
import { parseSavedFilters } from "../utils";

type SavedFiltersState = {
  savedFilters: Filter[] | undefined;
  fetchSavedFilters: () => void;
  status: APIStatus;
  error: unknown | undefined;
};

type SavedFiltersContextProviderProps = {
  children: React.ReactNode;
};

const SavedFiltersContext = createContext<SavedFiltersState | undefined>(
  undefined
);

const SavedFiltersContextProvider = ({
  children,
}: SavedFiltersContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [savedFilters, setSavedFilters] = useState<Filter[] | undefined>(
    undefined
  );
  const [error, setError] = useState<unknown>(undefined);

  const fetchSavedFilters = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APISavedFilters>(API_URLS.getSavedFilters, {
          SourceTaskCreationPlatform: 1,
        })
        .then((res) => res.data);
      const parsedFilters = parseSavedFilters(values.Data);
      setSavedFilters(parsedFilters);
      setStatus("success");
      setError(undefined);
      if (values.error) {
        setError(values.error.ErrorMessage);
        setStatus("error");
      }
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, []);

  return (
    <SavedFiltersContext.Provider
      value={{ savedFilters, fetchSavedFilters, status, error }}
    >
      {children}
    </SavedFiltersContext.Provider>
  );
};

const useSavedFilters = () => {
  const context = useContext(SavedFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useSavedFilters must be used within the SavedFiltersContextProvider"
    );
  }

  return context;
};

export { SavedFiltersContextProvider, useSavedFilters };
