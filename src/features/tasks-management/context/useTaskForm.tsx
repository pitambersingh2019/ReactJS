import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { FileWithUrl } from "../components/TaskForm/Attachments/JustAddedFilesList/JustAddedFilesList";
import { APITaskSteps, Status, SubTask, TaskLevel, TaskPriority } from "../ts";
import { arrayCompare } from "../utils";
import { useTaskModal } from "./useTaskModal";

type InitialState = {
  subjectId: number | undefined;
  subSubjectId: number | undefined;
  statusId: Status | undefined;
  description: string | undefined;
  levelId: TaskLevel | undefined;
  objectId: number | undefined;
  assignee: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  estimate: number | undefined;
  priorityId: TaskPriority | undefined;
  subTasks: SubTask[] | undefined;
  attachedFiles: FileWithUrl[];
};

type TaskFormState = InitialState & {
  setSubjectId: (id: number | undefined) => void;
  setSubSubjectId: (id: number | undefined) => void;
  setStatusId: (id: Status | undefined) => void;
  setDescription: (text: string | undefined) => void;
  setLevelId: (id: TaskLevel | undefined) => void;
  setObjectId: (id: number | undefined) => void;
  setAssignee: (id: number | undefined) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  setEstimate: (value: number | undefined) => void;
  setPriorityId: (id: TaskPriority) => void;
  setSubtasks: (subtasks: SubTask[] | undefined) => void;
  setAttachedFiles: (files: FileWithUrl[]) => void;
  creatorId: number | undefined;
  clearForm: () => void;
  initialState: InitialState;
  isUpdated: boolean;
};

type TaskFormContextProviderProps = {
  children: React.ReactNode;
};

const TaskFormContext = createContext<TaskFormState | undefined>(undefined);

const TaskFormContextProvider = ({
  children,
}: TaskFormContextProviderProps) => {
  const { activeTask } = useTaskModal();

  const [initialState, setInitialState] = useState({} as InitialState);

  const [subjectId, setSubjectId] =
    useState<TaskFormState["subjectId"]>(undefined);
  const [subSubjectId, setSubSubjectId] =
    useState<TaskFormState["subSubjectId"]>(undefined);
  const [statusId, setStatusId] =
    useState<TaskFormState["statusId"]>(undefined);
  const [description, setDescription] =
    useState<TaskFormState["description"]>(undefined);
  const [levelId, setLevelId] = useState<TaskFormState["levelId"]>(undefined);
  const [objectId, setObjectId] =
    useState<TaskFormState["objectId"]>(undefined);
  const [assignee, setAssignee] =
    useState<TaskFormState["assignee"]>(undefined);
  const [startDate, setStartDate] =
    useState<TaskFormState["startDate"]>(undefined);
  const [endDate, setEndDate] = useState<TaskFormState["endDate"]>(undefined);
  const [estimate, setEstimate] =
    useState<TaskFormState["estimate"]>(undefined);
  const [priorityId, setPriorityId] = useState<TaskFormState["priorityId"]>(
    TaskPriority.Medium
  );

  const [subTasks, setSubtasks] = useState<SubTask[] | undefined>(undefined);

  const [attachedFiles, setAttachedFiles] = useState<FileWithUrl[]>([]);

  const creatorId = activeTask?.TaskCreateUser;

  const clearForm = () => {
    setSubjectId(undefined);
    setSubSubjectId(undefined);
    setStatusId(undefined);
    setDescription(undefined);
    setLevelId(undefined);
    setObjectId(undefined);
    setAssignee(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setEstimate(undefined);
    setPriorityId(TaskPriority.Medium);
    setSubtasks(undefined);
    setAttachedFiles([]);
  };

  useEffect(() => {
    setSubjectId(activeTask?.SubjectID);
    setSubSubjectId(
      (activeTask?.SubSubjects && activeTask.SubSubjects[0].SubSubjectID) ||
        undefined
    );
    setStatusId(activeTask?.TaskStatus);
    setDescription(activeTask?.Text);
    setLevelId(activeTask?.TaskLevel);
    setObjectId(activeTask?.ObjectID);
    setAssignee(activeTask?.Assignee);
    setStartDate(activeTask?.TaskStartTimeTarget);
    setEndDate(activeTask?.TaskEndTimeTarget);
    setEstimate(activeTask?.EstimatedExecutionTime);
    setPriorityId(activeTask?.TaskPriorityID || TaskPriority.Medium);

    setInitialState((prevState) => {
      return {
        ...prevState,
        subjectId: activeTask?.SubjectID,
        subSubjectId:
          (activeTask?.SubSubjects && activeTask.SubSubjects[0].SubSubjectID) ||
          undefined,
        statusId: activeTask?.TaskStatus,
        description: activeTask?.Text,
        levelId: activeTask?.TaskLevel,
        objectId: activeTask?.ObjectID,
        assignee: activeTask?.Assignee,
        startDate: activeTask?.TaskStartTimeTarget,
        endDate: activeTask?.TaskEndTimeTarget,
        estimate: activeTask?.EstimatedExecutionTime,
        priorityId: activeTask?.TaskPriorityID || TaskPriority.Medium,
        subTasks: undefined,
        attachedFiles: [],
      };
    });
  }, [activeTask]);

  useEffect(() => {
    const fetchTaskSteps = async () => {
      const steps = await api
        .post<APITaskSteps>("GetTaskSteps", {
          SourceTaskCreationPlatform: 1,
          TaskID: activeTask?.ID,
        })
        .then((res) => res.data.ResponseDictionaryDT.TaskSteps);

      setSubtasks(steps);
      setInitialState((prevState) => {
        return {
          ...prevState,
          subTasks: steps,
        };
      });
    };

    if (activeTask?.ID) {
      fetchTaskSteps();
    } else {
      setSubtasks(undefined);
    }
  }, [activeTask?.ID]);

  const isUpdated =
    initialState.subjectId !== subjectId ||
    initialState.subSubjectId !== subSubjectId ||
    initialState.statusId !== statusId ||
    initialState.description !== description?.trim() ||
    initialState.levelId !== levelId ||
    initialState.objectId !== objectId ||
    initialState.priorityId !== priorityId ||
    initialState.assignee !== assignee ||
    initialState.startDate !== startDate ||
    initialState.endDate !== endDate ||
    initialState.estimate !== estimate ||
    !arrayCompare(initialState.subTasks, subTasks) ||
    !arrayCompare(initialState.attachedFiles, attachedFiles);

  return (
    <TaskFormContext.Provider
      value={{
        subjectId,
        setSubjectId,
        subSubjectId,
        setSubSubjectId,
        statusId,
        setStatusId,
        description,
        setDescription,
        levelId,
        setLevelId,
        objectId,
        setObjectId,
        assignee,
        setAssignee,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        estimate,
        setEstimate,
        priorityId,
        setPriorityId,
        subTasks,
        setSubtasks,
        attachedFiles,
        setAttachedFiles,
        creatorId,
        clearForm,
        initialState,
        isUpdated,
      }}
    >
      {children}
    </TaskFormContext.Provider>
  );
};

const useTaskForm = () => {
  const context = useContext(TaskFormContext);
  if (context === undefined) {
    throw new Error(
      "useTaskForm must be used within the TaskFormContextProvider"
    );
  }

  return context;
};

export { TaskFormContextProvider, useTaskForm };
