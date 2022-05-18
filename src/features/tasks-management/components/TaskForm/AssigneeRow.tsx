import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTaskModal } from "../../context/useTaskModal";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { useUsersForTask } from "../../context/useUsersForTask";

type AssigneeRowProps = {
  onAssigneeChange: (assignee: number | undefined) => void;
  isEditing: boolean;
};

export default function AssigneeRow({
  onAssigneeChange,
  isEditing,
}: AssigneeRowProps) {
  const { assignee, creatorId } = useTaskForm();
  const { activeTask } = useTaskModal();
  const { users } = useUsersForTask();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const assigneeId = activeTask?.Assignee;

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isAssignee = assigneeId === currentUserId;
  const isDisabled = (level3 || level2) && !isCreator && isAssignee;

  //level3, task is assigned -> caon't remove the assignee
  const changeNotAllowed = level3 && isAssignee;

  const assigneeIsDisabled = isDisabled || changeNotAllowed;

  //   TODO
  // const dummyTypeIfAssigneeItems: Item[] = [{ value: 1, label: "User" }];

  const userItems: Item[] | undefined = users
    ?.filter((user) => user.DisplayName)
    .filter((u) => {
      if (level3) {
        return u.ID === currentUserId || u.ID === assignee;
      }
      if (level2 && !isCreator) {
        return u.ID === currentUserId;
      }
      return u;
    })
    .map(({ ID, DisplayName }) => ({
      value: ID,
      label: DisplayName,
    }));
  const { t } = useTranslation();

  // const handleTypeOfAssigneeChange = (item: Item | undefined) => {
  //   if (item) {
  //     console.log(item);
  //   }
  // };

  const handleAssigneeChange = (item: Item | undefined) => {
    onAssigneeChange(item ? item.value : undefined);
  };

  useEffect(() => {
    if (level3 && !isEditing) {
      onAssigneeChange(currentUserId);
    }
  }, [currentUserId, level3, onAssigneeChange, isEditing]);

  return (
    <>
      {/* <Grid item xs={6}>
        <DropDownSelect
          placeholder={t(translations.TasksManagement.SelectTypeOfAssignee)}
          required={false}
          onSelect={handleTypeOfAssigneeChange}
          TitleText={t(translations.TasksManagement.TypeOfAssignee)}
          items={dummyTypeIfAssigneeItems}
        />
      </Grid> */}

      {/* TODO replace xs={6} after adding Type of Assignee */}
      <Grid item xs={6}>
        {userItems && (
          <DropDownSelect
            placeholder={t(translations.TasksManagement.SelectAssignee)}
            required={false}
            onSelect={handleAssigneeChange}
            TitleText={t(translations.TasksManagement.Assignee)}
            items={userItems}
            searchable
            selectedItem={userItems?.find((u) => u.value === assignee)}
            mode={
              assigneeIsDisabled
                ? DropDownMode.readonly
                : DropDownMode.selectable
            }
          />
        )}
      </Grid>
      {/* TODO Remove, temp placeholder */}
      <Grid item xs={6}></Grid>
    </>
  );
}
