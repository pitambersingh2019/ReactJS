import { CellProps } from "react-table";
import { Status, UploadedFile } from "../../../ts";
import { DefaultCellContainer } from "./default-cell.styles";

export default function DefaultCell(props: CellProps<UploadedFile>) {
  const isSyncing = props.row.original.Status === Status.PENDING;

  return (
    <DefaultCellContainer isSyncing={isSyncing}>
      {props.value}
    </DefaultCellContainer>
  );
}
