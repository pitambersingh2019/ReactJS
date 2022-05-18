import { Row } from "react-table";
import useInventoryListForMaterialTableData from "../../../../../../hooks/useInventoryListForMaterialTableData";
import { useAppSelector } from "../../../../../../redux/hooks";
import TableSelect from "./TableSelect/TableSelect";

type InventoryListTableProps = {
  onSelect: (row: Row<{}> | undefined) => void;
  selectedValue: string;
  onSelectionChanged: (updated: boolean) => void;
};

export default function InventoryListTable({
  onSelect,
  selectedValue,
  onSelectionChanged,
}: InventoryListTableProps) {
  const { inventoryListForMaterial } = useAppSelector(
    (state) => state.jobRecipe
  );

  const { columns, tableData } = useInventoryListForMaterialTableData({
    data: inventoryListForMaterial,
  });

  return (
    <TableSelect
      columns={columns}
      data={tableData}
      onRowSelect={onSelect}
      selectedValue={selectedValue}
      onSelectionChanged={onSelectionChanged}
    />
  );
}
