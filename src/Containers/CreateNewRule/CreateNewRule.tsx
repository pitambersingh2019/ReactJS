import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";

import {
  CreateRule,
  RuleNameContainer,
  InputRuleName,
  StepsTitle,
  TriggerContainer,
  TriggerLine,
  TriggerTitle,
  StepsContainer,
  Step,
  SelectTriggerTitle,
  NextContainer,
  NextButton,
  BackButton,
  Header,
  Body,
  HeaderContainer,
  TriggersContainer,
  AddConditionButton,
  AddConditionContainer,
  ConditionDropDown,
  AddCondition,
  TriggerConditionsRowContainer,
  LoadingContainer,
  ActionRowRowContainer,
} from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SelectTriggerDate from "./Components/SelectTriggerDate/SelectTriggerDate";
import SelectTriggerStopMachine from "./Components/SelectTriggerStopMachine/SelectTriggerStopMachine";
import SelectAction from "./Components/SelectAction/SelectAction";
import ScehduleRow from "./Components/ScehduleRow/ScehduleRow";
import DropDown from "../../Component/DropDown/DropDown";
import RuleSummary from "./Components/RuleSummary/RuleSummary";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRuleData,
  SET_TRIGGER_ROW,
  SET_ACTION_ROW,
  NewRuleInterface,
  SAVE_NEW_CARD,
  SET_DATA,
  SET_RULENAME_DATA,
  GroupMessage,
} from "./slice/index";
import {
  CardsInterface,
  EventsAndGroup,
  ResponseEditCard,
  RulesContainerSlice,
} from "../RuleContainer/slice/types";
import {
  selectAllDepartmentMachine,
  selectAllTaskLevelObject,
  selectAllUserForTask,
  selectEditData,
  selectEventReasons,
  selectParametersMachine,
} from "../RuleContainer/slice/selectors";
import { useTranslation } from "react-i18next";
import { translations } from "../../locales/translations";
import { nanoid } from "nanoid";
import ConditionRow from "./Components/ConditionRow/ConditionRow";
import AddDurationCondition from "./Components/AddDurationCondition/AddDurationCondition";
import AddMachineCondition from "./Components/AddMachineCondition/AddMachineCondition";
import ParameterDeviation from "./Components/Deviation/ParameterDeviation";
import DeviationConditionRow from "./Components/DeviationConditionRow/DeviationConditionRow";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingTitle } from "../RuleContainer/styles";
import SingleSelect from "../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../Component/DesignSystem/DropDown/types";
import SpcPredication from "./Components/SPC/SpcPredication";
import EveryPeriodOfTime from "./Components/AtRecurringEvent/EveryPeriodOfTime";
import moment from "moment-timezone";

interface CreateNewRuleProps {
  handleClickClose: () => void;
  dataCard: CardsInterface;
}

