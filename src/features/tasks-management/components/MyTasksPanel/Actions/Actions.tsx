import { ActionsContainer, SideContainer, Wrapper } from "./styles";
import SearchTasks from "../SearchTask/SearchTasks";
import { useState } from "react";
import StackBy from "./StackBy";
import Search from "./Search";
import Filter from "./Filter";

type ActionsProps = {
  renderTasksPanelSortIcon: () => JSX.Element;
  onShowFilters: () => void;
};

export default function Actions({
  renderTasksPanelSortIcon,
  onShowFilters,
}: ActionsProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onSearchClick = () => {
    setShowSearch(true);
  };

  const onSearchClose = () => {
    setShowSearch(false);
  };

  return (
    <Wrapper>
      {!showSearch ? (
        <ActionsContainer>
          <Search onClick={onSearchClick} />
          <SideContainer>
            {renderTasksPanelSortIcon()}
            <StackBy />
            <Filter onShowFilters={onShowFilters} />
          </SideContainer>
        </ActionsContainer>
      ) : (
        <SearchTasks
          onClose={onSearchClose}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}
    </Wrapper>
  );
}
