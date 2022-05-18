import {
  SearchBarContainer,
  InputField,
  CloseIcon,
  CancelButton,
  SearchIcon,
  InputContainer,
  HiddenPlaceholder,
  InputFieldContainer,
} from "./search-bar.styles";
import searchIcon from "../../../../assets/img/Search.svg";
import closeIcon from "../../../../assets/img/Close.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useAppSelector } from "../../../../redux/hooks";
import { selectSelectedInterface } from "../../../../redux/selectors";
import {
  useSearchFieldState,
  useSearchFieldUpdaterState,
} from "../../../../context/SearchFieldContext";

type SearchBarProps = {
  onClose: () => void;
};

export default function SearchBar({ onClose }: SearchBarProps) {
  const selectedInterface = useAppSelector(selectSelectedInterface);

  const { searchValue } = useSearchFieldState();
  const { setSearchValue } = useSearchFieldUpdaterState();

  const onClear = () => {
    setSearchValue("");
  };

  const onCancel = () => {
    setSearchValue("");
    onClose();
  };

  const { t } = useTranslation();

  const placeholder = `${t(translations.SyncTool.SearchFor)} ${
    selectedInterface?.name
  } ${t(translations.SyncTool.Columns)}`;

  return (
    <SearchBarContainer>
      <InputContainer>
        {!searchValue && <SearchIcon src={searchIcon} alt="search icon" />}
        <InputFieldContainer>
          {/* set input field width to match the placeholder width */}
          <HiddenPlaceholder aria-hidden="true">
            {placeholder}
          </HiddenPlaceholder>
          <InputField
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputFieldContainer>
        {searchValue && (
          <CloseIcon src={closeIcon} alt="close icon" onClick={onClear} />
        )}
      </InputContainer>
      <CancelButton onClick={onCancel}>
        {t(translations.SyncTool.Cancel)}
      </CancelButton>
    </SearchBarContainer>
  );
}
