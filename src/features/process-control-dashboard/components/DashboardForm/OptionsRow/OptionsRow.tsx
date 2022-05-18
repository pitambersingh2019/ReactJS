import { useEffect } from "react";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useDisplayType } from "../../../context/useDisplayType";
import { isEmpty } from "../../../utils/export-utils";
import RadioButton from "../RadioButton/RadioButton";
import { OptionsRowContainer } from "./options-row.styles";

export default function OptionsRow() {
  const { displayTypeOptions, selectedDisplayType, setSelectedDisplayType } =
    useDisplayType();
  const { pcDisplay, spcDisplay } = useDisplayForm();

  const isSPCDisplay = !isEmpty(spcDisplay) && isEmpty(pcDisplay);

  const onHandleSelect = (optionLabel: string) => {
    const option = displayTypeOptions.find(
      (item) => item.label === optionLabel
    );
    setSelectedDisplayType(option);
  };

  useEffect(() => {
    const option = displayTypeOptions.find(
      (option) => option.name === (isSPCDisplay ? "SPC" : "PC")
    );
    setSelectedDisplayType(option);
  }, [displayTypeOptions, isSPCDisplay, setSelectedDisplayType]);

  return (
    <OptionsRowContainer>
      {displayTypeOptions.map(({ value, label }) => (
        <RadioButton
          key={value}
          label={label}
          isSelected={value === selectedDisplayType?.value}
          handleSelect={onHandleSelect}
        />
      ))}
    </OptionsRowContainer>
  );
}
