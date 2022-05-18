import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "../../../../../locales/translations";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import { Task, UserForTask } from "../../../ts";
import { StyledAddAssigneeModal } from "./add-assignee-modal.styles";
import UsersList from "./UsersList";

type AddAssigneeModalProps = {
  users?: UserForTask[];
  task: Task;
};

export default function AddAssigneeModal({
  users,
  task,
}: AddAssigneeModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(true);
  const [usersList, setUsersList] = useState(users);
  const [search, setSearch] = useState("");

  const { level3, level2, currentUserId } = useTasksPermissionsLevel();
  const isCreator = currentUserId === task.TaskCreateUser;

  const isSearchHidden = level3 || (level2 && !isCreator);

  const { t } = useTranslation();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setIsOnScreen(rect.bottom < window.innerHeight);
    }
  }, [ref]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    const filteredUsers = users?.filter((user) =>
      user.DisplayName?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsersList(filteredUsers);
  };

  return (
    <StyledAddAssigneeModal isOnScreen={isOnScreen} ref={ref} id="add-assignee">
      {isSearchHidden ? null : (
        <input
          placeholder={t(translations.TasksManagement.SearchForUser) + "..."}
          value={search}
          onChange={handleSearch}
        />
      )}
      {usersList && <UsersList users={usersList} task={task} />}
    </StyledAddAssigneeModal>
  );
}
