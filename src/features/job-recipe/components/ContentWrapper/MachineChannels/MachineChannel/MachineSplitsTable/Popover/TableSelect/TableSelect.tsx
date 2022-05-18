import { useEffect, useState } from "react";
import {
  Column,
  Row,
  useFilters,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import {
  InventoryItem,
  isInventoryItem,
  MaterialItem,
} from "../../../../../../../ts";
import TableHeader from "../../../../../../shared/TableHeader/TableHeader";
import { TableContainer } from "./table-select.styles";
import TableRow from "./TableRow/TableRow";

type TableSelectProps = {
  columns: Column<{}>[];
  data: MaterialItem[] | InventoryItem[];
  onRowSelect: (row: Row<{}> | undefined) => void;
  selectedValue?: string;
  onSelectionChanged?: (updated: boolean) => void;
};

export default function TableSelect({
  columns,
  data,
  onRowSelect,
  selectedValue,
  onSelectionChanged,
}: TableSelectProps) {
  const [selectedRow, setSelectedRow] = useState({});
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: selectedRow,
      },
      onRowSelect,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    useFlexLayout
  );

  useEffect(() => {
    if (selectedValue) {
      const id = data.findIndex((row) => {
        if (isInventoryItem(row)) {
          return row.MaterialBatch === selectedValue;
        } else {
          return row.MaterialName === selectedValue;
        }
      });
      setSelectedRow({ [id]: true });
    }
  }, [data, selectedValue]);

  useEffect(() => {
    const initialSelectedRowKey = Object.keys(selectedRow)[0];
    const selectedRowKey = Object.keys(selectedRowIds)[0];
    onSelectionChanged &&
      onSelectionChanged(initialSelectedRowKey !== selectedRowKey);
  }, [onSelectionChanged, selectedRow, selectedRowIds]);

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
    </TableContainer>
  );
}
