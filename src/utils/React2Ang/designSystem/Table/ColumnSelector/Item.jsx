import React, { useEffect, useState } from "react";
import { ItemWrapper, DragDot, DragDotsRow, DragDotsWrapper } from "./styles";
import CheckBox from "../CheckBox";

// eslint-disable-next-line react/display-name
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Item = ({ column, dragstart, dragend, dragenter, drag, draggeditem }) => {
  const [checked, setChecked] = useState(column.isVisible);
  useEffect(() => {
    setChecked(column.isVisible);
  }, [column.isVisible]);

  const toggleHidden = () => {
    column.toggleHidden(checked);
  };
  return (
    <ItemWrapper
      onDragEnter={(e) => dragenter(e, column)}
      onDragEnd={dragend}
      onDrag={drag}
      draggable
      onDragStart={(e) => dragstart(e, column)}
    >
      {draggeditem && draggeditem.id === column.id ? (
        <div
          style={{
            width: "100%",
            height: "35px",
            background: `repeating-linear-gradient(
              -45deg,
              #ffffff,
              #ffffff 10px,
              #f6f7fc 10px,
              #f6f7fc 20px
            )`,
          }}
        ></div>
      ) : (
        <>
          <DragDotsWrapper>
            <DragDotsRow>
              <DragDot />
              <DragDot />
            </DragDotsRow>
            <DragDotsRow>
              <DragDot />
              <DragDot />
            </DragDotsRow>
            <DragDotsRow>
              <DragDot />
              <DragDot />
            </DragDotsRow>
          </DragDotsWrapper>

          <CheckBox
            checked={checked}
            toggleHidden={toggleHidden}
            TitleText={column.Header}
            disabled={column.disableHide ?? false}
            toolTipProps={{ width: 160, showTooltip: true }}
          />
        </>
      )}
    </ItemWrapper>
  );
};

export default Item;
