import { useEffect, useState } from "react";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { useFilter } from "../context/useFilter";
import { useUsersForTask } from "../context/useUsersForTask";

export default function useAssigneeFilterOptions() {
  const [options, setOptions] = useState<OptionItem[] | undefined>(undefined);
  const { users } = useUsersForTask();
  const { assigneeDisplayName } = useFilter();

  useEffect(() => {
    if (users && assigneeDisplayName) {
      const assignees = users
        .filter((u) => u.DisplayName)
        .map((user) => ({
          name: user.DisplayName,
          isChecked: assigneeDisplayName[user.DisplayName],
        }));
      setOptions(assignees);
    }
  }, [users, assigneeDisplayName]);

  return { options };
}
