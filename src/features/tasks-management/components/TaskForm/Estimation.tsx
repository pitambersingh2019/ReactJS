import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { FlexContainer } from "./task-form.styles";
import { ErrorState } from "./TaskForm";
import TextFieldWithSuffix from "./TextFieldWithSuffix/TextFieldWithSuffix";

type EstimationProps = {
  errors: ErrorState | undefined;
  setErrors: (errors: ErrorState | undefined) => void;
};

export default function Estimation({ errors, setErrors }: EstimationProps) {
  const [estimatedHours, setEstimatedHours] = useState<
    string | number | undefined
  >(undefined);
  const [estimatedMinutes, setEstimatedMinutes] = useState<
    string | number | undefined
  >(undefined);

  const { creatorId, estimate, setEstimate } = useTaskForm();
  const { t } = useTranslation();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  const onDurationHoursChange = (value: string) => {
    setErrors({
      ...errors,
      estimationError: {
        ...errors?.estimationError,
        hoursError: false,
      },
    });
    setEstimatedHours(value);

    if (!value) {
      return;
    }
    if (!/^\d+$/.test(value) || Number(value) > 111111111111111) {
      setErrors({
        ...errors,
        estimationError: {
          ...errors?.estimationError,
          hoursError: true,
        },
      });
      return;
    }

    const estimate =
      (Number(getEstimate()?.estimatedMinutes) || 0) + Number(value) * 60;
    setEstimate(estimate);
  };

  const onDurationMinsChange = (value: string) => {
    setErrors({
      ...errors,
      estimationError: {
        ...errors?.estimationError,
        minutesError: false,
      },
    });
    setEstimatedMinutes(value);

    if (!value) {
      return;
    }
    if (!/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        estimationError: {
          ...errors?.estimationError,
          minutesError: true,
        },
      });
      return;
    }

    const estimate = (getEstimate()?.estimatedHours || 0) * 60 + Number(value);
    setEstimate(estimate);
  };

  const getEstimate = useCallback(() => {
    if (estimate) {
      const estimatedHours = Math.floor(estimate / 60);
      const estimatedMinutes = estimate % 60;
      return {
        estimatedHours,
        estimatedMinutes,
      };
    }
  }, [estimate]);

  useEffect(() => {
    const est = getEstimate();
    setEstimatedHours(est?.estimatedHours);
    setEstimatedMinutes(est?.estimatedMinutes);
  }, [getEstimate]);

  return (
    <FlexContainer>
      <TextFieldWithSuffix
        placeholder={t(translations.TasksManagement.NumberOfHours)}
        value={estimatedHours || ""}
        onChange={onDurationHoursChange}
        label={t(translations.TasksManagement.EstimatedDuration)}
        suffix={t(translations.TasksManagement.HoursShort)}
        disabled={isDisabled}
        error={errors?.estimationError?.hoursError}
      />
      <TextFieldWithSuffix
        placeholder={t(translations.TasksManagement.NumberOfMinutes)}
        value={estimatedMinutes || ""}
        onChange={onDurationMinsChange}
        suffix={t(translations.TasksManagement.MinutesShort)}
        disabled={isDisabled}
        error={errors?.estimationError?.minutesError}
      />
    </FlexContainer>
  );
}
