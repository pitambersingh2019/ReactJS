import Skeleton from "../components/Skeleton/Skeleton";
import SyncedFilesTable from "../components/SyncedFilesTable/SyncedFilesTable";
import TopBar from "../components/TopBar/TopBar";
import { useAppSelector } from "../redux/hooks";
import { selectSyncFiles } from "../redux/selectors";

export default function Admin() {
  const syncFiles = useAppSelector(selectSyncFiles);

  return (
    <>
      <TopBar />
      {syncFiles.length === 0 ? (
        <Skeleton />
      ) : (
        <SyncedFilesTable syncedFiles={syncFiles} />
      )}
    </>
  );
}
