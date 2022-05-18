import { useRef, useState, useCallback } from "react";
import useLongPress from "./useLongPress";
const useDragging = (setColumnOrder, allColumns) => {
  const DragHeaderStart = useRef(null);
  const DragHeaderEnd = useRef(null);
  const tableRef = useRef(null);
  const DraggedColumnref = useRef();
  const [isDragging, setisDragging] = useState({
    value: false,
    column: null,
    columnTarget: null,
  });

  const onDragStart = useCallback((e, column) => {
    setisDragging({ value: true, column: column, columnTarget: column });
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.target, 500000, 500000);
    e.target.style.cursor = "pointer";
    DragHeaderStart.current = column.id;
    if (DraggedColumnref.current) {
      const x = e.clientX;
      const y = e.clientY;
      DraggedColumnref.current.style.top = y <= 0 ? 9999 : y + "px";
      DraggedColumnref.current.style.left = x <= 0 ? 9999 : x + "px";
    }
  }, []);

  // event when dragging
  const onDrag = useCallback((e) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    if (DraggedColumnref.current) {
      const x = e.clientX;
      const y = e.clientY;
      DraggedColumnref.current.style.top = y <= 0 ? 9999 : y + "px";
      DraggedColumnref.current.style.left = x <= 0 ? 9999 : x + "px";
    }
  }, []);

  const handleEnterDragHeader = useCallback((e, column) => {
    DragHeaderEnd.current = column.id;
    // if (isDragging.columnTarget !== DragHeaderEnd.current)
    //   setisDragging((prev) => ({ ...prev, columnTarget: column.id }));
    // console.log(DragHeaderEnd.current);
  }, []);
  // event when drag end
  const onDragEnd = useCallback(() => {
    DraggedColumnref.current.style.top = 9999 + "px";
    DraggedColumnref.current.style.left = 9999 + "px";
    setisDragging({ value: false, column: null });
    //get indexes of columns

    let columnsArray = allColumns.map((d) => d.id);
    const col1Index = columnsArray.indexOf(DragHeaderStart.current);
    const col2Index = columnsArray.indexOf(DragHeaderEnd.current);

    console.log(col1Index, col2Index);
    [columnsArray[col1Index], columnsArray[col2Index]] = [
      columnsArray[col2Index],
      columnsArray[col1Index],
    ];

    setColumnOrder(columnsArray);
  }, [setColumnOrder, allColumns]);

  const handleDragEvent = (ev) => {
    ev.preventDefault();
  };

  const MoveObjectDrag = (e) => {
    if (DraggedColumnref.current) {
      const x = e.clientX;
      const y = e.clientY;
      DraggedColumnref.current.style.top = y <= 0 ? 9999 : y + "px";
      DraggedColumnref.current.style.left = x <= 0 ? 9999 : x + "px";
    }
  };

  const longPressEvent = useLongPress(MoveObjectDrag, undefined);
  return [
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
  ];
};

export default useDragging;
