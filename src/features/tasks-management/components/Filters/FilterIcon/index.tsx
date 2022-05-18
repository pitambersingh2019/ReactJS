import { StyledFilterIcon } from "./styles";
import filter from "../../../../../assets/icons/filter_new.svg";

type FilterIconProps = {
  onClick: () => void;
};

export default function FilterIcon({ onClick }: FilterIconProps) {
  return <StyledFilterIcon src={filter} alt="filter icon" onClick={onClick} />;
}