const CreateNewRule: React.FC<CreateNewRuleProps> = (props) => {
  const data: NewRuleInterface = useSelector(selectRuleData);

  const reasonsAndGroups: RulesContainerSlice["EventsReasons"] =
    useSelector(selectEventReasons);
  const getKeyValue =
    <U extends keyof T, T extends object>(key: U) =>
    (obj: T) =>
      obj[key];
  let key: keyof EventsAndGroup = "EName";

  const dispatch = useDispatch();

  const newEditData: { loading: boolean; data: ResponseEditCard } =
    useSelector(selectEditData);
  const { t } = useTranslation();

  const parametersMachines = useSelector(selectParametersMachine);
  const [departmentMachine, setDepartmentMachine] = useState([
    { label: "", value: 0 },
  ]);

  const [ruleNameText, setRuleNameText] = useState("");

  const [trigger, triggerSelected] = useState(false);
  const [triggerClicked, setTriggerClicked] = useState("");
  //const [triggerValueClicked, setTriggerValueClicked] = useState(0);
  const [scehdule, setScehdule] = useState(false);
  const [action, actionSelected] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [buttonNextActive, setButtonNextActive] = useState(false);

  const [typeSelected, setTypeSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [daysSelected, setDaysSelected] = useState([""]);
  const [weekDaysSelected, setWeekDaysSelected] = useState([""]);
  const [groupSelected, setGroupSelected] = useState("");
  const [causeSelected, setCauseSelected] = useState("");
  const [selectMachineStop, setSelectMachineStop] = useState(false);
  const [stepTow, setStepTow] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [actionRow, setActionRow] = useState(false);
  const [description, setDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subject, setSubject] = useState("");
  //set Card status isActive true when create card, and also send the value at edit case
  const [cardIsActive, setCardIsActive] = useState(true);
  const [causeNameSelectedList, setCauseNameSelectedList] = useState([""]);

  const [machineDeviation, setMachineDeviation] = useState("");
  const [parameterDeviation, setParameterDeviation] = useState("");
  const [machineIDDeviation, setMachineIDDeviation] = useState("");
  const [parameterIDDeviation, setParameterIDDeviation] = useState("");
  const [durationDeviation, setDurationDeviation] = useState("");
  const [elapsedDeviation, setElapsedDeviation] = useState("");
  const [editDeviation, setEditDeviation] = useState(false);
  const [conditionType, setConditionType] = useState(0);

  const [maintenanceType, setMaintenanceType] = useState(0);
  const [maintenanceEntityID, setMaintenanceEntityID] = useState(0);
  const [maintenanceReason, setMaintenanceReason] = useState(0);

  const [selectChangeTrigger, setSelectChangeTrigger] = useState(false);
  const [selectChangeAtStop, setSelectChangeAtStop] = useState(false);
  const [selectChangeAction, setSelectChangeAction] = useState(false);

  const addConditionsListOrigen = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.ADD_CONDITION_MACHINE),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.ADD_CONDITION_DURATION),
      value: 1,
    },
  ];

  const [addConditionsList, setAddConditionsList] = useState([
    {
      label: t(translations.RulesContainer.CREATE_RULE.ADD_CONDITION_MACHINE),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.ADD_CONDITION_DURATION),
      value: 1,
    },
  ]);

  const addConditionsPlaceHolder = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_CONDITION),
      value: 0,
    },
  ];

  const addDeviationList = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION.DEVIATION
      ),
      value: 0,
    },
  ];

  const addSPCList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION.SPC),
      value: 0,
    },
  ];

  const [addConditionButton, setAddConditionButton] = useState(false);
  const [addConditionSelected, setAddConditionSelected] = useState("");
  const [addConditionSelectedValue, setAddConditionSelectedValue] = useState(0);
  const [addConditionClicked, setAddConditionClicked] = useState(false);
  const [conditions, setConditions] = useState<
    {
      Name: string;
      Sign: string;
      Value: string;
      FieldType: string;
      Condition: string;
      DisplayOrder: number;
      Interval: string;
      MachineNames: string;
      MachineID: number;
      ParameterID: number[];
      TimeInterval: number;
    }[]
  >([]);
  const [deviationConditions, setDeviationConditions] = useState<
    {
      machineID: string;
      parameterID: string;
      machine: string;
      parameter: string;
      timeInterval: string;
      timeElapsed: string;
    }[]
  >([]);
  const [conditionsRedux, setConditionsRedux] = useState<
    {
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
    }[]
  >([]);
  const [machinesIdCondition, setMachinesIdCondition] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [radioButtonCondition, setRadioButtonCondition] = useState("");
  const [inputTextCondition, setInputTextCondition] = useState("");
  const [intervalCondition, setIntervalCondition] = useState("");

  const [amountTimePeriod, setAmountTimePeriod] = useState("");
  const [timeIntervalPeriod, setTimeIntervalPeriod] = useState("");
  const [eventTypePeriod, setEventTypePeriod] = useState("");
  const [eventValuePeriod, setEventValuePeriod] = useState("");
  const [editPeriod, setEditPeriod] = useState(false);

  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );

  const userForTaskData: RulesContainerSlice["UsersForTask"] =
    useSelector(selectAllUserForTask);
  const tasks: RulesContainerSlice["TaskLevelObject"] = useSelector(
    selectAllTaskLevelObject
  );

  useEffect(() => {
    let index = 9999;
    const data: any = [];
    groups.data.DepartmentMachine?.forEach((elem) => {
      const subOptions: any[] = [];
      elem.Value.forEach((elem2) => {
        subOptions.push({
          id: elem2.Id,
          name: elem2.MachineLName,
          subOptions: [],
        });
      });
      data.push({
        id: index,
        name: elem.Key.EName,
        subOptions: subOptions,
      });
      index += 1;
    });
    data?.forEach(
      (departments: { id: number; name: string; subOptions: any[] }) => {
        departments.subOptions.forEach((department: any) => {
          departmentMachine.push({
            label: department.name,
            value: department.id,
          });
        });
      }
    );
    //remove empty first item '' from array
    if (departmentMachine[0]?.label === "") {
      departmentMachine.splice(0, 1);
    }
    setDepartmentMachine(departmentMachine);
  }, [groups.data.DepartmentMachine]);

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

  useEffect(() => {
    return () => {
      //to do somthing
      //don't delete it
    };
  }, []);

  // const ToastDetails = setActiveMessage(
  //   "ActionData.payload.Name",
  //   false,
  // );

  useEffect(() => {
    //to show summary
    if (data.editClicked) {
      setButtonActive(true);
      setButtonNextActive(true);
      setScehdule(false);
      triggerSelected(false);
      setStepTow(true);
      setActionRow(true);
    }
    if (newEditData.loading) {
      //if there is data card, it's Edit card then show summary
      if (data.editClicked && newEditData.data.ResponseList) {
        // setDescription(props.dataCard.triggerText);
        setSubject(props.dataCard.name);
        setRuleNameText(props.dataCard.name);
        //get card active status to send it to Summary
        setCardIsActive(props.dataCard.IsActive);

        //split trigger information
        let trigger = props.dataCard.triggerText.split("occurs,");
        //save action
        let action = trigger[0].split("When");
        setCauseSelected(action[1]);
        let stopCause = "";
        let stopGroup = "";
        let subject = "";
        let subSubject = 0;
        let description = "";
        let causeIdSelected = 0;
        let intervalType = "";
        let eventTime = "";
        let weekDays: string[] = [];
        let monthDays: string[] = [];
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

        console.log("data card ", props.dataCard);

        //event
        if (
          action[1] !== undefined ||
          newEditData.data.ResponseList[0].TriggerMultiReason !== undefined
        ) {
          if (action[1] !== undefined) {
            stopCause = action[1].trim();
            causeIdSelected = props.dataCard.stopReasonId;
          }

          //get ID stop reasons event
          if (
            newEditData.data.ResponseList[0].TriggerMultiReason !== undefined
          ) {
            newEditData.data.ResponseList[0].TriggerMultiReason.forEach(
              (element) => {
                stopCauseIdList.push(element.StopReasonID);

                //get reasons names
                reasonsAndGroups.data.EventsAndGroups?.forEach(
                  (elementreason) => {
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
                  }
                );
              }
            );

            //remove empty item
            if (causeNameSelectedList[0] === "") {
              causeNameSelectedList.splice(0, 1);
            }
            //save names
            setCauseNameSelectedList(causeNameSelectedList);

            //save as string to know that is event and display when ScehduleRow edit
            stopCause = causeNameSelectedList.toString();
            stopGroup = newEditData.data.ResponseList[0].TriggerRuleText;
            //newEditData.data.ResponseList[0].TriggerRuleText;
          }

          //get conditions
          if (newEditData.data.ResponseList[0].TriggerCondition !== undefined) {
            conditionsEdit = newEditData.data.ResponseList[0].TriggerCondition;
            //clean array to add which missing
            setAddConditionsList([]);
            let conditionType =
              newEditData.data.ResponseList[0].TriggerCondition[0]
                .ConditionType;
            setConditionType(
              newEditData.data.ResponseList[0].TriggerCondition[0].ConditionType
            );
            console.log("conditionType ", conditionType);

            //to check if witch condition found
            let durationFlag = false;
            let machineIDFlag = false;

            conditionsEdit.forEach((element) => {
              if (element.Name === "Duration") {
                durationFlag = true;
              } else if (element.Name === "MachineID") {
                machineIDFlag = true;
              }

              //get machine name from machineIDs
              let machineNames: string[] = [];

              if (element.Name === "MachineID") {
                let str = element.Value.replace("(", "");
                str = str.replace(")", "");
                let machineIDSelected = str.split(",");

                setMachinesIdCondition(machineIDSelected);

                groups.data.DepartmentMachine?.forEach((elem) => {
                  machineIDSelected.forEach((machineID) => {
                    elem.Value.forEach((elem2) => {
                      if (machineID === elem2.Id.toString()) {
                        machineNames.push(elem2.MachineLName);
                      }
                    });
                  });
                });
              }

              let interval = "";
              if (element.Name === "Duration") {
                if (element.Interval !== null) {
                  interval = element.Interval;
                } else {
                  interval = element.Value + " hours";
                }
              }

              let item = {
                Name: element.Name,
                Sign: element.Sign,
                Value: element.Value,
                FieldType: element.FieldType,
                Condition: element.Condition,
                DisplayOrder: element.DisplayOrder,
                Interval: interval,
                MachineNames: machineNames.toString(),
                MachineID: element.MachineID,
                ParameterID: element.ParameterID,
                TimeInterval: element.TimeInterval,
              };
              conditions.push(item);
            });

            if (conditions[0].MachineID !== 0) {
              stopCause = "";
              stopGroup = "";

              //SPC
              if (conditionType === 1) {
                setAddConditionsList(addSPCList);
              } else {
                setAddConditionsList(addDeviationList);
              }

              //to show add button
              setMachineDeviation(conditions[0].MachineID.toString());
            } else {
              //if wasn't found duration then add
              if (!durationFlag) {
                setAddConditionsList((prevState) => [
                  ...prevState,
                  {
                    label: t(
                      translations.RulesContainer.CREATE_RULE
                        .ADD_CONDITION_DURATION
                    ),
                    value: 0,
                  },
                ]);
              }

              //if wasn't found machine then add
              if (!machineIDFlag) {
                setAddConditionsList((prevState) => [
                  ...prevState,
                  {
                    label: t(
                      translations.RulesContainer.CREATE_RULE
                        .ADD_CONDITION_MACHINE
                    ),
                    value: 0,
                  },
                ]);
              }
            }
            setConditions(conditions);
          }
        }
        //period
        else {
          //if action[1] was undefined then set empty
          setCauseSelected("");

          let hour = "";
          let min = "";
          if (
            newEditData.data.ResponseList[0].IntervalType.toString() ===
            "hourlyCustom"
          ) {
            amountTimePeriod = newEditData.data.ResponseList[0].IntervalHour;
            date = newEditData.data.ResponseList[0].Date;
            date = moment(date, "YYYY/MM/DD HH:mm").format("DD/MM/YY HH:mm");
            console.log("date ", date);
            /*
            let dateNoTime = date.split("T");
            let time = dateNoTime[1].replace(":00", "");
            let datereplace = dateNoTime[0].split("-");
            date =
              datereplace[2] +
              "/" +
              datereplace[1] +
              "/" +
              datereplace[0] +
              " " +
              time;
*/
            setAmountTimePeriod(amountTimePeriod.toString());
            setEventValuePeriod(date);
          } else {
            if (newEditData.data.ResponseList[0].IntervalHour / 10 < 1) {
              hour =
                "0" + newEditData.data.ResponseList[0].IntervalHour.toString();
            } else {
              hour = newEditData.data.ResponseList[0].IntervalHour.toString();
            }

            if (newEditData.data.ResponseList[0].IntervalMinute / 10 < 1) {
              min =
                "0" +
                newEditData.data.ResponseList[0].IntervalMinute.toString();
            } else {
              min = newEditData.data.ResponseList[0].IntervalMinute.toString();
            }

            eventTime = hour + ":" + min;

            if (newEditData.data.ResponseList[0].DayInMonth) {
              intervalType = "Monthly";

              const dayInMonth = newEditData.data.ResponseList[0].Days;
              dayInMonth.forEach((day) => {
                monthDays.push(String(day));
              });
            } else if (newEditData.data.ResponseList[0].DayInWeek) {
              intervalType = "Weekly";
              newEditData.data.ResponseList[0].Days.forEach((day) => {
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
        }

        if (
          newEditData.data.ResponseList[0].MaintenanceType !== undefined &&
          newEditData.data.ResponseList[0].MaintenanceType !== null
        ) {
          maintenanceType = newEditData.data.ResponseList[0].MaintenanceType;
          maintenanceEntityID =
            newEditData.data.ResponseList[0].MaintenanceEntityID;
          maintenanceReason =
            newEditData.data.ResponseList[0].MaintenanceReason;
          note = newEditData.data.ResponseList[0].MaintenanceNote;
          //to show action title
          setTriggerClicked(
            t(
              translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                .MAINTENANCE_TICKET
            )
          );
        }

        //to show period or event
        setTypeSelected(intervalType);
        setTimeSelected(eventTime);
        setDaysSelected(monthDays);
        setWeekDaysSelected(weekDays);

        //save trigger clicked
        if (props.dataCard.NotificationType === 7) {
          setTriggerClicked(
            t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
          );
          description = newEditData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            newEditData.data.ResponseList[0].TaskNotificationAssignee;
          //if was 0 then check if it's groupID
          if (userIdSelected === 0) {
            if (
              newEditData.data.ResponseList[0].NotificationAssigneeGroup !==
              undefined
            ) {
              userIdSelected =
                newEditData.data.ResponseList[0].NotificationAssigneeGroup;
            }
          }

          console.log("userIdSelected edit222 ", userIdSelected);

          //check at users data
          userForTaskData.data.ResponseDictionaryDT?.Users.forEach(
            (element) => {
              if (element.DisplayName !== "" && element.DisplayName !== null) {
                if (userIdSelected === element.ID) {
                  subNotifyClicked = element.DisplayName;
                  subject = "1";
                  // subject = t(translations.RulesContainer.CREATE_RULE.USER);
                }
              }
            }
          );
          //check at groups data
          tasks.data.ResponseDictionaryDT?.UserDefinitions.forEach(
            (element) => {
              if (element.EName !== "" && element.EName !== null) {
                if (userIdSelected === element.ID) {
                  subNotifyClicked = element.EName;
                  subject = "2";
                  // subject = t(translations.RulesContainer.CREATE_RULE.GROUP);
                }
              }
            }
          );
        } else if (props.dataCard.NotificationType === 2) {
          setTriggerClicked(
            t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
          );
          description = newEditData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            newEditData.data.ResponseList[0].TaskNotificationAssignee;
        } else if (props.dataCard.NotificationType === 1) {
          setTriggerClicked(
            t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE)
          );
          description = newEditData.data.ResponseList[0].TaskNotificationText;
          userIdSelected =
            newEditData.data.ResponseList[0].TaskNotificationAssignee;
          subMachinesList =
            newEditData.data.ResponseList[0].MachineArray.split(",");
          subMachinesIDList =
            newEditData.data.ResponseList[0].MachineArray.split(",").map((i) =>
              Number(i)
            );
        } else if (
          props.dataCard.NotificationType === null &&
          props.dataCard.TaskModuleTriggerID.length > 0
        ) {
          setTriggerClicked(
            t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
          );

          description = newEditData.data.ResponseList[0].Text;

          let levelClickedIndex = newEditData.data.ResponseList[0].tasklevel;

          if (levelClickedIndex !== null) {
            levelClicked = levelClickedIndex.toString();
          }

          if (newEditData.data.ResponseList[0].TaskLevelObjectID !== null) {
            TaskLevelObjectID =
              newEditData.data.ResponseList[0].TaskLevelObjectID;
          }

          userIdSelected = newEditData.data.ResponseList[0].Assignee;

          priority =
            priorityList[newEditData.data.ResponseList[0].Priority - 1].label;

          let time = newEditData.data.ResponseList[0].EstimatedExecutionTime;
          let h = Math.floor(time / 60);
          let m = Math.floor(time % 60);
          let hDisplay = h > 9 ? h : "0" + h;
          let mDisplay = m === 0 ? "0" + m : m;
          timing = hDisplay + ":" + mDisplay;

          let subTask = newEditData.data.ResponseList[0].TaskSteps;

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

          subject = newEditData.data.ResponseList[0].Subject.toString();
          if (
            newEditData.data.ResponseList[0].Subsubject !== null &&
            newEditData.data.ResponseList[0].Subsubject !== undefined
          ) {
            subSubject = newEditData.data.ResponseList[0].Subsubject;
          }
        }

        setDescription(description);

        //save data at state
        const editData: NewRuleInterface = {
          ruleName: ruleNameText,
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
          stopCause: stopCause,
          stopGroup: stopGroup,
          causeIdSelected: causeIdSelected,
          intervalType: intervalType,
          eventTime: eventTime,
          triggerDays: monthDays,
          triggerWeekDays: weekDays,
          userIdSelected: userIdSelected,
          editClicked: false,
          subTaskListCheckBox: subTaskListCheckBox,
          isActive: props.dataCard.IsActive,
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
        console.log("editData ", editData);
        dispatch(SET_DATA(editData));
        //to show summary with all data
        setStepThree(true);
      }
    }
  }, [
    newEditData.data,
    data,
    dispatch,
    props.dataCard,
    ruleNameText,
    t,
    notificationList,
    priorityList,
    newEditData.loading,
    userForTaskData,
    tasks,
  ]);

  const actionDeviationList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_ACTION),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.CREATE_TASK),
      value: 2,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.BOOK_CALL),
      value: 3,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE),
      value: 4,
    },
  ];

  // const actionListPlaceHolder = [
  //   {
  //     label: t(translations.RulesContainer.CREATE_RULE.TYPE_ACTION),
  //     value: 0,
  //   },
  // ];

  const actionList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_ACTION),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.CREATE_TASK),
      value: 2,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.BOOK_CALL),
      value: 3,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .MAINTENANCE_TICKET
      ),
      value: 4,
    },
  ];

  const everyPeriodActionList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_ACTION),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.CREATE_TASK),
      value: 2,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.BOOK_CALL),
      value: 3,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE),
      value: 4,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .MAINTENANCE_TICKET
      ),
      value: 5,
    },
  ];

  const actionListPeriod = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_ACTION),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE),
      value: 2,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.CREATE_TASK),
      value: 3,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .MAINTENANCE_TICKET
      ),
      value: 4,
    },
  ];

  const triggerList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TYPE_TRIGGER),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.TRIGGER),
      value: 1,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .EVERY_PERIOD_OF_TIME
      ),
      value: 2,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.MACHINE_STOPS.TRIGGER),
      value: 3,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION.DEVIATION
      ),
      value: 4,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION.SPC),
      value: 5,
    },
  ];

  const handleDropDown = (item: string) => {
    //save trigger clicked
    setTriggerClicked(item);
    // setTriggerValueClicked(index);

    if (stepTow) {
      //disable select first title
      if (item !== actionList[0].label) {
        actionSelected(true);
        setButtonActive(false);
        setButtonNextActive(false);
      }
    }
    //disable select first title
    else if (item !== triggerList[0].label) {
      //get indication to show SelectTriggerDate component
      triggerSelected(!trigger);
    }

    cleanOldData();
  };

  const handleDoneTriggerDateClicked = (
    type: string,
    time: string,
    days: string[],
    weekDays: string[]
  ) => {
    //get indication to show ScehduleRow component
    setScehdule(!scehdule);
    setTimeSelected(time);
    setDaysSelected(days);
    setTypeSelected(type);
    setWeekDaysSelected(weekDays);
    setButtonActive(true);
    setButtonNextActive(true);
    setSelectMachineStop(false);

    //save at state
    const TriggerDate: NewRuleInterface = {
      ruleName: ruleNameText,
      intervalType: type,
      eventTime: time,
      triggerDays: days,
      triggerWeekDays: weekDays,
      stopGroup: "",
      stopCause: "",
      causeIdSelected: 0,
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
    //save at state
    dispatch(SET_TRIGGER_ROW(TriggerDate));
  };

  const handleDoneEveryPeriodClicked = (
    amountTime: string,
    timeInterval: string,
    eventType: string,
    eventValue: string
  ) => {
    console.log("amountTime", amountTime);
    console.log("timeInterval", timeInterval);
    console.log("eventType", eventType);
    console.log("eventValue", eventValue);

    if (amountTime !== "" && timeInterval !== "") {
      //get indication to show ScehduleRow component
      setScehdule(!scehdule);
      setAmountTimePeriod(amountTime);
      setTimeIntervalPeriod(timeInterval);
      setEventTypePeriod(eventType);
      setEventValuePeriod(eventValue);
      setButtonActive(true);
      setButtonNextActive(true);
      setSelectMachineStop(false);

      //save at state
      const TriggerDate: NewRuleInterface = {
        ruleName: ruleNameText,
        intervalType: "",
        eventTime: "",
        triggerDays: [],
        triggerWeekDays: [],
        stopGroup: "",
        stopCause: "",
        causeIdSelected: 0,
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
        amountTimePeriod: Number(amountTime),
        timeIntervalPeriod: timeInterval,
        eventTypePeriod: eventType,
        eventValuePeriod: eventValue,
        maintenanceType: 0,
        maintenanceEntityID: 0,
        maintenanceReason: 0,
        note: "",
      };
      //save at state
      dispatch(SET_TRIGGER_ROW(TriggerDate));
    }
  };

  const handleCancelEveryPeriodClicked = () => {
    if (data.amountTimePeriod !== 0) {
      handleDoneEveryPeriodClicked(
        data.amountTimePeriod.toString(),
        data.timeIntervalPeriod,
        data.eventTypePeriod,
        data.eventValuePeriod
      );
    } else {
      triggerSelected(false);
    }
  };

  const handleDoneDeviationClicked = (
    machineID: string,
    parameterID: string,
    machine: string,
    parameter: string,
    timeInterval: string,
    timeElapsed: string
  ) => {
    console.log("parameterIDss ", parameterID);
    console.log("parameter names ", parameter);

    //only if was clicked the all fields
    if (machineID !== "" && parameterID !== "") {
      //if was click from "ADD Condition" button
      if (
        addConditionSelected === addDeviationList[0].label ||
        addConditionSelected === addSPCList[0].label
      ) {
        //if was edit then only update params
        if (editDeviation) {
          setDeviationConditions((prevState) => [
            ...prevState,
            {
              machineID,
              machine,
              parameter,
              parameterID,
              timeElapsed,
              timeInterval,
            },
          ]);
        }
        //if was new one then add to array deviationConditions
        else {
          setDeviationConditions((prevState) => [
            ...prevState,
            {
              machineID,
              machine,
              parameter,
              parameterID,
              timeElapsed,
              timeInterval,
            },
          ]);
        }
        setAddConditionSelected("");
        setAddConditionSelectedValue(0);
        //reset edit if was clicked
        setEditDeviation(false);
        setMachineIDDeviation("");
        setParameterIDDeviation("");
      }
      //if was click from trigger dropDown
      else {
        setMachineDeviation(machine);
        setParameterDeviation(parameter);
        setDurationDeviation(timeInterval);
        setElapsedDeviation(timeElapsed);

        setDeviationConditions((prevState) => [
          ...prevState,
          {
            machineID,
            machine,
            parameter,
            parameterID,
            timeElapsed,
            timeInterval,
          },
        ]);
        /*
        deviationConditions.push({
          machineID: machineID,
          parameterID: parameterID,
          machine: machine,
          parameter: parameter,
          timeInterval: timeInterval,
          timeElapsed: timeElapsed,
        });
        setDeviationConditions(deviationConditions);

         */
      }
      //back to show row trigger
      setAddConditionClicked(false);
      //to show Add Condition button again
      setAddConditionButton(false);
      setScehdule(!scehdule);
      setButtonActive(true);
      setButtonNextActive(true);

      if (deviationConditions.length > 0) {
        saveDeviationConditions();
      }
    }
  };

  const handleCancelDeviationClicked = () => {
    if (editDeviation) {
      deviationConditions.push({
        machineID: machineIDDeviation,
        parameterID: parameterIDDeviation,
        machine: machineDeviation,
        parameter: parameterDeviation,
        timeInterval: durationDeviation,
        timeElapsed: elapsedDeviation,
      });
      setDeviationConditions(deviationConditions);

      if (deviationConditions.length === 0) {
        setAddConditionSelected("");
        setAddConditionSelectedValue(0);
        //reset edit if was clicked
        setEditDeviation(false);
        setMachineIDDeviation("");
        setParameterIDDeviation("");

        //back to show row trigger
        setAddConditionClicked(false);
        //to show Add Condition button again
        setAddConditionButton(false);
        setScehdule(!scehdule);
        setButtonActive(true);
        setButtonNextActive(true);
      }
    }

    if (deviationConditions.length !== 0) {
      setAddConditionSelected("");
      setAddConditionSelectedValue(0);
      //reset edit if was clicked
      setEditDeviation(false);
      setMachineIDDeviation("");
      setParameterIDDeviation("");

      //back to show row trigger
      setAddConditionClicked(false);
      //to show Add Condition button again
      setAddConditionButton(false);
      setScehdule(!scehdule);
      setButtonActive(true);
      setButtonNextActive(true);
    } else if (!editDeviation) {
      triggerSelected(false);
    }
  };

  const handleShowDeviationClicked = () => {
    if (deviationConditions.length !== 0) {
      setAddConditionSelected("");
      setAddConditionSelectedValue(0);
      //reset edit if was clicked
      setEditDeviation(false);
      setMachineIDDeviation("");
      setParameterIDDeviation("");

      //back to show row trigger
      setAddConditionClicked(false);
      //to show Add Condition button again
      setAddConditionButton(false);
      setScehdule(!scehdule);
      setButtonActive(true);
      setButtonNextActive(true);
    } else {
      triggerSelected(false);
    }
  };

  const handleDoneStopMachineClicked = (
    stopGroup: string,
    stopCause: string,
    causeIdSelected: number,
    stopReasonID: number[],
    stopReasonNames: string[]
  ) => {
    setGroupSelected(stopGroup);
    setCauseSelected(stopCause);
    setScehdule(!scehdule);
    setSelectMachineStop(true);
    setButtonActive(true);
    setButtonNextActive(true);
    setCauseNameSelectedList(stopReasonNames);
    console.log("triggerCondition:6 ", conditionsRedux);
    const stopMachine: NewRuleInterface = {
      ruleName: ruleNameText,
      stopCause: stopCause,
      stopGroup: stopGroup,
      causeIdSelected: causeIdSelected,
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
      subTaskListCheckBox: [true],
      isActive: true,
      stopReasonID: stopReasonID,
      triggerCondition: conditionsRedux,
      amountTimePeriod: 0,
      timeIntervalPeriod: "",
      eventTypePeriod: "",
      eventValuePeriod: "",
      maintenanceType: 0,
      maintenanceEntityID: 0,
      maintenanceReason: 0,
      note: "",
    };
    //save at state
    dispatch(SET_TRIGGER_ROW(stopMachine));
  };

  const saveDeviationConditions = () => {
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

    let displayOrder = 0;
    deviationConditions.forEach((element) => {
      const strToArray = element.parameterID.split(",");
      console.log("strToArray ", strToArray);
      const nuevo = strToArray.map((i) => Number(i));
      console.log("nuevo ", nuevo);

      conditionsSend.push({
        Name: "",
        Sign: "",
        Value: element.timeInterval,
        FieldType: "",
        Condition: "",
        DisplayOrder: displayOrder,
        Interval: "",
        MachineID: Number(element.machineID),
        ParameterID: nuevo,
        TimeInterval: Number(element.timeElapsed),
      });
      displayOrder += 1;
    });
    setConditionsRedux(conditionsSend);
    console.log("conditionsSend ", conditionsSend);

    //save at state
    const TriggerDeviation: NewRuleInterface = {
      ruleName: ruleNameText,
      intervalType: "",
      eventTime: "",
      triggerDays: [],
      triggerWeekDays: [],
      stopGroup: "",
      stopCause: "",
      causeIdSelected: 0,
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
      triggerCondition: conditionsSend,
      amountTimePeriod: 0,
      timeIntervalPeriod: "",
      eventTypePeriod: "",
      eventValuePeriod: "",
      maintenanceType: 0,
      maintenanceEntityID: 0,
      maintenanceReason: 0,
      note: "",
    };
    //save at state
    dispatch(SET_TRIGGER_ROW(TriggerDeviation));
  };
  const saveTriggerConditions = () => {
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

    console.log("stopMachine conditions ", conditions);
    conditions.forEach((element) => {
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
        TimeInterval: element.TimeInterval,
      });
    });
    setConditionsRedux(conditionsSend);

    const stopMachine: NewRuleInterface = {
      ruleName: data.ruleName,
      stopCause: data.stopCause,
      stopGroup: data.stopGroup,
      causeIdSelected: data.causeIdSelected,
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
      subTaskListCheckBox: [true],
      isActive: true,
      stopReasonID: data.stopReasonID,
      triggerCondition: conditionsSend,
      amountTimePeriod: 0,
      timeIntervalPeriod: "",
      eventTypePeriod: "",
      eventValuePeriod: "",
      maintenanceType: 0,
      maintenanceEntityID: 0,
      maintenanceReason: 0,
      note: "",
    };
    console.log("stopMachine ", stopMachine);
    //save at state
    dispatch(SET_TRIGGER_ROW(stopMachine));
  };

  const handleNextButton = () => {
    if (buttonActive) {
      if (stepThree) {
        saveFromSummary();
      } else {
        if (actionRow) {
          //to save stop cause conditions only if there was
          if (conditions.length > 0 && deviationConditions.length === 0) {
            saveTriggerConditions();
          } else if (deviationConditions.length > 0) {
            // save at redux
            saveDeviationConditions();
          }

          setStepThree(true);
        } else {
          //if was edit then show action selected
          if (
            newEditData.data.ResponseList &&
            !selectChangeTrigger &&
            !selectChangeAtStop &&
            !selectChangeAction
          ) {
            console.log("newEditData.data.ResponseList");
            setStepTow(true);
            triggerSelected(false);
            setScehdule(false);
            actionSelected(true);
            setButtonActive(true);
            setButtonNextActive(true);
            getEditData();
            handleSummaryEditClicked(true);
            //to show action title
            if (data.maintenanceType !== 0) {
              setTriggerClicked(
                t(
                  translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                    .MAINTENANCE_TICKET
                )
              );
            }
          }
          //if scehdule/ stop/ at recurring was changed and action type was maintenance then
          // get data to show maintenance
          else if (
            newEditData.data.ResponseList &&
            !selectChangeAction &&
            props.dataCard.TriggerType === 3 &&
            deviationConditions.length === 0
          ) {
            console.log("get data to show maintenance");
            setStepTow(true);
            triggerSelected(false);
            setScehdule(false);
            actionSelected(true);
            setButtonActive(true);
            setButtonNextActive(true);
            getEditData();
            handleSummaryEditClicked(true);
          }
          //if was edit from summary before create trigger
          else if (data.description !== "") {
            console.log("edit from summary");
            //save trigger clicked
            if (data.subNotifyClicked !== "") {
              setTriggerClicked(
                t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
              );
            } else if (data.subMachinesIDList.length >= 1) {
              setTriggerClicked(
                t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE)
              );
            } else if (data.asigneClicked !== "") {
              setTriggerClicked(
                t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
              );
            } else {
              setTriggerClicked(
                t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
              );
            }
            setStepTow(true);
            triggerSelected(false);
            setScehdule(false);
            actionSelected(true);
            setButtonActive(true);
            setButtonNextActive(true);
            handleSummaryEditClicked(true);
          }
          //if was create new trigger then continue normally
          else if (buttonNextActive) {
            console.log("normally");
            setButtonNextActive(false);
            if (scehdule) {
              setStepTow(true);
              triggerSelected(!trigger);
              setScehdule(false);
            } else if (stepTow) {
              triggerSelected(false);
              setScehdule(false);
            }
          }
        }
      }
    }
  };

  const saveFromSummary = () => {
    //if was click save SPC edit directly from summary
    if (conditionType === 1) {
      console.log("data.triggerCondition ", data.triggerCondition);
      let conditionsSPCEdit: {
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
      //if was click save edit directly from summary
      //SPC set 8888 to send conditionType = 3 at saga
      if (data.triggerCondition[0].TimeInterval !== 8888) {
        console.log("data.triggerCondition22 ", data.triggerCondition);
        data.triggerCondition.forEach((element) => {
          let flag = false;
          conditionsSPCEdit.forEach((spc) => {
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
            conditionsSPCEdit.push({
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
        console.log("conditionsSPCEdit ", conditionsSPCEdit);

        //save ruleNameText at state if was clicked at summary
        const RuleNameText: NewRuleInterface = {
          ruleName: ruleNameText,
          stopCause: data.stopCause,
          stopGroup: data.stopGroup,
          causeIdSelected: data.causeIdSelected,
          intervalType: data.intervalType,
          eventTime: data.eventTime,
          triggerDays: data.triggerDays,
          triggerWeekDays: data.triggerWeekDays,
          subject: data.subject,
          subSubject: data.subSubject,
          description: data.description,
          levelClicked: data.levelClicked,
          asigneClicked: data.asigneClicked,
          objectClicked: data.objectClicked,
          objectIdSelected: data.objectIdSelected,
          asigneTaskToClicked: data.asigneTaskToClicked,
          timeClicked: data.timeClicked,
          priorityClicked: data.priorityClicked,
          subTaskList: data.subTaskList,
          subMachinesList: data.subMachinesList,
          subMachinesIDList: data.subMachinesIDList,
          GroupMessage: GroupMessage.DepartmentMachine,
          subNotifyClicked: data.subNotifyClicked,
          userIdSelected: data.userIdSelected,
          editClicked: false,
          subTaskListCheckBox: data.subTaskListCheckBox,
          isActive: data.isActive,
          stopReasonID: data.stopReasonID,
          triggerCondition: conditionsSPCEdit,
          amountTimePeriod: data.amountTimePeriod,
          timeIntervalPeriod: data.timeIntervalPeriod,
          eventTypePeriod: data.eventTypePeriod,
          eventValuePeriod: data.eventValuePeriod,
          maintenanceType: data.maintenanceType,
          maintenanceEntityID: data.maintenanceEntityID,
          maintenanceReason: data.maintenanceReason,
          note: data.note,
        };
        dispatch(SET_RULENAME_DATA(RuleNameText));

        dispatch(SAVE_NEW_CARD());
        props.handleClickClose();
      }
      //if was already saved as SPC array by editing spc
      else {
        const RuleNameText: NewRuleInterface = {
          ruleName: ruleNameText,
          stopCause: data.stopCause,
          stopGroup: data.stopGroup,
          causeIdSelected: data.causeIdSelected,
          intervalType: data.intervalType,
          eventTime: data.eventTime,
          triggerDays: data.triggerDays,
          triggerWeekDays: data.triggerWeekDays,
          subject: data.subject,
          subSubject: data.subSubject,
          description: data.description,
          levelClicked: data.levelClicked,
          asigneClicked: data.asigneClicked,
          objectClicked: data.objectClicked,
          objectIdSelected: data.objectIdSelected,
          asigneTaskToClicked: data.asigneTaskToClicked,
          timeClicked: data.timeClicked,
          priorityClicked: data.priorityClicked,
          subTaskList: data.subTaskList,
          subMachinesList: data.subMachinesList,
          subMachinesIDList: data.subMachinesIDList,
          GroupMessage: GroupMessage.DepartmentMachine,
          subNotifyClicked: data.subNotifyClicked,
          userIdSelected: data.userIdSelected,
          editClicked: false,
          subTaskListCheckBox: data.subTaskListCheckBox,
          isActive: data.isActive,
          stopReasonID: data.stopReasonID,
          triggerCondition: data.triggerCondition,
          amountTimePeriod: data.amountTimePeriod,
          timeIntervalPeriod: data.timeIntervalPeriod,
          eventTypePeriod: data.eventTypePeriod,
          eventValuePeriod: data.eventValuePeriod,
          maintenanceType: data.maintenanceType,
          maintenanceEntityID: data.maintenanceEntityID,
          maintenanceReason: data.maintenanceReason,
          note: data.note,
        };
        dispatch(SET_RULENAME_DATA(RuleNameText));

        dispatch(SAVE_NEW_CARD());
        props.handleClickClose();
      }
    }
    //if was click save deviation edit directly from summary
    else if (
      data.triggerCondition.length !== 0 &&
      data.triggerCondition[0].TimeInterval !== 8888
    ) {
      console.log("dev ", data.triggerCondition);
      let conditionsDevEdit: {
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
      data.triggerCondition.forEach((element) => {
        //to save first item as array to enable add another ParameterID above
        let parameter: number[] = [];
        const objectToStr = String(element.ParameterID);
        const strToArray = objectToStr.split(",");
        parameter.push(Number(strToArray[0]));
        conditionsDevEdit.push({
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
      const RuleNameText: NewRuleInterface = {
        ruleName: ruleNameText,
        stopCause: data.stopCause,
        stopGroup: data.stopGroup,
        causeIdSelected: data.causeIdSelected,
        intervalType: data.intervalType,
        eventTime: data.eventTime,
        triggerDays: data.triggerDays,
        triggerWeekDays: data.triggerWeekDays,
        subject: data.subject,
        subSubject: data.subSubject,
        description: data.description,
        levelClicked: data.levelClicked,
        asigneClicked: data.asigneClicked,
        objectClicked: data.objectClicked,
        objectIdSelected: data.objectIdSelected,
        asigneTaskToClicked: data.asigneTaskToClicked,
        timeClicked: data.timeClicked,
        priorityClicked: data.priorityClicked,
        subTaskList: data.subTaskList,
        subMachinesList: data.subMachinesList,
        subMachinesIDList: data.subMachinesIDList,
        GroupMessage: GroupMessage.DepartmentMachine,
        subNotifyClicked: data.subNotifyClicked,
        userIdSelected: data.userIdSelected,
        editClicked: false,
        subTaskListCheckBox: data.subTaskListCheckBox,
        isActive: data.isActive,
        stopReasonID: data.stopReasonID,
        triggerCondition: conditionsDevEdit,
        amountTimePeriod: data.amountTimePeriod,
        timeIntervalPeriod: data.timeIntervalPeriod,
        eventTypePeriod: data.eventTypePeriod,
        eventValuePeriod: data.eventValuePeriod,
        maintenanceType: data.maintenanceType,
        maintenanceEntityID: data.maintenanceEntityID,
        maintenanceReason: data.maintenanceReason,
        note: data.note,
      };
      dispatch(SET_RULENAME_DATA(RuleNameText));

      dispatch(SAVE_NEW_CARD());
      props.handleClickClose();
    } else {
      //save ruleNameText at state if was clicked at summary
      const RuleNameText: NewRuleInterface = {
        ruleName: ruleNameText,
        stopCause: data.stopCause,
        stopGroup: data.stopGroup,
        causeIdSelected: data.causeIdSelected,
        intervalType: data.intervalType,
        eventTime: data.eventTime,
        triggerDays: data.triggerDays,
        triggerWeekDays: data.triggerWeekDays,
        subject: data.subject,
        subSubject: data.subSubject,
        description: data.description,
        levelClicked: data.levelClicked,
        asigneClicked: data.asigneClicked,
        objectClicked: data.objectClicked,
        objectIdSelected: data.objectIdSelected,
        asigneTaskToClicked: data.asigneTaskToClicked,
        timeClicked: data.timeClicked,
        priorityClicked: data.priorityClicked,
        subTaskList: data.subTaskList,
        subMachinesList: data.subMachinesList,
        subMachinesIDList: data.subMachinesIDList,
        GroupMessage: GroupMessage.DepartmentMachine,
        subNotifyClicked: data.subNotifyClicked,
        userIdSelected: data.userIdSelected,
        editClicked: false,
        subTaskListCheckBox: data.subTaskListCheckBox,
        isActive: data.isActive,
        stopReasonID: data.stopReasonID,
        triggerCondition: data.triggerCondition,
        amountTimePeriod: data.amountTimePeriod,
        timeIntervalPeriod: data.timeIntervalPeriod,
        eventTypePeriod: data.eventTypePeriod,
        eventValuePeriod: data.eventValuePeriod,
        maintenanceType: data.maintenanceType,
        maintenanceEntityID: data.maintenanceEntityID,
        maintenanceReason: data.maintenanceReason,
        note: data.note,
      };
      dispatch(SET_RULENAME_DATA(RuleNameText));

      dispatch(SAVE_NEW_CARD());
      props.handleClickClose();
    }
  };

  const getMaintenanceData = () => {
    console.log("getMaintenanceData");
    let maintenanceType = 0;
    let maintenanceEntityID = 0;
    let maintenanceReason = 0;
    let note = "";
    if (newEditData.data.ResponseList) {
      if (
        newEditData.data.ResponseList[0].MaintenanceType !== undefined &&
        newEditData.data.ResponseList[0].MaintenanceType !== null
      ) {
        maintenanceType = newEditData.data.ResponseList[0].MaintenanceType;
        maintenanceEntityID =
          newEditData.data.ResponseList[0].MaintenanceEntityID;
        maintenanceReason = newEditData.data.ResponseList[0].MaintenanceReason;
        note = newEditData.data.ResponseList[0].MaintenanceNote;
      }
    }
    //save ruleNameText at state if was clicked at summary
    const RuleNameText: NewRuleInterface = {
      ruleName: data.ruleName,
      stopCause: data.stopCause,
      stopGroup: data.stopGroup,
      causeIdSelected: data.causeIdSelected,
      intervalType: data.intervalType,
      eventTime: data.eventTime,
      triggerDays: data.triggerDays,
      triggerWeekDays: data.triggerWeekDays,
      subject: data.subject,
      subSubject: data.subSubject,
      description: data.description,
      levelClicked: data.levelClicked,
      asigneClicked: data.asigneClicked,
      objectClicked: data.objectClicked,
      objectIdSelected: data.objectIdSelected,
      asigneTaskToClicked: data.asigneTaskToClicked,
      timeClicked: data.timeClicked,
      priorityClicked: data.priorityClicked,
      subTaskList: data.subTaskList,
      subMachinesList: data.subMachinesList,
      subMachinesIDList: data.subMachinesIDList,
      GroupMessage: GroupMessage.DepartmentMachine,
      subNotifyClicked: data.subNotifyClicked,
      userIdSelected: data.userIdSelected,
      editClicked: false,
      subTaskListCheckBox: data.subTaskListCheckBox,
      isActive: data.isActive,
      stopReasonID: data.stopReasonID,
      triggerCondition: data.triggerCondition,
      amountTimePeriod: data.amountTimePeriod,
      timeIntervalPeriod: data.timeIntervalPeriod,
      eventTypePeriod: data.eventTypePeriod,
      eventValuePeriod: data.eventValuePeriod,
      maintenanceType: maintenanceType,
      maintenanceEntityID: maintenanceEntityID,
      maintenanceReason: maintenanceReason,
      note: note,
    };
    dispatch(SET_DATA(RuleNameText));
  };
  const getEditData = () => {
    if (newEditData.data.ResponseList) {
      //save trigger clicked
      if (props.dataCard.NotificationType === 7) {
        setTriggerClicked(
          t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
        );
      } else if (props.dataCard.NotificationType === 2) {
        setTriggerClicked(t(translations.RulesContainer.CREATE_RULE.BOOK_CALL));
      } else if (props.dataCard.NotificationType === 1) {
        setTriggerClicked(
          t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE)
        );
      } else if (
        props.dataCard.NotificationType === null &&
        props.dataCard.TaskModuleTriggerID.length > 0
      ) {
        setTriggerClicked(
          t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
        );
      }
      //if was maintenance then display it but not for deviation / SPC
      else if (props.dataCard.TriggerType === 3) {
        //to show action title
        setTriggerClicked(
          t(
            translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
              .MAINTENANCE_TICKET
          )
        );
        //get maintenance data again if was deleted when change trigger
        getMaintenanceData();
      }
    }
  };

  const handleBackButton = () => {
    if (causeSelected !== "" && selectChangeAtStop) {
      setSelectMachineStop(true);
    }

    if (buttonActive) {
      if (stepThree) {
        setStepThree(false);
      } else {
        if (actionRow) {
          actionSelected(true);
          setButtonActive(false);
          setButtonNextActive(false);
        } else {
          setScehdule(true);
          setStepTow(false);
          triggerSelected(!trigger);
          setButtonNextActive(true);
        }
      }
    }
  };

  const handleSummaryEditClicked = (selectAction: boolean) => {
    console.log("data handleSummaryEditClicked", data);
    let causeSelectedCheck = causeSelected;
    if (data.triggerCondition.length !== 0) {
      if (data.triggerCondition[0].MachineID !== 0) {
        setCauseSelected("");
        causeSelectedCheck = "";

        //get machine name and parameter name for deviation rows
        //if was edit from created card, if not it's already have the data
        if (deviationConditions.length === 0) {
          data.triggerCondition.forEach((condition) => {
            let machine = "";
            let parameter = "";
            departmentMachine.forEach((element) => {
              if (element.value === Number(condition.MachineID)) {
                //console.log("element machine", element);
                machine = element.label;
              }
            });

            Object.keys(
              parametersMachines.data.ResponseDictionaryValues ?? {}
            ).forEach((key) => {
              const array =
                parametersMachines?.data?.ResponseDictionaryValues[key];
              (array || []).forEach((element: any) => {
                if (element.id === Number(condition.ParameterID)) {
                  parameter = element.name;
                  console.log("element parameter", element);
                }
              });
            });
            if (conditionType === 0) {
              deviationConditions.push({
                machineID: condition.MachineID.toString(),
                parameterID: condition.ParameterID.toString(),
                machine: machine,
                parameter: parameter,
                timeInterval: condition.Value,
                timeElapsed: condition.TimeInterval.toString(),
              });
            }
            //SPC
            else if (conditionType === 1) {
              deviationConditions.push({
                machineID: condition.MachineID.toString(),
                parameterID: condition.ParameterID.toString(),
                machine: machine,
                parameter: parameter,
                timeInterval: condition.Value,
                timeElapsed: "8888",
              });
            }
          });
        }
        //check all conditions to add all parameterID and parameter name for machineID was selected
        if (conditionType === 1) {
          let conditionsSpc: {
            machineID: string;
            parameterID: string;
            machine: string;
            parameter: string;
            timeInterval: string;
            timeElapsed: string;
          }[] = [];
          deviationConditions.forEach((condition) => {
            let flag = false;
            conditionsSpc.forEach((spc) => {
              //if was already machineID as item then add all his parameterID and parameter name
              if (spc.machineID === condition.machineID) {
                flag = true;
                spc.parameter = spc.parameter + "," + condition.parameter;
                spc.parameterID = spc.parameterID + "," + condition.parameterID;
              }
            });
            //if it new machineID then add as new item
            if (!flag) {
              conditionsSpc.push(condition);
            }
          });
          setDeviationConditions(conditionsSpc);
        } else {
          setDeviationConditions(deviationConditions);
        }
      }
    }

    if (selectAction) {
      handleEditActionRowClicked();
    } else {
      setStepThree(false);
      setStepTow(false);
      setActionRow(false);
      console.log("causeSelectedCheck", causeSelectedCheck);
      console.log("data.stopGroup", data.stopGroup);
      //show stop cause
      if (
        causeSelectedCheck !== "" ||
        (data.stopGroup !== "" && data.stopGroup !== null)
      ) {
        handleEditClicked(true, false);
      }
      //show deviation rows
      else if (
        data.triggerCondition.length !== 0 &&
        data.triggerCondition[0].MachineID !== 0
      ) {
        if (data.triggerCondition[0].MachineID !== 0) {
          handleEditClicked(false, true);
          handleShowDeviationClicked();
        }
      }
      //show scheduled
      else {
        handleEditClicked(false, false);
      }
    }
  };

  const handleEditClicked = (selectStop: boolean, deviation: boolean) => {
    setScehdule(false);
    triggerSelected(true);
    setButtonActive(false);
    setButtonNextActive(false);
    console.log("amountTimePeriod ", amountTimePeriod);
    console.log("data ", data);
    console.log("selectStop ", selectStop);
    if (deviation) {
      //SPC
      if (conditionType === 1) {
        setAddConditionSelected(addSPCList[0].label);
        setTriggerClicked(triggerList[5].label);
      } else {
        setTriggerClicked(triggerList[4].label);
      }
    } else if (selectStop) {
      setTriggerClicked(triggerList[3].label);
    } else if (amountTimePeriod !== "") {
      setTriggerClicked(triggerList[2].label);
      setEditPeriod(true);
    } else {
      setTriggerClicked(triggerList[1].label);
    }
  };

  const handleEditActionRowClicked = () => {
    actionSelected(true);
    setButtonActive(false);
    setButtonNextActive(false);
    setStepThree(false);
  };

  const handleDeleteClicked = () => {
    setScehdule(false);
    triggerSelected(false);
    actionSelected(false);
    setButtonActive(false);
    setButtonNextActive(false);
    setCauseSelected("");

    //reset at recurring
    setAmountTimePeriod("");
    setTimeIntervalPeriod("");
    setEventTypePeriod("");
    setEventValuePeriod("");
    setEditPeriod(false);

    //remove conditions
    setAddConditionClicked(false);
    setConditions([]);
    setAddConditionsList(addConditionsListOrigen);
    setAddConditionButton(false);
    setSelectMachineStop(false);
    setAddConditionSelected("");
    setAddConditionSelectedValue(0);
    // remove from state
    const TriggerDate: NewRuleInterface = {
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
    //save at state
    dispatch(SET_TRIGGER_ROW(TriggerDate));
  };

  const handleDeleteActionRowClicked = () => {
    setActionRow(false);
    setStepThree(false);
    setButtonActive(false);
    setButtonNextActive(false);

    cleanOldData();
  };

  const handleDoneActionClicked = useCallback(
    (
      subject: string,
      subSubject: number,
      userIdSelected: number,
      description: string,
      level: string,
      asigne: string,
      object: string,
      objectIdSelected: number,
      asigneTask: string,
      time: string,
      priority: string,
      subTaskList: string[],
      subMachinesList: string[],
      subMachinesIDList: number[],
      subNotifyClicked: string,
      subTaskListCheckBox: boolean[],
      maintenanceType: number,
      maintenanceEntityID: number,
      maintenanceReason: number,
      note: string
    ) => {
      console.log(
        "CreateNewRule ",
        maintenanceType,
        maintenanceEntityID,
        maintenanceReason,
        note
      );
      setMaintenanceType(maintenanceType);
      setMaintenanceEntityID(maintenanceEntityID);
      setMaintenanceReason(maintenanceReason);

      console.log("userIdSelected3 ", userIdSelected);
      console.log("subject ", subject);
      console.log("subSubject ", subSubject);
      //show action row
      setActionRow(true);
      //hide selectAction
      actionSelected(false);

      //to send description to action row
      setDescription(description);
      setSubject(subject);
      //to enable buttons
      setButtonActive(true);
      setButtonNextActive(true);

      //save at state
      const ActionRow: NewRuleInterface = {
        ruleName: ruleNameText,
        subject: subject,
        subSubject: subSubject,
        description: description,
        levelClicked: level,
        asigneClicked: asigne,
        objectClicked: object,
        objectIdSelected: objectIdSelected,
        asigneTaskToClicked: asigneTask,
        timeClicked: time,
        priorityClicked: priority,
        subTaskList: subTaskList,
        subMachinesList: subMachinesList,
        subMachinesIDList: subMachinesIDList,
        GroupMessage: GroupMessage.DepartmentMachine,
        subNotifyClicked: subNotifyClicked,
        stopCause: "",
        stopGroup: "",
        causeIdSelected: 0,
        intervalType: "",
        eventTime: "",
        triggerDays: [],
        triggerWeekDays: [],
        userIdSelected: userIdSelected,
        subTaskListCheckBox: subTaskListCheckBox,
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
        maintenanceType: maintenanceType,
        maintenanceEntityID: maintenanceEntityID,
        maintenanceReason: maintenanceReason,
        note: note,
      };
      dispatch(SET_ACTION_ROW(ActionRow));
    },
    [dispatch, ruleNameText]
  );

  const cleanOldData = () => {
    // clean old data remove from state
    const ActionRow: NewRuleInterface = {
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
    //save at state
    dispatch(SET_ACTION_ROW(ActionRow));
  };

  const handleCancelActionClicked = () => {
    //if was data at state then back to row
    if (
      (data.description !== "" && data.description !== undefined) ||
      data.maintenanceType !== 0
    ) {
      handleDoneActionClicked(
        data.subject,
        data.subSubject,
        data.userIdSelected,
        data.description,
        data.levelClicked,
        data.asigneClicked,
        data.objectClicked,
        data.objectIdSelected,
        data.asigneTaskToClicked,
        data.timeClicked,
        data.priorityClicked,
        data.subTaskList,
        data.subMachinesList,
        data.subMachinesIDList,
        data.subNotifyClicked,
        data.subTaskListCheckBox,
        data.maintenanceType,
        data.maintenanceEntityID,
        data.maintenanceReason,
        data.note
      );
    } else {
      //period
      if (data.stopCause === "") {
        setTriggerClicked(triggerList[1].label);
      }
      //event
      else {
        setTriggerClicked(triggerList[3].label);
      }
      actionSelected(false);
      setActionRow(false);
      //re enable back button
      setButtonActive(true);
      if (!selectChangeTrigger && !selectChangeAtStop && !selectChangeAction) {
        setButtonNextActive(true);
      } else {
        setButtonNextActive(false);
      }
    }
  };

  const handleClickChangeAction = () => {
    console.log("deviationConditions.length ", deviationConditions.length);
    if (causeSelected !== "" || deviationConditions.length !== 0) {
      setSelectChangeAtStop(true);
    }
    setSelectChangeAction(true);
    handleCancelActionClicked();
    handleDeleteActionRowClicked();
  };

  const handleClickChangeTrigger = () => {
    //handleClickTriggerCancel();
    handleDeleteClicked();
    setSelectMachineStop(false);

    console.log("CauseSelected ", causeSelected);
    console.log("TypeSelected ", typeSelected);
    console.log("machineDeviation ", machineDeviation);
    if (
      causeSelected !== "" ||
      typeSelected !== "" ||
      machineDeviation !== "" ||
      amountTimePeriod !== ""
    ) {
      setSelectChangeTrigger(true);
    }

    //reset deviation
    setMachineDeviation("");
    setParameterDeviation("");
    setDurationDeviation("");
    setElapsedDeviation("");
    setMachineIDDeviation("");
    setParameterIDDeviation("");
    setEditDeviation(false);
    setMachineDeviation("");

    //reset spc and deviation conditions
    setDeviationConditions([]);
    setConditionType(0);

    // reset stop machine
    setGroupSelected("");
    setCauseSelected("");
    setButtonActive(false);
    setButtonNextActive(false);
    setCauseNameSelectedList([""]);

    // reset schdual
    setTimeSelected("");
    setDaysSelected([""]);
    setTypeSelected("");
    setWeekDaysSelected([""]);

    //reset every period of time
    setEditPeriod(false);
    setAmountTimePeriod("");
    setTimeIntervalPeriod("");
    setEventValuePeriod("");
    setEventTypePeriod("");
  };

  const handleClickTriggerCancel = () => {
    //if was data at state then back to row
    if (
      data.stopGroup !== "" &&
      data.stopGroup !== undefined &&
      data.stopGroup !== null
    ) {
      handleDoneStopMachineClicked(
        data.stopGroup,
        data.stopCause,
        data.causeIdSelected,
        data.stopReasonID,
        causeNameSelectedList
      );
    } else if (data.intervalType !== "" && data.intervalType !== undefined) {
      handleDoneTriggerDateClicked(
        data.intervalType,
        data.eventTime,
        data.triggerDays,
        data.triggerWeekDays
      );
    } else {
      triggerSelected(false);
    }
  };

  const handleAddDeviationButton = () => {
    setAddConditionButton(true);
  };

  const handleAddConditionButton = () => {
    setAddConditionButton(true);
  };

  const handleAddConditionDropDown = (item: string, index: number) => {
    setButtonNextActive(false);
    //save add condition selected
    setAddConditionSelected(item);
    setAddConditionSelectedValue(index);

    //get indication to show AddCondition component
    setAddConditionClicked(true);

    if (item === addDeviationList[0].label) {
      setTriggerClicked(triggerList[4].label);
      setScehdule(!scehdule);
    } else if (item === addSPCList[0].label) {
      setTriggerClicked(triggerList[5].label);
      setScehdule(!scehdule);
    }
  };

  const handleDoneAddDurationCondition = (
    duration: string,
    sign: string,
    interval: string
  ) => {
    if (conditions.length === 0) {
      conditions.push({
        Name: "Duration",
        Sign: sign,
        Value: duration,
        FieldType: "num",
        Condition: "",
        DisplayOrder: conditions.length + 1,
        Interval: interval,
        MachineNames: "",
        MachineID: 0,
        ParameterID: [0],
        TimeInterval: 0,
      });
    } else {
      conditions.forEach((element) => {
        element.Condition = "and";
      });

      conditions.push({
        Name: "Duration",
        Sign: sign,
        Value: duration,
        FieldType: "num",
        Condition: "",
        DisplayOrder: conditions.length + 1,
        Interval: interval,
        MachineNames: "",
        MachineID: 0,
        ParameterID: [0],
        TimeInterval: 0,
      });
    }

    setConditions(conditions);

    //back to show row trigger
    setAddConditionClicked(false);
    //back to show add condition
    setAddConditionButton(false);

    //remove condition option
    // addConditionsList.forEach((element) => {
    //   if (element.label === addConditionSelected) {
    //     addConditionsList.splice(addConditionsList.indexOf(element), 1);
    //   }
    // });

    setAddConditionsList((prevState) =>
      prevState.filter((elem) => elem.label !== addConditionSelected)
    );
    // setAddConditionsList(addConditionsList);
    setAddConditionSelected("");
    setAddConditionSelectedValue(0);

    setButtonNextActive(true);
  };

  const handleCancelDurationCondition = () => {
    setAddConditionClicked(false);
    setButtonNextActive(true);
    setAddConditionSelected("");
    setAddConditionSelectedValue(0);
    console.log("conditions.length", conditions.length);
    console.log("triggerCondition ", data.triggerCondition);
    if (data.triggerCondition.length !== 0) {
      data.triggerCondition.forEach((element) => {
        //get machine name from machineIDs
        let machineNames: string[] = [];
        /*
        if (element.Name === "MachineID") {
          let str = element.Value.replace("(", "");
          str = str.replace(")", "");
          let machineIDSelected = str.split(",");

          setMachinesIdCondition(machineIDSelected);

          groups.data.DepartmentMachine?.forEach((elem) => {
            machineIDSelected.forEach((machineID) => {
              elem.Value.forEach((elem2) => {
                if (machineID === elem2.Id.toString()) {
                  machineNames.push(elem2.MachineLName);
                }
              });
            });
          });
        }
*/
        let interval = "";
        if (element.Name === "Duration") {
          if (element.Interval !== null) {
            interval = element.Interval;
          } else {
            interval = element.Value + " hours";
          }

          let item = {
            Name: element.Name,
            Sign: element.Sign,
            Value: element.Value,
            FieldType: element.FieldType,
            Condition: element.Condition,
            DisplayOrder: element.DisplayOrder,
            Interval: interval,
            MachineNames: machineNames.toString(),
            MachineID: element.MachineID,
            ParameterID: element.ParameterID,
            TimeInterval: element.TimeInterval,
          };
          conditions.push(item);
        }
      });
      setConditions(conditions);
    }
  };

  const handleCancelMachineCondition = () => {
    setAddConditionClicked(false);
    setButtonNextActive(true);
    setAddConditionSelected("");
    setAddConditionSelectedValue(0);

    if (data.triggerCondition.length !== 0) {
      data.triggerCondition.forEach((element) => {
        //get machine name from machineIDs
        let machineNames: string[] = [];

        if (element.Name === "MachineID") {
          let str = element.Value.replace("(", "");
          str = str.replace(")", "");
          let machineIDSelected = str.split(",");

          setMachinesIdCondition(machineIDSelected);

          groups.data.DepartmentMachine?.forEach((elem) => {
            machineIDSelected.forEach((machineID) => {
              elem.Value.forEach((elem2) => {
                if (machineID === elem2.Id.toString()) {
                  machineNames.push(elem2.MachineLName);
                }
              });
            });
          });

          let item = {
            Name: element.Name,
            Sign: element.Sign,
            Value: element.Value,
            FieldType: element.FieldType,
            Condition: element.Condition,
            DisplayOrder: element.DisplayOrder,
            Interval: "",
            MachineNames: machineNames.toString(),
            MachineID: element.MachineID,
            ParameterID: element.ParameterID,
            TimeInterval: element.TimeInterval,
          };
          conditions.push(item);
        }
      });
      setConditions(conditions);
    }
  };

  const handleDoneAddMachineCondition = (
    machinesId: string,
    machineNames: string
  ) => {
    if (conditions.length === 0) {
      conditions.push({
        Name: "MachineID",
        Sign: "in",
        Value: machinesId,
        FieldType: "num",
        Condition: "",
        DisplayOrder: conditions.length + 1,
        Interval: "",
        MachineNames: machineNames,
        MachineID: 0,
        ParameterID: [0],
        TimeInterval: 0,
      });
    } else {
      conditions.forEach((element) => {
        element.Condition = "and";
      });

      conditions.push({
        Name: "MachineID",
        Sign: "in",
        Value: machinesId,
        FieldType: "num",
        Condition: "",
        DisplayOrder: conditions.length + 1,
        Interval: "",
        MachineNames: machineNames,
        MachineID: 0,
        ParameterID: [0],
        TimeInterval: 0,
      });
    }

    setConditions(conditions);

    //back to show row trigger
    setAddConditionClicked(false);
    //back to show add condition
    setAddConditionButton(false);

    //remove condition option
    // addConditionsList.forEach((element) => {
    //   if (element.label === addConditionSelected) {
    //     addConditionsList.splice(addConditionsList.indexOf(element), 1);
    //   }
    // });

    setAddConditionsList((prevState) =>
      prevState.filter((elem) => elem.label !== addConditionSelected)
    );
    // setAddConditionsList(addConditionsList);
    setAddConditionSelected("");
    setAddConditionSelectedValue(0);

    setButtonNextActive(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditConditionSummary = (name: string) => {
    handleSummaryEditClicked(false);
    //fix crash
    //addConditionsList[0] = addConditionsListOrigen[0];
  };

  function ConditionRowList() {
    const handleEditCondition = (name: string) => {
      //to save stop cause conditions only if there was
      if (conditions.length > 0 && deviationConditions.length === 0) {
        saveTriggerConditions();
      }
      //show edit
      setAddConditionClicked(true);
      if (name === "Duration") {
        setAddConditionSelected(addConditionsListOrigen[1].label);
      } else if (name === "MachineID") {
        setAddConditionSelected(addConditionsListOrigen[0].label);
      }

      //remove condition to show the new one
      conditions.forEach((element) => {
        if (element.Name === "MachineID") {
          let str = element.Value.replace("(", "");
          str = str.replace(")", "");
          let machineIDSelected = str.split(",");

          setMachinesIdCondition(machineIDSelected);
        } else if (element.Name === "Duration") {
          setRadioButtonCondition(element.Sign);
          setInputTextCondition(element.Value);
          setIntervalCondition(element.Interval);
        }
        if (element.Name === name) {
          conditions.splice(conditions.indexOf(element), 1);
        }
      });

      setConditions(conditions);
    };

    const handleClickDeleteCondition = (name: string) => {
      conditions.forEach((element) => {
        if (element.Name === name) {
          conditions.splice(conditions.indexOf(element), 1);
        }
      });

      setConditions(conditions);

      //add selected option again
      if (name === "Duration") {
        //addConditionsList.push(addConditionsListOrigen[1]);
        setAddConditionsList((prevState) => [
          ...prevState,
          addConditionsListOrigen[1],
        ]);
      } else if (name === "MachineID") {
        //addConditionsList.push(addConditionsListOrigen[0]);
        setAddConditionsList((prevState) => [
          ...prevState,
          addConditionsListOrigen[0],
        ]);
      }
      console.log("addConditionsList ", addConditionsList);
      //setAddConditionsList(addConditionsList);
      setAddConditionSelected("");
      setAddConditionSelectedValue(0);

      //back to show row trigger
      setAddConditionClicked(false);
      //back to show add condition
      setAddConditionButton(false);
      //to render and show after delete.
      setRefresh(!refresh);
    };

    //only if there is more than one index because the first on is empty
    if (conditions.length > 0) {
      const listConditions = conditions.map((task) => (
        <div key={task.Condition}>
          <AddCondition>
            {t(translations.RulesContainer.CREATE_RULE.AND)}
          </AddCondition>
          <ConditionRow
            key={nanoid()}
            id={task.Name}
            selectedCondition={addConditionSelected}
            time={task.Value}
            sign={task.Sign === ">" ? "over" : "under"}
            typeInterval={task.Interval}
            machines={task.MachineNames}
            handleEditClicked={(name: any) => {
              handleEditCondition(name);
            }}
            handleDeleteClicked={(name: any) => {
              handleClickDeleteCondition(name);
            }}
          />
        </div>
      ));

      return <div>{listConditions}</div>;
    }
  }

  function DeviationConditionRowList() {
    const handleEditDeviationCondition = (taskEdit: {
      machineID: string;
      parameterID: string;
      machine: string;
      parameter: string;
      timeInterval: string;
      timeElapsed: string;
    }) => {
      console.log("taskEdit ", taskEdit);

      //remove condition to show the new one
      deviationConditions.forEach((element) => {
        if (element === taskEdit) {
          console.log("taskEdit ", taskEdit);
          //save old data to use when click cancel to add again
          setMachineDeviation(element.machine);
          setParameterDeviation(element.parameter);
          setDurationDeviation(element.timeInterval);
          setElapsedDeviation(element.timeElapsed);
          setMachineIDDeviation(element.machineID);
          setParameterIDDeviation(element.parameterID);
          setEditDeviation(true);

          //show edit
          if (taskEdit.timeElapsed === "8888") {
            setTriggerClicked(triggerList[5].label);
          } else {
            setTriggerClicked(triggerList[4].label);
          }
          setScehdule(!scehdule);

          //remove condition
          setDeviationConditions((prevState) =>
            prevState.filter((elem) => elem !== taskEdit)
          );
        }
      });

      console.log("triggerClicked ", triggerClicked);
      //to show ParameterDeviation / SpcPredication component
      if (taskEdit.timeElapsed === "8888") {
        setAddConditionSelected(addSPCList[0].label);
      } else {
        setAddConditionSelected(addDeviationList[0].label);
      }
    };

    const handleClickDeleteDeviationCondition = (taskDelete: {
      machineID: string;
      parameterID: string;
      machine: string;
      parameter: string;
      timeInterval: string;
      timeElapsed: string;
    }) => {
      console.log("machine delete ", taskDelete);

      //remove deviation
      setDeviationConditions((prevState) =>
        prevState.filter((elem) => elem !== taskDelete)
      );

      //if was click change trigger from schdual and the add one deviation and delete it
      if (deviationConditions.length === 1) {
        handleDeleteClicked();
        setMachineDeviation("");
      }
      /*
      deviationConditions.forEach((element) => {
        if (element.machineID === machine) {
          deviationConditions.splice(deviationConditions.indexOf(element), 1);
        }
      });
      setDeviationConditions(deviationConditions);
       */

      //if all row was removed then back to add trigger
      if (deviationConditions.length === 0) {
        setScehdule(false);
        triggerSelected(false);
        actionSelected(false);
        setButtonActive(false);
        setButtonNextActive(false);

        //remove deviation
        setMachineDeviation("");
        setParameterDeviation("");
        setDurationDeviation("");
        setElapsedDeviation("");
      }

      // save at redux
      saveDeviationConditions();
      //to render and show after delete.
      setRefresh(!refresh);
    };

    //only if there is more than one index because the first on is empty
    if (deviationConditions.length > 0) {
      const listDeviationConditions = deviationConditions.map((task) => (
        <div key={task.machineID}>
          <DeviationConditionRow
            key={task.machineID}
            id={task}
            machineDeviation={task.machine}
            parameterDeviation={task.parameter}
            timeIntervalDeviation={task.timeInterval}
            timeElapsedDeviation={task.timeElapsed}
            handleEditClicked={(taskEdit: any) => {
              handleEditDeviationCondition(taskEdit);
            }}
            handleDeleteClicked={(taskDelete: any) => {
              handleClickDeleteDeviationCondition(taskDelete);
            }}
          />
          {deviationConditions.indexOf(task) !==
          deviationConditions.length - 1 ? (
            <AddCondition>
              {t(translations.RulesContainer.CREATE_RULE.OR)}
            </AddCondition>
          ) : (
            <></>
          )}
        </div>
      ));

      return <div>{listDeviationConditions}</div>;
    }
  }

  const [RuleNameInput, setRuleNameInput] = useState(true);
  const RuleNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (RuleNameInputRef as MutableRefObject<HTMLInputElement>).current.focus();
  }, [RuleNameInput, RuleNameInputRef]);

  const [Width, setWidth] = useState(120);

  useEffect(() => {
    let len: number = ruleNameText.length;
    if (ruleNameText === "") {
      len = t(translations.RulesContainer.CREATE_RULE.RULE_NAME).length;
    }
    setWidth(len < 10 ? 10 : len > 30 ? 30 : len);
  }, [ruleNameText]);

  return (
    <CreateRule>
      <HeaderContainer>
        {" "}
        <Header>
          <CloseIcon
            style={{ fontSize: "1.5em" }}
            onClick={props.handleClickClose}
          />
          <RuleNameContainer>
            <InputRuleName
              Width={Width}
              type="text"
              placeholder={t(translations.RulesContainer.CREATE_RULE.RULE_NAME)}
              disabled={RuleNameInput}
              defaultValue={ruleNameText}
              ref={RuleNameInputRef}
              maxLength={30}
              onChange={(event) => setRuleNameText(event.target.value)}
            />
            <EditIcon
              onClick={() => {
                setRuleNameInput(!RuleNameInput);
              }}
            />
          </RuleNameContainer>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TriggerContainer>
              <TriggerLine stepTow={stepTow} stepThree={stepThree} />
              <div>
                {stepThree ? (
                  <TriggerTitle stepTow={stepTow} stepThree={stepThree}>
                    {t(translations.RulesContainer.CREATE_RULE.RULE_SUMMARY)}
                  </TriggerTitle>
                ) : (
                  <div>
                    {stepTow ? (
                      <TriggerTitle stepTow={stepTow} stepThree={stepThree}>
                        {t(translations.RulesContainer.CREATE_RULE.ACTIONS)}
                      </TriggerTitle>
                    ) : (
                      <TriggerTitle stepTow={stepTow} stepThree={stepThree}>
                        {t(
                          translations.RulesContainer.CREATE_RULE.DEFINE_TRIGGER
                        )}
                      </TriggerTitle>
                    )}
                  </div>
                )}
              </div>
            </TriggerContainer>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {stepThree ? (
                <StepsTitle>
                  {t(translations.RulesContainer.CREATE_RULE.STEP)} 3/3
                </StepsTitle>
              ) : (
                <StepsTitle>
                  {" "}
                  {t(translations.RulesContainer.CREATE_RULE.STEP)}{" "}
                  {stepTow ? 2 : 1}/3{" "}
                </StepsTitle>
              )}

              <StepsContainer>
                <Step currentStep={true} />
                <Step currentStep={stepTow || stepThree} />
                <Step currentStep={stepThree} />
              </StepsContainer>
            </div>
          </div>
        </Header>
      </HeaderContainer>

      <Body>
        {action ? (
          <></>
        ) : (
          <TriggersContainer>
            {scehdule ? (
              <div style={{ height: "100%" }}>
                {addConditionClicked ? (
                  <div style={{ height: "94%" }}>
                    {addConditionSelected ===
                    addConditionsListOrigen[1].label ? (
                      <AddDurationCondition
                        conditionSelected={addConditionSelected}
                        handleDoneAddDurationCondition={(
                          duration: any,
                          sign: any,
                          interval: any
                        ) => {
                          handleDoneAddDurationCondition(
                            duration,
                            sign,
                            interval
                          );
                        }}
                        handleClickCancel={() =>
                          handleCancelDurationCondition()
                        }
                        radioButton={radioButtonCondition}
                        inputText={inputTextCondition}
                        interval={intervalCondition}
                      />
                    ) : (
                      <AddMachineCondition
                        conditionSelected={addConditionSelected}
                        handleDoneAddMachineCondition={(
                          machinesID: any,
                          machineNames: any
                        ) => {
                          handleDoneAddMachineCondition(
                            machinesID,
                            machineNames
                          );
                        }}
                        handleClickCancel={() => handleCancelMachineCondition()}
                        machineIdSelected={machinesIdCondition}
                      />
                    )}
                  </div>
                ) : (
                  <TriggerConditionsRowContainer>
                    {deviationConditions.length === 0 ? (
                      <ScehduleRow
                        actionRow={false}
                        selectMachineStop={selectMachineStop}
                        group={groupSelected}
                        cause={causeSelected}
                        days={
                          daysSelected.toString() + weekDaysSelected.toString()
                        }
                        time={timeSelected}
                        typeInterval={typeSelected}
                        causeNameSelectedList={causeNameSelectedList.toString()}
                        amountTimePeriod={amountTimePeriod}
                        timeIntervalPeriod={timeIntervalPeriod}
                        eventValuePeriod={eventValuePeriod}
                        handleEditClicked={(selectStop, deviation) =>
                          handleEditClicked(selectStop, deviation)
                        }
                        handleDeleteClicked={() => handleDeleteClicked()}
                      />
                    ) : (
                      DeviationConditionRowList()
                    )}
                    {conditions.length !== 0 &&
                    deviationConditions.length === 0 ? (
                      ConditionRowList()
                    ) : (
                      <></>
                    )}
                    {machineDeviation !== "" ? (
                      <AddConditionContainer
                        visible={machineDeviation !== ""}
                        clicked={addConditionButton}
                        onClick={() => handleAddDeviationButton()}
                      >
                        {addConditionButton ? (
                          <AddConditionButton clicked={addConditionButton}>
                            {t(translations.RulesContainer.CREATE_RULE.OR)}
                          </AddConditionButton>
                        ) : (
                          <AddConditionButton clicked={addConditionButton}>
                            <AddIcon />{" "}
                            {t(
                              translations.RulesContainer.CREATE_RULE
                                .ADD_SPC_PARAMETER
                            )}
                          </AddConditionButton>
                        )}
                      </AddConditionContainer>
                    ) : (
                      <></>
                    )}
                    {selectMachineStop && addConditionsList.length !== 0 ? (
                      <AddConditionContainer
                        visible={
                          selectMachineStop && addConditionsList.length !== 0
                        }
                        clicked={addConditionButton}
                        onClick={() => handleAddConditionButton()}
                      >
                        {addConditionButton ? (
                          <AddConditionButton clicked={addConditionButton}>
                            {t(translations.RulesContainer.CREATE_RULE.AND)}
                          </AddConditionButton>
                        ) : (
                          <AddConditionButton clicked={addConditionButton}>
                            <AddIcon />{" "}
                            {t(
                              translations.RulesContainer.CREATE_RULE
                                .ADD_CONDITION
                            )}
                          </AddConditionButton>
                        )}
                      </AddConditionContainer>
                    ) : (
                      <></>
                    )}

                    <ConditionDropDown visible={addConditionButton}>
                      {t(
                        translations.RulesContainer.CREATE_RULE.SELECT_TRIGGER2
                      )}
                      <SingleSelect
                        placeholder={addConditionsPlaceHolder[0].label}
                        required={false}
                        selectedItem={
                          addConditionSelected !== ""
                            ? {
                                label: addConditionSelected,
                                value: addConditionSelectedValue,
                              }
                            : undefined
                        }
                        onSelect={function (
                          item:
                            | {
                                value: number;
                                label: string;
                              }
                            | undefined
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                        ): void {
                          if (item !== undefined) {
                            handleAddConditionDropDown(item.label, item.value);
                          } else {
                            setAddConditionSelected("");
                            setAddConditionSelectedValue(0);
                          }
                        }}
                        TitleText={""}
                        items={
                          machineDeviation === ""
                            ? addConditionsList
                            : triggerClicked === triggerList[4].label
                            ? addDeviationList
                            : triggerClicked === triggerList[5].label
                            ? addSPCList
                            : []
                        }
                        mode={DropDownMode.selectable}
                        searchable={false}
                      />
                    </ConditionDropDown>
                  </TriggerConditionsRowContainer>
                )}
              </div>
            ) : (
              <div style={{ height: "100%" }}>
                {trigger ? (
                  <div style={{ height: "94%" }}>
                    {triggerClicked === triggerList[1].label ? (
                      <SelectTriggerDate
                        triggerSelected={triggerClicked}
                        handleClickCancel={() => handleClickTriggerCancel()}
                        handleClickDone={(type, time, days, weekDays) =>
                          handleDoneTriggerDateClicked(
                            type,
                            time,
                            days,
                            weekDays
                          )
                        }
                        handleClickChangeTrigger={() =>
                          handleClickChangeTrigger()
                        }
                      />
                    ) : triggerClicked === triggerList[3].label ? (
                      <div style={{ height: "100%" }}>
                        <div style={{ height: "34px" }}></div>
                        <SelectTriggerStopMachine
                          triggerSelected={triggerClicked}
                          handleClickCancel={() => handleClickTriggerCancel()}
                          handleDoneStopMachineClicked={(
                            stopGroup,
                            stopCause,
                            causeIdSelected,
                            stopReasonID,
                            stopReasonNames
                          ) =>
                            handleDoneStopMachineClicked(
                              stopGroup,
                              stopCause,
                              causeIdSelected,
                              stopReasonID,
                              stopReasonNames
                            )
                          }
                          handleClickChangeTrigger={() =>
                            handleClickChangeTrigger()
                          }
                        />
                      </div>
                    ) : triggerClicked === triggerList[4].label ? (
                      <ParameterDeviation
                        addAnotherOne={
                          addConditionSelected === addDeviationList[0].label
                        }
                        editRow={editDeviation}
                        triggerSelected={triggerClicked}
                        machineIDEdit={machineIDDeviation}
                        parameterIDEdit={parameterIDDeviation}
                        timeIntervalEdit={durationDeviation}
                        timeElapsedEdit={elapsedDeviation}
                        handleDoneActionClicked={(
                          machineID,
                          parameterID,
                          machine,
                          parameter,
                          timeInterval,
                          timeElapsed
                        ) => {
                          handleDoneDeviationClicked(
                            machineID,
                            parameterID,
                            machine,
                            parameter,
                            timeInterval,
                            timeElapsed
                          );
                        }}
                        handleClickCancel={() => handleCancelDeviationClicked()}
                        handleClickChangeDeviation={() => {
                          handleClickChangeTrigger();
                        }}
                      />
                    ) : triggerClicked === triggerList[5].label ? (
                      <SpcPredication
                        addAnotherOne={
                          addConditionSelected === addSPCList[0].label
                        }
                        editRow={editDeviation}
                        triggerSelected={triggerClicked}
                        machineIDEdit={machineIDDeviation}
                        parameterIDEdit={parameterIDDeviation}
                        timeIntervalEdit={durationDeviation}
                        handleDoneActionClicked={(
                          machineID,
                          parameterID,
                          machine,
                          parameter
                        ) => {
                          handleDoneDeviationClicked(
                            machineID,
                            parameterID,
                            machine,
                            parameter,
                            "",
                            "8888"
                          );
                        }}
                        handleClickCancel={() => handleCancelDeviationClicked()}
                        handleClickChangeDeviation={() => {
                          handleClickChangeTrigger();
                        }}
                      />
                    ) : (
                      triggerClicked === triggerList[2].label && (
                        <EveryPeriodOfTime
                          editRow={editPeriod}
                          triggerSelected={triggerClicked}
                          amountTimeEdit={amountTimePeriod}
                          timeIntervalEdit={timeIntervalPeriod}
                          eventTypeEdit={eventTypePeriod}
                          eventValueEdit={eventValuePeriod}
                          handleDoneActionClicked={(
                            amountTime,
                            timeInterval,
                            eventType,
                            eventValue
                          ) => {
                            handleDoneEveryPeriodClicked(
                              amountTime,
                              timeInterval,
                              eventType,
                              eventValue
                            );
                          }}
                          handleClickCancel={() =>
                            handleCancelEveryPeriodClicked()
                          }
                          handleClickChangePeriod={() => {
                            handleClickChangeTrigger();
                          }}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    {stepTow ? (
                      <div>
                        {actionRow ? (
                          <>
                            {stepThree ? (
                              <RuleSummary
                                trigger={typeSelected !== ""}
                                causeStop={causeSelected}
                                typeSelected={typeSelected}
                                daysSelected={daysSelected}
                                timeSelected={timeSelected}
                                weekDaysSelected={weekDaysSelected}
                                cardIsActive={cardIsActive}
                                actionTitle={triggerClicked}
                                actionSubTitle={description}
                                handleEditClicked={(selectAction) =>
                                  handleSummaryEditClicked(selectAction)
                                }
                                handleEditCondition={(name: any) => {
                                  handleEditConditionSummary(name);
                                }}
                              />
                            ) : (
                              <ActionRowRowContainer>
                                <ScehduleRow
                                  actionRow={true}
                                  actionDescription={description}
                                  actionItem={triggerClicked}
                                  selectMachineStop={false}
                                  maintenanceType={maintenanceType}
                                  maintenanceEntityID={maintenanceEntityID}
                                  maintenanceReason={maintenanceReason}
                                  handleEditClicked={() =>
                                    handleEditActionRowClicked()
                                  }
                                  handleDeleteClicked={() =>
                                    handleDeleteActionRowClicked()
                                  }
                                />
                              </ActionRowRowContainer>
                            )}
                          </>
                        ) : (
                          <div>
                            <SelectTriggerTitle>
                              {t(
                                translations.RulesContainer.CREATE_RULE
                                  .SELECT_ACTION
                              )}
                            </SelectTriggerTitle>
                            <DropDown
                              id={"Select an action"}
                              data={
                                (selectMachineStop || selectChangeAtStop) &&
                                deviationConditions.length === 0 &&
                                typeSelected === ""
                                  ? actionList
                                  : deviationConditions.length !== 0
                                  ? actionDeviationList
                                  : amountTimePeriod !== ""
                                  ? everyPeriodActionList
                                  : actionListPeriod
                              }
                              marginTop={0}
                              marginRight={0}
                              marginBottom={0}
                              marginLeft={0}
                              height={40}
                              top={42}
                              itemSelected={actionList[0].label}
                              background="#ffffff"
                              dropDownScrolling={"false"}
                              handleSelectItem={(getItemSelected: string) =>
                                handleDropDown(getItemSelected)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <SelectTriggerTitle>
                          {t(
                            translations.RulesContainer.CREATE_RULE
                              .DEFINE_TRIGGER
                          )}
                        </SelectTriggerTitle>
                        <DropDown
                          id={"Select a trigger"}
                          data={triggerList}
                          marginTop={0}
                          marginRight={0}
                          marginBottom={0}
                          marginLeft={0}
                          height={40}
                          top={42}
                          itemSelected={triggerList[0].label}
                          background="#ffffff"
                          dropDownScrolling={"false"}
                          handleSelectItem={(getItemSelected: string) =>
                            handleDropDown(getItemSelected)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </TriggersContainer>
        )}
        {action ? (
          <SelectAction
            actionItem={triggerClicked}
            handleDoneActionClicked={(
              subject,
              subSubject,
              userIdSelected,
              description,
              levelClicke,
              asigneClicked,
              objectClicked,
              objectIdSelected,
              asigneTaskToClicked,
              timeClicked,
              priorityClicked,
              subTaskList,
              subMachinesList,
              subMachinesIDList,
              subNotifyClicked,
              subTaskListCheckBox,
              maintenanceType,
              maintenanceEntityID,
              maintenanceReason,
              note
            ) =>
              handleDoneActionClicked(
                subject,
                subSubject,
                userIdSelected,
                description,
                levelClicke,
                asigneClicked,
                objectClicked,
                objectIdSelected,
                asigneTaskToClicked,
                timeClicked,
                priorityClicked,
                subTaskList,
                subMachinesList,
                subMachinesIDList,
                subNotifyClicked,
                subTaskListCheckBox,
                maintenanceType,
                maintenanceEntityID,
                maintenanceReason,
                note
              )
            }
            handleClickCancel={() => handleCancelActionClicked()}
            handleClickChangeAction={() => handleClickChangeAction()}
          />
        ) : (
          <></>
        )}

        {data.editClicked ? (
          <LoadingContainer>
            {" "}
            <LoadingTitle>Loading... Please wait</LoadingTitle>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <></>
        )}
        <NextContainer>
          {stepTow ? (
            <BackButton active={buttonActive} onClick={handleBackButton}>
              {t(translations.RulesContainer.CREATE_RULE.BACK)}
            </BackButton>
          ) : (
            <></>
          )}
          <NextButton active={buttonNextActive} onClick={handleNextButton}>
            {stepThree
              ? t(translations.RulesContainer.CREATE_RULE.SAVE_RULE)
              : t(translations.RulesContainer.CREATE_RULE.NEXT)}
          </NextButton>
        </NextContainer>
      </Body>
    </CreateRule>
  );
};

export default CreateNewRule;
