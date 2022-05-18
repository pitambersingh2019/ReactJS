import useSortFields from "../../../../hooks/useSortFields";
import { useAppSelector } from "../../../../redux/hooks";
import { selectTables } from "../../../../redux/selectors";
import MapTableHeader from "../../../shared/MapTableHeader/MapTableHeader";
import Row from "../../../shared/Row/Row";
import { MappedTableContainer, WrapperScroll } from "./mapped-table.styles";

type MappedTableProps = {
  tableName: string;
};

export default function MappedTabled({ tableName }: MappedTableProps) {
  const tables = useAppSelector(selectTables);

  const tableFields = tables[tableName];
  const { resultFields } = useSortFields(tableFields);
  return (
    <MappedTableContainer>
      <MapTableHeader tableName={tableName} />
      <WrapperScroll>
        {resultFields.map((field) => (
          <Row dataItem={field} key={field.ID} withSelect={false} />
        ))}
      </WrapperScroll>
    </MappedTableContainer>
  );
}
