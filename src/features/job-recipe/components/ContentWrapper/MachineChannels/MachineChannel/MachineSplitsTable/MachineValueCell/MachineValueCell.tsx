import { useEffect, useState } from "react";
import { CellProps } from "react-table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { updateMachineSplits } from "../../../../../../redux/slice";
import { MachineSplit } from "../../../../../../ts";
import {
  MachineValueCellContainer,
  RefValue,
  Value,
} from "./machine-value-cell.styles";

export default function MachineValueCell(props: CellProps<MachineSplit>) {
  const initialValue = props.value?.value;
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);

  const dispatch = useAppDispatch();

  const { showReference, isEditing } = useAppSelector(
    (state) => state.jobRecipe
  );

  const onUpdate = (value: string) => {
    props.updateData(props.row.index, props.column.id, value);
    dispatch(
      updateMachineSplits({
        ChannelNum: props.channelNumber,
        KeyName: props.value.KeyName,
        KeyValue: value,
        SplitNum: props.value.SplitNumber,
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = !isNaN(Number(value));
    if (isValid) {
      setValue(value);
      onUpdate(value);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isEditable = props.value.AllowEntry;

  return (
    <MachineValueCellContainer>
      <Value
        value={value}
        disabled={!isEditing || !isEditable}
        isEditing={isEditing && isEditable}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
      {showReference && <RefValue>{props.value?.refValue}</RefValue>}
    </MachineValueCellContainer>
  );
}
