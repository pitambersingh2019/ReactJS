import collapse from "../../../../assets/icons/collapse-purple.svg";
import expand from "../../../../assets/icons/expand-purple.svg";
import pencil from "../../../../assets/icons/pencil.svg";
import { useExpandedRowsContext } from "../../context/ExpandedRowsContext";
import {
  StyledContainer,
  StyledExpandIcon,
  StyledPencilIcon,
} from "./expandable-cell.styles.js";

function ExpandableCell({ row, isHovering, onEdit }) {
  const { expandedRows } = useExpandedRowsContext();

  const handleClick = () => {
    onEdit(row.id);
  };

  const expanded = expandedRows[row.id];

  return (
    <StyledContainer row={row}>
      {row.canExpand ? (
        <StyledExpandIcon
          {...row.getToggleRowExpandedProps()}
          src={expanded ? expand : collapse}
          alt="collapse-expand-icon"
          row={row}
        />
      ) : null}
      <span>{row.values.levels}</span>
      <StyledPencilIcon
        src={pencil}
        alt="pencil-icon"
        onClick={handleClick}
        isEditable={isHovering}
      />
    </StyledContainer>
  );
}

export default ExpandableCell;
