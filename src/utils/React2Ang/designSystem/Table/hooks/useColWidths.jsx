import { useEffect, useMemo } from "react";
import {
  MENU_COLS,
  SELECTION_COLS,
  SIDE_COL_WIDTH,
  SELECTION_WIDTH,
  SCROLLBAR_WIDTH,
} from "../config";
const useColWidths = (dispatch, allcols, visibleColumns, tableWidth) => {
  const ColAreaWidth = useMemo(
    () => tableWidth - SIDE_COL_WIDTH - SELECTION_WIDTH - SCROLLBAR_WIDTH + 20,
    [tableWidth]
  );

  useEffect(() => {
    allcols
      .filter((col) => col.id !== MENU_COLS && col.id !== SELECTION_COLS)
      .map((col) => {
        dispatch({
          type: "resizeCols",
          colid: col.id,
          width: col.width,
        });
      });
    const len = visibleColumns.filter(
      (col) => col.id !== MENU_COLS && col.id !== SELECTION_COLS
    ).length;
    const widths = visibleColumns
      .filter((col) => col.id !== MENU_COLS && col.id !== SELECTION_COLS)
      .reduce((a, b) => a + b.width, 0);
    if (widths < ColAreaWidth) {
      const diff = ColAreaWidth - widths;
      const diffPerCol = diff / len;
      visibleColumns
        .filter((col) => col.id !== MENU_COLS && col.id !== SELECTION_COLS)
        .map((col) => {
          dispatch({
            type: "resizeCols",
            colid: col.id,
            width: col.width + diffPerCol,
          });
        });
    }
  }, [dispatch, allcols, visibleColumns, tableWidth, ColAreaWidth]);
};

export default useColWidths;
