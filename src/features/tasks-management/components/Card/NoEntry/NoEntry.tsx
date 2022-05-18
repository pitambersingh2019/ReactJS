import icon from "../../../../../assets/icons/tasks-management/no-drag.svg";
import { StyledNoEntry } from "./no-entry.styles";

export default function NoEntry() {
  return (
    <StyledNoEntry>
      <img src={icon} alt="no entry icon" />
    </StyledNoEntry>
  );
}
