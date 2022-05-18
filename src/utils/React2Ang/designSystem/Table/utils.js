export const BuildTableStateFromInitState = (
  initialState,
  newState,
  prevState
) => {
  return {
    ...newState,
    aggregation: initialState.aggregation,
    columnDragging: true,
    addrow: null,
    deletedRows: [],
    hiddenColumns: initialState.hiddenColumns,
    columnOrder: initialState.columnOrder,
    sortBy: initialState.sortBy,
    filters: initialState.filters,
    columnResizing: {
      ...prevState.columnResizing,
      columnWidths: initialState.columnWidths,
    },
  };
};
