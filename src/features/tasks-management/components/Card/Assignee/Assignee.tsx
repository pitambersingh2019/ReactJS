import icon from "../../../../../assets/icons/tasks-management/user.svg";
import { StyledAssignee } from "./assignee.styles";

type AssigneeProps = {
  name: string;
  noPadding?: boolean;
};

export default function Assignee({ name, noPadding }: AssigneeProps) {
  return (
    <StyledAssignee noPadding={noPadding}>
      <img src={icon} alt="user icon" />
      <span className="text">{name}</span>
    </StyledAssignee>
  );
}
