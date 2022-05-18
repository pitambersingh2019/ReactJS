import { CellProps, Row } from "react-table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { MachineSplit, MaterialItem } from "../../../../../../ts";
import {
  Catalog,
  CatalogRef,
  Material,
  MaterialCatalogCellContainer,
  MaterialRef,
  OpenIcon,
  RefContainer,
  SideContainer,
  ValuesContainer,
} from "./material-catalog-cell.styles";
import openIcon from "../../../../../../../../assets/icons/open-popup.svg";
import { useEffect, useState } from "react";
import Popover from "../Popover/Popover";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../../locales/translations";
import MaterialsListTable from "../Popover/MaterialsListTable";
import {
  getMaterialsList,
  updateMachineSplits,
} from "../../../../../../redux/slice";

export default function MaterialCatalogCell(
  props: CellProps<
    MachineSplit & {
      catalog: { value: string; refValue: string } & MachineSplit;
      material: { value: string; refValue: string } & MachineSplit;
    }
  >
) {
  const [materialValue, setMaterialValue] = useState("");
  const [catalogValue, setCatalogValue] = useState("");
  const [selectedMaterialName, setSelectedMaterialName] = useState("");

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem>(
    {} as MaterialItem
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const { showReference, isEditing, materialsList, machineSplitsTableData } =
    useAppSelector((state) => state.jobRecipe);

  const { t } = useTranslation();

  const onShowModal = () => {
    setShowModal(true);
    dispatch(getMaterialsList());
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedMaterial({} as MaterialItem);
    setSelectedMaterialName(props.row.original.material.value);
  };

  const onUpdate = (value: number) => {
    props.updateData(
      props.row.index,
      "material",
      selectedMaterial.MaterialName,
      selectedMaterial.MaterialID
    );
    dispatch(
      updateMachineSplits({
        ChannelNum: props.channelNumber,
        KeyName: props.row.original.material.KeyName,
        KeyValue: value,
        SplitNum: props.row.original.material.SplitNumber,
      })
    );
    //set batch value to empty on each material change
    const batchCell =
      machineSplitsTableData[props.channelNumber][Number(props.row.id)].batch;
    dispatch(
      updateMachineSplits({
        ChannelNum: props.channelNumber,
        KeyName: batchCell.KeyName || "",
        KeyValue: "",
        SplitNum: props.row.original.material.SplitNumber,
      })
    );
  };

  const onApply = () => {
    setMaterialValue(selectedMaterial.MaterialName || "[ - ]");
    setCatalogValue(selectedMaterial.CatalogID || "[ - ]");
    onUpdate(selectedMaterial.MaterialID);
  };

  const onSelect = (row: Row<{}> | undefined) => {
    if (row) {
      setSelectedMaterial(row.original as MaterialItem);
      setSelectedMaterialName((row.original as MaterialItem).MaterialName);
    } else {
      setSelectedMaterial({} as MaterialItem);
      setSelectedMaterialName("[ - ]");
    }
  };

  useEffect(() => {
    const materialInitValue = props.row.original.material.value;
    setMaterialValue(materialInitValue);
    setSelectedMaterialName(materialInitValue);
  }, [props.row.original.material.value]);

  useEffect(() => {
    const catalogInitValue = props.row.original.catalog.value;
    setCatalogValue(catalogInitValue);
  }, [props.row.original.catalog.value]);

  const headerTitle = t(translations.JobRecipe.SelectMaterial);

  const headerSubtitle = `${t(translations.JobRecipe.Showing)} ${
    materialsList.length
  } ${t(translations.JobRecipe.Materials)}`;

  const isDisabled = selectedMaterialName === materialValue;

  return (
    <MaterialCatalogCellContainer>
      <ValuesContainer isEditing={isEditing}>
        <SideContainer>
          <Material>{materialValue}</Material>
          <Catalog>{catalogValue}</Catalog>
        </SideContainer>
        {isEditing && (
          <OpenIcon src={openIcon} alt="open icon" onClick={onShowModal} />
        )}
      </ValuesContainer>
      {showReference && (
        <RefContainer>
          <MaterialRef>{props.row.original.material.refValue}</MaterialRef>
          <CatalogRef>{props.row.original.catalog.refValue}</CatalogRef>
        </RefContainer>
      )}
      <Popover
        isOpen={showModal}
        handleClose={onCloseModal}
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
        onApply={onApply}
        tableComponent={
          <MaterialsListTable
            onSelect={onSelect}
            selectedValue={materialValue}
          />
        }
        isApplyDisabled={isDisabled}
      />
    </MaterialCatalogCellContainer>
  );
}
