import { useEffect, useMemo } from "react";
import { Column, useExpanded, useTable } from "react-table";
import { useAppSelector } from "../../../redux/hooks";
import TableRow from "../TableRow/TableRow";
import { TableContainer } from "./table.styles";

type TableProps = {
  columns: Column<{}>[];
  data: {}[];
};

export default function Table({ columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        expanded: { "0": true },
      },
    },
    useExpanded
  );

  const selectedPeriods = useAppSelector((state) => state.qtm.selectedPeriods);

  const hiddenColumns = useMemo(
    () =>
      selectedPeriods
        .filter((period) => !period.checked)
        .map((period) => period.name),
    [selectedPeriods]
  );

  useEffect(() => {
    setHiddenColumns(hiddenColumns);
  }, [hiddenColumns, setHiddenColumns]);

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumn}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            const { key } = row.getRowProps();
            return (
              <TableRow key={key} row={row}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}
