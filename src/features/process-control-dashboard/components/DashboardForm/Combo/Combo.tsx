import { useEffect, useState } from "react";
import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useEditMode } from "../../../context/useEditMode";
import { useParams } from "../../../context/useParams";
import { PCParam } from "../../../ts";
import { getRandomId } from "../../../utils/export-utils";
import SaveButton from "../SaveButton/SaveButton";
import MachineParamRow from "../MachineParamRow/MachineParamRow";
import { ComboContainer, DeleteIcon } from "./combo.styles";
import deleteIcon from "../../../../../assets/icons/tasks-management/delete.svg";

type ComboProps = {
  hideCombo: () => void;
  pcDisplayId?: number;
  onScroll: () => void;
};

export default function Combo({
  hideCombo,
  pcDisplayId,
  onScroll,
}: ComboProps) {
  const [selectedPCMachine, setSelectedPCMachine] = useState<Item | undefined>(
    undefined
  );
  const [selectedPCParam, setSelectedPCParam] = useState<Item | undefined>(
    undefined
  );
  const [isSecondaryAxis, setIsSecondaryAxis] = useState(false);
  const [showParamLim, setShowParamLim] = useState(false);

  const { pcDisplay, setPCDisplay } = useDisplayForm();
  const { activeDashboard } = useEditMode();
  const { getParamNameById, getParamDisplayNameById, getParamIdByParamName } =
    useParams();

  const saveButtonDisabled = !selectedPCMachine || !selectedPCParam;

  const { PCParams } = pcDisplay;

  const onSecondaryAxisUpdate = () => {
    setIsSecondaryAxis((prev) => !prev);
  };

  const onShowParamLimUpdate = () => {
    setShowParamLim((prev) => !prev);
  };

  const updatePcDisplay = (newPcParam: PCParam, index: number) => {
    const updatedPcDisplays = [...PCParams];
    updatedPcDisplays[index] = newPcParam;
    setPCDisplay((prev) => ({
      ...prev,
      PCParams: updatedPcDisplays,
    }));
  };

  const addPcDisplay = (newPcParam: PCParam) => {
    setPCDisplay((prev) => ({
      ...prev,
      PCParams: [...prev.PCParams, newPcParam],
    }));
  };

  const getMachineName = (names: string[] | undefined) => {
    if (names) {
      return names.length > 1 ? names[1].trim() : names[0].trim();
    }

    return "";
  };

  const onAddPcDisplay = () => {
    hideCombo();
    const names = selectedPCMachine?.label.split(":");
    const machineName = getMachineName(names);

    const newPcDisplay: PCParam = {
      ParamID: pcDisplayId || getRandomId(),
      MachineID: selectedPCMachine?.value || 0,
      ParamName: getParamNameById(selectedPCParam?.value || 0),
      ShowParamLimits: showParamLim,
      IsSecondaryAxis: isSecondaryAxis,
      MachineName: machineName,
      DepartmentName: names ? names[0] : "",
      UpsertType: 2,
      ParamDisplayName: getParamDisplayNameById(selectedPCParam?.value || 0),
    };
    const idx = PCParams.findIndex((d) => d.ParamID === pcDisplayId);
    if (idx !== -1) {
      updatePcDisplay({ ...newPcDisplay, UpsertType: 3 }, idx);
    } else {
      addPcDisplay({ ...newPcDisplay, UpsertType: 2 });
    }
  };

  useEffect(() => {
    if (pcDisplayId) {
      let currentPcDisplay;
      //if creating a new display (id === 0), search in form displays, else search in active dashboard displays
      if (pcDisplay.DisplayID === 0) {
        currentPcDisplay = PCParams.find((d) => d.ParamID === pcDisplayId);
      } else {
        const curDisplay = activeDashboard.PCDisplays.find(
          (d) => d.DisplayID === pcDisplay.DisplayID
        );
        currentPcDisplay = curDisplay?.PCParams.find(
          (d) => d.ParamID === pcDisplayId
        );
      }
      setSelectedMachine({
        value: currentPcDisplay?.MachineID || 0,
        label: `${currentPcDisplay?.MachineName}`,
      });
      setSelectedPCParam({
        value: getParamIdByParamName(currentPcDisplay?.ParamName || "") || 0,
        label: currentPcDisplay?.ParamDisplayName || "",
      });
      setIsSecondaryAxis(currentPcDisplay?.IsSecondaryAxis || false);
      setShowParamLim(currentPcDisplay?.ShowParamLimits || false);
    }
  }, [
    PCParams,
    activeDashboard.PCDisplays,
    getParamIdByParamName,
    pcDisplay.DisplayID,
    pcDisplayId,
  ]);

  const setSelectedMachine = (machine: Item | undefined) => {
    setSelectedPCMachine(machine);
  };

  const setSelectedParam = (param: Item | undefined) => {
    setSelectedPCParam(param);
  };

  const props = {
    selectedMachine: selectedPCMachine,
    selectedParam: selectedPCParam,
    setSelectedMachine,
    setSelectedParam,
    isSecondaryAxis,
    onSecondaryAxisUpdate,
    showParamLim,
    onShowParamLimUpdate,
    onScroll,
  };

  const showDeleteIcon =
    !selectedPCMachine && !selectedPCParam && PCParams.length > 0;

  return (
    <ComboContainer>
      <MachineParamRow {...props} />
      <SaveButton isDisabled={saveButtonDisabled} onAdd={onAddPcDisplay} />
      {showDeleteIcon && (
        <DeleteIcon src={deleteIcon} alt="delete icon" onClick={hideCombo} />
      )}
    </ComboContainer>
  );
}
