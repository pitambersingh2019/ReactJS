import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectIsMapped,
  selectIsValidFile,
  selectMappedColumns,
  selectRequiredFieldsIds,
} from "../../redux/selectors";
import {
  getImportSyncFields,
  getSyncFileStatus,
  resetMappedColumns,
  resetUpload,
  setIsMapped,
  updateSyncMappingForInterface,
  uploadSyncFile,
} from "../../redux/slice";
import { MappedColumns } from "../../ts";
import { ActionButtonsContainer } from "./action-buttons.styles";

type ActionsButtonsProps = {
  step: number;
  onCancel: () => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ActionButtons({
  step,
  onCancel,
  onNext,
  onBack,
}: ActionsButtonsProps) {
  const [areAllRequiredFieldsMapped, setAreAllRequiredFieldsMapped] =
    useState(false);

  const dispatch = useAppDispatch();
  const isValidFile = useAppSelector(selectIsValidFile);
  const requiredFiledsIds = useAppSelector(selectRequiredFieldsIds);
  const mappedColumns = useAppSelector(selectMappedColumns);
  const isMapped = useAppSelector(selectIsMapped);

  const { t } = useTranslation();

  const onSync = async () => {
    await dispatch(updateSyncMappingForInterface());
    await dispatch(uploadSyncFile());
    dispatch(resetUpload());
    dispatch(getSyncFileStatus());
    dispatch(getImportSyncFields());
    onCancel();
  };

  const onRemap = () => {
    dispatch(setIsMapped(false));
    dispatch(resetMappedColumns());
  };

  const onCancelMapping = () => {
    dispatch(resetUpload());
  };

  useEffect(() => {
    const checkAreAllRequiredFieldsMapped = () => {
      const notEmptyMappedColumns: MappedColumns = {};
      for (const [id, value] of Object.entries(mappedColumns)) {
        if (value) {
          notEmptyMappedColumns[Number(id)] = value;
        }
      }
      const mappedColumnsIds = Object.keys(notEmptyMappedColumns);
      if (mappedColumnsIds.length > 0) {
        const areAllMapped =
          requiredFiledsIds.filter((id) =>
            mappedColumnsIds.includes(id.toString())
          ).length === requiredFiledsIds.length;
        setAreAllRequiredFieldsMapped(areAllMapped);
      } else {
        setAreAllRequiredFieldsMapped(false);
      }
    };

    checkAreAllRequiredFieldsMapped();
  }, [mappedColumns, requiredFiledsIds]);

  if (step === 1) {
    return (
      <ActionButtonsContainer>
        <Button
          variant="secondary"
          label={t(translations.SyncTool.Cancel)}
          onClick={onCancel}
          size="md"
          width="98px"
        />
        <Button
          variant="primary"
          label={t(translations.SyncTool.Next)}
          onClick={onNext}
          size="md"
          width="104px"
          disabled={!isValidFile}
        />
      </ActionButtonsContainer>
    );
  }

  if (step === 2) {
    return isMapped ? (
      <ActionButtonsContainer>
        <Button
          variant="secondary"
          label={t(translations.SyncTool.Cancel)}
          onClick={onCancelMapping}
          size="md"
          width="98px"
        />
        <Button
          variant="primary"
          label={t(translations.SyncTool.Remap)}
          onClick={onRemap}
          size="md"
          width="104px"
        />
      </ActionButtonsContainer>
    ) : (
      <ActionButtonsContainer>
        <Button
          variant="secondary"
          label={t(translations.SyncTool.Back)}
          onClick={onBack}
          size="md"
          width="98px"
        />
        <Button
          variant="primary"
          label={t(translations.SyncTool.Sync)}
          onClick={onSync}
          size="md"
          width="104px"
          disabled={!areAllRequiredFieldsMapped}
        />
      </ActionButtonsContainer>
    );
  }

  return null;
}
