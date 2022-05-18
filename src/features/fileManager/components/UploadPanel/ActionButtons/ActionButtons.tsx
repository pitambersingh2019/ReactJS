import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectIsValidationMappingError,
  selectIsValidFile,
  selectSelectedInterface,
} from "../../../redux/selectors";
import {
  getImportSyncFields,
  getSyncFileStatus,
  resetUpload,
  uploadSyncFile,
  validateSyncMappingForInterface,
} from "../../../redux/slice";
import { ActionButtonsContainer } from "./action-buttons.styles";

type ActionButtonsProps = {
  onClose: () => void;
};

export default function ActionButtons({ onClose }: ActionButtonsProps) {
  const dispatch = useAppDispatch();
  const isValidFile = useAppSelector(selectIsValidFile);
  const selectedInterface = useAppSelector(selectSelectedInterface);
  const isValidationMappingError = useAppSelector(
    selectIsValidationMappingError
  );

  const isDisabled =
    !isValidFile || !selectedInterface || isValidationMappingError;

  const { t } = useTranslation();

  const onCancel = () => {
    dispatch(resetUpload());
    onClose();
  };

  const onSync = async () => {
    const isError = await dispatch(validateSyncMappingForInterface())
      .unwrap()
      .then((res) => res.error?.ErrorDescription);
    if (!isError) {
      await dispatch(uploadSyncFile());
      dispatch(resetUpload());
      dispatch(getSyncFileStatus());
      dispatch(getImportSyncFields());
      onClose();
    }
  };

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
        label={t(translations.SyncTool.Sync)}
        onClick={onSync}
        size="md"
        width="104px"
        disabled={isDisabled}
      />
    </ActionButtonsContainer>
  );
}
