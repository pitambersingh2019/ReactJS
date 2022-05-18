import {
  CopyFromReferenceContainer,
  CopyIcon,
  Label,
} from "./copy-from-reference.styles";
import copyIcon from "../../../../../../assets/icons/Copy_reference.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  copyFromReferenceRecipeJob,
  getProductRecipeJob,
  getProductReferenceRecipeJob,
} from "../../../../redux/slice";
import { useState } from "react";
import CopyFromReferenceModal from "./CopyFromReferenceModal/CopyFromReferenceModal";

export default function CopyFromReference() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const jobId = useAppSelector((state) => state.jobRecipe.jobId);

  const { t } = useTranslation();

  const onCopyFromReference = async () => {
    onHideModal();
    if (jobId) {
      await dispatch(copyFromReferenceRecipeJob(jobId));
      dispatch(getProductRecipeJob(jobId));
      dispatch(getProductReferenceRecipeJob(jobId));
    }
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  return (
    <CopyFromReferenceContainer>
      <CopyIcon
        src={copyIcon}
        alt="copy reference icon"
        onClick={onShowModal}
      />
      <Label onClick={onShowModal}>
        {t(translations.JobRecipe.CopyFromReference)}
      </Label>
      <CopyFromReferenceModal
        isOpen={showModal}
        handleClose={onHideModal}
        onCopy={onCopyFromReference}
      />
    </CopyFromReferenceContainer>
  );
}
