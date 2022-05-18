import React, { useEffect } from "react";
import { useTable, useRowSelect, useFilters, useSortBy } from "react-table";
import { SelectTableWrapper } from "./select-table.styles";
import Header from "./Header/Header";
import TableRow from "./TableRow/TableRow";
import DefaultColumnFilter from "./DefaultColumnFilter/DefaultColumnFilter";
import CheckCell from "./CheckCell/CheckCell";

// eslint-disable-next-line react/display-name

const SelectTable = ({ columns, data, onSelect, selectedItem }) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };
  const selectedRow = () => {
    if (selectedItem) {
      const id = data.findIndex((row) => {
        return row.MaterialID == selectedItem;
      });
      return { [id]: true };
    } else {
      return {};
    }
  };
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        selectedRowIds: selectedRow(),
      },
    },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          //   </div>
          // ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: CheckCell,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    if (selectedFlatRows.length > 0) {
      onSelect(selectedFlatRows[0].original);
    }
  }, [onSelect, selectedFlatRows]);

  // Render the UI for your table
  return (
    <SelectTableWrapper>
      <table {...getTableProps()}>
        <Header headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return <TableRow row={row} key={index} />;
          })}
        </tbody>
      </table>
    </SelectTableWrapper>
  );
};

export default SelectTable;
