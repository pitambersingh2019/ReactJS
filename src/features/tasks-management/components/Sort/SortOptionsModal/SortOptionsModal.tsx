import { SortOption } from "../../../ts";
import SortOptionItem from "../SortOptionItem/SortOptionItem";
import { StyledSortOptionsModal } from "./sort-options-modal.styles";

type SortOptionsModalProps = {
  options: SortOption[];
  selected: SortOption | undefined;
  onOptionClick: (option: SortOption) => void;
  isTasksPanel?: boolean;
};

export default function SortOptionsModal({
  options,
  selected,
  onOptionClick,
  isTasksPanel,
}: SortOptionsModalProps) {
  return (
    <StyledSortOptionsModal isTasksPanel={isTasksPanel}>
      {options.map((option) => (
        <div
          className="option"
          key={option.name}
          onClick={() => onOptionClick(option)}
        >
          <SortOptionItem
            name={option.value}
            isSelected={option.name === selected?.name}
          />
        </div>
      ))}
    </StyledSortOptionsModal>
  );
}
