import React, { useEffect, useState } from "react";
import SearchHeader from "./Components/SearchHeader/SearchHeader";
import Filter from "./Components/Filter/Filter";
import { Body, Container, EmptyContainer } from "./styles";
import CreateNewRule from "../CreateNewRule/CreateNewRule";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllTriggers,
  loadAllTaskLevelObjectk,
  loadAllDepartmentMachine,
  GetAllCardData,
  DUPLICATE_GET_DATA_RULE,
  DUPLICATE_SEND_REQUEST_RULE,
  loadAllUserForTask,
  ResetCardEditData,
  loadAllParametersMachines,
  loadAllTaskSubjects,
  SetFilter,
  loadAllMaintenance,
  DeleteTrigger,
} from "./slice";
import {
  selectViewRules,
  selectCountActiveRules,
  selectDuplicateData,
  selectAllUserForTask,
  selectAllTaskLevelObject,
  selectEventReasons,
  selectCardsResults,
} from "./slice/selectors";
import {
  CardsInterface,
  VIEW_ROWS_GRID,
  RulesContainerSlice,
  EventsAndGroup,
  FILTERBY,
  DeleteTriggerInterface,
} from "./slice/types";
import CardsView from "./Components/CardView/CardsView";
import { StyledToastContainer } from "../../Component/Toast/ToastContainer";
import TableView from "./Components/TableView/TableView";
import {
  GroupMessage,
  NewRuleInterface,
  SET_DATA,
  SET_INITIAL_DATA,
} from "../CreateNewRule/slice";
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";
import { SearchInCards } from "../RuleContainer/slice";
import moment from "moment-timezone";
import EmptyCards from "./Components/EmptyCards/EmptyCards";
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//     },
// }));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainContainerProps {
  //to be used
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RuleContainer: React.FC<MainContainerProps> = (props) => {
  const dispatch = useDispatch();

  const activeRulescount = useSelector(selectCountActiveRules);

  const { t } = useTranslation();
  const userForTaskData: RulesContainerSlice["UsersForTask"] =
    useSelector(selectAllUserForTask);
  const tasks: RulesContainerSlice["TaskLevelObject"] = useSelector(
    selectAllTaskLevelObject
  );

  let userListElement = [""];
  let userIDElementList = [0];
  const [userIDList, setUserIDList] = useState([0]);
  const [userList, setUserList] = useState([""]);

  let groupListElement = [""];
  let groupIDElementList = [0];
  const [groupList, setGroupList] = useState([""]);
  const [groupIDList, setGroupIDList] = useState([0]);

  const subjectList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SUBJECTLIST.TYPE),
      value: 0,
    },
    {
      label: "Quality",
      value: 1,
    },
    {
      label: "Production",
      value: 2,
    },
    {
      label: "Subject 11gdffd",
      value: 3,
    },
    {
      label: "General",
      value: 4,
    },
    {
      label: "Maintenance",
      value: 5,
    },
    {
      label: "Trt5.4",
      value: 6,
    },
  ];

  const priorityList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.LOW),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.MEDIUM),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.HIGH),
      value: 2,
    },
  ];

  const notificationList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.USER_OR_GROUPS),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.USER),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.GROUP),
      value: 2,
    },
  ];

  useEffect(() => {
    dispatch(loadAllTriggers());
    dispatch(loadAllTaskLevelObjectk());
    dispatch(loadAllDepartmentMachine());
    //fetch user data
    dispatch(loadAllUserForTask());
    dispatch(loadAllTaskSubjects());
    dispatch(SetFilter(FILTERBY.ALL));
    dispatch(loadAllMaintenance());
    dispatch(SearchInCards(""));
  }, [dispatch]);

  useEffect(() => {
    if (userForTaskData.data.ResponseDictionaryDT?.Users !== undefined) {
      //fetch users data
      userForTaskData.data.ResponseDictionaryDT?.Users.forEach((element) => {
        if (element.DisplayName !== "" && element.DisplayName !== null) {
          userListElement.push(element.DisplayName);
          userIDElementList.push(element.ID);
        }
      });

      for (let i = 1; i < userListElement.length; i++) {
        userList.push(userListElement[i]);
        userIDList.push(userIDElementList[i]);
      }
      //remove empty first item '' from array
      if (userList[0] === "") {
        userList.splice(0, 1);
        userIDList.splice(0, 1);
      }
      setUserList(userList);
      setUserIDList(userIDList);
    }

    if (tasks.data.ResponseDictionaryDT?.UserDefinitions !== undefined) {
      //fetch groups data
      tasks.data.ResponseDictionaryDT?.UserDefinitions.forEach((element) => {
        if (element.EName !== "" && element.EName !== null) {
          groupListElement.push(element.EName);
          groupIDElementList.push(element.ID);
        }
      });
      for (let i = 1; i < groupListElement.length; i++) {
        groupList.push(groupListElement[i]);
        groupIDList.push(groupIDElementList[i]);
      }
      //remove empty first item '' from array
      if (groupList[0] === "") {
        groupList.splice(0, 1);
        groupIDList.splice(0, 1);
      }
      setGroupList(groupList);
      setGroupIDList(groupIDList);
    }
  }, [userForTaskData, tasks]);

  const DupData = useSelector(selectDuplicateData);

  const reasonsAndGroups: RulesContainerSlice["EventsReasons"] =
    useSelector(selectEventReasons);
  const getKeyValue =
    <U extends keyof T, T extends object>(key: U) =>
    (obj: T) =>
      obj[key];
  let key: keyof EventsAndGroup = "EName";
  const [causeNameSelectedList, setCauseNameSelectedList] = useState([""]);

  const [card, setcard] = useState<CardsInterface>();

  const [createRule, createdRuledClicked] = useState(false);

  const ViewRulesState = useSelector(selectViewRules);
  const [show, setShow] = useState(false);

  const cardlist: CardsInterface[] = useSelector(selectCardsResults);

  useEffect(() => {
    dispatch(ResetCardEditData());
    dispatch(loadAllParametersMachines());
  }, []);

  const handleClickEdit = (data: CardsInterface) => {
    console.log("data reload ", data);

    //show CreateNewRule
    //send data card to show summary and edit
    setcard(data);

    //send data card TriggerGroupID, NotificationType to get all new data for edit and use it at CreateNewRule
    dispatch(GetAllCardData(data));

    setTimeout(() => {
      setShow(true);
    }, 200);
    /*
    //save edit at state
    const ActionEdit: NewRuleInterface = {
      ruleName: "",
      stopCause: "",
      stopGroup: "",
      causeIdSelected: 0,
      intervalType: "",
      eventTime: "",
      triggerDays: [],
      triggerWeekDays: [],
      subject: "",
      description: "",
      levelClicked: "",
      asigneClicked: "",
      objectClicked: "",
      objectIdSelected: 0,
      asigneTaskToClicked: "",
      timeClicked: "",
      priorityClicked: "",
      subTaskList: [""],
      subMachinesList: [],
      subMachinesIDList: [],
      GroupMessage: GroupMessage.DepartmentMachine,
      subNotifyClicked: "",
      userIdSelected: 0,
      editClicked: true,
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
          ParameterID: 0,
          TimeInterval: 0,
        },
      ],
    };

    dispatch(SET_INITIAL_DATA(ActionEdit));
    createdRuledClicked(true);
*/
  };

  const handleClickDelete = (data: CardsInterface) => {
    console.log("handleClickDelete ", data);
    //if message or notifcation or call (NotificationType is number) then send Triggertypr 2, else if task then TriggerType 1
    let TriggerType = 0;
    if (typeof data.NotificationType == "number") {
      TriggerType = 2;
    } else {
      TriggerType = 1;
    }

    const dispatchObject: DeleteTriggerInterface = {
      ID: data.TriggerGroupID,
      TriggerType: TriggerType,
      Name: data.name,
    };

    dispatch(DeleteTrigger(dispatchObject));
  };

  useEffect(() => {
    if (show) {
      //save edit at state
      const ActionEdit: NewRuleInterface = {
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
        subTaskList: [""],
        subMachinesList: [],
        subMachinesIDList: [],
        GroupMessage: GroupMessage.DepartmentMachine,
        subNotifyClicked: "",
        userIdSelected: 0,
        editClicked: true,
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
      dispatch(SET_INITIAL_DATA(ActionEdit));
      createdRuledClicked(true);
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    if (DupData.status) {
      console.log("DupData", DupData);

      let trigger = DupData.rule.triggerText.split("occurs,");
      let action = trigger[0].split("When");
      let stopGroup = "";
      let stopCause = "";
      let causeIdSelected = 0;
      let subject = "";
      let subSubject = 0;
      let eventTime = "";
      let intervalType = "";
      let weekDays: string[] = [];
      let monthDays: string[] = [];
      let description = "";
      let levelClicked = "";
      let TaskLevelObjectID = 0;
      let asigneClicked = "";
      let priority = "";
      let timing = "";
      let userIdSelected = 0;
      let taskSteps: string[] = [];
      let subTaskListCheckBox: boolean[] = [];
      let subMachinesList: string[] = [];
      let subMachinesIDList: number[] = [];
      let subNotifyClicked = "";
      let stopCauseIdList: number[] = [];
      let conditionsEdit: {
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
      let amountTimePeriod = 0;
      let date = "";
      let maintenanceType = 0;
      let maintenanceEntityID = 0;
      let maintenanceReason = 0;
      let note = "";

      //event
      if (action[1] !== undefined) {
        causeIdSelected = DupData.rule.stopReasonId;
      }

      if (DupData.data?.ResponseList) {
        let hour = "";
        let min = "";

        if (
          DupData.data.ResponseList[0].IntervalType.toString() ===
          "hourlyCustom"
        ) {
          amountTimePeriod = DupData.data.ResponseList[0].IntervalHour;
          date = DupData.data.ResponseList[0].Date;
          date = moment(date, "YYYY/MM/DD HH:mm").format("DD/MM/YY HH:mm");
          //date = date.replace("T", " ");
        } else {
          if (DupData.data.ResponseList[0].IntervalHour / 10 < 1) {
            hour = "0" + DupData.data.ResponseList[0].IntervalHour.toString();
          } else {
            hour = DupData.data.ResponseList[0].IntervalHour.toString();
          }

          if (DupData.data.ResponseList[0].IntervalMinute / 10 < 1) {
            min = "0" + DupData.data.ResponseList[0].IntervalMinute.toString();
          } else {
            min = DupData.data.ResponseList[0].IntervalMinute.toString();
          }

          eventTime = hour + ":" + min;

          if (DupData.data.ResponseList[0].DayInMonth) {
            intervalType = "Monthly";

            const dayInMonth = DupData.data.ResponseList[0].Days;
            dayInMonth.forEach((day) => {
              monthDays.push(String(day));
            });
          } else if (DupData.data.ResponseList[0].DayInWeek) {
            intervalType = "Weekly";
            DupData.data.ResponseList[0].Days.forEach((day) => {
              if (day === 1) {
                weekDays.push("0");
              } else if (day === 2) {
                weekDays.push("1");
              } else if (day === 3) {
                weekDays.push("2");
              } else if (day === 4) {
                weekDays.push("3");
              } else if (day === 5) {
                weekDays.push("4");
              } else if (day === 6) {
                weekDays.push("5");
              } else if (day === 7) {
                weekDays.push("6");
              }
            });
          } else {
            intervalType = "Daily";
          }
        }
        console.log("eventTime ", eventTime);
        console.log("intervalType ", intervalType);
        console.log("weekDays ", weekDays);
        console.log("monthDays ", monthDays);
      }

      if (DupData.data?.ResponseList) {
        console.log("DupDataDupDataDupData", DupData.data.ResponseList);

        if (DupData.data.ResponseList[0].MaintenanceType !== undefined) {
          maintenanceType = DupData.data.ResponseList[0].MaintenanceType;
          maintenanceEntityID =
            DupData.data.ResponseList[0].MaintenanceEntityID;
          maintenanceReason = DupData.data.ResponseList[0].MaintenanceReason;
          note = DupData.data.ResponseList[0].MaintenanceNote;
        }

        if (DupData.data.ResponseList[0].TriggerMultiReason !== undefined) {
          DupData.data.ResponseList[0].TriggerMultiReason.forEach((element) => {
            if (!stopCauseIdList.includes(element.StopReasonID)) {
              stopCauseIdList.push(element.StopReasonID);
            }

            //get reasons names
            reasonsAndGroups.data.EventsAndGroups?.forEach((elementreason) => {
              elementreason.Reasons?.forEach((elemreason2) => {
                if (elemreason2.ID === element.StopReasonID) {
                  const getName = getKeyValue<
                    keyof EventsAndGroup,
                    EventsAndGroup
                  >(key)(elemreason2);
                  if (getName !== null && getName !== undefined) {
                    causeNameSelectedList.push(String(getName));
                  }
                }
              });
            });
          });

          //remove empty item
          if (causeNameSelectedList[0] === "") {
            causeNameSelectedList.splice(0, 1);
          }
          //save names
          setCauseNameSelectedList(causeNameSelectedList);

          //save as string to know that is event and display when ScehduleRow edit
          stopCause = causeNameSelectedList.toString();
        }

        if (DupData.data.ResponseList[0].TriggerCondition !== undefined) {
          const conditions = DupData.data.ResponseList[0].TriggerCondition;
          //SPC
          if (
            DupData.data.ResponseList[0].TriggerCondition[0].ConditionType === 1
          ) {
            //get all value without ID to create new conditions
            conditions.forEach((element) => {
              let flag = false;
              conditionsEdit.forEach((spc) => {
                if (spc.MachineID === element.MachineID) {
                  flag = true;
                  if (!Array.isArray(element.ParameterID)) {
                    //set all ParameterID of MachineID at array becouse we get conditions separated every
                    //ParameterID at one item: 0: {TriggerGroup: 5672, ID: 417, TriggerID: 6963, MachineID: 1, ParameterID: 33, …}
                    spc.ParameterID.push(element.ParameterID);
                  }
                }
              });
              if (!flag) {
                //to save first item as array to enable add another ParameterID above
                let parameter: number[] = [];
                const objectToStr = String(element.ParameterID);
                const strToArray = objectToStr.split(",");
                parameter.push(Number(strToArray[0]));
                conditionsEdit.push({
                  Name: element.Name,
                  Sign: element.Sign,
                  Value: element.Value,
                  FieldType: element.FieldType,
                  Condition: element.Condition,
                  DisplayOrder: element.DisplayOrder,
                  Interval: element.Interval,
                  MachineID: element.MachineID,
                  ParameterID: parameter,
                  TimeInterval: 8888,
                });
              }
            });
          } else {
            //get all value without ID to create new conditions
            conditions.forEach((element) => {
              let parameter: number[] = [];
              const objectToStr = String(element.ParameterID);
              const strToArray = objectToStr.split(",");
              parameter.push(Number(strToArray[0]));
              conditionsEdit.push({
                Name: element.Name,
                Sign: element.Sign,
                Value: element.Value,
                FieldType: element.FieldType,
                Condition: element.Condition,
                DisplayOrder: element.DisplayOrder,
                Interval: element.Interval,
                MachineID: element.MachineID,
                ParameterID: parameter,
                TimeInterval: element.TimeInterval,
              });
            });
          }
        }
        //notification
        if (DupData.rule?.NotificationType === 7) {
          description = DupData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            DupData.data.ResponseList[0].TaskNotificationAssignee;

          //if was 0 then check if it's groupID
          if (userIdSelected === 0) {
            if (
              DupData.data.ResponseList[0].NotificationAssigneeGroup !==
              undefined
            ) {
              userIdSelected =
                DupData.data.ResponseList[0].NotificationAssigneeGroup;
            }
          }

          //user
          userIDList.forEach((element) => {
            if (element === userIdSelected) {
              subject = "1";
              subNotifyClicked = userList[userIDList.indexOf(element)];
            }
          });

          groupIDList.forEach((element) => {
            if (element === userIdSelected) {
              subject = "2";
              subNotifyClicked = groupList[groupIDList.indexOf(element)];
            }
          });
        }
        //service call
        else if (DupData.rule?.NotificationType === 2) {
          description = DupData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            DupData.data.ResponseList[0].TaskNotificationAssignee;
        }
        //message
        else if (DupData.rule?.NotificationType === 1) {
          description = DupData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            DupData.data.ResponseList[0].TaskNotificationAssignee;
          subMachinesList =
            DupData.data.ResponseList[0].MachineArray.split(",");
          subMachinesIDList = DupData.data.ResponseList[0].MachineArray.split(
            ","
          ).map((i) => Number(i));
        }
        //task
        else if (
          DupData.rule?.NotificationType === null &&
          DupData.rule.TaskModuleTriggerID.length > 0
        ) {
          description = DupData.data.ResponseList[0].Text;

          let levelClickedIndex = DupData.data.ResponseList[0].tasklevel;
          if (levelClickedIndex !== null) {
            levelClicked = levelClickedIndex.toString();
          }

          console.log("levelClicked ", levelClicked);

          if (DupData.data.ResponseList[0].TaskLevelObjectID !== null) {
            TaskLevelObjectID = DupData.data.ResponseList[0].TaskLevelObjectID;
          }

          userIdSelected = DupData.data.ResponseList[0].Assignee;

          priority =
            priorityList[DupData.data.ResponseList[0].Priority - 1].label;

          let time = DupData.data.ResponseList[0].EstimatedExecutionTime;
          let h = Math.floor(time / 60);
          let m = Math.floor(time % 60);
          let hDisplay = h > 9 ? h : "0" + h;
          let mDisplay = m === 0 ? "0" + m : m;
          timing = hDisplay + ":" + mDisplay;

          let subTask = DupData.data.ResponseList[0].TaskSteps;

          if (subTask !== undefined) {
            if (subTask.length > 0) {
              taskSteps = [];
              subTaskListCheckBox = [];
              subTask.forEach((element) => {
                taskSteps.push(element.text);
                subTaskListCheckBox.push(element.isactive);
              });
            }
          }

          if (DupData.data.ResponseList[0].Subject !== undefined) {
            console.log("subject ", DupData.data.ResponseList[0].Subject);
            // @ts-ignore
            subject = DupData.data.ResponseList[0].Subject;
          }

          if (
            DupData.data.ResponseList[0].Subsubject !== null &&
            DupData.data.ResponseList[0].Subsubject !== undefined
          ) {
            subSubject = DupData.data.ResponseList[0].Subsubject;
          }
          // if (subjectList.length > DupData.data.ResponseList[0].Subject) {
          //   subject = subjectList[DupData.data.ResponseList[0].Subject].label;
          // }
        }
      }
      //save data at state
      const ActionDuplicate: NewRuleInterface = {
        ruleName: DupData.rule.name || "",
        stopCause: stopCause,
        stopGroup: stopGroup,
        causeIdSelected: causeIdSelected,
        intervalType: intervalType,
        eventTime: eventTime,
        triggerDays: monthDays,
        triggerWeekDays: weekDays,
        subject: subject,
        subSubject: subSubject,
        description: description,
        levelClicked: levelClicked,
        asigneClicked: asigneClicked,
        objectClicked: "",
        objectIdSelected: TaskLevelObjectID,
        asigneTaskToClicked: "",
        timeClicked: timing,
        priorityClicked: priority,
        subTaskList: taskSteps,
        subMachinesList: subMachinesList,
        subMachinesIDList: subMachinesIDList,
        GroupMessage: GroupMessage.DepartmentMachine,
        subNotifyClicked: subNotifyClicked,
        userIdSelected: userIdSelected,
        editClicked: false,
        subTaskListCheckBox: subTaskListCheckBox,
        isActive: DupData.rule.IsActive || false,
        stopReasonID: stopCauseIdList,
        triggerCondition: conditionsEdit,
        amountTimePeriod: amountTimePeriod,
        timeIntervalPeriod: "",
        eventTypePeriod: "",
        eventValuePeriod: date,
        maintenanceType: maintenanceType,
        maintenanceEntityID: maintenanceEntityID,
        maintenanceReason: maintenanceReason,
        note: note,
      };

      //save data and clear state
      dispatch(
        DUPLICATE_SEND_REQUEST_RULE({
          dup: ActionDuplicate,
          notification_type: DupData.rule.NotificationType,
        })
      );
    }
  }, [
    DupData,
    DupData.status,
    dispatch,
    notificationList,
    priorityList,
    subjectList,
  ]);

  const handleClickDuplicate = (data: CardsInterface) => {
    dispatch(DUPLICATE_GET_DATA_RULE(data));

    // dispatch(SET_DATA(ActionDuplicate));

    // //create new card
    // dispatch(SAVE_NEW_CARD());
  };

  const handleCreateNewRule = () => {
    //reset edit data if was clicked edit before
    dispatch(ResetCardEditData());

    createdRuledClicked(!createRule);
  };

  const handleClickClose = () => {
    //reset edit data if was clicked edit before
    dispatch(ResetCardEditData());
    dispatch(SearchInCards(""));

    createdRuledClicked(false);

    // remove from state
    const stateDate: NewRuleInterface = {
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
      subTaskList: [""],
      subMachinesList: [],
      subMachinesIDList: [],
      GroupMessage: GroupMessage.DepartmentMachine,
      subNotifyClicked: "",
      userIdSelected: 0,
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
    dispatch(SET_DATA(stateDate));
  };

  return (
    <>
      <Container>
        {createRule ? (
          <CreateNewRule
            handleClickClose={() => handleClickClose()}
            dataCard={card as CardsInterface}
          />
        ) : (
          <Body>
            {/* <button onClick={notify}>Notify!</button> */}
            <StyledToastContainer />
            <SearchHeader
              countRules={activeRulescount}
              handleCreateNewRule={() => handleCreateNewRule()}
            />
            <Filter />

            {ViewRulesState === VIEW_ROWS_GRID.GRID ? (
              <CardsView
                handleClickDuplicate={handleClickDuplicate}
                handleClickEdit={handleClickEdit}
              >
                {" "}
              </CardsView>
            ) : cardlist.length === 0 ? (
              <EmptyContainer>
                <EmptyCards></EmptyCards>
              </EmptyContainer>
            ) : (
              <TableView
                handleClickDuplicate={handleClickDuplicate}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
              />
            )}
          </Body>
        )}
      </Container>
    </>
  );
};

export default RuleContainer;
