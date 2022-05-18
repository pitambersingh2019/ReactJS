/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { DraggedColumnStyled, Row } from "./styles";
import Column from "./Col";
// eslint-disable-next-line react/display-name
const DraggedColumn = React.forwardRef((props, ref) => {
  const column = props.column;
  const rows = props.rows;
  const show = props.show;
  const prepareRow = props.prepareRow;
  const zindex = props.zindex;
  const sortbystate = props.sortbystate;
  const aggregationState = props.aggregationState;
  const isRtl = props.isRtl;
  const dispatch = props.dispatch;
  return (
    <DraggedColumnStyled
      ref={ref}
      show={show}
      zindex={zindex}
      style={{ overflow: "hidden" }}
    >
      <Column
        column={column}
        draggable={false}
        disableAggregations={true}
        sortbystate={sortbystate}
        aggregationState={aggregationState}
        dispatch={dispatch}
        isRtl={isRtl}
      ></Column>
      {rows.map((row, index) => {
        prepareRow(row);
        return (
          <div key={index} style={{ height: "50px" }}>
            {row.cells.map((cell, index) => {
              return (
                cell.column.id === column.id && (
                  <Row {...cell.getCellProps()}>{cell.render("Cell")}</Row>
                )
              );
            })}
          </div>
        );
      })}
    </DraggedColumnStyled>
  );
});

export default DraggedColumn;
