import { Row } from "react-table";
import { TableRowContainer } from "./table-row.styles";

type TableRowProps = {
  children: React.ReactNode;
  row: Row<{}>;
};

export default function TableRow({
  children,
  row,
  ...otherProps
}: TableRowProps) {
  return (
    <TableRowContainer {...otherProps} isSelected={row.isSelected}>
      {children}
    </TableRowContainer>
  );
}
