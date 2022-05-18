import {
  put,
  takeLatest,
  takeEvery,
  call,
  select,
  all,
  debounce,
} from "redux-saga/effects";
import {
  loadAllTriggers,
  fetchTriggers,
  TriggersLoaded,
  TriggersError,
  GetAllCardData,
  GetAllCardDataDone,
  DUPLICATE_GET_DATA_RULE,
  DUPLICATE_GET_DATA_RULE_DONE,
  DUPLICATE_SEND_REQUEST_RULE,
  DUPLICATE_RULE_CLEAR,
  parametersMachinesLoaded,
  loadAllParametersMachines,
  loadAllTaskSubjects,
  TaskSubjectsLoaded,
  SetViewOfRules,
  maintenanceLoaded,
  loadAllMaintenance,
} from "./index";

import {
  LoadAllEventReasonAndGroup,
  EventReasonAndGroupLoaded,
  EventReasonAndGroupError,
} from "./index";
import {
  loadAllUserForTask,
  UserForTaskLoaded,
  UserForTaskError,
} from "./index";
import {
  loadAllTaskLevelObjectk,
  TaskLevelObjectLoaded,
  TaskLevelObjectError,
} from "./index";
import {
  loadAllDepartmentMachine,
  DepartmentMachineLoaded,
  DepartmentMachineError,
} from "./index";
import { SetActiveTriggerCard, ClearActiveTriggerCard } from "./index";
import {
  DeleteTrigger,
  DeleteTriggerDone,
  DeleteSelectedRules,
  DeleteSelectedRulesDone,
} from "./index";
import {
  setActiveMessage,
  DeleteRuleMessage,
  DeleteSelectedRuleMessage,
  DuplicateMessage,
} from "./ToastsMessages";
import {
  ErrorType,
  ResponseEvents,
  ResponseTriggers,
  RulesContainerSlice,
  ResponseUserForTask,
  ResponseTaskLevelObject,
  ResponseDepartmentMachine,
  setActiveTriggerInterface,
  DeleteTriggerInterface,
  CardsInterface,
  ResponseEditCard,
  ResponseParametersMachines,
  ConditionType,
  ResponseGetTasksObjects,
} from "./types";
import { selectEventReasons, selectIsSelectedRuleInTable } from "./selectors";
import { Convert_Triggers_to_Cards_INFO } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";

import { apiCall, ToastapiCall } from "../../../utils/Network";
import {
  GroupMessage,
  NewRuleInterface,
  SET_DATA,
} from "../../CreateNewRule/slice";
import { LoadUserID } from "../../../AppStart";
import { ResponseMaintenance } from "./types/ResponseMaintenance";
import i18next from "i18next";
import { translations } from "../../../locales/translations";

export function* getParametersMachinesFunction(): any {
  try {
    const data: ResponseParametersMachines = yield call(
      apiCall,
      "GetControllerFields",
      "GET",
      {}
    );
    yield put(parametersMachinesLoaded({ data }));
  } catch (err: any) {
    //yield put(parametersMachinesLoaded({ data: {} }));
    console.log("err ", err);
  }
}

export function* getMaintenanceFunction(): any {
  try {
    const data: ResponseMaintenance = yield call(
      apiCall,
      "GetTaskMaintenanceReasons",
      "GET",
      {}
    );
    yield put(maintenanceLoaded({ data }));
  } catch (err: any) {
    //yield put(maintenanceLoaded({ data: {} }));
    console.log("err ", err);
  }
}

