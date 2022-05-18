import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";
import { translations } from "../../../../../locales/translations";
import { Status, UploadedFile } from "../../../ts";
import StatusChip from "../StatusChip/StatusChip";
import { Syncing, SyncingInProcess } from "./status-cell.styles";

export default function StatusCell(props: CellProps<UploadedFile>) {
  const isSynced = props.value === Status.SYNCED;
  const isSyncing = props.value === Status.PENDING;
  const logPath = props.row.original.LogPath;
  const fileName = props.row.original.FileName;
  const filePath = props.row.original.Path;

  const { t } = useTranslation();

  if (isSyncing) {
    return <Syncing>{t(translations.SyncTool.Syncing)}...</Syncing>;
  }

  if (props.value === Status.IN_PROCESS) {
    return (
      <SyncingInProcess>{t(translations.SyncTool.InProcess)}</SyncingInProcess>
    );
  }

  return (
    <StatusChip
      isSynced={isSynced}
      logPath={logPath}
      fileName={fileName}
      filePath={filePath}
    />
  );
}
