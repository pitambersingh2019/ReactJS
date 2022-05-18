import { useEffect } from "react";
import useSortFields from "../../../hooks/useSortFields";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectTables, selectUserColumns } from "../../../redux/selectors";
import { setRequiredFieldsIds } from "../../../redux/slice";
import { MapTableContainer, WrapperScroll } from "./map-table.styles";
import MapTableHeader from "../../shared/MapTableHeader/MapTableHeader";
import Row from "../../shared/Row/Row";

type MapTableProps = {
  tableName: string;
  fadeOut: boolean;
};

export default function MapTable({ tableName, fadeOut }: MapTableProps) {
  const dispatch = useAppDispatch();
  const tables = useAppSelector(selectTables);
  const headers = useAppSelector(selectUserColumns);

  const tableFields = tables[tableName];
  const { resultFields } = useSortFields(tableFields);

  useEffect(() => {
    const requiredFields = tableFields
      .filter((field) => field.AllowNull === false)
      .map((field) => field.SyncDefinitionFieldID);
    dispatch(setRequiredFieldsIds(requiredFields));
  }, [dispatch, tableFields]);

  const userFieldsItems = headers.map((header, idx) => ({
    value: idx,
    label: header,
  }));

  return (
    <MapTableContainer fadeOut={fadeOut}>
      <MapTableHeader tableName={tableName} />
      <WrapperScroll>
        {resultFields.map((field) => (
          <Row
            dataItem={field}
            key={field.ID}
            userFieldsItems={userFieldsItems}
          />
        ))}
      </WrapperScroll>
    </MapTableContainer>
  );
}
