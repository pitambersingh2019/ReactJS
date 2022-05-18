import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import {
  ArrowIcon,
  ButtonContainer,
  Modal,
  ModalContainer,
  ModalItem,
} from "./button-wtih-modal.styles";
import arrowIcon from "../../../../../assets/icons/arrow-white.svg";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  copyJobRecipeToProductRecipe,
  getMachineMainChannelsParametersData,
  getProductRecipeJob,
  getProductReferenceRecipeJob,
  resetUpdatedData,
  saveMachineMainChannelsParametersData,
  updateProductRecipeJob,
} from "../../../redux/slice";
import SaveAlternativeRecipeModal from "../SaveAlternativeRecipeModal/SaveAlternativeRecipeModal";
import SaveProductRecipeModal from "../SaveProductRecipeModal/SaveProductRecipeModal";

type ButtonWithModalProps = {
  productionParametersChanged: boolean;
  machineSplitsChanged: boolean;
  onScrollToTop: () => void;
};

export default function ButtonWithModal({
  productionParametersChanged,
  machineSplitsChanged,
  onScrollToTop,
}: ButtonWithModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [showSaveAlternativeRecipeModal, setShowAlternativeRecipeModal] =
    useState(false);
  const [showSaveProductRecipeModal, setShowProductRecipeModal] =
    useState(false);

  const dispatch = useAppDispatch();
  const { updatedProductionParameters, updatedMachineSplits, jobId } =
    useAppSelector((state) => state.jobRecipe);

  const { t } = useTranslation();

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowAlternativeRecipeModal = () => {
    setShowAlternativeRecipeModal(true);
  };

  const onCloseAlternativeRecipeModal = () => {
    setShowAlternativeRecipeModal(false);
  };

  const onShowProductRecipeModal = () => {
    setShowProductRecipeModal(true);
  };

  const onCloseProductRecipeModal = () => {
    setShowProductRecipeModal(false);
  };

  const saveProductionParameters = async () => {
    await dispatch(
      updateProductRecipeJob({
        JobID: jobId,
        recipeValue: updatedProductionParameters,
      })
    );
    // dispatch(resetUpdatedData());
    dispatch(getProductRecipeJob(jobId));
    dispatch(getProductReferenceRecipeJob(jobId));
  };

  const saveMachineSplits = async () => {
    await dispatch(saveMachineMainChannelsParametersData(updatedMachineSplits));
    dispatch(getMachineMainChannelsParametersData(jobId));
    dispatch(getProductRecipeJob(jobId)); //to refresh last updated info
    // .unwrap()
    // .then((res) => {
    //   if (!res.error) {
    //     dispatch(setShouldFocusCellWithError(false));
    //     dispatch(resetUpdatedData());
    //     dispatch(getMachineMainChannelsParametersData(jobId));
    //   } else {
    //     dispatch(setEditing(true));
    //   }
    // });
  };

  const onSave = async () => {
    onScrollToTop();
    productionParametersChanged && (await saveProductionParameters());
    machineSplitsChanged && (await saveMachineSplits());
    dispatch(resetUpdatedData());
    // window.location.reload();
  };

  const onSaveAsProductRecipe = async () => {
    await onSave();
    dispatch(copyJobRecipeToProductRecipe(jobId));
  };

  const ModalItems = [
    {
      label: t(translations.JobRecipe.SaveChanges),
      actionFunc: onSave,
    },
    {
      label: t(translations.JobRecipe.SaveAsProductRecipe),
      actionFunc: onShowProductRecipeModal,
    },
    {
      label: t(translations.JobRecipe.SaveAsAlternativeRecipe),
      actionFunc: onShowAlternativeRecipeModal,
    },
  ];

  return (
    <ButtonContainer>
      <Button
        variant="purple"
        label={t(translations.JobRecipe.SaveChanges)}
        onClick={onSave}
        size="md"
      />
      <ModalContainer>
        <ArrowIcon src={arrowIcon} alt="arrow icon" onClick={onShowModal} />
        {showModal && (
          <ClickAwayListener onClickAway={onCloseModal}>
            <Modal>
              {ModalItems.map(({ actionFunc, label }) => (
                <ModalItem key={label} onClick={actionFunc}>
                  {label}
                </ModalItem>
              ))}
            </Modal>
          </ClickAwayListener>
        )}
      </ModalContainer>
      <SaveAlternativeRecipeModal
        isOpen={showSaveAlternativeRecipeModal}
        handleClose={onCloseAlternativeRecipeModal}
        onSaveChanges={onSave}
      />
      <SaveProductRecipeModal
        isOpen={showSaveProductRecipeModal}
        handleClose={onCloseProductRecipeModal}
        onSaveProductRecipe={onSaveAsProductRecipe}
        onSaveAsAlternativeRecipe={onShowAlternativeRecipeModal}
      />
    </ButtonContainer>
  );
}
