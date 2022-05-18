import { FC } from "react";
import SearchComponent from "../../Search";
// @ts-ignore
import * as Styled from "./style";

interface IProps {
  value: string;
  onChange: (text: string) => void;
}

const SelectSearch: FC<IProps> = ({ value, onChange }) => {
  return (
    <Styled.SearchWrapper>
      <SearchComponent
        value={value}
        onChange={onChange}
        placeholder="Search..."
        border="all"
      />
    </Styled.SearchWrapper>
  );
};

export default SelectSearch;
