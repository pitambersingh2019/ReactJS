import { createContext, useContext, useMemo, useState } from "react";
import { Dashboard, PCDisplay, PCParam } from "../ts";

type SearchState = {
  searchValue: string;
  handleSearchInputChange: (value: string) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchState | undefined>(undefined);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <SearchContext.Provider value={{ searchValue, handleSearchInputChange }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within the SearchContextProvider"
    );
  }

  return context;
};

export { SearchContextProvider, useSearchContext };

export default function useSearch(dashboards: Dashboard[]) {
  const { searchValue } = useSearchContext();
  const valueLowerCase = searchValue.toLowerCase();

  const foundDashboards = useMemo(() => {
    if (searchValue === "") {
      return dashboards;
    }

    const SEARCH_KEYS = ["DashboardName"] as const;

    const foundPcDisplays = (pcDisplays: PCParam[]) => {
      return pcDisplays.some(
        (d) =>
          d.MachineName.toLowerCase().includes(valueLowerCase) ||
          d.ParamDisplayName.toLowerCase().includes(valueLowerCase) ||
          d.DepartmentName.toLowerCase().includes(valueLowerCase)
      );
    };
    const foundDisplayParams = (displays: PCDisplay[]) => {
      return displays.some((display) => {
        return foundPcDisplays(display.PCParams);
      });
    };
    return dashboards.filter(
      (dashboard) =>
        SEARCH_KEYS.some((key) =>
          dashboard[key]?.toString().toLowerCase().includes(valueLowerCase)
        ) || foundDisplayParams(dashboard.PCDisplays)
      // ||
      // foundDisplayParams(dashboard.spcDisplays)
    );
  }, [dashboards, searchValue, valueLowerCase]);

  return { foundDashboards };
}
