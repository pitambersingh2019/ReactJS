import {
  CloseIcon,
  Input,
  SearchIcon,
  SearchTasksContainer,
  Wrapper,
} from "./search-task.styles";
import searchIcon from "../../../../../assets/icons/tasks-management/search.svg";
import closeIcon from "../../../../../assets/icons/tasks-management/close.svg";

import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useState } from "react";
import { useSearchContext } from "../../../context/useSearch";
import TrashCanIcon from "./TrashCanIcon";

type SearchTasksProps = {
  onClose: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export default function SearchTasks({
  onClose,
  searchValue,
  setSearchValue,
}: SearchTasksProps) {
  const [isFocused, setIsFocused] = useState(false);

  const { t } = useTranslation();
  const { handleSearchInputChange } = useSearchContext();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearchInputChange(e.target.value);
  };

  const onClear = () => {
    setSearchValue("");
    handleSearchInputChange("");
  };

  const isValueEmpty = searchValue === "";
  return (
    <Wrapper>
      <SearchTasksContainer>
        {!isFocused && isValueEmpty && (
          <SearchIcon src={searchIcon} alt="search icon" />
        )}
        <Input
          placeholder={
            !isFocused ? t(translations.TasksManagement.SearchTasks) : ""
          }
          value={searchValue}
          onChange={onValueChange}
          onFocus={() => setIsFocused(true)}
        />
        {isFocused && (
          <TrashCanIcon onClear={onClear} isDisabled={isValueEmpty} />
        )}
      </SearchTasksContainer>
      <CloseIcon src={closeIcon} alt="Close icon" onClick={onClose} />
    </Wrapper>
  );
}
