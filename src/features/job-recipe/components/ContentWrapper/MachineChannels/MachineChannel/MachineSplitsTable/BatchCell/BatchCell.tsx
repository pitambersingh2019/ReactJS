import { CellProps, Row } from "react-table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { MachineSplitsTableRow } from "../../../../../../ts";
import {
  BatchCellContainer,
  OpenIcon,
  RefValue,
  Value,
  ValueContainer,
} from "./batch-cell.styles";
import openIcon from "../../../../../../../../assets/icons/open-popup.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../../locales/translations";
import { useEffect, useRef, useState } from "react";
import Popover from "../Popover/Popover";
import {
  getInventoryListForMaterial,
  updateMachineSplits,
} from "../../../../../../redux/slice";
import InventoryListTable from "../Popover/InventoryListTable";

export default function BatchCell(props: CellProps<MachineSplitsTableRow>) {
  const { t } = useTranslation();

  const initialValue = props.value?.value;
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [showModal, setShowModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);

  const cellRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const {
    showReference,
    isEditing,
    jobId,
    inventoryListForMaterial,
    materialsList,
    machineSplitsTableData,
  } = useAppSelector((state) => state.jobRecipe);

  const onUpdate = (value: string) => {
    props.updateData(props.row.index, props.column.id, value);
    dispatch(
      updateMachineSplits({
        ChannelNum: props.channelNumber,
        KeyName: props.value.KeyName,
        KeyValue: value,
        SplitNum: props.value.SplitNumber,
      })
    );
  };

  const onApply = () => {
    setValue(selectedBatch);
    onUpdate(selectedBatch);
  };

  const selectedMaterial = materialsList.find(
    (material) =>
      material.MaterialID === Number(props.row.original.material.KeyValue)
  );

  const onShowModal = () => {
    setShowModal(true);
    dispatch(
      getInventoryListForMaterial({
        JobID: jobId,
        MaterialID: props.row.original.material.KeyValue
          ? Number(props.row.original.material.KeyValue)
          : props.row.original.materialCatalog?.value
          ? props.row.original.materialCatalog.value
          : "",
      })
    );
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedBatch(initialValue);
  };

  const onSelect = (row: Row<{}> | undefined) => {
    if (row) {
      setSelectedBatch(row.values.MaterialBatch);
    } else {
      setSelectedBatch("");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/(\r\n|\r|\n)/g, "");
    setValue(value);
    onUpdate(value);
  };

  const onSelectionChanged = (updated: boolean) => {
    setIsApplyDisabled(!updated);
  };

  const materialName =
    selectedMaterial?.MaterialName || props.row.original.material.Value;
  const headerTitle = t(translations.JobRecipe.SelectBatchID);
  const headerSubtitle = `${t(translations.JobRecipe.Showing)} ${
    inventoryListForMaterial?.length
  } ${t(translations.JobRecipe.BatchIDs)} ${t(
    translations.JobRecipe.For
  )} ${materialName}`;

  const materialValue =
    machineSplitsTableData[props.channelNumber][Number(props.row.id)].material
      ?.value;

  const isEditable =
    isEditing && materialValue !== "" && materialValue !== "[ - ]";

  useEffect(() => {
    setValue(initialValue);
    setSelectedBatch(initialValue);
  }, [initialValue]);

  //focus cell with error after save
  // useEffect(() => {
  //   if (shouldFocusCellWithError) {
  //     const shouldFocus =
  //       props.channelNumber === updatedMachineSplits[0].ChannelNum &&
  //       props.row.original.splitId === updatedMachineSplits[0].SplitNum;
  //     setIsFocused(shouldFocus);
  //     cellRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [
  //   props.channelNumber,
  //   props.row.original.splitId,
  //   shouldFocusCellWithError,
  //   updatedMachineSplits,
  // ]);

  return (
    <BatchCellContainer ref={cellRef}>
      <ValueContainer isEditing={isEditing && isEditable} isFocused={isFocused}>
        <Value
          isEmpty={!value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={onChange}
          placeholder={t(translations.JobRecipe.NoIDSelected)}
          disabled={!isEditing || !isEditable}
        />
        {isEditable && (
          <OpenIcon src={openIcon} alt="open icon" onClick={onShowModal} />
        )}
      </ValueContainer>
      {showReference && <RefValue>{props.value?.refValue}</RefValue>}
      <Popover
        isOpen={showModal}
        handleClose={onCloseModal}
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
        onApply={onApply}
        tableComponent={
          <InventoryListTable
            onSelect={onSelect}
            selectedValue={value}
            onSelectionChanged={onSelectionChanged}
          />
        }
        isApplyDisabled={isApplyDisabled}
      />
    </BatchCellContainer>
  );
}
