/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Column from "./Col";
import { MENU_COLS, SELECTION_COLS } from "./config";
import { Col } from "./styles";
import ColumnSelector from "./ColumnSelector";
const Cols = ({
  headerGroups,
  dragstart,
  dragenter,
  dragend,
  drag,
  allColumns,
  columnTarget,
  tableBodyHeight,
}) => {
  console.log("headerGroups", headerGroups);
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup}
          {...headerGroup.getHeaderGroupProps()}
          style={{
            ...headerGroup.getHeaderGroupProps().style,
            width: headerGroup.getHeaderGroupProps().style.width,
          }}
          className="tr"
          onClick={() => console.log(headerGroup.getHeaderGroupProps())}
        >
          {/* <Col {...selectionHeader.getHeaderProps()}></Col> */}
          {headerGroup.headers
            .filter((d) => d.id !== MENU_COLS)
            .map((column, index) => (
              <Column
                key={index}
                column={column}
                dragstart={dragstart}
                dragenter={dragenter}
                dragend={dragend}
                drag={drag}
                draggable={true}
                columnTarget={columnTarget}
                tableBodyHeight={tableBodyHeight}
                allColumns={allColumns}
              ></Column>
            ))}
        </div>
      ))}
    </>
  );
};

export default Cols;
