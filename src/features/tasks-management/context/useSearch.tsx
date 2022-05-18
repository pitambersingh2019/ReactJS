import { createContext, useContext, useMemo, useState } from "react";
import { Task } from "../ts";
import useDebounce from "../hooks/useDebounce";

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

export default function useSearch(tasks: Task[]) {
  const { searchValue } = useSearchContext();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const filteredTask = useMemo(() => {
    const SEARCH_KEYS = [
      "SubjectTrans",
      "AssigneeDisplayName",
      "Text",
      "ID",
    ] as const;
    return debouncedSearchValue
      ? tasks?.filter((task) =>
          SEARCH_KEYS.some((key) =>
            task[key]
              ?.toString()
              .toLowerCase()
              .includes(debouncedSearchValue.toLowerCase())
          )
        )
      : debouncedSearchValue === ""
      ? tasks
      : null;
  }, [debouncedSearchValue, tasks]);

  return { filteredTask };
}
