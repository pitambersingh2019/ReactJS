import { DataMapContainer, SelectContainer } from "./data-map.styles";
import Title from "./DataMapTitle/Title";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { Item } from "../../../../Component/DesignSystem/DropDown/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectIsMapped,
  selectSelectedInterface,
  selectTableNames,
  selectTables,
} from "../../redux/selectors";
import MapTable from "./MapTable/MapTable";
import {
  resetMappedColumns,
  setIsMapped,
  setSelectedInterface,
} from "../../redux/slice";
import { SortFieldContextProvider } from "../../context/SortFieldsContext";
import { SearchFieldContextProvider } from "../../context/SearchFieldContext";
import AlreadyMappedWarning from "./AlreadyMappedWarning/AlreadyMappedWarning";
import { useMemo } from "react";

export default function DataMap() {
  const dispatch = useAppDispatch();
  const tableNames = useAppSelector(selectTableNames);
  const tables = useAppSelector(selectTables);
  const selectedInterface = useAppSelector(selectSelectedInterface);
  const isMapped = useAppSelector(selectIsMapped);

  const selectedItem = useMemo(
    () =>
      selectedInterface
        ? { value: selectedInterface.id, label: selectedInterface.name }
        : undefined,
    [selectedInterface]
  );

  const { t } = useTranslation();

  const checkIsMapped = (selectedTableName: keyof typeof tables) => {
    const isTableMapped = tables[selectedTableName].some(
      (field) => field.sourcefieldname !== null
    );
    dispatch(setIsMapped(isTableMapped));
  };

  const onSelect = (item: Item | undefined) => {
    dispatch(
      setSelectedInterface(
        item ? { id: item.value, name: item.label } : undefined
      )
    );
    item && checkIsMapped(item.label);
    dispatch(resetMappedColumns());
  };

  return (
    <DataMapContainer>
      <Title />
      <SelectContainer>
        <SingleSelect
          TitleText={t(translations.SyncTool.TableName)}
          placeholder={t(translations.SyncTool.SelectDataTable)}
          required={false}
          onSelect={onSelect}
          searchable
          items={tableNames}
          selectedItem={selectedItem}
        />
      </SelectContainer>
      {isMapped && <AlreadyMappedWarning />}
      {selectedInterface && (
        <SortFieldContextProvider>
          <SearchFieldContextProvider>
            <MapTable tableName={selectedInterface.name} fadeOut={isMapped} />
          </SearchFieldContextProvider>
        </SortFieldContextProvider>
      )}
    </DataMapContainer>
  );
}