export function* getTriggersNewFunction(): any {
  /*const data: GetAlleventsReasons = yield select(selectEventReasons);
  if(data.error !== null){
  }*/
  try {
    yield call(getEventsNewFunction);
    const reasonsAndGroups: RulesContainerSlice["EventsReasons"] = yield select(
      selectEventReasons
    );
    const data: ResponseTriggers = yield call(
      apiCall,
      "GetAllTriggersNew",
      "GET",
      {}
    );
    const cards = yield call(
      Convert_Triggers_to_Cards_INFO,
      data,
      reasonsAndGroups
    );
    yield put(TriggersLoaded({ data, cards }));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(TriggersError(ErrorType.FAIL_404));
    } else {
      yield put(TriggersError(ErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getTriggerCardData(
  ActionData: PayloadAction<CardsInterface>
): any {
  const requestURL = `GetTrigger`;
  try {
    const data: ResponseEditCard = yield call(apiCall, requestURL, "POST", {
      trigger: {
        TriggerGroupID: ActionData.payload.TriggerGroupID,
        TriggerType: ActionData.payload.TriggerType,
      },
    });
    yield put(GetAllCardDataDone(data));
    console.log("New data card ", data);
  } catch (err: any) {
    console.log("error ", err);
  }
}

function* getEventsNewFunction() {
  try {
    const data: ResponseEvents = yield call(
      apiCall,
      "GetEventReasonAndGroups",
      "POST",
      { MachineID: 0 }
    );
    yield put(EventReasonAndGroupLoaded(data));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(UserForTaskError(ErrorType.FAIL_404));
    } else {
      yield put(UserForTaskError(ErrorType.RESPONSE_ERROR));
    }
  }
}

function* getNotificationEventsFunction() {
  try {
    const data: ResponseUserForTask = yield call(
      apiCall,
      "GetUsersForTask",
      "POST",
      {}
    );
    yield put(UserForTaskLoaded(data));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(EventReasonAndGroupError(ErrorType.FAIL_404));
    } else {
      yield put(EventReasonAndGroupError(ErrorType.RESPONSE_ERROR));
    }
  }
}

function* getTasklevelObjectFunction() {
  try {
    const data: ResponseTaskLevelObject = yield call(
      apiCall,
      "GetTaskLevelObjects",
      "POST",
      {}
    );
    yield put(TaskLevelObjectLoaded(data));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(TaskLevelObjectError(ErrorType.FAIL_404));
    } else {
      yield put(TaskLevelObjectError(ErrorType.RESPONSE_ERROR));
    }
  }
}

function* getTaskSubjects() {
  try {
    const data: ResponseGetTasksObjects = yield call(
      apiCall,
      "GetTaskObjects",
      "POST",
      {}
    );
    yield put(TaskSubjectsLoaded(data));
  } catch (err: any) {
    if (err.response?.status === 404) {
      // yield put(TaskLevelObjectError(ErrorType.FAIL_404));
    } else {
      //yield put(TaskLevelObjectError(ErrorType.RESPONSE_ERROR));
    }
  }
}

function* getDepartmentMachineFunction() {
  try {
    const data: ResponseDepartmentMachine = yield call(
      apiCall,
      "GetDepartmentMachine",
      "POST",
      { DepartmentID: 0 }
    );
    yield put(DepartmentMachineLoaded(data));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(DepartmentMachineError(ErrorType.FAIL_404));
    } else {
      yield put(DepartmentMachineError(ErrorType.RESPONSE_ERROR));
    }
  }
}

// function getLastCreatedID(cards: CardsInterface[]) {
//   let card: CardsInterface = cards.reduce((a, b) => Number(new Date(a.CreateDate)) > Number(new Date(b.CreateDate)) ? a : b);
//   return card.TriggerGroupID;
// }

function* setActiveTriggerFunction(
  ActionData: PayloadAction<setActiveTriggerInterface>
): any {
  try {
    const ToastDetails = setActiveMessage(
      ActionData.payload.Name,
      ActionData.payload.IsActive
    );

    const response = yield call(
      ToastapiCall,
      ToastDetails,
      "CreateTriggerGroup",
      "POST",
      {
        trigger: ActionData.payload,
      }
    );

    let success = response?.error === null;
    yield put(
      ClearActiveTriggerCard({ id: ActionData.payload.ID, success: success })
    );
  } catch (err) {
    yield put(
      ClearActiveTriggerCard({ id: ActionData.payload.ID, success: false })
    );
    console.log(err);
  }
}

