import React from "react";
import {
  ItemWrapper,
  DragDot,
  DragDotsRow,
  DragDotsWrapper,
  DraggedRowItem,
} from "./styles";
import CheckBox from "../CheckBox";

// eslint-disable-next-line react/display-name
const Item = React.forwardRef(({ column }, ref) => {
  return (
    <DraggedRowItem show={true} ref={ref}>
      <ItemWrapper>
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
          otherprops={column.getToggleHiddenProps()}
          TitleText={column.Header}
          disabled={column.disableHide ?? false}
        />
      </ItemWrapper>
    </DraggedRowItem>
  );
});

export default Item;
