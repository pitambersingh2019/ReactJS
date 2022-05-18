import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../../locales/translations";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useDisplayType } from "../../../context/useDisplayType";
import { useParams } from "../../../context/useParams";
import CheckboxLabel from "../../shared/CheckboxLabel";
import {
  Column,
  Department,
  DepartmentMachineContainer,
  MachineParamRowContainer,
} from "./machine-param-row.styles";

type MachineParamRowProps = {
  setSelectedMachine: (machine: Item | undefined) => void;
  setSelectedParam: (param: Item | undefined) => void;
  selectedMachine: Item | undefined;
  selectedParam: Item | undefined;
  isSecondaryAxis: boolean;
  onSecondaryAxisUpdate: () => void;
  showParamLim: boolean;
  onShowParamLimUpdate: () => void;
  onScroll: () => void;
};

export default function MachineParamRow({
  setSelectedMachine,
  setSelectedParam,
  selectedMachine,
  selectedParam,
  isSecondaryAxis,
  onSecondaryAxisUpdate,
  showParamLim,
  onShowParamLimUpdate,
  onScroll,
}: MachineParamRowProps) {
  const [paramsList, setParamsList] = useState<Item[]>([]);

  const { selectedDisplayType } = useDisplayType();
  const { fetchParams, machineOptions, paramOptions } = useParams();
  const {
    pcDisplay: { PCParams },
  } = useDisplayForm();

  const { t } = useTranslation();

  const handleSelectMachine = (machine: Item | undefined) => {
    setSelectedMachine(machine);
    setSelectedParam(undefined);
    const filteredParams = paramOptions
      .filter((option) => option.machineId === machine?.value)
      .map((op) => ({ value: op.value, label: op.label }));
    setParamsList(filteredParams);
  };

  const handleSelectParam = (param: Item | undefined) => {
    setSelectedParam(param);
  };

  const showSecondaryAxisCheckbox =
    selectedDisplayType?.name === "PC" &&
    PCParams.length > 0 &&
    (PCParams.some((param) => !param.IsSecondaryAxis) ||
      PCParams.every((param) => param.IsSecondaryAxis));

  const showParamLimCheckbox =
    selectedDisplayType?.name === "PC" && paramsList.length > 0;

  useEffect(() => {
    fetchParams();
  }, [fetchParams]);

  useEffect(() => {
    if (selectedMachine) {
      const filteredParams = paramOptions
        .filter((option) => option.machineId === selectedMachine.value)
        .map((op) => ({ value: op.value, label: op.label }));
      setParamsList(filteredParams);
    }
  }, [paramOptions, selectedMachine]);

  return (
    <MachineParamRowContainer>
      <Column onClick={onScroll}>
        <DropDownSelect
          searchable
          placeholder={t(translations.ProcessControlDashboard.SelectMachine)}
          required
          TitleText={t(translations.ProcessControlDashboard.Machine)}
          onSelect={handleSelectMachine}
          items={machineOptions}
          selectedItem={machineOptions.find(
            (option) => option.value === selectedMachine?.value
          )}
          dropDownListHeight="200px"
        />
        {showSecondaryAxisCheckbox && (
          <CheckboxLabel
            label={t(translations.ProcessControlDashboard.SecondaryYAxis)}
            checked={isSecondaryAxis}
            onToggle={onSecondaryAxisUpdate}
          />
        )}
      </Column>

      <Column>
        <DropDownSelect
          searchable
          placeholder={t(translations.ProcessControlDashboard.SelectParameter)}
          required
          TitleText={t(translations.ProcessControlDashboard.Parameter)}
          onSelect={handleSelectParam}
          items={paramsList}
          selectedItem={paramOptions.find(
            (option) => option.value === selectedParam?.value
          )}
          mode={
            paramsList.length > 0
              ? DropDownMode.selectable
              : DropDownMode.readonly
          }
          dropDownListHeight="200px"
        />
        {showParamLimCheckbox && (
          <CheckboxLabel
            label={t(translations.ProcessControlDashboard.ShowParameterLimits)}
            checked={showParamLim}
            onToggle={onShowParamLimUpdate}
          />
        )}
      </Column>
    </MachineParamRowContainer>
  );
}

type DepartmentMachineItemProps = {
  department: string;
  machine: string;
};

export function DepartmentMachineItem({
  department,
  machine,
}: DepartmentMachineItemProps) {
  return (
    <DepartmentMachineContainer>
      <Department>{department}</Department>: {machine}
    </DepartmentMachineContainer>
  );
}
