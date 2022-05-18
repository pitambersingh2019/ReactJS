import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SearchFieldState = {
  searchValue: string;
};

type SearchFieldUpdater = {
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const SearchFieldStateContext = createContext<SearchFieldState | undefined>(
  undefined
);

const SearchFieldUpdaterContext = createContext<SearchFieldUpdater | undefined>(
  undefined
);

type SearchFieldContextProviderProps = {
  children: React.ReactNode;
};

const SearchFieldContextProvider = ({
  children,
}: SearchFieldContextProviderProps) => {
  const [searchValue, setSearchValue] =
    useState<SearchFieldState["searchValue"]>("");

  return (
    <SearchFieldStateContext.Provider
      value={{
        searchValue,
      }}
    >
      <SearchFieldUpdaterContext.Provider value={{ setSearchValue }}>
        {children}
      </SearchFieldUpdaterContext.Provider>
    </SearchFieldStateContext.Provider>
  );
};

const useSearchFieldState = () => {
  const searchFieldState = useContext(SearchFieldStateContext);
  if (typeof searchFieldState === "undefined") {
    throw new Error(
      "useSearchFieldState must be used within a SearchFieldContextProvider"
    );
  }
  return searchFieldState;
};

const useSearchFieldUpdaterState = () => {
  const searchFieldUpdaterState = useContext(SearchFieldUpdaterContext);
  if (typeof searchFieldUpdaterState === "undefined") {
    throw new Error(
      "useSearchFieldUpdaterState must be used within a SearchFieldContextProvider"
    );
  }
  return searchFieldUpdaterState;
};

export {
  SearchFieldContextProvider,
  useSearchFieldState,
  useSearchFieldUpdaterState,
};
