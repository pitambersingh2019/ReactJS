import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { Status, Task } from "../../ts";
import Grid from "@mui/material/Grid";
import SelectPriority from "./SelectPriority/SelectPriority";
import {
  ButtonsContainer,
  Container,
  DatesEstimateContainer,
  StyledTaskForm,
} from "./task-form.styles";
import { useTaskModal } from "../../context/useTaskModal";
import useCreateTask from "../../hooks/useCreateTask";
import { useTasks } from "../../context/useTasks";
import SubTasks from "./SubTasks";

import { getCurrentUserId } from "../../utils";
import Button from "../../../../Component/DesignSystem/Buttons";
import Comments from "./Comments";
import Attachments from "./Attachments";
import AssigneeRow from "./AssigneeRow";
import TaskStatus from "./Status";
import Description from "./Description";
import LevelObjectRow from "./LevelObjectRow";
import Dates from "./Dates";
import Estimation from "./Estimation";
import useUploadFile from "../../hooks/useUploadFile";
import { useTaskForm } from "../../context/useTaskForm";
import NotificationModal from "./NotificationModal/NotificationModal";
import { notifySuccessToast } from "../../../../Component/Toast/ToastContainer";
import { useNewTaskId } from "../../context/useNewTaskId";
import { isDateValid } from "../../utils/date-time-helpers";
import moment from "moment";
import SubjectRow from "./SubjectRow";

export type ErrorState = {
  subjectError?: boolean;
  descriptionError?: boolean;
  dateError?: { startDateError?: boolean; endDateError?: boolean };
  estimationError?: { hoursError?: boolean; minutesError?: boolean };
};

type TaskFormProps = {
  showNotification: boolean;
  onNotificationClose: () => void;
  onUpdate?: () => void;
};

export default function TaskForm({
  showNotification,
  onNotificationClose,
  onUpdate,
}: TaskFormProps) {
  const [disabled, setDisabled] = useState(false);
  const { activeTask, onModalClose } = useTaskModal();

  const {
    subjectId,
    subSubjectId,
    assignee,
    statusId,
    setStatusId,
    setAssignee,
    description,
    levelId,
    objectId,
    estimate,
    priorityId,
    startDate,
    endDate,
    subTasks,
    attachedFiles,
    clearForm,
  } = useTaskForm();

  const { createTask } = useCreateTask();
  const { fetchTasks } = useTasks();
  const { uploadFile } = useUploadFile();
  const { setNewTaskId } = useNewTaskId();
  const { t } = useTranslation();

  const uncompletedSubtasks = subTasks?.filter((st) => st.IsOpen);

  const [errors, setErrors] = useState<ErrorState | undefined>(undefined);

  const currentUserId = getCurrentUserId();

  const onStatusChange = (status: Status | undefined) => {
    setStatusId(status);
    if (status === Status.Unassigned) {
      setAssignee(undefined);
    }
  };

  const onAssigneeChange = (assigneeId: number | undefined) => {
    setAssignee(assigneeId);
    if (assigneeId && statusId === Status.Unassigned) {
      setStatusId(Status["To Do"]);
    }
  };

  const onCancel = () => {
    fetchTasks();
    onModalClose();
    clearForm();
    onUpdate && onUpdate();
  };

  const onSuccess = (taskId: number) => {
    if (attachedFiles.length > 0) {
      attachedFiles.forEach((file) => {
        const fileForUpload = { fullFileName: file.name, taskId, file };
        uploadFile(fileForUpload);
      });
    }
    !activeTask && onNewTaskCreated(taskId);
  };

  const onNewTaskCreated = (taskId: number) => {
    notifySuccessToast(
      t(translations.TasksManagement.TaskCreatedSuccessfully),
      "",
      3000
    );
    setNewTaskId(taskId);
  };

  const areDatesValid = () => {
    if (startDate && endDate) {
      const endDateIsAfterStartEnd = moment(endDate).isAfter(moment(startDate));
      return {
        startDateError: !isDateValid(startDate),
        endDateError: !isDateValid(endDate) || !endDateIsAfterStartEnd,
      };
    }
    if (startDate) {
      return { startDateError: !isDateValid(startDate) };
    }
    if (endDate) {
      return { endDateError: !isDateValid(endDate) };
    }
    return {
      startDateError: false,
      endDateError: false,
    };
  };

  const validate = () => {
    const dateErrors = areDatesValid();
    setErrors({
      ...errors,
      subjectError: !subjectId,
      descriptionError: !description?.trim(),
      dateError: dateErrors,
    });

    return (
      subjectId &&
      description &&
      description.trim().length > 0 &&
      !dateErrors.startDateError &&
      !dateErrors.endDateError &&
      !errors?.estimationError?.hoursError &&
      !errors?.estimationError?.minutesError
    );
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const updatedTask: Partial<Task> & {
        TaskSubSubjectId: number | undefined;
      } = {
        ...activeTask,
        TaskStatus: statusId,
        SubjectID: subjectId,
        TaskSubSubjectId: subSubjectId,
        Text: description?.trim(),
        TaskLevel: levelId,
        ObjectID: objectId,
        Assignee: assignee,
        EstimatedExecutionTime: estimate,
        TaskPriorityID: priorityId,
        TaskSteps: subTasks,
        TaskStartTimeTarget: startDate,
        TaskEndTimeTarget: endDate,
        TaskCreateUser: activeTask?.TaskCreateUser || currentUserId,
      };
      setDisabled(true); //to prevent multiple submits
      await createTask(updatedTask, onSuccess);
      onModalClose();
      clearForm();
      fetchTasks();
      onUpdate && onUpdate();
    }
  };

  const onContinueEditing = () => {
    onNotificationClose();
  };

  const onCloseWithoutSaving = () => {
    onNotificationClose();
    onModalClose();
    clearForm();
    fetchTasks();
    onUpdate && onUpdate();
  };

  return (
    <>
      <Container>
        <StyledTaskForm existingTask={activeTask !== undefined}>
          <Grid container spacing={3}>
            {activeTask && (
              <Grid item xs={12}>
                <TaskStatus
                  onStatusChange={onStatusChange}
                  numOfOpenedSubtasks={uncompletedSubtasks?.length || 0}
                />
              </Grid>
            )}

            <SubjectRow errors={errors} setErrors={setErrors} />

            <Description errors={errors} setErrors={setErrors} />

            <LevelObjectRow />

            <AssigneeRow
              onAssigneeChange={onAssigneeChange}
              isEditing={activeTask !== undefined}
            />

            <DatesEstimateContainer>
              <Dates errors={errors} setErrors={setErrors} />

              <Estimation errors={errors} setErrors={setErrors} />
            </DatesEstimateContainer>

            <SelectPriority />
          </Grid>

          <SubTasks />

          <Attachments taskId={activeTask?.ID} />

          {activeTask && (
            <Comments taskId={activeTask.ID} historyId={activeTask.HistoryID} />
          )}
        </StyledTaskForm>

        <ButtonsContainer>
          <Button
            label={t(translations.TasksManagement.Cancel)}
            onClick={onCancel}
            variant="secondary"
            size="md"
            width="88px"
          />
          <Button
            label={t(translations.TasksManagement.Done)}
            onClick={onSubmit}
            size="md"
            disabled={disabled}
          />
        </ButtonsContainer>
      </Container>
      <NotificationModal
        isOpen={showNotification}
        handleClose={onCloseWithoutSaving}
        onContinue={onContinueEditing}
      />
    </>
  );
}
