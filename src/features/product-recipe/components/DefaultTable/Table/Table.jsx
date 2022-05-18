import React from "react";
import { useTable, useFilters, useSortBy } from "react-table";
// import EditableCell from "../EditableCell/EditableCell";
import DefaultColumnFilter from "../DefaultColumnFilter/DefaultColumnFilter";
import Header from "../Header/Header";
import TableRow from "../TableRow/TableRow";
import { TableViewContent } from "./table.styles";
import { filterTypes } from "../../../utils/utils";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  // Cell: EditableCell,
  // Let's set up our default Filter UI
  Filter: DefaultColumnFilter,
};

// Be sure to pass our updateMyData and the skipPageReset option
const Table = ({ columns, data, showBarOnScroll }) => {
  // For this example, we"re using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes,
        // use the skipPageReset option to disable page resetting temporarily
        // autoResetPage: !skipPageReset,
        // updateMyData isn"t part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        // updateData,
      },
      useFilters,
      useSortBy
    );

  // Render the UI for your table
  return (
    <TableViewContent>
      <table {...getTableProps()}>
        <Header headerGroups={headerGroups} showBarOnScroll={showBarOnScroll} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return <TableRow row={row} key={index} />;
          })}
        </tbody>
      </table>
    </TableViewContent>
  );
};

export default Table;
