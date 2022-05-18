import { CellProps } from "react-table";
import { MachineSplit } from "../../../../../../ts";
import { SplitCellContainer } from "./split-cell.styles";

export default function SplitCell(props: CellProps<MachineSplit>) {
  return <SplitCellContainer>{props.value}</SplitCellContainer>;
}
