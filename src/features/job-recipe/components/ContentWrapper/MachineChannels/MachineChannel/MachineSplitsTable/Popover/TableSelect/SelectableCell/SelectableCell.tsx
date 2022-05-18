import React from "react";
import { CellProps } from "react-table";
import { Radio, RadioButtonContainer } from "./selectable-cell.styles";

export default function SelectableCell(props: CellProps<{}>) {
  const selectedProps = props.row.getToggleRowSelectedProps();

  const onClick = () => {
    props.toggleAllRowsSelected(false);
    props.row.toggleRowSelected(!selectedProps.checked);
    if (selectedProps.checked) {
      props.onRowSelect(undefined);
    } else {
      props.onRowSelect(props.row);
    }
  };

  return (
    <RadioButtonContainer>
      <Radio
        type="radio"
        checked={selectedProps.checked}
        onClick={onClick}
        onChange={selectedProps.onChange}
      />
    </RadioButtonContainer>
  );
}
