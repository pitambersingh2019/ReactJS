import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { deepEqual } from "../../../../tasks-management/utils";
import { AUTO_NAME_DIVIDER } from "../../../constants";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useDisplayType } from "../../../context/useDisplayType";
import { useEditing } from "../../../context/useEditing";
import { useEditMode } from "../../../context/useEditMode";
import { useShowCombo } from "../../../context/useShowCombo";
import { PCDisplay } from "../../../ts";
import { isEmpty } from "../../../utils/export-utils";
import { DoneButtonContainer } from "./done-button.styles";

type DoneButtonProps = {
  onDoneEditing: () => void;
};

export default function DoneButton({ onDoneEditing }: DoneButtonProps) {
  const { spcDisplay, pcDisplay } = useDisplayForm();
  const { selectedDisplayType } = useDisplayType();
  const { onAddPCDisplay } = useEditMode();

  const { showCombo } = useShowCombo();
  const { editing } = useEditing();

  const { t } = useTranslation();
  const isPCDisplay = !isEmpty(pcDisplay);

  const initDisplay = useRef<PCDisplay | null>(null);

  const type = selectedDisplayType?.name === "SPC" ? "SPC" : "PC";

  const checkDoneDisabled = () => {
    const { PCParams } = pcDisplay;
    if (initDisplay.current) {
      if (Object.keys(initDisplay.current).length > 0) {
        return deepEqual<PCDisplay>(initDisplay.current, pcDisplay);
      } else {
        return PCParams?.length < 1;
      }
    }

    return true;
  };

  const isDisabled =
    type === "SPC"
      ? !spcDisplay.selectedMachine || !spcDisplay.selectedParam
      : checkDoneDisabled() || showCombo || editing;

  const getDisplayName = () => {
    if (isPCDisplay && pcDisplay.DisplayName) {
      return pcDisplay.DisplayName.trim();
    }
    if (!isEmpty(spcDisplay) && spcDisplay.name) {
      return spcDisplay.name.trim();
    }

    if (selectedDisplayType?.name === "PC") {
      return pcDisplay.PCParams.map(
        (d) => `${d.MachineName} | ${d.ParamDisplayName}`
      ).join(AUTO_NAME_DIVIDER);
    }

    return `${spcDisplay.selectedMachine?.label} | ${spcDisplay.selectedParam?.label}`;
  };

  const handleClick = () => {
    getDisplayName();
    onDoneEditing();
    onAddPCDisplay({
      ...pcDisplay,
      DisplayName: getDisplayName(),
    });
  };

  useEffect(() => {
    initDisplay.current = pcDisplay;
  }, []);

  return (
    <DoneButtonContainer>
      <Button
        label={t(translations.ProcessControlDashboard.Done)}
        onClick={handleClick}
        width="88px"
        disabled={isDisabled}
        variant="purple"
      />
    </DoneButtonContainer>
  );
}
