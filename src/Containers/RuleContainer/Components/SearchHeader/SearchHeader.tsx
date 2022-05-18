import React, { useState } from "react";
//import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { SearchInCards } from "../../slice";
import { useDispatch } from "react-redux";
import {
  Searchheader,
  Searchheaderleft,
  Searchheaderrules,
  Searchheaderrulestitle,
  Searchheaderrulessubtitle,
  Searchheadersearch,
  Searchheaderright,
  Searchbutton,
  AddRuleTitle,
} from "./styles";
import { useDebounce } from "../../../../utils/CommonFunctions";
import InputSearchField from "../../../../Component/DesignSystem/SearchField";

interface SearchHeaderProps {
  handleCreateNewRule: () => void;
  countRules: number;
}

const SearchHeader: React.FC<SearchHeaderProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //const [focused, setFocused] = useState(false);
  // const onFocus = () => setFocused(true);
  // const onBlur = () => setFocused(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(
    (searchValue: string) => dispatch(SearchInCards(searchValue)),
    300
  );

  const handleSearch = (searchValue: string) => {
    debouncedSearch(searchValue);
    setSearch(searchValue);
  };

  return (
    <Searchheader>
      <Searchheaderleft>
        <Searchheaderrules>
          <Searchheaderrulestitle>
            {t(translations.RulesContainer.Title)}
          </Searchheaderrulestitle>
          <Searchheaderrulessubtitle>
            {t(translations.RulesContainer.ACTIVE)}: {props.countRules}
          </Searchheaderrulessubtitle>
        </Searchheaderrules>
        <Searchheadersearch>
          {/*{focused ? (*/}
          {/*  <></>*/}
          {/*) : (*/}
          {/*  <SearchIcon*/}
          {/*    style={{*/}
          {/*      fontSize: "25px",*/}
          {/*      color: "#757575",*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          <InputSearchField
            onChange={(text) => handleSearch(text)}
            placeholder={t(translations.RulesContainer.SearchRules)}
            value={search}
          />
          {/*<input*/}
          {/*  onChange={(e) => handleSearch(e.target.value)}*/}
          {/*  placeholder={*/}
          {/*    focused ? "" : t(translations.RulesContainer.SearchRules)*/}
          {/*  }*/}
          {/*  onClick={() => setFocused(true)}*/}
          {/*  onFocus={onFocus}*/}
          {/*  onBlur={onBlur}*/}
          {/*/>*/}
        </Searchheadersearch>
      </Searchheaderleft>
      <Searchheaderright>
        <Searchbutton onClick={() => props.handleCreateNewRule()}>
          <AddIcon className="AddIcon" />
          <AddRuleTitle>
            {t(translations.RulesContainer.CreateRule)}
          </AddRuleTitle>
        </Searchbutton>
      </Searchheaderright>
    </Searchheader>
  );
};

export default SearchHeader;
