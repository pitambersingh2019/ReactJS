import {
  Column,
  useFilters,
  useFlexLayout,
  useSortBy,
  useTable,
} from "react-table";
import EmptyTable from "./EmptyTable/EmptyTable";
import { TableContainer } from "./table.styles";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

type TableProps = {
  columns: Column<{}>[];
  data: {}[];
};

export default function Table({ columns, data }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [{ id: "UploadDate", desc: true }],
        },
      },
      useFilters,
      useFlexLayout,
      useSortBy
    );

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <TableRow key={key} {...restRowProps} row={row}>
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
      {rows.length === 0 && <EmptyTable />}
    </TableContainer>
  );
}
