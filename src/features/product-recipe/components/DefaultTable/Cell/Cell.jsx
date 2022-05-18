import React from "react";
import EditableCell from "./EditableCell/EditableCell";
import EmptyCell from "./EmptyCell/EmptyCell";
import ComboCell from "./ComboCell/ComboCell";
import FixedTextCell from "./FixedTextCell/FixedTextCell";
import MaterialCell from "./MaterialCell/MaterialCell";
import MaterialEditableCell from "./MaterialEditableCell/MaterialEditableCell";
import BooleanCell from "./BooleanCell/BooleanCell";

const Cell = ({ cell }) => {
  if (cell.value === undefined) {
    return <EmptyCell />;
  } else if (cell.value.type === "Boolean") {
    return <BooleanCell cell={cell} />;
  } else if (cell.value.type === "combo") {
    return <ComboCell cell={cell} />;
  } else if (cell.value.type === "title") {
    return <FixedTextCell cell={cell} />;
  } else if (cell.value.type === "MaterialID") {
    return <MaterialCell cell={cell} />;
  } else if (cell.value.type === "Material") {
    return <MaterialEditableCell cell={cell} />;
  } else if (cell.value.type === "num" || cell.value.type === "text") {
    return <EditableCell cell={cell} type={cell.value.type} />;
  }
};

export default Cell;
