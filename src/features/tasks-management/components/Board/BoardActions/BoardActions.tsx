import FilterIcon from "../../Filters/FilterIcon";
import {
  ActionsContainer,
  SideContainer,
  StyledSort,
} from "./board-actions.styles";
import FilterSets from "./FilterSets/FilterSets";
import StackByButton from "./StackBy/StackByButton";

type BoardActionsProps = {
  renderSortIcon: () => JSX.Element;
  renderSortButton: () => JSX.Element;
  onToggleFilters: () => void;
};

export default function BoardActions({
  renderSortButton,
  renderSortIcon,
  onToggleFilters,
}: BoardActionsProps) {
  return (
    <ActionsContainer>
      <SideContainer>
        <StyledSort>
          {renderSortIcon()}
          {renderSortButton()}
        </StyledSort>
        <StackByButton />
      </SideContainer>
      <SideContainer>
        <FilterSets />
        <FilterIcon onClick={onToggleFilters} />
      </SideContainer>
    </ActionsContainer>
  );
}
