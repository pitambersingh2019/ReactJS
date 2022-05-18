import { CellProps } from "react-table";
import { ValueCellContainer } from "./value-cell.styles";

export default function ValueCell(props: CellProps<{}>) {
  return <ValueCellContainer>{props.value}</ValueCellContainer>;
}
