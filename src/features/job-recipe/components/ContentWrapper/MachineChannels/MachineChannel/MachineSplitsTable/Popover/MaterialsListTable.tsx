import { Row } from "react-table";
import useMaterialsListTableData from "../../../../../../hooks/useMaterialsListTableData";
import { useAppSelector } from "../../../../../../redux/hooks";
import TableSelect from "./TableSelect/TableSelect";

type MaterialsListTableProps = {
  onSelect: (row: Row<{}> | undefined) => void;
  selectedValue: string;
};

export default function MaterialsListTable({
  onSelect,
  selectedValue,
}: MaterialsListTableProps) {
  const { materialsList } = useAppSelector((state) => state.jobRecipe);

  const { tableData, columns } = useMaterialsListTableData(materialsList);

  return (
    <TableSelect
      columns={columns}
      data={tableData}
      onRowSelect={onSelect}
      selectedValue={selectedValue}
    />
  );
}
