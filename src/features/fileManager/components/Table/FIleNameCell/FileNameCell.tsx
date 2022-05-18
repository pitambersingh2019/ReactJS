import { CellProps } from "react-table";
import { Status, UploadedFile } from "../../../ts";
import { FileNameCellContainer } from "./filename-cell.styles";

export default function FileNameCell(props: CellProps<UploadedFile>) {
  const isSyncing = props.row.original.Status === Status.PENDING;
  return (
    <FileNameCellContainer isSyncing={isSyncing}>
      {props.value}
    </FileNameCellContainer>
  );
}
