import { Cell } from "react-table";
import { Checkbox, FixedCellContainer } from "./fixed-cell.styles";
import checkbox from "../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked.svg";

export default function FixedCell({ value }: Cell) {
  return (
    <FixedCellContainer>
      <Checkbox src={value === 0 ? checkboxChecked : checkbox} alt="checkbox" />
    </FixedCellContainer>
  );
}
