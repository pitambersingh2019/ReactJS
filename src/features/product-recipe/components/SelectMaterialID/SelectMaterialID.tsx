import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useSelector } from "react-redux";
import { selectMaterialsList } from "../../slice/selectors";
import SelectTable from "../SelectTable/SelectTable";

type SelectMaterialIDProps = {
  onSelect: (value: any) => void;
  selectedItem: number;
};

const SelectMaterialID: React.FC<SelectMaterialIDProps> = ({
  onSelect,
  selectedItem,
}) => {
  const { t } = useTranslation();
  const materialsList = useSelector(selectMaterialsList);
  const columns = useMemo(
    () => [
      {
        Header: t(translations.ProductRecipe.ID),
        accessor: "ID",
      },
      {
        Header: t(translations.ProductRecipe.MATERIAL_ID),
        accessor: "MaterialID",
      },
      {
        Header: t(translations.ProductRecipe.MATERIAL_NAME),
        accessor: "MaterialName",
      },
      {
        Header: t(translations.ProductRecipe.DESCRIPTION),
        accessor: "Description",
      },
      {
        Header: t(translations.ProductRecipe.CATALOG_ID),
        accessor: "CatalogID",
      },
      {
        Header: t(translations.ProductRecipe.MATERIAL_GROUP_NAME),
        accessor: "MaterialGroupName",
      },
    ],
    []
  );

  return (
    <SelectTable
      columns={columns}
      data={materialsList}
      onSelect={onSelect}
      selectedItem={selectedItem}
    />
  );
};

export default SelectMaterialID;
