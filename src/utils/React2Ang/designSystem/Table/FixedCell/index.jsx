import React, { memo } from "react";
import { Row } from "../styles";
import { SELECTION_COLS, MENU_COLS } from "../config";
const FixedCell = ({ cell, isDragging }) => {
  const isSelection_Menu_Row =
    cell.column.id === SELECTION_COLS || cell.column.id === MENU_COLS;
  return (
    <Row
      {...cell.getCellProps()}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isSelection_Menu_Row ? "center" : "start",
      }}
      isSelected={cell.row.isSelected}
    >
      {isDragging.value && isDragging.column.id === cell.column.id
        ? ""
        : cell.render("Cell", { LinkItem: cell.column.linkitem })}
    </Row>
  );
};

export default memo(FixedCell);
