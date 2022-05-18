/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  useTable,
  useBlockLayout,
  useRowSelect,
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";
import { useResizeColumns } from "./hooks/useResizeColumns";
import "./scrollbar.css";
import FixedCell from "./FixedCell";
import {
  MENU_COLS,
  ROW_HEIGHT,
  SELECTION_COLS,
  SELECTION_WIDTH,
  MENU_WIDTH,
  INFO_ROW_HEIGHT,
  COL_HEIGHT,
  SCROLL_HEIGHT,
  HEADER_HEIGHT,
  SIDE_COL_WIDTH,
  FILTER_ItemsContainer_WIDTH,
  SELECTED_COUNT_BOTTOM_HEIGHT,
  aggregationTypes,
  MAX_COL_WIDTH,
  TableStatus,
} from "./config";
import DefaultColumnFilter from "../SearchResults/FilterCells/DefaultFilter";
import SkeletonTableLoad from "./SkeletonTable";
import TableIdle from "./SkeletonTable/IdleTable";
import FilterHeader from "./FilterHeader";
import DraggedColumn from "./DraggedColumn";
import {
  Styles,
  TableContainer,
  TableWrapper,
  SelectedRowsCount,
  AddRowMenu,
  MenuSideItemWrapper,
  SelectionSideItemWrapper,
} from "./styles";
import Header from "./Header";
import useFilterHeader from "./hooks/useFilterHeader";
import useRestore from "./hooks/useRestore";
import useSaveState from "./hooks/useSaveState";
import useShareTable from "./hooks/useShareTable";
import useVirtualizer from "./hooks/useVirtualizer";
import useAddRow from "./hooks/useAddRow";
import useColWidths from "./hooks/useColWidths";
import Column from "./Col";
import useDragging from "./hooks/useDragging";
import useManageData from "./hooks/useManageData";
import SelectionCol from "./SelectionCol";
import SelectorCol from "./SelectorCol";
import CheckBoxField from "../../../../Component/DesignSystem/CheckBox";
import { BuildTableStateFromInitState } from "./utils";
import RadioCheckBox from "../../../../Component/DesignSystem/RadioButton2/RadioButton";
// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = ({ toggleRowSelected, isSelected }) => {
  // const defaultRef = React.useRef();
  // const resolvedRef = ref || defaultRef;

  // React.useEffect(() => {
  //   resolvedRef.current.indeterminate = indeterminate;
  // }, [resolvedRef, indeterminate]);

  return (
    <CheckBoxField
      checked={isSelected}
      onChange={() => toggleRowSelected(!isSelected)}
    />
  );
  // return (
  //   <>
  //     <input
  //       type="checkbox"
  //       ref={resolvedRef}
  //       {...rest}
  //       style={{ width: "16px", height: "16px" }}
  //     />
  //   </>
  // );
};
const IndeterminateRadioCheckBox = ({ toggleRowSelected, isSelected }) => {
  return (
    <div onClick={() => toggleRowSelected(!isSelected)}>
      <RadioCheckBox isSelected={isSelected} handleSelect={null} />
    </div>
  );
};

