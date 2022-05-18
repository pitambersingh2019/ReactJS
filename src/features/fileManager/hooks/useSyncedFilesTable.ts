import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { translations } from "../../../locales/translations";
import ColumnFilter from "../components/Table/ColumnFilter/ColumnFilter";
import DefaultCell from "../components/Table/DefaultCell/DefaultCell";
import FileNameCell from "../components/Table/FIleNameCell/FileNameCell";
import StatusCell from "../components/Table/StatusCell/StatusCell";
import { UploadedFile } from "../ts";
import usePeriodStart from "./usePeriodStart";

export default function useSyncedFilesTable(data: UploadedFile[]) {
  const { t } = useTranslation();

  const { periodStart } = usePeriodStart();

  const columns: Column<{}>[] = useMemo(
    () => [
      {
        accessor: "FileName",
        Header: t(translations.SyncTool.FileName) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 200,
        Cell: FileNameCell,
      },
      {
        accessor: "UploadDate",
        Header: t(translations.SyncTool.Uploaded) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 104,
      },
      {
        accessor: "syncobjectname",
        Header: t(translations.SyncTool.TableName) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 112,
        Cell: DefaultCell,
      },
      {
        accessor: "NumOfRecords",
        Header: t(translations.SyncTool.RecordsCount) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 112,
        Cell: DefaultCell,
      },
      {
        accessor: "Status",
        Header: t(translations.SyncTool.Status) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 96,
        Cell: StatusCell,
      },
      {
        accessor: "uploadedbyusername",
        Header: t(translations.SyncTool.UploadedBy) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        width: 128,
        Cell: DefaultCell,
      },
    ],
    [t]
  );

  const tableData = useMemo(
    () =>
      data
        .map((row) => ({
          ...row,
          UploadDate: moment(row.UploadDate).format("DD/MM/YY HH:mm:ss"),
        }))
        .filter((item) =>
          moment(item.UploadDate, "DD/MM/YY HH:mm:ss").isAfter(
            moment(periodStart)
          )
        ),
    [data, periodStart]
  );

  return { columns, tableData };
}
