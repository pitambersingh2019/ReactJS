import React from "react";

const TableRow = ({ row }) => {
  return (
    <tr
      {...row.getRowProps()}
      style={{ background: row.isSelected ? "#f4f2ff" : "#ffffff" }}
    >
      {row.cells.map((cell, index) => {
        return (
          <td
            {...cell.getCellProps()}
            key={index}
            style={{ padding: "14px 8px", color: "#101010", fontSize: "14px" }}
          >
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
