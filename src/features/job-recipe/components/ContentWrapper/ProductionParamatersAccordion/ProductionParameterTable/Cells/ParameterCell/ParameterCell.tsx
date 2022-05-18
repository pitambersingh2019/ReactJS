import { CellProps } from "react-table";
import { Split } from "../../../../../../ts";
import { ParameterCellContainer, Value } from "./parameter-cell.styles";

import { useState } from "react";
import CalculatedIcon from "./CalculatedIcon/CalculatedIcon";
import Tooltip from "../../../../../shared/Tooltip";

export default function ParameterCell(props: CellProps<Split>) {
  const { AllowNull, FValueCalcFunction, ToolTip } = props.row.original;
  const [showTooltip, setShowTooltip] = useState(false);

  const onShowTooltip = () => {
    setShowTooltip(true);
  };

  const onHideTooltip = () => {
    setShowTooltip(false);
  };

  const isRequired = !AllowNull;
  const isCalculated = FValueCalcFunction !== "";
  return (
    <ParameterCellContainer>
      <Value
        isRequred={isRequired}
        onMouseEnter={onShowTooltip}
        onMouseLeave={onHideTooltip}
      >
        {props.value}
        {isRequired && <span>*</span>}
        {showTooltip && ToolTip && <Tooltip text={ToolTip} minWidth="200px" />}
      </Value>
      {isCalculated && <CalculatedIcon />}
    </ParameterCellContainer>
  );
}
