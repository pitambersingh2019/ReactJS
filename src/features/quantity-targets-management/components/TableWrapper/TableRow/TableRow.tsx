import { ReactNode } from "react";
import { Row } from "react-table";
import { TableRowContainer } from "./table-row.styles";

type TableRowComponentProps = {
  children: ReactNode;
  row: Row;
};

export default function TableRow({ children, row }: TableRowComponentProps) {
  //grey bg for each odd department and its machines
  const departmentRowId = Number(row.id.substring(2, 3));
  const isBg = departmentRowId % 2 == 0 && row.depth !== 0;

  return (
    <TableRowContainer depth={row.depth} isBg={isBg}>
      {children}
    </TableRowContainer>
  );
}