function* DeleteTriggerFunction(
  ActionData: PayloadAction<DeleteTriggerInterface>
) {
  try {
    const ToastDetails = DeleteRuleMessage(ActionData.payload.Name);

    yield call(ToastapiCall, ToastDetails, "DeleteTrigger", "POST", {
      trigger: { GroupID: [ActionData.payload.ID] },
    });

    yield put(fetchTriggers());
    yield put(DeleteTriggerDone(ActionData.payload.ID));
  } catch (err) {
    yield put(DeleteTriggerDone(ActionData.payload.ID));
    console.log("error deleteing ", err);
  }
}

function* DeleteSelectedTriggerFunction() {
  try {
    const ToastDetails = DeleteSelectedRuleMessage();
    const SelectedRulesIDS: number[] = yield select(
      selectIsSelectedRuleInTable
    );

    yield call(ToastapiCall, ToastDetails, "DeleteTrigger", "POST", {
      trigger: { GroupID: [...SelectedRulesIDS] },
    });

    yield put(DeleteSelectedRulesDone());
    yield put(fetchTriggers());
  } catch (err) {
    console.log("error deleteing ", err);
  }
}

function* DuplicateRule(ActionData: PayloadAction<CardsInterface>): any {
  let requestURL = `GetTrigger`;
  try {
    const data_Trigger: ResponseEditCard = yield call(
      apiCall,
      requestURL,
      "POST",
      {
        trigger: {
          TriggerGroupID: ActionData.payload.TriggerGroupID,
          TriggerType: ActionData.payload.TriggerType,
        },
      }
    );
    yield put(
      DUPLICATE_GET_DATA_RULE_DONE({
        data: data_Trigger,
        rule: ActionData.payload,
        status: true,
      })
    );
  } catch (err) {
    yield put(
      DUPLICATE_GET_DATA_RULE_DONE({
        data: {},
        rule: ActionData.payload,
        status: false,
      })
    );
    console.log("error ", err);
  }
}

