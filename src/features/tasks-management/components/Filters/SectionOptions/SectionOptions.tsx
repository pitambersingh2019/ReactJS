import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputSearchField from "../../../../../Component/DesignSystem/SearchField";
import { translations } from "../../../../../locales/translations";
import SectionOptionItem, {
  OptionItem,
  TopOption,
} from "../SectionOptionItem/SectionOptionItem";
import SectionTopOptionItem from "../SectionOptionItem/SectionTopOptionItem";
import {
  SearchWrapper,
  SectionOptionsContainer,
} from "./section-options.styles";

type SectionOptionsProps = {
  options: OptionItem[];
  topOption: TopOption;
  open: boolean;
  onToggleCheckbox: (optionItem: OptionItem) => void;
  onToggleTopOption: () => void;
  withSearch?: boolean;
};

export default function SectionOptions({
  options,
  open,
  topOption,
  onToggleCheckbox,
  onToggleTopOption,
  withSearch,
}: SectionOptionsProps) {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  const filteredOptions = withSearch
    ? options.filter((o) => o.name.toLowerCase().includes(value.toLowerCase()))
    : options;
  return (
    <>
      {withSearch && open && (
        <SearchWrapper>
          <InputSearchField
            placeholder={t(translations.TasksManagement.Search)}
            onChange={setValue}
            value={value}
            TitleText=""
            size="sm"
          />
        </SearchWrapper>
      )}
      <SectionOptionsContainer open={open}>
        <SectionTopOptionItem
          optionItem={topOption}
          onToggleCheckbox={onToggleTopOption}
        />
        {filteredOptions.map((option, id) => (
          <SectionOptionItem
            key={id}
            optionItem={option}
            onToggleCheckbox={onToggleCheckbox}
          />
        ))}
      </SectionOptionsContainer>
    </>
  );
}
