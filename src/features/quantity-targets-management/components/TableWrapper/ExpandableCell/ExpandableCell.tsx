import { Cell } from "react-table";
import {
  ExpandableCellContainer,
  ToggleIcon,
  Text,
} from "./expandable-cell.styles";
import collapse from "../../../../../assets/icons/collapse.svg";
import expand from "../../../../../assets/icons/expand.svg";

export default function ExpandableCell({ value, row }: Cell) {
  return (
    <ExpandableCellContainer>
      {row.canExpand ? (
        <ToggleIcon
          {...row.getToggleRowExpandedProps()}
          src={row.isExpanded ? expand : collapse}
          depth={row.depth}
        />
      ) : null}
      <Text canExpand={row.canExpand}>{value}</Text>
    </ExpandableCellContainer>
  );
}
