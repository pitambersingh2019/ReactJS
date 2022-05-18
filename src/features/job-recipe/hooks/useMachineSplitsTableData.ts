import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Column, Row } from "react-table";
import { loadStateLang } from "../../../AppStart";
import { translations } from "../../../locales/translations";
import MaterialCatalogCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/MaterialCatalogCell/MaterialCatalogCell";
import SplitCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/SplitCell/SplitCell";
import MachineValueCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/MachineValueCell/MachineValueCell";
import ColumnFilter from "../components/shared/ColumnFilter/ColumnFilter";
import { MachineSplit, MachineSplitsTableRow } from "../ts";
import BatchCell from "../components/ContentWrapper/MachineChannels/MachineChannel/MachineSplitsTable/BatchCell/BatchCell";

type UseProductionParametersTableDataProps = {
  data: MachineSplit[][];
};

function materialCatalogFilter(
  rows: MachineSplitsTableRow[],
  id: string,
  filterValue: string
) {
  return rows.filter((row) => {
    const materialValue = row.original.material.value;
    const catalogValue = row.original.catalog.value;
    return (
      materialValue.toLowerCase().includes(filterValue.toLowerCase()) ||
      catalogValue.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
}

function batchFilter(rows: Row[], id: string, filterValue: string) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue.value.toLowerCase().includes(filterValue.toLowerCase());
  });
}

export default function useMachineSplitsTableData({
  data,
}: UseProductionParametersTableDataProps) {
  const { t } = useTranslation();

  const lang = JSON.parse(loadStateLang());

  const dynamicColumns = useMemo(
    () =>
      data[0] && data[0].length > 0
        ? data[0]
            .map((split) => {
              if (
                split.FieldName !== "MainMatName" &&
                split.FieldName !== "MainMatCatalog" &&
                split.FieldName !== "MainMatBatch"
              ) {
                return {
                  accessor: split.EName,
                  Header: lang === "eng" ? split.EName : split.LName,
                  disableFilters: true,
                  Cell: MachineValueCell,
                } as Column<{}>;
              } else {
                return {} as Column<{}>;
              }
            })
            .filter((column) => Object.keys(column).length > 0)
        : [],
    [data, lang]
  );

  //@ts-ignore
  const columns: Column<{}>[] = useMemo(() => {
    if (data[0] && data[0].length > 0) {
      return [
        {
          accessor: "splitId",
          Header: t(translations.JobRecipe.Split) || "",
          disableFilters: true,
          Cell: SplitCell,
          width: 60,
        },
        {
          accessor: "materialCatalog",
          Header: t(translations.JobRecipe.MaterialCatalogNo) || "",
          Filter: ColumnFilter,
          filter: materialCatalogFilter,
          Cell: MaterialCatalogCell,
        },
        {
          accessor: "batch",
          Header: t(translations.JobRecipe.BatchId) || "",
          Filter: ColumnFilter,
          filter: batchFilter,
          Cell: BatchCell,
        },
        ...dynamicColumns,
      ];
    } else {
      return [];
    }
  }, [data, dynamicColumns, t]);

  const columnKeys = useMemo(
    () => dynamicColumns.map((column) => column.accessor) as string[],
    [dynamicColumns]
  );

  const tableData: MachineSplitsTableRow[] = useMemo(() => {
    return data.map((split) => {
      const values = {} as {
        [key: string]: { value: string; refValue: string };
      };
      columnKeys.forEach((key) => {
        const item = split.find((item) => item.EName === key);
        values[key] = {
          value: item?.Value || "",
          refValue: item?.RefValue || "",
          ...item,
        };
      });

      const materialItem = split.find(
        (item) => item.FieldName === "MainMatName"
      );
      const catalogValue = split.find(
        (item) => item.FieldName === "MainMatCatalog"
      );
      const batchValue = split.find(
        (item) => item.FieldName === "MainMatBatch"
      );

      return {
        splitId: split.length > 0 ? split[0].SplitNumber : "",
        material: {
          value: materialItem?.Value,
          refValue: materialItem?.RefValue,
          ...materialItem,
        },
        catalog: {
          value: catalogValue?.Value,
          refValue: catalogValue?.RefValue,
          ...catalogValue,
        },
        batch: {
          value: batchValue?.Value,
          refValue: batchValue?.RefValue,
          ...batchValue,
        },
        ...values,
      };
    });
  }, [columnKeys, data]);

  return { columns, tableData };
}
