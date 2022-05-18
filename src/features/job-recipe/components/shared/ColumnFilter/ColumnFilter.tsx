import {
  ColumnFilterContainer,
  SearchIcon,
  SearchInput,
} from "./column-filter.styles";
import searchIcon from "../../../../../assets/icons/SearchIcon.svg";
import { ColumnInstance } from "react-table";

type ColumnFilterProps = {
  column: ColumnInstance<{}>;
};

export default function ColumnFilter({
  column: { filterValue, setFilter },
}: ColumnFilterProps) {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <ColumnFilterContainer onClick={handleClick}>
      {!filterValue && <SearchIcon src={searchIcon} alt="search icon" />}
      <SearchInput
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      />
    </ColumnFilterContainer>
  );
}
