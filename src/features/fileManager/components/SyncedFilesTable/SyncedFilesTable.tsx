import useSyncedFilesTable from "../../hooks/useSyncedFilesTable";
import { UploadedFile } from "../../ts";
import Table from "../Table/Table";

type SyncedFilesTableProps = {
  syncedFiles: UploadedFile[];
};

export default function SyncedFilesTable({
  syncedFiles,
}: SyncedFilesTableProps) {
  const { columns, tableData } = useSyncedFilesTable(syncedFiles);

  return <Table columns={columns} data={tableData} />;
}
