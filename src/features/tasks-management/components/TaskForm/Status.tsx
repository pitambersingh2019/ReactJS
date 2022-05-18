import { useRef } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { Status } from "../../ts";
import { getAllowedStatus } from "../../utils";

type StatusProps = {
  numOfOpenedSubtasks: number;
  onStatusChange: (status: Status | undefined) => void;
};

export default function TaskStatus({
  numOfOpenedSubtasks,
  onStatusChange,
}: StatusProps) {
  const { statusId, creatorId, assignee: assigneeId } = useTaskForm();
  const initialStatusId = useRef(statusId);
  const { t } = useTranslation();

  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const isCreator = currentUserId === creatorId;
  const isAssignee = assigneeId === currentUserId;

  //current status is canceled or done, a user with level2 or level3, can't unselect status
  const changeNotAllowed =
    initialStatusId &&
    (initialStatusId.current === Status.Canceled ||
      initialStatusId.current === Status.Done) &&
    (level3 || level2) &&
    !isCreator;

  const statusDisabled =
    ((level3 || level2) && !isAssignee && !isCreator) || changeNotAllowed;

  const allowedStatus = getAllowedStatus(
    initialStatusId && initialStatusId.current ? initialStatusId.current : 1
  );

  const statuses: Item[] = Object.entries(Status)
    .filter((e) => !isNaN(Number(e[0])))
    .filter((s) => allowedStatus?.includes(Number(s[0])))
    .filter((st) => {
      if (level3 && isCreator) {
        return Number(st[0]) !== Status.Unassigned;
      }
      if ((level3 || level2) && !isCreator && isAssignee) {
        return initialStatusId && initialStatusId.current === Status.Canceled
          ? Number(st[0]) !== Status.Unassigned
          : Number(st[0]) !== Status.Canceled &&
              Number(st[0]) !== Status.Unassigned;
      }

      return st;
    })
    .filter((s) => (numOfOpenedSubtasks > 0 ? Number(s[0]) !== Status.Done : s))
    .map((e) => ({
      label: t(translations.TasksManagement[(e[1] as string).replace(" ", "")]),
      value: Number(e[0]),
    }));

  const handleStatusChange = (item: Item | undefined) => {
    onStatusChange(item ? item.value : undefined);
  };

  return (
    statuses && (
      <DropDownSelect
        placeholder={t(translations.TasksManagement.Status)}
        required={false}
        onSelect={handleStatusChange}
        TitleText={t(translations.TasksManagement.Status)}
        items={statuses}
        mode={statusDisabled ? DropDownMode.readonly : DropDownMode.selectable}
        selectedItem={statuses.find((st) => st.value === statusId)}
      />
    )
  );
}
