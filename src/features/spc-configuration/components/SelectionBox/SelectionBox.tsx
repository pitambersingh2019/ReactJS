import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { SetTreeDepartments, SetStep, SetSelectedMachines } from "../../slice";
import {
  selectSPCSelectedMachines,
  selectSPCDepartmentData,
  selectSPCStep,
} from "../../slice/selectors";
import SelectMachineBox from "./SelectMachine/SelectMachine";
import SelectedMachineBox from "./SelectedMachine/SelectedMachine";
import Button from "../../../../Component/DesignSystem/Buttons";
import {
  StyledSelectionBox,
  ButtonContainer,
  StyledSelectionBoxWrapper,
  StyledSelectionBoxContainer,
} from "./selection-box.styles";
import { SelectedMachine } from "../../slice/types";
import { getDepartmentTreeData } from "../../utils";

const SelectionBox: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [disableDoneButton, setDisableDoneButton] = useState(true);
  const selectedMachines = useSelector(selectSPCSelectedMachines);
  const departments = useSelector(selectSPCDepartmentData);
  const step = useSelector(selectSPCStep);
  const [step3InitialData, setStep3InitialData] = useState<SelectedMachine[]>(
    []
  );

  useEffect(() => {
    const Factory = getDepartmentTreeData(departments);
    dispatch(SetTreeDepartments(Factory));
  }, [dispatch, departments]);

  useEffect(() => {
    if (step === 1) {
      setDisableNextButton(selectedMachines.length > 0 ? false : true);
    } else {
      let sameArray =
        selectedMachines.length === step3InitialData.length &&
        selectedMachines.every((ele, index) => {
          return ele === step3InitialData[index];
        });
      step3InitialData.length > 0 &&
        setDisableDoneButton(sameArray ? true : false);
    }
  }, [selectedMachines]);

  useEffect(() => {
    if (step === 3) {
      setStep3InitialData(selectedMachines);
    }
  }, [step]);

  const handleSPCStep = (step: 2, value: "cancel" | "done" | "next") => {
    if (value === "cancel") {
      dispatch(SetSelectedMachines(step3InitialData));
    }
    dispatch(SetStep(step));
  };

  return (
    <StyledSelectionBoxWrapper>
      <StyledSelectionBoxContainer>
        <StyledSelectionBox>
          <SelectMachineBox />
          <SelectedMachineBox />
        </StyledSelectionBox>
        <ButtonContainer>
          {step === 1 && (
            <Button
              onClick={() => handleSPCStep(2, "next")}
              label={t(translations.SPC.NEXT)}
              size="lg"
              disabled={disableNextButton}
            />
          )}
          {step === 3 && (
            <>
              <Button
                onClick={() => handleSPCStep(2, "cancel")}
                label={t(translations.SPC.CANCEL)}
                size="lg"
                variant="secondary"
              />
              <Button
                onClick={() => handleSPCStep(2, "done")}
                label={t(translations.SPC.DONE)}
                size="lg"
                disabled={disableDoneButton}
              />
            </>
          )}
        </ButtonContainer>
      </StyledSelectionBoxContainer>
    </StyledSelectionBoxWrapper>
  );
};

export default SelectionBox;