function* DuplicateRuleSendRequest(
  ActionData: PayloadAction<{ dup: NewRuleInterface; notification_type: any }>
): any {
  const data = ActionData.payload.dup;
  console.log("duplicate data ", data);
  const notification_type = ActionData.payload.notification_type;
  const requestURL = `CreateTriggerProcess`;
  yield put(DUPLICATE_RULE_CLEAR());
  const ToastDetails = DuplicateMessage();

  let conditionsSend: {
    Name: string;
    Sign: string;
    Value: string;
    FieldType: string;
    Condition: string;
    DisplayOrder: number;
    Interval: string;
    MachineID: number;
    ParameterID: number[];
    TimeInterval: number;
  }[] = [];
  let conditionType = ConditionType.GENERAL;
  if (data.triggerCondition.length > 0) {
    if (data.triggerCondition[0].TimeInterval === 8888) {
      conditionType = ConditionType.PARAMETERDEVIATIONSPC;
      data.triggerCondition.forEach((element) => {
        conditionsSend.push({
          Name: element.Name,
          Sign: element.Sign,
          Value: element.Value,
          FieldType: element.FieldType,
          Condition: element.Condition,
          DisplayOrder: element.DisplayOrder,
          Interval: element.Interval,
          MachineID: element.MachineID,
          ParameterID: element.ParameterID,
          TimeInterval: 0,
        });
      });
    } else if (data.triggerCondition[0].MachineID !== 0) {
      conditionType = ConditionType.PARAMETERDEVIATION;
      conditionsSend = data.triggerCondition;
    } else {
      conditionsSend = data.triggerCondition;
    }
  }

  try {
    //event + service call
    if (
      (data.stopCause !== "" || data.triggerCondition.length > 0) &&
      data.levelClicked === "" &&
      notification_type === 2 &&
      data.subMachinesList.length === 0
    ) {
      yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
        rootTrigger: {
          ruleText: data.stopGroup,
          name: data.ruleName,
          isActive: data.isActive,
          id: 0,
          ruleType:
            data.stopCause !== "" || data.triggerCondition.length > 0
              ? "event"
              : "timeperiod", // 1. event   2. timePeriod
          actionType: "service_call", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
          SourceTaskCreationPlatform: 1, // ????
          eventID: data.causeIdSelected, // only in event
          triggerCondition: conditionsSend,
          StopReasonID: data.stopReasonID,
          triggerTask: data.stopReasonID,
          actionData: {
            text: data.description,
            userID: data.userIdSelected,
          },
          ConditionType: conditionType,
        },
      });
    }
    //event + send notification
    else if (
      (data.stopCause !== "" || data.triggerCondition.length > 0) &&
      notification_type === 7
    ) {
      console.log("userIdSelected " + data.userIdSelected);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = yield call(
        ToastapiCall,
        ToastDetails,
        requestURL,
        "POST",
        {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || data.triggerCondition.length > 0
                ? "event"
                : "timeperiod", // 1. event   2. timePeriod
            actionType: "notification", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            triggerCondition: conditionsSend,
            StopReasonID: data.stopReasonID,
            triggerTask: data.stopReasonID,
            actionData: {
              text: data.description,
              userID: data.subject === "1" ? data.userIdSelected : 0,
              userGroupID: data.subject === "2" ? data.userIdSelected : 0,
            },
            ConditionType: conditionType,
          },
        }
      );
    }
    //event + type task
    else if (
      (data.stopCause !== "" || data.triggerCondition.length > 0) &&
      data.levelClicked !== ""
    ) {
      let estimatedExecutionTime = 0;
      let estHour = "";
      let estMin = "";
      //split time task
      if (data.timeClicked !== "") {
        let timeTask = data.timeClicked.split(":");
        estimatedExecutionTime = Number(timeTask[0]) * 60 + Number(timeTask[1]);
        estHour = timeTask[0];
        estMin = timeTask[1];
      }

      //make subTask array objects
      let TaskSteps: any[] = [];
      data.subTaskList.map((subTask) =>
        TaskSteps.push({
          Text: subTask,
          ID: 0,
          IsOpen: true,
          IsActive: data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
        })
      );

      yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
        rootTrigger: {
          ruleText: data.stopGroup,
          name: data.ruleName,
          isActive: data.isActive,
          id: 0,
          ruleType:
            data.stopCause !== "" || data.triggerCondition.length > 0
              ? "event"
              : "timeperiod", // 1. event   2. timePeriod
          actionType: "task", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
          SourceTaskCreationPlatform: 1, // ????
          eventID: data.causeIdSelected, // only in event
          triggerCondition: conditionsSend,
          StopReasonID: data.stopReasonID,
          triggerTask: data.stopReasonID,
          actionData: {
            text: data.description,
            userID: data.userIdSelected,
          },
          ConditionType: conditionType,
        },
        triggerTask: {
          CreateUser: LoadUserID(),
          Subject: data.subject,
          Subsubject: data.subSubject,
          Text: data.description,
          TaskLevel: Number(data.levelClicked),
          TaskLevelObjectID: data.objectIdSelected,
          Priority:
            data.priorityClicked === "Low"
              ? 1
              : data.priorityClicked === "Medium"
              ? 2
              : 3,
          Assignee: data.userIdSelected, //data.asigneClicked === "User" ? 0 : 1,
          AssigneeName:
            data.asigneClicked === "User" ? data.asigneTaskToClicked : "",
          AssigneeGroupName:
            data.asigneClicked === "User" ? "" : data.asigneTaskToClicked,
          selectedAssignee: true,
          estHour: estHour,
          estMin: estMin,
          AssigneeSelected: data.asigneClicked === "User" ? "1" : "2",
          TaskSteps: TaskSteps,
          EstimatedExecutionTime: estimatedExecutionTime,
          EventID: data.causeIdSelected,
          StopReasonID: data.stopReasonID,
        },
      });
    }
    //event + message
    else if (
      (data.stopCause !== "" || data.triggerCondition.length > 0) &&
      data.subMachinesList.length >= 1
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = yield call(apiCall, requestURL, "POST", {
        rootTrigger: {
          ruleText: data.stopGroup,
          name: data.ruleName,
          isActive: data.isActive,
          id: 0,
          ruleType:
            data.stopCause !== "" || data.triggerCondition.length > 0
              ? "event"
              : "timeperiod", // 1. event   2. timePeriod
          actionType: "message", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
          SourceTaskCreationPlatform: 1, // ????
          eventID: data.causeIdSelected, // only in event
          triggerCondition: conditionsSend,
          StopReasonID: data.stopReasonID,
          triggerTask: data.stopReasonID,
          actionData: {
            text: data.description,
            machineIds: data.subMachinesIDList,
          },
          ConditionType: conditionType,
        },
      });
    }
    //timePeriod + notification
    else if (data.stopCause === "" && notification_type === 7) {
      console.log("intervalType notification " + data.intervalType);
      console.log("userIdSelected " + data.userIdSelected);

      let hour = 0;
      let minute = 0;
      //if it was Every Period of Time
      if (data.amountTimePeriod !== 0) {
        hour = data.amountTimePeriod;
      } else {
        //split time and convert to number
        let timeInterval = data.eventTime.split(":");
        hour = Number(timeInterval[0]);
        minute = Number(timeInterval[1]);
      }

      //covert week days to number
      let weekDays: number[] = [];
      data.triggerWeekDays.forEach((day) => {
        if (day === "0") {
          weekDays.push(1);
        } else if (day === "1") {
          weekDays.push(2);
        } else if (day === "2") {
          weekDays.push(3);
        } else if (day === "3") {
          weekDays.push(4);
        } else if (day === "4") {
          weekDays.push(5);
        } else if (day === "5") {
          weekDays.push(6);
        } else if (day === "6") {
          weekDays.push(7);
        }
      });

      //convert array to number
      const days = data.triggerDays.map((i) => Number(i));

      //if it was daily or Every Period of Time
      if (data.intervalType === "Daily" || data.amountTimePeriod !== 0) {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType:
              data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily", // if timePeriod (daily weekly monthly)
            actionType: "notification", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              userID: data.subject === "1" ? data.userIdSelected : 0,
              userGroupID: data.subject === "2" ? data.userIdSelected : 0,
            },
            ConditionType: conditionType,
            date: data.eventValuePeriod,
          },
        });
      } else {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType: data.intervalType === "Weekly" ? "weekly" : "monthly", // if timePeriod (daily weekly monthly)
            days: data.intervalType === "Weekly" ? weekDays : days,
            actionType: "notification", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              userID: data.subject === "1" ? data.userIdSelected : 0,
              userGroupID: data.subject === "2" ? data.userIdSelected : 0,
            },
            ConditionType: conditionType,
          },
        });
      }
    }
    //timePeriod + task
    else if (data.stopCause === "" && data.levelClicked !== "") {
      console.log("intervalType task timePeriod" + data.intervalType);

      let hour = 0;
      let minute = 0;
      //if it was Every Period of Time
      if (data.amountTimePeriod !== 0) {
        hour = data.amountTimePeriod;
      } else {
        //split time and convert to number
        let timeInterval = data.eventTime.split(":");
        hour = Number(timeInterval[0]);
        minute = Number(timeInterval[1]);
      }

      let estimatedExecutionTime = 0;
      let estHour = "";
      let estMin = "";
      //split time task
      if (data.timeClicked !== "") {
        let timeTask = data.timeClicked.split(":");
        estimatedExecutionTime = Number(timeTask[0]) * 60 + Number(timeTask[1]);
        estHour = timeTask[0];
        estMin = timeTask[1];
      }

      //covert week days to number
      let weekDays: number[] = [];
      data.triggerWeekDays.forEach((day) => {
        if (day === "0") {
          weekDays.push(1);
        } else if (day === "1") {
          weekDays.push(2);
        } else if (day === "2") {
          weekDays.push(3);
        } else if (day === "3") {
          weekDays.push(4);
        } else if (day === "4") {
          weekDays.push(5);
        } else if (day === "5") {
          weekDays.push(6);
        } else if (day === "6") {
          weekDays.push(7);
        }
      });
      //convert days array to number
      const days = data.triggerDays.map((i) => Number(i));

      //make subTask array objects
      let TaskSteps: any[] = [];
      data.subTaskList.map((subTask) =>
        TaskSteps.push({
          Text: subTask,
          ID: 0,
          IsOpen: true,
          IsActive: data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
        })
      );
      //if it was daily or Every Period of Time
      if (data.intervalType === "Daily" || data.amountTimePeriod !== 0) {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            SourceTaskCreationPlatform: 1, // ????
            intervalType:
              data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily", // if timePeriod (daily weekly monthly)
            actionType: "task", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            ConditionType: conditionType,
            date: data.eventValuePeriod,
          },
          triggerTask: {
            CreateUser: LoadUserID(),
            Subject: data.subject,
            Subsubject: data.subSubject,
            Text: data.description,
            TaskLevel: Number(data.levelClicked),
            TaskLevelObjectID: data.objectIdSelected,
            Priority:
              data.priorityClicked === "Low"
                ? 1
                : data.priorityClicked === "Medium"
                ? 2
                : 3,
            Assignee: data.userIdSelected,
            AssigneeName:
              data.asigneClicked === "User" ? data.asigneTaskToClicked : "",
            AssigneeGroupName:
              data.asigneClicked === "User" ? "" : data.asigneTaskToClicked,
            selectedAssignee: true,
            estHour: estHour,
            estMin: estMin,
            SourceTaskCreationPlatform: 1,
            AssigneeSelected: data.asigneClicked === "User" ? "1" : "2",
            TaskSteps: TaskSteps,
            EstimatedExecutionTime: estimatedExecutionTime,
          },
        });
      } else {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            SourceTaskCreationPlatform: 1, // ????
            intervalType: data.intervalType === "Weekly" ? "weekly" : "monthly", // if timePeriod (daily weekly monthly)
            days: data.intervalType === "Weekly" ? weekDays : days,
            actionType: "task", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            ConditionType: conditionType,
          },
          triggerTask: {
            CreateUser: LoadUserID(),
            Subject: data.subject,
            Subsubject: data.subSubject,
            Text: data.description,
            TaskLevel: Number(data.levelClicked),
            TaskLevelObjectID: data.objectIdSelected,
            Priority:
              data.priorityClicked === "Low"
                ? 1
                : data.priorityClicked === "Medium"
                ? 2
                : 3,
            Assignee: data.userIdSelected, //data.asigneClicked === "User" ? 0 : 1,
            AssigneeName:
              data.asigneClicked === "User" ? data.asigneTaskToClicked : "",
            AssigneeGroupName:
              data.asigneClicked === "User" ? "" : data.asigneTaskToClicked,
            selectedAssignee: true,
            estHour: estHour,
            estMin: estMin,
            SourceTaskCreationPlatform: 1,
            AssigneeSelected: data.asigneClicked === "User" ? "1" : "2",
            TaskSteps: TaskSteps,
            EstimatedExecutionTime: estimatedExecutionTime,
          },
        });
      }
    }
    //period and message
    else if (data.stopCause === "" && data.subMachinesList.length >= 1) {
      console.log("subMachinesList message " + data.subMachinesList);
      console.log("subMachinesIDList message " + data.subMachinesIDList);

      let hour = 0;
      let minute = 0;
      //if it was Every Period of Time
      if (data.amountTimePeriod !== 0) {
        hour = data.amountTimePeriod;
      } else {
        //split time and convert to number
        let timeInterval = data.eventTime.split(":");
        hour = Number(timeInterval[0]);
        minute = Number(timeInterval[1]);
      }

      //covert week days to number
      let weekDays: number[] = [];
      data.triggerWeekDays.forEach((day) => {
        if (day === "0") {
          weekDays.push(1);
        } else if (day === "1") {
          weekDays.push(2);
        } else if (day === "2") {
          weekDays.push(3);
        } else if (day === "3") {
          weekDays.push(4);
        } else if (day === "4") {
          weekDays.push(5);
        } else if (day === "5") {
          weekDays.push(6);
        } else if (day === "6") {
          weekDays.push(7);
        }
      });

      //convert array to number
      const days = data.triggerDays.map((i) => Number(i));

      //if it was daily or Every Period of Time
      if (data.intervalType === "Daily" || data.amountTimePeriod !== 0) {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType:
              data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily", // if timePeriod (daily weekly monthly)
            actionType: "message", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              machineIds: data.subMachinesIDList,
            },
            ConditionType: conditionType,
            date: data.eventValuePeriod,
          },
        });
      } else {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType: data.intervalType === "Weekly" ? "weekly" : "monthly", // if timePeriod (daily weekly monthly)
            days: data.intervalType === "Weekly" ? weekDays : days,
            actionType: "message", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              machineIds: data.subMachinesIDList,
            },
            ConditionType: conditionType,
          },
        });
      }
    }
    //every period + service call ("levelClicked" not create task && not send notification && not send message)
    else if (
      data.stopCause === "" &&
      data.levelClicked === "" &&
      data.subNotifyClicked === "" &&
      data.subMachinesList.length === 0 &&
      (data.maintenanceType === 0 || data.maintenanceType === null) &&
      data.amountTimePeriod !== 0
    ) {
      console.log("every period + service call");

      yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
        rootTrigger: {
          ruleText: data.ruleName,
          name: data.ruleName,
          isActive: data.isActive,
          id: 0,
          ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
          intervalType: "hourlyCustom",
          actionType: "service_call", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
          intervalHour: data.amountTimePeriod, // only in timePeriod
          intervalMinute: 0, // only in timePeriod
          SourceTaskCreationPlatform: 1, // ????
          eventID: data.causeIdSelected, // only in event
          actionData: {
            text: data.description,
            userID: data.userIdSelected,
          },
          ConditionType: conditionType,
          date: data.eventValuePeriod,
        },
      });
    }
    //period/every period + maintenance
    else if (
      data.stopCause === "" &&
      data.levelClicked === "" &&
      data.subNotifyClicked === "" &&
      data.subMachinesList.length === 0 &&
      data.maintenanceType !== 0
    ) {
      console.log("period/every period + maintenance");
      let hour = 0;
      let minute = 0;
      //if it was Every Period of Time
      if (data.amountTimePeriod !== 0) {
        hour = data.amountTimePeriod;
      } else {
        //split time and convert to number
        let timeInterval = data.eventTime.split(":");
        hour = Number(timeInterval[0]);
        minute = Number(timeInterval[1]);
      }

      //covert week days to number
      let weekDays: number[] = [];
      data.triggerWeekDays.forEach((day) => {
        if (day === "0") {
          weekDays.push(1);
        } else if (day === "1") {
          weekDays.push(2);
        } else if (day === "2") {
          weekDays.push(3);
        } else if (day === "3") {
          weekDays.push(4);
        } else if (day === "4") {
          weekDays.push(5);
        } else if (day === "5") {
          weekDays.push(6);
        } else if (day === "6") {
          weekDays.push(7);
        }
      });

      //convert array to number
      const days = data.triggerDays.map((i) => Number(i));
      //if it was daily or Every Period of Time
      if (
        data.intervalType ===
          i18next.t(
            translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAILY
          ) ||
        data.amountTimePeriod !== 0
      ) {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause !== "" ? "event" : "timeperiod", // 1. event   2. timePeriod
            intervalType: "hourlyCustom",
            actionType: "maintenance", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: data.amountTimePeriod, // only in timePeriod
            intervalMinute: 0, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            maintenanceActionData: {
              MaintenanceType: data.maintenanceType,
              MaintenanceEntityID: data.maintenanceEntityID,
              MaintenanceReason: data.maintenanceReason,
              Note: data.note,
            },
            ConditionType: conditionType,
            date: data.eventValuePeriod,
          },
        });
      } else {
        yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType:
              data.intervalType ===
              i18next.t(
                translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEKLY
              )
                ? "weekly"
                : "monthly", // if timePeriod (daily weekly monthly)
            days:
              data.intervalType ===
              i18next.t(
                translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEKLY
              )
                ? weekDays
                : days,
            actionType: "maintenance", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            maintenanceActionData: {
              MaintenanceType: data.maintenanceType,
              MaintenanceEntityID: data.maintenanceEntityID,
              MaintenanceReason: data.maintenanceReason,
              Note: data.note,
            },
            ConditionType: conditionType,
          },
        });
      }
    }
    //event + maintenance
    else if (
      data.stopCause !== "" &&
      data.levelClicked === "" &&
      data.subNotifyClicked === "" &&
      data.subMachinesList.length === 0 &&
      data.maintenanceType !== 0
    ) {
      yield call(ToastapiCall, ToastDetails, requestURL, "POST", {
        rootTrigger: {
          ruleText: data.stopGroup,
          name: data.ruleName,
          isActive: data.isActive,
          id: 0,
          ruleType: data.stopCause !== "" ? "event" : "timeperiod", // 1. event   2. timePeriod
          actionType: "maintenance", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
          SourceTaskCreationPlatform: 1, // ????
          eventID: data.causeIdSelected === null ? 0 : data.causeIdSelected, // only in event
          triggerCondition: conditionsSend,
          StopReasonID: data.stopReasonID,
          triggerTask: data.stopReasonID,
          maintenanceActionData: {
            MaintenanceType: data.maintenanceType,
            MaintenanceEntityID: data.maintenanceEntityID,
            MaintenanceReason: data.maintenanceReason,
            Note: data.note,
          },
          ConditionType: conditionType,
        },
      });
    }
    //reset data after create trigger
    const resetRuleData: NewRuleInterface = {
      ruleName: "",
      stopCause: "",
      stopGroup: "",
      causeIdSelected: 0,
      intervalType: "",
      eventTime: "",
      triggerDays: [],
      triggerWeekDays: [],
      subject: "",
      subSubject: 0,
      description: "",
      levelClicked: "",
      asigneClicked: "",
      objectClicked: "",
      objectIdSelected: 0,
      asigneTaskToClicked: "",
      timeClicked: "",
      priorityClicked: "",
      subTaskList: [],
      subMachinesList: [],
      GroupMessage: GroupMessage.DepartmentMachine,
      subMachinesIDList: [0],
      subNotifyClicked: "",
      userIdSelected: 0,
      editClicked: false,
      subTaskListCheckBox: [true],
      isActive: true,
      stopReasonID: [0],
      triggerCondition: [
        {
          Name: "",
          Sign: "",
          Value: "",
          FieldType: "",
          Condition: "",
          DisplayOrder: 0,
          Interval: "",
          MachineID: 0,
          ParameterID: [0],
          TimeInterval: 0,
        },
      ],
      amountTimePeriod: 0,
      timeIntervalPeriod: "",
      eventTypePeriod: "",
      eventValuePeriod: "",
      maintenanceType: 0,
      maintenanceEntityID: 0,
      maintenanceReason: 0,
      note: "",
    };
    yield put(SET_DATA(resetRuleData));
  } catch (err) {
    console.log("error", err);
  }

  yield put(fetchTriggers());
}

