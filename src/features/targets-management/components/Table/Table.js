/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { useExpanded, useTable } from "react-table";
import { useEditingRowContext } from "../../context/EditingRowContext";

import useScroll from "../../hooks/useScroll";
import { useValues } from "../../hooks/useValues";
import useUpdateTarget from "../../hooks/useUpdateTarget";
import {
  hiddenColumns,
  prepareColumns,
  prepareTableData,
} from "../../utils/table-data";
import EditNotice from "../EditNotice/EditNotice";
import Spinner from "../Spinner/Spinner";
import TableRow from "../TableRow/TableRow";
import { StyledHeader, StyledTable } from "./table.styles.js";
import {
  SAVING_STATE,
  useUpdateMessageContext,
} from "../../context/UpdateMessageContext";
import useShowHideTargets from "../../hooks/useShowHideTargets";
import { useExpandedRowsContext } from "../../context/ExpandedRowsContext";
import { shouldDisableIsFixed } from "../../utils/fixed-disabled";
import { useTableWidth } from "../../context/TableWidthContext";

function CustomTable({
  columns: userColumns,
  data,
  cellRef,
  isScrolling,
  columnsToHide,
  expandedRows,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        expanded: expandedRows,

        hiddenColumns: columnsToHide,
      },
    },
    useExpanded
  );

  const [updateTarget, status] = useUpdateTarget();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, toggleStatus] = useShowHideTargets();
  const { setEditingRowId } = useEditingRowContext();
  const { setSaving } = useUpdateMessageContext();
  const { setExpandedRows } = useExpandedRowsContext();

  const { fetchValues } = useValues();

  const { setTableWidth } = useTableWidth();

  const tableWidthRef = useRef();

  useLayoutEffect(() => {
    const updateTableWidth = () => {
      setTimeout(() => {
        setTableWidth(
          tableWidthRef.current ? tableWidthRef.current.offsetWidth : 0
        );
      }, 0);
    };

    updateTableWidth();
    window.addEventListener("resize", updateTableWidth);
    return () => window.removeEventListener("resize", updateTableWidth);
  }, [setTableWidth]);

  const onTargetsUpdate = async ({ row, cells }) => {
    setEditingRowId(-1);
    setSaving(SAVING_STATE.SAVING);
    await updateTarget({ row, cells });
    fetchValues();
  };
  const isFixedDisabled = shouldDisableIsFixed(rows);

  useEffect(() => {
    setExpandedRows(expanded);
  }, [expanded, setExpandedRows]);

  if (status === "loading" || toggleStatus === "loading") return <Spinner />;

  return (
    <>
      <table {...getTableProps()} ref={tableWidthRef}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledHeader
                  lightBg={
                    column.id === "PEETarget" || column.id === "OEETarget"
                  }
                  columnId={column.id}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </StyledHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                row={row}
                rows={rows}
                cellRef={cellRef}
                isScrolling={isScrolling}
                onTargetsUpdate={onTargetsUpdate}
                isFixedDisabled={isFixedDisabled}
                {...row.getRowProps()}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function Table({ data }) {
  const tableData = prepareTableData(data);
  const columns = React.useMemo(() => prepareColumns(data), [data]);
  const columnsToHide = hiddenColumns(data);
  const { editingRowId } = useEditingRowContext();
  const { isScrolling, handleScroll, cellRef } = useScroll();
  const { expandedRows } = useExpandedRowsContext();

  return (
    <>
      <StyledTable onScroll={handleScroll} isScrolling={isScrolling}>
        <CustomTable
          columns={columns}
          data={tableData}
          cellRef={cellRef}
          isScrolling={isScrolling}
          columnsToHide={columnsToHide}
          expandedRows={expandedRows}
        />
      </StyledTable>
      {editingRowId !== -1 ? <EditNotice /> : null}
    </>
  );
}

export default Table;
