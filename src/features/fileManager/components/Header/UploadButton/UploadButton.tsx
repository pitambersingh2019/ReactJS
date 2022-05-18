import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { UploadButtonContainer } from "./upload-button.styles";
import attachIcon from "../../../assets/img/add_file_CTA.svg";
import { useState } from "react";
import UploadPanel from "../../UploadPanel";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetUpload } from "../../../redux/slice";
import SyncErrorLogModal from "../../Table/StatusChip/SyncErrorLogModal/SyncErrorLogModal";
import { selectValidationError } from "../../../redux/selectors";

export default function UploadButton() {
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showValidationErrorModal, setShowValidationErrorModal] =
    useState(false);
  const [fileName, setFileName] = useState("");

  const dispatch = useAppDispatch();
  const validationError = useAppSelector(selectValidationError);

  const { t } = useTranslation();

  const onShowUploadPanel = () => {
    setShowUploadPanel(true);
  };

  const onHideUploadPanel = () => {
    setShowUploadPanel(false);
    dispatch(resetUpload());
  };

  const onShowValidationErrorModal = () => {
    setShowValidationErrorModal(true);
  };

  const onHideValidationErrorModal = () => {
    setShowValidationErrorModal(false);
  };

  const onSeeDetails = (fileName: string) => {
    setFileName(fileName);
    onHideUploadPanel();
    onShowValidationErrorModal();
  };

  return (
    <UploadButtonContainer>
      <Button
        variant="primary"
        label={t(translations.SyncTool.UploadFile)}
        onClick={onShowUploadPanel}
        withIcon
        iconPath={attachIcon}
        iconHeight="24px"
      />
      {showUploadPanel && (
        <UploadPanel onClose={onHideUploadPanel} onSeeDetails={onSeeDetails} />
      )}
      {showValidationErrorModal && (
        <SyncErrorLogModal
          isOpen={showValidationErrorModal}
          handleClose={onHideValidationErrorModal}
          fileName={fileName}
          errorLog={validationError}
        />
      )}
    </UploadButtonContainer>
  );
}
