import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../locales/translations";
import { deepEqual } from "../../../tasks-management/utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetUpdatedData,
  setJobId,
  setMachineSplitsTableData,
  setProductionParametersTableData,
  setEditing,
} from "../../redux/slice";
import { SAVING_STATE } from "../../ts";
import {
  ActionButtonsContainer,
  ButtonsContainer,
  Required,
  RequiredContainer,
  SideContainer,
  Star,
} from "./action-buttons.styles";
import ButtonWithModal from "./ButtonWithModal/ButtonWithModal";

type ActionButtonsProps = {
  jobID: number;
  onScrollToTop: () => void;
  setFormIsChanges: (isChanges: boolean) => void;
};

export default function ActionButtons({
  jobID,
  onScrollToTop,
  setFormIsChanges,
}: ActionButtonsProps) {
  const dispatch = useAppDispatch();
  const {
    loading,
    productRecipeJob,
    error,
    initProductionParametersTableData,
    productionParametersTableData,
    initMachineSplitsTableData,
    machineSplitsTableData,
    isUpdating,
    isEditing,
  } = useAppSelector((state) => state.jobRecipe);

  const { t } = useTranslation();

  const productionParametersChanged = !deepEqual<{}[]>(
    initProductionParametersTableData,
    productionParametersTableData
  );

  const machineSplitsChanged = !deepEqual<{ [channelNumber: number]: {}[] }>(
    initMachineSplitsTableData,
    machineSplitsTableData
  );

  const onCancel = () => {
    productionParametersChanged &&
      dispatch(
        setProductionParametersTableData(initProductionParametersTableData)
      );

    machineSplitsChanged &&
      Object.keys(initMachineSplitsTableData).forEach((key) => {
        dispatch(
          setMachineSplitsTableData({
            channelNumber: Number(key),
            values:
              initMachineSplitsTableData[
                Number(key) as keyof typeof initMachineSplitsTableData
              ],
          })
        );
      });

    dispatch(setEditing(false));
    dispatch(resetUpdatedData());
  };

  useEffect(() => {
    dispatch(setJobId(jobID));
  }, [dispatch, jobID]);

  useEffect(() => {
    const dataChanged = productionParametersChanged || machineSplitsChanged;
    if (dataChanged) {
      setFormIsChanges(true);
    } else {
      setFormIsChanges(false);
    }
  }, [machineSplitsChanged, productionParametersChanged, setFormIsChanges]);

  if (
    loading ||
    isUpdating === SAVING_STATE.SAVING ||
    productRecipeJob?.length === 0
  )
    return null;

  if (!error && isEditing) {
    return (
      <ActionButtonsContainer>
        <SideContainer>
          <RequiredContainer>
            <Star>*</Star>
            <Required>{t(translations.JobRecipe.Required)}</Required>
          </RequiredContainer>
        </SideContainer>
        <ButtonsContainer>
          <Button
            variant="purple-secondary"
            label={t(translations.JobRecipe.Discard)}
            onClick={onCancel}
            size="md"
            width="150px"
          />
          <ButtonWithModal
            productionParametersChanged={productionParametersChanged}
            machineSplitsChanged={machineSplitsChanged}
            onScrollToTop={onScrollToTop}
          />
        </ButtonsContainer>
      </ActionButtonsContainer>
    );
  }

  return null;
}
