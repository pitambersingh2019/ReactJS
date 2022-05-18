import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import icon from "../../../../../assets/icons/tasks-management/add-assignee.svg";
import { translations } from "../../../../../locales/translations";
import { useUsersForTask } from "../../../context/useUsersForTask";
import { Task } from "../../../ts";
import AddAssigneeModal from "../AddAssigneeModal/AddAssigneeModal";
import { Container, StyledAddAssignee } from "./add-assignee.styles";

type AddAssigneeProps = {
  task: Task;
};

export default function AddAssignee({ task }: AddAssigneeProps) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { users } = useUsersForTask();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //don't open task modal on card click
    e.stopPropagation();
    setOpened((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpened(false)}>
      <Container>
        <StyledAddAssignee onClick={(e) => handleClick(e)}>
          <img src={icon} alt="add icon" />
          <span className="text">
            {t(translations.TasksManagement.AddAssignee)}
          </span>
        </StyledAddAssignee>
        {opened && users && <AddAssigneeModal users={users} task={task} />}
      </Container>
    </ClickAwayListener>
  );
}
