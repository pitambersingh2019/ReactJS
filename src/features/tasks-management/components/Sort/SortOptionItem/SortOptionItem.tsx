import { StyledSortOptionItem } from "./sort-option-item.styles";

type SortOptionItemProps = {
  name: string;
  isSelected: boolean;
};

export default function SortOptionItem({
  name,
  isSelected,
}: SortOptionItemProps) {
  return (
    <StyledSortOptionItem isSelected={isSelected}>{name}</StyledSortOptionItem>
  );
}
