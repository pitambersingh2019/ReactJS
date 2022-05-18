import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { translations } from "../../../locales/translations";
import ColumnChooser from "../components/TableWrapper/ColumnChooser/ColumnChooser";
import ExpandableCell from "../components/TableWrapper/ExpandableCell/ExpandableCell";
import FixedCell from "../components/TableWrapper/FixedCell/FixedCell";
import HeaderFixed from "../components/TableWrapper/HeaderFixed/HeaderFixed";
import { DepartmentTarget, PeriodTarget } from "../ts";

export default function useTableData(data: DepartmentTarget[]) {
  const { t } = useTranslation();
  const columns: Column<{}>[] = useMemo(() => {
    const names =
      data[0]?.DepartmentPeriodTargets.map((target) => ({
        Header: target.PeriodName,
        accessor: target.PeriodName,
        Cell: ({ value }: { value: string | number }) => value.toLocaleString(),
      })) || [];
    const firstColumn = {
      accessor: "levels",
      Header: t(translations.QuantityTargetsManagement.Levels),
      Cell: ExpandableCell,
    };
    const isFixedColumn = {
      accessor: "isFixed",
      Header: HeaderFixed,
      Cell: FixedCell,
    };
    const lastColumn = { accessor: "columnChooser", Header: ColumnChooser };
    return [firstColumn, isFixedColumn, ...names, lastColumn];
  }, [data, t]);

  const createRow = (periodTargets: PeriodTarget[]) => {
    const obj: {
      [key: string]: number | string;
    } = {};
    periodTargets?.map((target) => {
      obj[target.PeriodName] = target.TargetValue;
    });
    return obj;
  };

  const tableData = useMemo(
    () => [
      {
        levels: t(translations.QuantityTargetsManagement.Factory),
        isFixed: data[0]?.IsFixedDepartment,
        ...createRow(data[0]?.DepartmentPeriodTargets),
        subRows: data
          .slice(1)
          .map((department) => {
            const obj: {
              [key: string]:
                | number
                | string
                | { [key: string]: number | string }[];
            } = {};
            obj.levels = department.DepartmentName;
            obj.isFixed = department.IsFixedDepartment;
            department.DepartmentPeriodTargets.map((target) => {
              obj[target.PeriodName] = target.TargetValue;
            });

            const machines =
              department.DepartmentMachinesPeriodTargets?.map((machine) => {
                const machineObj: { [key: string]: number | string } = {};
                machineObj.levels = machine.MachineName;
                machineObj.isFixed = machine.IsFixedMachine;
                machine.MachinePeriodTargets.map(
                  ({ PeriodName, TargetValue }) => {
                    machineObj[PeriodName] = TargetValue;
                  }
                );
                return machineObj;
              }) || [];

            obj.subRows = machines;
            return obj;
          })
          .flat(),
      },
    ],
    [data, t]
  );

  return { columns, tableData };
}