function* actionWatcher_Trigger() {
  yield all([
    takeLatest(loadAllTriggers, getTriggersNewFunction),
    takeLatest(SetViewOfRules, getTriggersNewFunction),
    debounce(1000, fetchTriggers, getTriggersNewFunction),
    takeLatest(LoadAllEventReasonAndGroup, getEventsNewFunction),
    takeLatest(loadAllUserForTask, getNotificationEventsFunction),
    takeLatest(loadAllTaskLevelObjectk, getTasklevelObjectFunction),
    takeLatest(loadAllDepartmentMachine, getDepartmentMachineFunction),
    takeEvery(SetActiveTriggerCard, setActiveTriggerFunction),
    takeLatest(DeleteTrigger, DeleteTriggerFunction),
    takeLatest(GetAllCardData, getTriggerCardData),
    takeLatest(DeleteSelectedRules, DeleteSelectedTriggerFunction),
    takeLatest(DUPLICATE_GET_DATA_RULE, DuplicateRule),
    takeLatest(DUPLICATE_SEND_REQUEST_RULE, DuplicateRuleSendRequest),
    takeLatest(loadAllParametersMachines, getParametersMachinesFunction),
    takeLatest(loadAllTaskSubjects, getTaskSubjects),
    takeLatest(loadAllMaintenance, getMaintenanceFunction),
  ]);
}

export default actionWatcher_Trigger;
