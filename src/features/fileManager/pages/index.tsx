import { useEffect } from "react";
import Spinner from "../../../Component/DesignSystem/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectStatus } from "../redux/selectors";
import { getImportSyncFields, getSyncFileStatus } from "../redux/slice";
import MainPage from "./MainPage";

export default function PagesWrapper() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(getSyncFileStatus());
    dispatch(getImportSyncFields());
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "success") {
    return <MainPage />;
  }

  return null;
}
