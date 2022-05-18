import {
  Column,
  useFilters,
  useFlexLayout,
  useSortBy,
  useTable,
} from "react-table";
import { TableContainer } from "./table.styles";
import TableHeader from "../TableHeader/TableHeader";

type TableProps = {
  columns: Column<{}>[];
  data: {}[];
  showReference?: boolean;
  updateData?: (rowIndex: number, columnId: string, value: string) => void;
  channelNumber?: number;
  showBarOnScroll?: boolean;
};

export default function Table({
  columns,
  data,
  showReference = false,
  updateData,
  channelNumber,
  showBarOnScroll = true,
}: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, updateData, channelNumber },
      useFilters,
      useFlexLayout,
      useSortBy
    );

  return (
    <TableContainer showReference={showReference}>
      <table {...getTableProps()}>
        <TableHeader
          headerGroups={headerGroups}
          showBarOnScroll={showBarOnScroll}
        />
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}
