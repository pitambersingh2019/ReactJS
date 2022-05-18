import React, { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";
import { APIDashboards } from "../ts";

type DashboardsState = {
  fetchDashboards: (onSuccess?: () => void) => void;
  dashboards: APIDashboards["ResponseDictionaryValues"] | undefined;
  status: APIStatus;
  error: unknown;
};

type DashboardsContextProviderProps = {
  children: React.ReactNode;
};

const DashboardsContext = createContext<DashboardsState | undefined>(undefined);

const DashboardsContextProvider = ({
  children,
}: DashboardsContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [error, setError] = useState<unknown>(undefined);
  const [dashboards, setDashboards] = useState<
    APIDashboards["ResponseDictionaryValues"] | undefined
  >(undefined);

  const fetchDashboards = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APIDashboards>(API_URLS.getProcessControlDashboards)
        .then((res) => res.data);
      setDashboards(values.ResponseDictionaryValues);
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
    <DashboardsContext.Provider
      value={{
        dashboards,
        fetchDashboards,
        status,
        error,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  );
};

const useDashboards = () => {
  const context = useContext(DashboardsContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardsContext must be used within the DashboardsContextProvider"
    );
  }

  return context;
};

export { DashboardsContextProvider, useDashboards };
