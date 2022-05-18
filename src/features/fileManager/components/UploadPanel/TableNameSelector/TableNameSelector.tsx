import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SingleSelect from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../../locales/translations";
import { SearchFieldContextProvider } from "../../../context/SearchFieldContext";
import { SortFieldContextProvider } from "../../../context/SortFieldsContext";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectMappedTableNames,
  selectSelectedInterface,
} from "../../../redux/selectors";
import { setSelectedInterface } from "../../../redux/slice";
import MappingModal from "../MappingModal/MappingModal";
import {
  SelectorLabel,
  TableNameSelectorContainer,
  TopRowContainer,
  ViewMappingButton,
} from "./table-name-selector.styles";

export default function TableNameSelector() {
  const [showMappingModal, setShowMappingModal] = useState(false);

  const dispatch = useAppDispatch();
  const mappedTableNames = useAppSelector(selectMappedTableNames);
  const selectedInterface = useAppSelector(selectSelectedInterface);

  const selectedItem = useMemo(
    () =>
      selectedInterface
        ? { value: selectedInterface.id, label: selectedInterface.name }
        : undefined,
    [selectedInterface]
  );

  const { t } = useTranslation();

  const onSelect = (item: Item | undefined) => {
    dispatch(
      setSelectedInterface(
        item ? { id: item.value, name: item.label } : undefined
      )
    );
  };

  const onViewMapping = () => {
    setShowMappingModal(true);
  };

  const onCloseMappingModal = () => {
    setShowMappingModal(false);
  };

  return (
    <TableNameSelectorContainer>
      <TopRowContainer>
        <SelectorLabel>{t(translations.SyncTool.TableName)}</SelectorLabel>
        <ViewMappingButton
          isDisabled={!selectedInterface}
          onClick={onViewMapping}
        >
          {t(translations.SyncTool.ViewMapping)}
        </ViewMappingButton>
      </TopRowContainer>
      <SingleSelect
        TitleText=""
        placeholder={t(translations.SyncTool.SelectTable)}
        required={false}
        onSelect={onSelect}
        searchable
        items={mappedTableNames}
        selectedItem={selectedItem}
      />
      <SortFieldContextProvider>
        <SearchFieldContextProvider>
          <MappingModal
            isOpen={showMappingModal}
            handleClose={onCloseMappingModal}
          />
        </SearchFieldContextProvider>
      </SortFieldContextProvider>
    </TableNameSelectorContainer>
  );
}
