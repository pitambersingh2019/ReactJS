import { useState } from "react";
import { useTranslation } from "react-i18next";
import SingleSelect from "../../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { Item } from "../../../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectMappedColumns } from "../../../../redux/selectors";
import { setMappedColumns } from "../../../../redux/slice";

type ColumnSelectorProps = {
  dataItemId: number;
  userFieldsItems: Item[];
};

export default function ColumnSelector({
  dataItemId,
  userFieldsItems,
}: ColumnSelectorProps) {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const dispatch = useAppDispatch();

  const mappedColumns = useAppSelector(selectMappedColumns);
  const mappedColumnsNames = Object.values(mappedColumns);

  const { t } = useTranslation();

  const onSelect = (item: Item | undefined) => {
    setSelectedItem(item);
    dispatch(
      setMappedColumns({
        id: dataItemId,
        name: item?.label,
      })
    );
  };

  const items = userFieldsItems.filter(({ label }) => {
    if (selectedItem) {
      return mappedColumnsNames.includes(label) && label === selectedItem.label
        ? true
        : !mappedColumnsNames.includes(label);
    }
    return !mappedColumnsNames.includes(label);
  });

  return (
    <SingleSelect
      TitleText=""
      placeholder={t(translations.SyncTool.SelectColumn)}
      onSelect={onSelect}
      items={items}
      selectedItem={selectedItem}
      required={false}
    />
  );
}