const GridVirtualizerFixed = ({
  tableData,
  tableSizes,
  handleFiltering,
  fields,
  initialFilters,
  singleSelection,
  initialState,
  handleSaveState,
  allowFiltering,
  allowShare,
  allowAdd,
  allowDelete,
  handleGetUpdatedData,
  handleValidation,
  handleRestoreDefaults,
  isRtl,
  handleGetSelected,
  hideFilterPanel,
  pageName,
  disableAggregations,
  saveFilterSetsAPI,
  filterSetsAPI,
  handleGetUpdatedDataFull,
  SelectedFooterInHeader,
  selectedIDS,
}) => {
  // console.log("tableData", tableData);
  // const [saveState, SetSaveState] = useSaveState(initialState, handleSaveState);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 200,
      maxWidth: MAX_COL_WIDTH,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const [data, setdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const validationMap = useRef(new Map(new Map()));

  const checkValidation = useCallback(() => {
    for (let value of validationMap.current.values()) {
      if (value.size > 0) {
        handleValidation && handleValidation(true);
        return;
      }
    }
    handleValidation && handleValidation(false);
  }, [handleValidation]);

  const ValidationError = useCallback(
    (index, col, validation) => {
      if (!validationMap.current.has(index)) {
        validationMap.current.set(index, new Map());
        if (validation) validationMap.current.get(index).set(col, validation);
      } else {
        if (validation) validationMap.current.get(index).set(col, validation);
        else validationMap.current.get(index).delete(col);
      }
      checkValidation();
      // console.log("validations: ", validationMap);
    },
    [checkValidation]
  );

  const deleteFromValidations = useCallback(
    (index) => {
      if (validationMap.current.has(index)) {
        validationMap.current.delete(index);
        checkValidation();
      }
    },
    [checkValidation]
  );

  const [
    UpdateData,
    addedRowsIds,
    setAddedRowsIds,
    deletedRowsIds,
    AddDeletedRowId,
    resetUpdateData,
  ] = useManageData(
    handleGetUpdatedData,
    data,
    setdata,
    deleteFromValidations,
    handleGetUpdatedDataFull
  );

  useEffect(() => {
    setdata(tableData.data);
    setcolumns(tableData.columns);
    resetUpdateData();
  }, [tableData.data, tableData.columns, resetUpdateData]);

  const {
    dispatch,
    allColumns,
    totalColumnsWidth,
    getTableProps,
    selectedFlatRows,
    headerGroups,
    rows,
    sortedRows,
    prepareRow,
    state: {
      selectedRowIds,
      columnOrder,
      hiddenColumns,
      sortBy,
      aggregation,
      columnDragging,
      columnResizing,
      deletedRows,
    },
    visibleColumns,
    resetResizing,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      UpdateData,
      ValidationError,
      isRtl,
      initialState: {},
      autoResetSortBy: false,
      autoResetFilters: false,
      autoResetSelectedRows: false,
      autoResetHiddenColumns: false,
      stateReducer: (newState, action, prevState) => {
        console.log("action,", action, newState);
        switch (action.type) {
          case "initState":
            if (action.initialState) {
              return BuildTableStateFromInitState(
                action.initialState,
                newState,
                prevState
              );
            }

            return { ...newState, columnDragging: true };
          case "toggleHideColumn":
            const numberOfCols1 = Object.keys(
              prevState.columnResizing.columnWidths
            ).length;
            const numberOfHiddenCols1 = prevState.hiddenColumns.length;
            if (numberOfCols1 - numberOfHiddenCols1 === 1 && action.value) {
              return { ...prevState };
            }
            handleSaveState && handleSaveState(newState);
            break;
          case "resizeCols":
            let state = {
              ...newState,
              columnResizing: {
                ...prevState.columnResizing,
                columnWidths: {
                  ...prevState.columnResizing.columnWidths,
                  [action.colid]: action.width,
                },
              },
            };
            return state;
          case "aggregation":
            const aggregationState = {
              ...newState,
              aggregation: {
                ...prevState.aggregation,
                [action.colid]: action.aggregationType,
              },
            };
            handleSaveState && handleSaveState(aggregationState);
            return aggregationState;

          case "toggleRowSelected":
            if (singleSelection) {
              if (action.value) {
                return {
                  ...newState,
                  selectedRowIds: { [action.id]: action.value },
                };
              } else {
                return { ...newState, selectedRowIds: {} };
              }
            }

            break;
          case "selectIDS":
            return { ...prevState, selectedRowIds: action.selectedIds };
          case "restoreSorting":
            handleSaveState && handleSaveState({ ...newState, sortBy: [] });
            return { ...newState, sortBy: [] };

          case "restoreFilter":
            handleSaveState && handleSaveState({ ...newState, filters: [] });
            return { ...newState, filters: [] };

          case "restoreHiddenCols":
            handleSaveState &&
              handleSaveState({ ...newState, hiddenColumns: [] });
            return { ...newState, hiddenColumns: [] };
          case "columnResizing":
            const numberOfCols2 = Object.keys(
              newState.columnResizing.columnWidths
            ).length;
            const numberOfHiddenCols2 = prevState.hiddenColumns.length;
            if (numberOfCols2 - numberOfHiddenCols2 === 1) {
              return { ...prevState };
            }
            const ColsWidths = Object.keys(
              prevState.columnResizing.columnWidths
            ).reduce(
              (acc, value) =>
                acc +
                (newState.hiddenColumns.indexOf(value) > 0
                  ? 0
                  : newState.columnResizing.columnWidths[value]),
              0
            );

            const ColsAreaWidth = tableSizes.width - 80;
            if (ColsWidths <= ColsAreaWidth) {
              if (prevState.columnResizing.columnWidths[action.column]) {
                const diff =
                  prevState.columnResizing.columnWidths[action.column] -
                  newState.columnResizing.columnWidths[action.column];
                const len = action.visibleColumns.length;
                const diffForEachCol = diff / len;
                const widths = action.visibleColumns.reduce(
                  (a, v) => ({
                    ...a,
                    [v]:
                      newState.columnResizing.columnWidths[v] + diffForEachCol,
                  }),
                  {}
                );
                const colresizeState = {
                  ...newState,
                  columnResizing: {
                    ...prevState.columnResizing,
                    columnWidths: {
                      ...newState.columnResizing.columnWidths,
                      ...widths,
                    },
                  },
                };
                return colresizeState;
              }
            }

            break;
          case "columnDoneResizing":
            handleSaveState && handleSaveState(newState);
            // SetSaveState(newState);
            return { ...newState, columnDragging: true };
          case "columnStartResizing":
            return { ...newState, columnDragging: false };
          case "setColumnOrder":
            handleSaveState && handleSaveState(newState);
            break;
          case "toggleSortBy":
          case "setFilter":
            handleSaveState && handleSaveState(newState);
            break;
          // case "addrow":
          //   return { ...prevState, addrow: action.index };
          case "deleteRow":
            const deletedRows = prevState.deletedRows;
            if (!deletedRows.includes(action.id)) deletedRows.push(action.id);
            return {
              ...prevState,
              deletedRows: deletedRows,
            };
          case "deleteSelections":
            return { ...prevState, selectedRowIds: {} };
          default:
            return newState;
        }
      },
    },
    useBlockLayout,
    useFilters,
    useResizeColumns,
    useSortBy,
    useRowSelect,
    useColumnOrder,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: SELECTION_COLS,
          width: SELECTION_WIDTH,
          minWidth: SELECTION_WIDTH,
          maxWidth: SELECTION_WIDTH,
          Cell: ({ row, state }) => {
            return (
              <div>
                {singleSelection ? (
                  <IndeterminateRadioCheckBox
                    isSelected={row.isSelected}
                    toggleRowSelected={row.toggleRowSelected}
                  />
                ) : (
                  <IndeterminateCheckbox
                    isSelected={row.isSelected}
                    toggleRowSelected={row.toggleRowSelected}
                  />
                )}
              </div>
            );
          },
        },
        ...columns,
        {
          id: MENU_COLS,
          disableFilters: true,
          width: SIDE_COL_WIDTH,
          minWidth: SIDE_COL_WIDTH,
          maxWidth: SIDE_COL_WIDTH,
          disableSortBy: true,
        },
      ]);
    }
  );

  //initial State
  useEffect(() => {
    dispatch({ type: "initState", initialState: initialState });
  }, [dispatch, initialState]);

  useEffect(() => {
    console.log("stathiddenColumnse", hiddenColumns);
  }, [hiddenColumns]);

  useEffect(() => {
    handleGetSelected && handleGetSelected(selectedFlatRows);
    console.log("flat items", selectedFlatRows);
  }, [handleGetSelected, selectedFlatRows]);

  useColWidths(dispatch, allColumns, visibleColumns, tableSizes.width);

  // useEffect(() => {
  //   //find rows id by column ID value:
  //   if (Array.isArray(selectedIDS)) {
  //     const currentSelected = selectedRowIds;
  //     const isSame = Object.keys(currentSelected).every((elem) =>
  //       selectedIDS.includes(String(elem))
  //     );
  //     if (!isSame) {
  //       const selectedRows = rows.filter((elem) =>
  //         selectedIDS.includes(String(elem.values.ID))
  //       );
  //       const selectedRowsID = selectedRows.map((elem) => elem.id);
  //       const selectedRowIdsState = {};
  //       selectedRowsID.forEach((elem) => {
  //         selectedRowIdsState[elem] = true;
  //       });
  //       console.log("aaatest", rows, selectedIDS);
  //       dispatch({ type: "selectIDS", selectedIds: selectedRowIdsState });
  //     }
  //   }
  // }, [dispatch, rows, selectedIDS, selectedRowIds]);
  const [
    DragHeaderStart,
    tableRef,
    DraggedColumnref,
    isDragging,
    onDragStart,
    onDrag,
    handleEnterDragHeader,
    onDragEnd,
    handleDragEvent,
    longPressEvent,
  ] = useDragging(setColumnOrder, allColumns);

  const [
    FilterItems,
    handleAddFilters,
    handleRemoveFilterFromItems,
    handleEditFilterItem,
    handleClearFilterItems,
    firstTimeFilterApply,
    selectedFilterSet,
    setSelectedFilterSet,
    handleAddFilterSet,
    handleRemoveFilterSet,
    handleUpdateFilterSet,
    filterSets,
    handleSetFilterFromHeaderDropDown,
    showSaveFilterButton,
    showFilterSaveButton,
    hideFilterSaveButton,
    showFilter,
    setshowFilter,
    editedFilter,
    handleClearEditItem,
  ] = useFilterHeader(
    handleFiltering,
    saveFilterSetsAPI,
    filterSetsAPI,
    hideFilterPanel,
    initialFilters
  );

  const [
    handleRestoreSorting,
    handleRestoreFilter,
    handleRestoreHiddenCols,
    handleRestoreDefaultsButton,
    showModalRestore,
    setShowModalRestore,
  ] = useRestore(dispatch, handleRestoreDefaults);

  const tableHeight = useMemo(
    () =>
      Math.max(tableSizes.height, 200) -
      HEADER_HEIGHT -
      (!SelectedFooterInHeader ? SELECTED_COUNT_BOTTOM_HEIGHT : 0) -
      (FilterItems.length > 0 ? FILTER_ItemsContainer_WIDTH : 0),
    [FilterItems.length, SelectedFooterInHeader, tableSizes.height]
  );
  const TableOffsetTop = useMemo(
    () =>
      HEADER_HEIGHT +
      FILTER_ItemsContainer_WIDTH +
      (FilterItems.length > 0 ? FILTER_ItemsContainer_WIDTH : 0),
    [FilterItems.length]
  );

  const [showShareTable, setShowShareTable] = useShareTable();
  const [
    rowVirtualizer,
    columnVirtualizer,
    parentRef,
    virtualListStyles,
    scrollToLastTable,
    isScrolling,
  ] = useVirtualizer(rows, visibleColumns, isRtl);

  const [handleAddRow] = useAddRow(
    scrollToLastTable,
    setdata,
    tableData.AddRowData,
    rows.length,
    addedRowsIds,
    setAddedRowsIds
  );

  const colWidths = useMemo(
    () =>
      isRtl
        ? visibleColumns.map((elem, index) =>
            visibleColumns
              .slice()
              .reverse()
              .slice(0, index)
              .reduce(
                (sum, col) =>
                  sum +
                  Math.min(
                    MAX_COL_WIDTH,
                    Math.max(40, columnResizing.columnWidths[col.id] ?? 0)
                  ),
                20
              )
          )
        : visibleColumns.map((elem, index) =>
            visibleColumns
              .slice(0, index)
              .reduce(
                (sum, col) =>
                  sum +
                  Math.min(
                    MAX_COL_WIDTH,
                    Math.max(40, columnResizing.columnWidths[col.id] ?? 0)
                  ),
                0
              )
          ),
    [columnResizing.columnWidths, isRtl, visibleColumns]
  );

  return (
    <Styles onDragOver={handleDragEvent} ref={tableRef}>
      {isDragging.value && DragHeaderStart.current && (
        <DraggedColumn
          ref={DraggedColumnref}
          column={isDragging.column}
          rows={rows.slice(0, 8)}
          prepareRow={prepareRow}
          show={isDragging.value}
          zindex={4}
          sortbystate={sortBy}
          aggregationState={aggregation}
          dispatch={dispatch}
          isRtl={isRtl}
        ></DraggedColumn>
      )}
      <TableWrapper
        style={{
          position: "relative",
        }}
      >
        <Header
          fields={fields}
          Title={tableData.Title}
          sortedRows={sortedRows}
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          isRtl={isRtl}
          alldata={data}
          handleRestoreSorting={handleRestoreSorting}
          handleRestoreFilter={handleRestoreFilter}
          handleRestoreHiddenCols={handleRestoreHiddenCols}
          FilterItems={FilterItems}
          handleAddFilters={handleAddFilters}
          handleUpdateFilterSet={handleUpdateFilterSet}
          handleClearFilterItems={handleClearFilterItems}
          handleRemoveFilterFromItems={handleRemoveFilterFromItems}
          handleEditFilterItem={handleEditFilterItem}
          allowFiltering={allowFiltering}
          allowShare={allowShare}
          showShareTable={showShareTable}
          setShowShareTable={setShowShareTable}
          handleAddRow={handleAddRow}
          zindex={3}
          allowAdd={allowAdd}
          allowDelete={allowDelete}
          selectedRowIds={selectedRowIds}
          dispatch={dispatch}
          AddDeletedRowId={AddDeletedRowId}
          handleRestoreDefaults={handleRestoreDefaults}
          tableLoaded={columns.length !== 0}
          firstTimeFilterApply={firstTimeFilterApply}
          initialFilters={initialFilters}
          selectedFlatRows={selectedFlatRows}
          selectedFilterSet={selectedFilterSet}
          setSelectedFilterSet={setSelectedFilterSet}
          handleAddFilterSet={handleAddFilterSet}
          handleRemoveFilterSet={handleRemoveFilterSet}
          filterSets={filterSets}
          selectedFlatRowsLength={selectedFlatRows.length}
          handleSetFilterFromHeaderDropDown={handleSetFilterFromHeaderDropDown}
          tableData={tableData}
          showSaveFilterButton={showSaveFilterButton}
          showFilterSaveButton={showFilterSaveButton}
          hideFilterSaveButton={hideFilterSaveButton}
          tableSizes={tableSizes}
          SelectedFooterInHeader={SelectedFooterInHeader}
          pageName={pageName}
          deletedRowsIds={deletedRowsIds}
          rowsLenght={rows.length}
          handleRestoreDefaultsButton={handleRestoreDefaultsButton}
          showModalRestore={showModalRestore}
          setShowModalRestore={setShowModalRestore}
          showFilter={showFilter}
          setshowFilter={setshowFilter}
          editedFilterId={editedFilter}
          handleClearEditItem={handleClearEditItem}
        />
        {FilterItems.length > 0 && (
          <FilterHeader
            width={tableSizes.width}
            FilterItems={FilterItems}
            handleRemoveFilterFromItems={handleRemoveFilterFromItems}
            handleClearFilterItems={handleClearFilterItems}
            handleEditFilterItem={handleEditFilterItem}
          />
        )}

        {tableData.status === TableStatus.LOADING && (
          <SkeletonTableLoad
            tableHeight={tableHeight}
            tableWidth={tableSizes.width}
          />
        )}

        {tableData.status === TableStatus.IDLE && <TableIdle />}
        {tableData.status === TableStatus.LOADED && (
          <div {...getTableProps()} className="table">
            <div
              style={{
                backgroundColor: "#ecf1f7",
                width: "100%",
                height: "82px",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></div>
            <div
              ref={parentRef}
              className="List reactTable"
              style={{
                height: tableHeight + 2,
                width: "100%",
                overflowX: "scroll",
                overflowY: "auto",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.totalSize}px`,
                  width: `${Math.max(totalColumnsWidth, tableSizes.width)}px`,
                  position: "relative",
                  pointerEvents: isScrolling ? "none" : "auto",
                }}
              >
                <div
                  style={{
                    position: "sticky",
                    zIndex: 2,
                    top: 0,
                    height: 80,
                    pointerEvents: isScrolling ? "none" : "auto",
                  }}
                >
                  <SelectionCol
                    headerGroups={headerGroups}
                    tableBodyHeight={tableHeight - 120}
                    zindex={visibleColumns.length}
                    disableAggregations={disableAggregations}
                    aggregationState={aggregation}
                  />
                  {columns.length > 0 && (
                    <SelectorCol
                      isRtl={isRtl}
                      Title={tableData.Title}
                      TableOffsetTop={TableOffsetTop}
                      allColumns={allColumns}
                      headerGroups={headerGroups}
                      setColumnOrder={setColumnOrder}
                      setShowShareTable={setShowShareTable}
                      tableBodyHeight={tableHeight - 120}
                      zindex={visibleColumns.length}
                      disableAggregations={disableAggregations}
                      aggregationState={aggregation}
                      allowShare={allowShare}
                      handleRestoreDefaultsButton={handleRestoreDefaultsButton}
                    ></SelectorCol>
                  )}
                  {columnVirtualizer.virtualItems.map((virtualColumn) => {
                    const headerGroup = headerGroups[0];
                    const header = isRtl
                      ? headerGroup.headers.slice().reverse()
                      : headerGroup.headers;
                    if (header[virtualColumn.index].id === SELECTION_COLS)
                      return null;
                    if (header[virtualColumn.index].id === MENU_COLS)
                      return null;

                    return (
                      <div
                        key={virtualColumn.index}
                        className="ListItem"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: header[virtualColumn.index].width,
                          height: 80,
                          transform: `translateX(${
                            colWidths[virtualColumn.index]
                          }px) translateY(0px)`,
                          background: "#fff",
                          zIndex: isRtl
                            ? visibleColumns.length - virtualColumn.index
                            : virtualColumn.index,
                          pointerEvents: isScrolling ? "none" : "auto",
                        }}
                      >
                        <div
                          {...headerGroup.getHeaderGroupProps()}
                          style={{
                            ...headerGroup.getHeaderGroupProps().style,
                          }}
                          className="tr"
                        >
                          <Column
                            column={header[virtualColumn.index]}
                            dragstart={onDragStart}
                            dragenter={handleEnterDragHeader}
                            dragend={onDragEnd}
                            drag={onDrag}
                            draggable={columnDragging ? true : false}
                            tableBodyHeight={tableHeight - 120}
                            sortbystate={sortBy}
                            disableAggregations={disableAggregations}
                            aggregationState={aggregation}
                            dispatch={dispatch}
                            draggedCol={isDragging.column}
                            isRtl={isRtl}
                            width={
                              columnResizing.columnWidths[
                                header[virtualColumn.index].id
                              ]
                            }
                          ></Column>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <SelectionSideItemWrapper
                  style={{
                    zIndex: 1,
                  }}
                >
                  {/* show the selection items! */}
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    if (!row) return null;
                    prepareRow(row);
                    let heightOffset = 0;
                    if (deletedRowsIds.size) {
                      if (deletedRowsIds.has(row.id)) {
                        return null;
                      }
                      heightOffset = rows
                        .map((elem) => elem.id)
                        .slice(0, virtualRow.index + 1)
                        .reduce((n, elem) => {
                          return n + deletedRowsIds.has(elem);
                        }, 0);
                    }

                    return (
                      <div
                        key={virtualRow.index}
                        {...row.getRowProps()}
                        style={{
                          ...row.getRowProps().style,
                          ...virtualListStyles,
                          height: `${virtualRow.size}px`,
                          width: "40px",
                          transform: `translateY(${
                            virtualRow.start - heightOffset * 50 - 80
                          }px)`,
                          borderRight: "solid 1px #e3e3e3",
                          pointerEvents: isScrolling ? "none" : "auto",
                        }}
                        className="tr"
                      >
                        {row.cells
                          .filter((elem) => elem.column.id === SELECTION_COLS)
                          .map((cell, index) => {
                            return (
                              <FixedCell
                                key={virtualRow.index}
                                cell={cell}
                                isDragging={false}
                              />
                            );
                          })}
                      </div>
                    );
                  })}
                </SelectionSideItemWrapper>
                <MenuSideItemWrapper
                  isRtl={isRtl}
                  style={{
                    zIndex: 1,
                    transform: `translateY(${80 - rowVirtualizer.totalSize}px)`,
                  }}
                >
                  {/* show the menu items */}
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    if (!row) return null;
                    let heightOffset = 0;
                    if (deletedRowsIds.size) {
                      if (deletedRowsIds.has(row.id)) {
                        return null;
                      }
                      heightOffset = rows
                        .map((elem) => elem.id)
                        .slice(0, virtualRow.index + 1)
                        .reduce((n, elem) => {
                          return n + deletedRowsIds.has(elem);
                        }, 0);
                    }
                    // const showAddDeleteRow = addrow === +row.id;
                    prepareRow(row);
                    return (
                      <div
                        key={virtualRow.index}
                        {...row.getRowProps()}
                        style={{
                          ...row.getRowProps().style,
                          ...virtualListStyles,
                          height: `${virtualRow.size}px`,
                          width: "60px",
                          transform: `translateY(${
                            virtualRow.start - heightOffset * 50 - 80
                          }px)`,
                        }}
                        className="tr"
                      >
                        {row.cells
                          .filter((elem) => elem.column.id === MENU_COLS)
                          .map((cell, index) => {
                            return (
                              <AddRowMenu key={virtualRow.index}>
                                {/* {showAddDeleteRow && (
                                  <AddRowCell
                                    handleAddRowConfirm={handleAddRowConfirm}
                                    handleDeleteRow={handleDeleteRow}
                                  />
                                )} */}
                              </AddRowMenu>
                            );
                          })}
                      </div>
                    );
                  })}
                </MenuSideItemWrapper>
                {/* pinned right items in case we want to pin items to right or left in future!! */}
                {/* <div
                  style={{
                    position: "sticky",
                    zIndex: ZIndexesTable + 1,
                    top: 0,
                    right: 80,
                    width: "40px",
                    float: "right",
                    transform: `translateY(${80 - rowVirtualizer.totalSize}px)`,
                  }}
                >
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    if (!row) return null;
                    prepareRow(row);
                    return (
                      <div
                        key={virtualRow.index}
                        {...row.getRowProps()}
                        style={{
                          ...row.getRowProps().style,
                          ...virtualListStyles,
                          height: `${virtualRow.size}px`,
                          width: "40px",
                          transform: `translateY(${virtualRow.start - 80}px)`,
                        }}
                        className="tr"
                      >
                        {row.cells
                          .filter((elem) => elem.column.id === "ID")
                          .map((cell, index) => {
                            return (
                              <div key={index} style={{ background: "red" }}>
                                aa
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </div> */}
                {/* show the table items! */}
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  if (!row) return null;

                  let heightOffset = 0;
                  if (deletedRowsIds.size) {
                    if (deletedRowsIds.has(row.id)) {
                      return null;
                    }
                    heightOffset = rows
                      .map((elem) => elem.id)
                      .slice(0, virtualRow.index + 1)
                      .reduce((n, elem) => {
                        return n + deletedRowsIds.has(elem);
                      }, 0);
                  }
                  return (
                    <div key={virtualRow.index}>
                      {columnVirtualizer.virtualItems.map(
                        (virtualColumn, index) => {
                          const cell = isRtl
                            ? row.cells.slice().reverse()[virtualColumn.index]
                            : row.cells[virtualColumn.index];
                          if (
                            cell.column.id === SELECTION_COLS ||
                            cell.column.id === MENU_COLS
                          )
                            return null;
                          return (
                            <div
                              key={virtualColumn.index}
                              style={{
                                position: "absolute",
                                transform: `translateX(${
                                  colWidths[virtualColumn.index]
                                }px) translateY(${
                                  virtualRow.start - heightOffset * 50
                                }px)`,
                                top: 0,
                                left: 0,
                                width: `${cell.column.width}px`,
                                height: `${virtualRow.size}px`,
                                pointerEvents: isScrolling ? "none" : "auto",
                                // zIndex: zindex,
                              }}
                            >
                              <FixedCell cell={cell} isDragging={isDragging} />
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {!SelectedFooterInHeader && (
          <SelectedRowsCount>
            {pageName === "PendingJobs" ? (
              <React.Fragment>
                {Object.keys(selectedRowIds)[0] ? (
                  <React.Fragment>
                    <div style={{ fontSize: "16px" }}>Selected item:&nbsp;</div>
                    <div
                      style={{
                        color: "#1580fc",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Job {data[Object.keys(selectedRowIds)[0]].ID}
                    </div>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            ) : (
              <>
                {Math.max(rows.length - deletedRowsIds.size, 0) ? (
                  <React.Fragment>
                    {Object.keys(selectedRowIds).length} /{" "}
                    {Math.max(rows.length - deletedRowsIds.size, 0)} Selected
                  </React.Fragment>
                ) : null}
              </>
            )}
          </SelectedRowsCount>
        )}
      </TableWrapper>
    </Styles>
  );
};

export default GridVirtualizerFixed;
