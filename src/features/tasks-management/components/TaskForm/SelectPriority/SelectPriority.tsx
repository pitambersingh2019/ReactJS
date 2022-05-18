/* eslint-disable eqeqeq */
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useTaskForm } from "../../../context/useTaskForm";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import { TaskPriority } from "../../../ts";
import { StyledLabel, StyledSelectPriority } from "./select-priority.styles";
import PriorityOption from "./PriorityOption";

export default function SelectPriority() {
  const { priorityId, setPriorityId, creatorId } = useTaskForm();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  const handleSelect = (value: TaskPriority) => {
    !isDisabled && setPriorityId(value);
  };

  const { t } = useTranslation();

  return (
    <Grid item xs={6}>
      <StyledSelectPriority>
        <StyledLabel>
          {t(translations.TasksManagement.SelectPriority)}*
        </StyledLabel>
        <div className="priorities-row">
          <PriorityOption
            priority={t(translations.TasksManagement.Low)}
            value={TaskPriority.Low}
            handleSelect={handleSelect}
            isSelected={priorityId == TaskPriority.Low}
            disabled={isDisabled}
          />
          <PriorityOption
            priority={t(translations.TasksManagement.Medium)}
            value={TaskPriority.Medium}
            handleSelect={handleSelect}
            isSelected={priorityId == TaskPriority.Medium}
            disabled={isDisabled}
          />
          <PriorityOption
            priority={t(translations.TasksManagement.High)}
            value={TaskPriority.High}
            handleSelect={handleSelect}
            isSelected={priorityId == TaskPriority.High}
            disabled={isDisabled}
          />
        </div>
      </StyledSelectPriority>
    </Grid>
  );
}
