import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import {
  ColumnTitle,
  FirstColumnHeader,
  IconsContainer,
  MapTableHeaderContainer,
  SearchIcon,
} from "./map-table-header.styles";
import searchIcon from "../../../assets/img/Quick_search.svg";

import Sort from "./Sort/Sort";
import SearchBar from "./SearchBar/SearchBar";

type MapTableHeaderProps = {
  tableName: string;
};

export default function MapTableHeader({ tableName }: MapTableHeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const onShowSearchBar = () => {
    setShowSearchBar(true);
  };

  const onHideSearchBar = () => {
    setShowSearchBar(false);
  };

  const { t } = useTranslation();
  return (
    <MapTableHeaderContainer>
      {!showSearchBar ? (
        <FirstColumnHeader>
          <ColumnTitle>
            {tableName} {t(translations.SyncTool.Columns)}
          </ColumnTitle>
          <IconsContainer>
            <Sort />
            <SearchIcon
              src={searchIcon}
              alt="search icon"
              onClick={onShowSearchBar}
            />
          </IconsContainer>
        </FirstColumnHeader>
      ) : (
        <SearchBar onClose={onHideSearchBar} />
      )}
      <ColumnTitle>{t(translations.SyncTool.YourFileColumns)}</ColumnTitle>
    </MapTableHeaderContainer>
  );
}
