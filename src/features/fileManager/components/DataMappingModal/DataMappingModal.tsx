import { useState } from "react";
import CustomPopover from "../../../../Component/CustomModal/CustomPopover";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFileUploadError } from "../../redux/selectors";
import { resetUpload } from "../../redux/slice";
import ActionButtons from "../ActionButtons/ActionsButtons";
import DataMap from "../DataMap/DataMap";
import FileUploadWrapper from "../FileUploadWrapper/FileUploadWrapper";
import ModalHeader from "../shared/ModalHeader/ModalHeader";
import dataMappingIcon from "../../assets/img/data-mapping-black.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

type DataMappingModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function DataMappingModal({
  isOpen,
  handleClose,
}: DataMappingModalProps) {
  const [step, setStep] = useState(1);

  const dispatch = useAppDispatch();
  const fileUploadError = useAppSelector(selectFileUploadError);

  const { t } = useTranslation();

  const onNext = () => {
    setStep(2);
  };

  const onBack = () => {
    setStep(1);
  };

  const onCancel = () => {
    dispatch(resetUpload());
    if (!fileUploadError) {
      handleClose();
    }
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{ width: "880px", minHeight: "640px" }}
    >
      <ModalHeader
        onClose={handleClose}
        icon={dataMappingIcon}
        title={t(translations.SyncTool.DataMapping)}
      />
      {step === 1 && <FileUploadWrapper />}
      {step === 2 && <DataMap />}
      <ActionButtons
        step={step}
        onCancel={onCancel}
        onNext={onNext}
        onBack={onBack}
      />
    </CustomPopover>
  );
}
