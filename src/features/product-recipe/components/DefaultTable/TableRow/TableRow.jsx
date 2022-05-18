import React from "react";
import Cell from "../Cell/Cell";

const TableRow = ({ row }) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell, index) => {
        return (
          <td {...cell.getCellProps()} key={index} style={{ padding: "4px" }}>
            {/* {cell.render("Cell")} */}
            <Cell cell={cell} />
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
