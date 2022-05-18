import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  GroupMessage,
  NewRuleInterface,
  SAVE_NEW_CARD,
  selectRuleData,
  SET_DATA,
} from "./index";
import { SetLastCreateRuleID } from "../../RuleContainer/slice";
import { CardsInterface, ConditionType } from "../../RuleContainer/slice/types";
import {
  selectCards,
  selectEditData,
} from "../../RuleContainer/slice/selectors";
import { getTriggersNewFunction } from "../../RuleContainer/slice/saga";
import { LoadUserID } from "../../../AppStart";

import { apiCall } from "../../../utils/Network";
import i18next from "i18next";
import { translations } from "../../../locales/translations";

function* saveNewCard(): any {
  const data: NewRuleInterface = yield select(selectRuleData);

  let triggerGroupID = 0;
  const newEditData = yield select(selectEditData);
  if (newEditData.data.ResponseList) {
    triggerGroupID = newEditData.data.ResponseList[0].TriggerGroupID;
  }
  console.log("triggerGroupID ", triggerGroupID);
  console.log("data ", data);
  console.log("newEditData ", newEditData);

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

  let eventCondition = true;
  if (data.triggerCondition.length > 0) {
    //if there is no stop condition and deviation condition
    if (
      data.triggerCondition[0].MachineID === 0 &&
      data.triggerCondition[0].Name === ""
    ) {
      eventCondition = false;
    }
  } else if (data.triggerCondition.length === 0) {
    eventCondition = false;
  }

  const requestURL = `CreateTriggerProcess`;

  try {
    //create new card
    if (triggerGroupID === 0) {
      //event + service call ("levelClicked" not create task && not send notification && not send message)
      if (
        (data.stopCause !== "" || eventCondition) &&
        data.levelClicked === "" &&
        data.subNotifyClicked === "" &&
        data.subMachinesList.length === 0 &&
        data.maintenanceType === 0
      ) {
        console.log("event + service call");
        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
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
        console.log("event + maintenance");
        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
            actionType: "maintenance", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
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
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + send notification
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.subNotifyClicked !== ""
      ) {
        console.log("event + send notification");

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + type task
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.levelClicked !== ""
      ) {
        console.log("event + type task");
        let estimatedExecutionTime = 0;
        let estHour = "";
        let estMin = "";
        //split time task
        if (data.timeClicked !== "") {
          let timeTask = data.timeClicked.split(":");
          estimatedExecutionTime =
            Number(timeTask[0]) * 60 + Number(timeTask[1]);
          estHour = timeTask[0];
          estMin = timeTask[1];
        }

        console.log("EstimatedExecutionTime ", estimatedExecutionTime);
        //make subTask array objects
        let TaskSteps: any[] = [];
        data.subTaskList.map((subTask) =>
          TaskSteps.push({
            Text: subTask,
            ID: 0,
            IsOpen: true,
            IsActive:
              data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
          })
        );

        let subjectIdClicked = Number(data.subject);
        if (data.subject.includes("_")) {
          const subjectIdClickedArr = data.subject.split("_");
          subjectIdClicked = Number(subjectIdClickedArr[1]);
        }

        let levelIndex = Number(data.levelClicked);
        if (data.levelClicked.includes("_")) {
          const levelIndexClickedArr = data.levelClicked.split("_");
          levelIndex = Number(levelIndexClickedArr[1]);
        }

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            Subject: subjectIdClicked,
            Subsubject: data.subSubject,
            Text: data.description,
            TaskLevel: levelIndex,
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
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + message
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.subMachinesList.length >= 1
      ) {
        console.log("data.stopCause ", data.stopCause);
        console.log("data.subMachinesList ", data.subMachinesList);

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //every period + service call ("levelClicked" not create task && not send notification && not send message)
      else if (
        data.stopCause === "" &&
        data.levelClicked === "" &&
        data.subNotifyClicked === "" &&
        data.subMachinesList.length === 0 &&
        data.maintenanceType === 0 &&
        data.amountTimePeriod !== 0
      ) {
        console.log("every period + service call");
        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
        } else {
          //split time and convert to number
          let timeInterval = data.eventTime.split(":");
          hour = Number(timeInterval[0]);
          minute = Number(timeInterval[1]);
        }

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType: "hourlyCustom",
            actionType: "service_call", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              userID: data.userIdSelected,
            },
            ConditionType: conditionType,
            date: date,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
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
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType:
                data.stopCause !== "" || eventCondition
                  ? "event"
                  : "timeperiod", // 1. event   2. timePeriod
              intervalType:
                data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily",
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
              date: date,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //timePeriod + notification
      else if (data.stopCause === "" && data.subNotifyClicked !== "") {
        console.log("intervalType notification " + data.intervalType);

        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          const response = yield call(apiCall, requestURL, "POST", {
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
              date: date,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //timePeriod + task
      else if (data.stopCause === "" && data.levelClicked !== "") {
        console.log("intervalType task timePeriod" + data.intervalType);

        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          estimatedExecutionTime =
            Number(timeTask[0]) * 60 + Number(timeTask[1]);
          estHour = timeTask[0];
          estMin = timeTask[1];
        }
        console.log("estimatedExecutionTime ", estimatedExecutionTime);

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
            IsActive:
              data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
          })
        );

        const subjectIdClickedArr = data.subject.split("_");
        const subjectIdClicked = Number(subjectIdClickedArr[1]);
        console.log("subjectIdClicked ", subjectIdClicked);

        let levelIndex = Number(data.levelClicked);
        if (data.levelClicked.includes("_")) {
          const levelIndexClickedArr = data.levelClicked.split("_");
          levelIndex = Number(levelIndexClickedArr[1]);
        }

        //if it was daily or Every Period of Time
        if (
          data.intervalType ===
            i18next.t(
              translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAILY
            ) ||
          data.amountTimePeriod !== 0
        ) {
          const response = yield call(apiCall, requestURL, "POST", {
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
              date: date,
            },
            triggerTask: {
              CreateUser: LoadUserID(),
              Subject: subjectIdClicked,
              Subsubject: data.subSubject,
              Text: data.description,
              TaskLevel: levelIndex,
              TaskLevelObjectID: data.objectIdSelected,
              Priority:
                data.priorityClicked === "Low"
                  ? 1
                  : data.priorityClicked === "Medium"
                  ? 2
                  : 3,
              Assignee: data.userIdSelected, //data.asigneClicked === "User" ? 0 : 1
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
              SourceTaskCreationPlatform: 1, // ????
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
              actionType: "task", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
              intervalHour: hour, // only in timePeriod
              intervalMinute: minute, // only in timePeriod
              ConditionType: conditionType,
            },
            triggerTask: {
              CreateUser: LoadUserID(),
              Subject: subjectIdClicked,
              Subsubject: data.subSubject,
              Text: data.description,
              TaskLevel: levelIndex,
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //period and message
      else if (data.stopCause === "" && data.subMachinesList.length >= 1) {
        console.log("subMachinesList message " + data.subMachinesList);
        console.log("subMachinesIDList message " + data.subMachinesIDList);

        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          const response = yield call(apiCall, requestURL, "POST", {
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
              date: date,
            },
          });

          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
    }
    //save edit
    else {
      let checkInterval = "";
      if (data.intervalType !== "") {
        //if something else than schdual was edited then intervalType will be at ENG
        if (
          data.intervalType ===
            i18next.t(
              translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEKLY
            ) ||
          data.intervalType === "Weekly"
        ) {
          checkInterval = "weekly";
        } else if (
          data.intervalType ===
            i18next.t(
              translations.RulesContainer.CREATE_RULE.SELECT_SCHED.MONTHLY
            ) ||
          data.intervalType === "Monthly"
        ) {
          checkInterval = "monthly";
        } else if (
          data.intervalType ===
            i18next.t(
              translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAILY
            ) ||
          data.intervalType === "Daily"
        ) {
          checkInterval = "daily";
        }
      }
      console.log("save edit");
      //event + service call ("levelClicked" not create task && not send notification && not send message)
      if (
        (data.stopCause !== "" || eventCondition) &&
        data.levelClicked === "" &&
        data.subNotifyClicked === "" &&
        data.subMachinesList.length === 0 &&
        data.maintenanceType === 0
      ) {
        console.log("event + service call edit");
        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
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
        console.log("event + maintenance Edit");
        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + send notification
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.subNotifyClicked !== ""
      ) {
        console.log("userIdSelected " + data.userIdSelected);
        console.log("event + send notification edit");

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + type task
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.levelClicked !== ""
      ) {
        console.log("event + type task edit");
        let estimatedExecutionTime = 0;
        let estHour = "";
        let estMin = "";
        //split time task
        if (data.timeClicked !== "") {
          let timeTask = data.timeClicked.split(":");
          estimatedExecutionTime =
            Number(timeTask[0]) * 60 + Number(timeTask[1]);
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
            IsActive:
              data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
          })
        );

        let subjectIdClicked = Number(data.subject);
        if (data.subject.includes("_")) {
          const subjectIdClickedArr = data.subject.split("_");
          subjectIdClicked = Number(subjectIdClickedArr[1]);
        }

        let levelIndex = Number(data.levelClicked);
        if (data.levelClicked.includes("_")) {
          const levelIndexClickedArr = data.levelClicked.split("_");
          levelIndex = Number(levelIndexClickedArr[1]);
        }

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
          },
          triggerTask: {
            CreateUser: LoadUserID(),
            Subject: subjectIdClicked,
            Subsubject: data.subSubject,
            Text: data.description,
            TaskLevel: levelIndex,
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
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //event + message
      else if (
        (data.stopCause !== "" || eventCondition) &&
        data.subMachinesList.length >= 1
      ) {
        console.log("event + message edit");
        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.stopGroup,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType:
              data.stopCause !== "" || eventCondition ? "event" : "timeperiod", // 1. event   2. timePeriod
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
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //every period + service call ("levelClicked" not create task && not send notification && not send message)
      else if (
        data.stopCause === "" &&
        data.levelClicked === "" &&
        data.subNotifyClicked === "" &&
        data.subMachinesList.length === 0 &&
        data.maintenanceType === 0 &&
        data.amountTimePeriod !== 0
      ) {
        console.log("every period + service call edit");
        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
        } else {
          //split time and convert to number
          let timeInterval = data.eventTime.split(":");
          hour = Number(timeInterval[0]);
          minute = Number(timeInterval[1]);
        }

        const response = yield call(apiCall, requestURL, "POST", {
          rootTrigger: {
            ruleText: data.ruleName,
            name: data.ruleName,
            isActive: data.isActive,
            id: 0,
            ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
            intervalType:
              data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily", // if timePeriod (daily weekly monthly)
            actionType: "service_call", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
            intervalHour: hour, // only in timePeriod
            intervalMinute: minute, // only in timePeriod
            SourceTaskCreationPlatform: 1, // ????
            eventID: data.causeIdSelected, // only in event
            actionData: {
              text: data.description,
              userID: data.userIdSelected,
            },
            groupToDelete: triggerGroupID,
            ConditionType: conditionType,
            date: date,
          },
        });
        if (response.error === null) {
          yield call(getTriggersNewFunction);
          const cards: CardsInterface[] = yield select(selectCards);
          let ID = yield call(getLastCreatedID, cards);
          yield put(SetLastCreateRuleID(ID));
        }
      }
      //period/every period + maintenance
      else if (
        data.stopCause === "" &&
        data.levelClicked === "" &&
        data.subNotifyClicked === "" &&
        data.subMachinesList.length === 0 &&
        data.maintenanceType !== 0
      ) {
        console.log("period/every period + maintenance Edit");
        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType:
                data.stopCause !== "" || eventCondition
                  ? "event"
                  : "timeperiod", // 1. event   2. timePeriod
              intervalType:
                data.amountTimePeriod !== 0 ? "hourlyCustom" : "daily",
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
              date: date,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //timePeriod + notification
      else if (data.stopCause === "" && data.subNotifyClicked !== "") {
        console.log("intervalType notification " + data.intervalType);
        console.log("timePeriod + notification edit");

        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
        if (checkInterval === "daily" || data.amountTimePeriod !== 0) {
          const response = yield call(apiCall, requestURL, "POST", {
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
              date: date,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
              intervalType: checkInterval,
              days: checkInterval === "weekly" ? weekDays : days,
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //timePeriod + task
      else if (data.stopCause === "" && data.levelClicked !== "") {
        console.log("intervalType task " + data.intervalType);
        console.log("timePeriod + task edit");

        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
          estimatedExecutionTime =
            Number(timeTask[0]) * 60 + Number(timeTask[1]);
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
            IsActive:
              data.subTaskListCheckBox[data.subTaskList.indexOf(subTask)],
          })
        );

        let subjectIdClicked = Number(data.subject);
        if (data.subject.includes("_")) {
          const subjectIdClickedArr = data.subject.split("_");
          subjectIdClicked = Number(subjectIdClickedArr[1]);
        }

        let levelIndex = Number(data.levelClicked);
        if (data.levelClicked.includes("_")) {
          const levelIndexClickedArr = data.levelClicked.split("_");
          levelIndex = Number(levelIndexClickedArr[1]);
        }

        //if it was daily or Every Period of Time
        if (checkInterval === "daily" || data.amountTimePeriod !== 0) {
          const response = yield call(apiCall, requestURL, "POST", {
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
              date: date,
            },
            triggerTask: {
              CreateUser: LoadUserID(),
              Subject: subjectIdClicked,
              Subsubject: data.subSubject,
              Text: data.description,
              TaskLevel: levelIndex,
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
              SourceTaskCreationPlatform: 1, // ????
              intervalType: checkInterval,
              days: checkInterval === "weekly" ? weekDays : days,
              actionType: "task", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
              intervalHour: hour, // only in timePeriod
              intervalMinute: minute, // only in timePeriod
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
            },
            triggerTask: {
              CreateUser: LoadUserID(),
              Subject: subjectIdClicked,
              Subsubject: data.subSubject,
              Text: data.description,
              TaskLevel: levelIndex,
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
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
      //period and message
      else if (data.stopCause === "" && data.subMachinesList.length >= 1) {
        console.log("intervalType message " + data.intervalType);
        console.log("timePeriod + message edit");
        let hour = 0;
        let minute = 0;
        let date = "";
        //if it was Every Period of Time
        if (data.amountTimePeriod !== 0) {
          hour = data.amountTimePeriod;
          if (data.timeIntervalPeriod === "1") {
            hour = data.amountTimePeriod * 24;
          } else if (data.timeIntervalPeriod === "2") {
            hour = data.amountTimePeriod * 168;
          }
          let dateNoTime = data.eventValuePeriod.split(" ");
          let datereplace = dateNoTime[0].split("/");
          date =
            datereplace[0] +
            "-" +
            datereplace[1] +
            "-" +
            datereplace[2] +
            " " +
            dateNoTime[1] +
            ":00";
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
        if (checkInterval === "daily" || data.amountTimePeriod !== 0) {
          const response = yield call(apiCall, requestURL, "POST", {
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
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
              date: date,
            },
          });

          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        } else {
          const response = yield call(apiCall, requestURL, "POST", {
            rootTrigger: {
              ruleText: data.ruleName,
              name: data.ruleName,
              isActive: data.isActive,
              id: 0,
              ruleType: data.stopCause === "" ? "timeperiod" : "event", // 1. event   2. timePeriod
              intervalType: checkInterval,
              days: checkInterval === "weekly" ? weekDays : days,
              actionType: "message", // actionType: task notification (message only in timeperiod) (serviceCall only in event).
              intervalHour: hour, // only in timePeriod
              intervalMinute: minute, // only in timePeriod
              SourceTaskCreationPlatform: 1, // ????
              eventID: data.causeIdSelected, // only in event
              actionData: {
                text: data.description,
                machineIds: data.subMachinesIDList,
              },
              groupToDelete: triggerGroupID,
              ConditionType: conditionType,
            },
          });
          if (response.error === null) {
            yield call(getTriggersNewFunction);
            const cards: CardsInterface[] = yield select(selectCards);
            let ID = yield call(getLastCreatedID, cards);
            yield put(SetLastCreateRuleID(ID));
          }
        }
      }
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
}

function getLastCreatedID(cards: CardsInterface[]) {
  let cards_by_me: CardsInterface[] = cards.filter(
    (elem) => elem.GroupCreateUserID === Number(LoadUserID())
  );
  let card: CardsInterface = cards_by_me.reduce((a, b) =>
    Number(new Date(a.CreateDate)) > Number(new Date(b.CreateDate)) ? a : b
  );
  return card.TriggerGroupID;
}

function* actionWatcher_CreateNewRule() {
  yield all([takeLatest(SAVE_NEW_CARD, saveNewCard)]);
}

export default actionWatcher_CreateNewRule;
