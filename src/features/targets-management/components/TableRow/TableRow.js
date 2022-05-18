import { useEffect, useState } from "react";
import { useEditingRowContext } from "../../context/EditingRowContext";

import { markRows } from "../../utils/mark-rows";
import { StyledTableRow } from "./table-row.styles";

export default function TableRow({
  row,
  rows,
  cellRef,
  isScrolling,
  onTargetsUpdate,
  isFixedDisabled,
}) {
  const [hoveringId, setHoveringId] = useState(-1);
  const [cells, setCells] = useState();
  const { editingRowId, setEditingRowId } = useEditingRowContext();

  const isEditing = editingRowId === row.id;

  const onEdit = (id) => {
    setEditingRowId(id);
  };

  const onCancel = () => {
    setCells(row.cells);
    setEditingRowId(-1);
  };

  const onSave = () => {
    const notValid = cells.find((c) => c?.isValid === false);
    if (!notValid) {
      onTargetsUpdate({ row, cells });
    }
  };

  const onCellValueChange = (val, columnId, isValidValue) => {
    setCells(
      cells.map((cell) =>
        cell.column.id === columnId
          ? { ...cell, value: val, isValid: isValidValue }
          : cell
      )
    );
  };

  const willUpdate = markRows({ rows, row, editingRowId });

  useEffect(() => {
    if (!isEditing) {
      setCells(row.cells);
    }
  }, [row.cells, isEditing]);

  return (
    <StyledTableRow
      greyBg={row.original.bgStyle}
      depth={row.depth}
      isScrolling={isScrolling}
      isHovering={hoveringId === row.id}
      isEditing={isEditing}
      onMouseOver={() => {
        setHoveringId(row.id);
      }}
      onMouseOut={() => setHoveringId(-1)}
    >
      <>
        {cells?.map((cell) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <td
              {...cell.getCellProps()}
              ref={
                cell.column.id === "CycleTimeEfficiencyTarget" && row.id === "0"
                  ? cellRef
                  : undefined
              }
            >
              {cell.render("Cell", {
                isHovering: hoveringId === row.id,
                onEdit,
                isEditing,
                willUpdate,
                value: cell.value,
                setValue: onCellValueChange,
                onCancel: onCancel,
                onSave: onSave,
                cells: cells,
                isFixedDisabled,
              })}
            </td>
          );
        })}
      </>
    </StyledTableRow>
  );
}
