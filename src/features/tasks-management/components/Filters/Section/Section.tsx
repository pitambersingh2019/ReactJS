import { SectionLabel } from "../filters.styles";
import arrowDown from "../../../../../assets/icons/Arowdropdown.svg";
import {
  ArrowDownIcon,
  SectionContainer,
  SectionNameContainer,
} from "./section.styles";
import SectionOptions from "../SectionOptions/SectionOptions";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";

type SectionProps = {
  name: string;
  options: OptionItem[];
  topOption: TopOption;
  onToggleCheckbox: (optionItem: OptionItem) => void;
  onToggleTopOption: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  withSearch?: boolean;
};

export default function Section({
  name,
  options,
  topOption,
  onToggleCheckbox,
  onToggleTopOption,
  open,
  setOpen,
  withSearch,
}: SectionProps) {
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <SectionContainer>
      <SectionNameContainer>
        <SectionLabel>{name}</SectionLabel>
        <ArrowDownIcon
          src={arrowDown}
          alt="arrow down icon"
          onClick={handleToggle}
        />
      </SectionNameContainer>
      <SectionOptions
        options={options}
        open={open}
        topOption={topOption}
        onToggleCheckbox={onToggleCheckbox}
        onToggleTopOption={onToggleTopOption}
        withSearch={withSearch}
      />
    </SectionContainer>
  );
}
