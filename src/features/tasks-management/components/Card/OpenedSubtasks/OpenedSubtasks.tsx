import icon from "../../../../../assets/icons/tasks-management/sub-tasks.svg";
import { StyledOpenedSubtasks } from "./opened-subtasks.styles";

type OpenedSubtasksProps = {
  opened: number;
  total: number;
};
export default function OpenedSubtasks({ opened, total }: OpenedSubtasksProps) {
  const completed = total - opened;
  return (
    <StyledOpenedSubtasks>
      <img src={icon} alt="tick" />
      <span>{`${completed}/`}</span>
      <span>{total}</span>
    </StyledOpenedSubtasks>
  );
}
