import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { translations } from "../../../locales/translations";
import SelectableCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/Popover/TableSelect/SelectableCell/SelectableCell";
import ValueCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/Popover/TableSelect/ValueCell/ValueCell";
import ColumnFilter from "../components/shared/ColumnFilter/ColumnFilter";
import { InventoryItem } from "../ts";

type UseInventoryListForMaterialTableDataProps = {
  data: InventoryItem[];
};

export default function useInventoryListForMaterialTableData({
  data,
}: UseInventoryListForMaterialTableDataProps) {
  const { t } = useTranslation();

  const columns: Column<{}>[] = useMemo(
    () =>
      [
        {
          id: "selection",
          Header: () => "",
          disableFilters: true,
          Cell: SelectableCell,
          width: 40,
        },
        data[0]
          ? Object.keys(data[0]).map((key) => ({
              Header: t(translations.JobRecipe[key]),
              accessor: key,
              Filter: ColumnFilter,
              filter: "includesString",
              Cell: ValueCell,
              maxWidth: 150,
            }))
          : [],
      ].flat(),
    [data, t]
  );

  const tableData = useMemo(
    () =>
      data.map((row) => ({
        ...row,
        Date: moment(row.Date).format("DD/MM/YYYY HH:mm:ss"),
      })),
    [data]
  );

  return { columns, tableData };
}
