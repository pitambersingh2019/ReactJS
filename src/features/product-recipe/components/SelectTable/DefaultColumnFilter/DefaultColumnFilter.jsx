import React from "react";
import {
  ContainerInput,
  InputFieldStyled,
  IconStyled,
} from "./default-column-filter.styles";
import SearchIcon from "../../../../../assets/icons/SearchIcon.svg";
import CloseIcon from "../../../../../assets/icons/closeIcon.svg";

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  // preFilteredRows
  return (
    <ContainerInput>
      {!filterValue && <IconStyled title={"Search"} src={SearchIcon} />}
      <InputFieldStyled
        value={filterValue || ""}
        placeholder=""
        type={"text"}
        onChange={(e) => setFilter(e.target.value || undefined)}
      />
      {filterValue && (
        <IconStyled
          title={"Close"}
          src={CloseIcon}
          onClick={() => setFilter(undefined)}
        />
      )}
    </ContainerInput>
  );
};

export default DefaultColumnFilter;
