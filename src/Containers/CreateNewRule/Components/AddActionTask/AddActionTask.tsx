import React, { createRef, useEffect, useMemo, useState } from "react";
import {
  AddTaskContainer,
  SubTask,
  AddTaskButton,
  SelectContainer,
  SelectTitle,
  SelectContainerLeft,
  SelectContainerRight,
  SelectPriorityContainer,
  SelectPriorityTitle,
  AddSubTaskContainer,
  AddSubTaskLine,
  InputLine,
  Task,
  DeletePopUp,
  SaveSubTaskButton,
  EditSaveSubTaskContainer,
  EditSaveSubTaskButton,
  EstimatedTimeContainer,
  EstimatedTimeTitle,
  EstimatedDurationContainer,
  ListContainer,
  DropDownObjectContainer,
  DropDownLevelContainer,
  EstimatedContainer,
  StyledIcon,
  BackgroundDeletePopUp,
  StyledIconDelete,
  CheckBoxInput,
  TaskLine,
  TaskContainer,
} from "./styles";

//import AddIcon from "@material-ui/icons/Add";
//import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PopupDeleteSebTask from "../PopupDeleteSubTask/PopupDeleteSubTask";
import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import {
  GroupMessage,
  NewRuleInterface,
  selectRuleData,
  SET_DROPDOWN,
} from "../../slice/index";
import {
  selectAllTaskLevelObject,
  selectAllTaskSubjects,
  selectAllUserForTask,
} from "../../../RuleContainer/slice/selectors";
import { useDispatch } from "react-redux";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { loadAllUserForTask } from "../../../RuleContainer/slice";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import card_delete from "../../../../assets/icons/card_delete.svg";
import plus_create_blue from "../../../../assets/icons/plus_create_blue.svg";
import { selectLanguage } from "../../../../slice/selectors";
import { isLocalLanguage } from "../../../../utils/CommonFunctions";
import { InputType } from "../../../../utils/React2Ang/designSystem/editableTable/Cells/Components/InputText/types";
import InputTextField from "../../../../Component/DesignSystem/InputText";
//import card_pencil_edit from "../../../../assets/icons/card_pencil_edit.svg";

interface AddActionTaskProps {
  handleTaskParams: (
    level: string,
    asigne: string,
    object: string,
    objectIdSelected: number,
    asigneTask: string,
    time: string,
    priority: string,
    subTaskList: string[],
    taskIdSelected: number,
    subTaskListCheckBox: boolean[]
  ) => void;
  handleScrollToBottom: () => void;
}

const AddActionTask: React.FC<AddActionTaskProps> = (props) => {
  const { t } = useTranslation();
  const data = useSelector(selectRuleData);
  const userForTaskData: RulesContainerSlice["UsersForTask"] =
    useSelector(selectAllUserForTask);
  const tasks: RulesContainerSlice["TaskLevelObject"] = useSelector(
    selectAllTaskLevelObject
  );
  const taskObjects: RulesContainerSlice["TaskSubjects"] = useSelector(
    selectAllTaskSubjects
  );
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const [checkBox, setCheckBox] = useState(false);

  const [userList, setUserList] = useState<{ value: number; label: string }[]>(
    []
  );

  const [groupList, setGroupList] = useState<
    { value: number; label: string }[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupIDList, setGroupIDList] = useState([0]);

  const [taskIdSelected, setTaskIdSelected] = useState(0);

  const [machineList, setMachineList] = useState([{ label: "", value: 0 }]);
  const [machineIDList, setMachineIDList] = useState([0]);

  const [jobList, setJobList] = useState([{ label: "", value: 0 }]);
  const [jobIDList, setJobIDList] = useState([0]);

  const [departmentList, setDepartmentList] = useState([
    { label: "", value: 0 },
  ]);
  const [departmentIDList, setDepartmentIDList] = useState([0]);

  const [moldsList, setMoldsList] = useState([{ label: "", value: 0 }]);
  const [moldsIDList, setMoldsIDList] = useState([0]);

  const [auxiliaryList, setAuxiliaryList] = useState([{ label: "", value: 0 }]);
  const [auxiliaryIDList, setAuxiliaryIDList] = useState([0]);

  let [objectLevelList, setObjectLevelList] = useState([
    { label: "", value: 0 },
  ]);
  const [objectIdSelected, setObjectIdSelected] = useState(0);

  let bottomElement = document.getElementById("bottomDropDown");

  let timeList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.HOW_LONG_TASK),
      value: 0,
    },
    {
      label: "00:00",
      value: 1,
    },
  ];

  const [getData, setGetData] = useState(true);

  const [levelListData, setLevelListData] = useState([{ label: "", value: 0 }]);

  //this only to check
  const levelList = [
    {
      label: "Factory",
      value: 0,
    },
    {
      label: "Department",
      value: 1,
    },
    {
      label: "Machine",
      value: 2,
    },
    {
      label: "Job",
      value: 3,
    },
    {
      label: "User Group",
      value: 4,
    },
  ];

  useEffect(() => {
    if (taskObjects) {
      taskObjects.data.ResponseDictionaryDT?.Level.forEach((level) => {
        setLevelListData((prevState) => [
          ...prevState,
          {
            label: level.DisplayName,
            value: level.ID,
          },
        ]);

        //if was data at state then display it
        if (
          data.levelClicked !== "" &&
          data.levelClicked !== undefined &&
          !itemSelected
        ) {
          if (level.ID === Number(data.levelClicked)) {
            console.log("levelClickedChecked2 ", data.levelClicked);
            setLevelValueClicked(level.ID);
            setLevelClicked(level.DisplayName);
          }
        }
      });

      setLevelListData((prevState) =>
        prevState.filter((elem) => elem.label !== "")
      );
    }
  }, [taskObjects.data.ResponseDictionaryDT?.Level]);

  useEffect(() => {
    //fetch user data
    dispatch(loadAllUserForTask());
  }, []);

  const [objectClicked, setObjectClicked] = useState("");
  const [objectValueClicked, setObjectValueClicked] = useState(0);

  useEffect(() => {
    let dataUsers: { value: number; label: string }[] = [];
    if (getData) {
      //fetch users data
      userForTaskData.data.ResponseDictionaryDT?.Users.forEach((element) => {
        if (element.DisplayName !== "" && element.DisplayName !== null) {
          dataUsers.push({ value: element.ID, label: element.DisplayName });
          console.log("DisplayName ", element.DisplayName);
          //If was edit then display selected data
          if (element.ID === data.userIdSelected) {
            setAsigneTaskToClicked(element.DisplayName);
            setAsigneClicked(asigneList[1].label);
            setAsigneValueClicked(1);
          }
        }
      });
      setUserList(dataUsers);

      let dataGroups: { value: number; label: string }[] = [];
      tasks.data.ResponseDictionaryDT?.UserDefinitions.forEach((element) => {
        if (element.EName !== "" && element.EName !== null) {
          dataGroups.push({ value: element.ID, label: element.EName });
          //If was edit then display selected data
          if (element.ID === data.userIdSelected) {
            setAsigneTaskToClicked(element.EName);
            setAsigneClicked(asigneList[2].label);
            setAsigneValueClicked(2);
          }
          //if was data at state then display it
          if (
            data.levelClicked !== "" &&
            data.levelClicked !== undefined &&
            !itemSelected
          ) {
            if (element.ID === data.objectIdSelected) {
              setObjectClicked(element.EName);
              setObjectIdSelected(element.ID);
              setObjectLevelList(dataGroups);
            }
          }
        }
      });
      setGroupList(dataGroups);
      setGetData(false);
    }
  }, [
    tasks.data.ResponseDictionaryDT?.UserDefinitions,
    userForTaskData.data.ResponseDictionaryDT?.Users,
  ]);

  useEffect(() => {
    let machineListElement = [""];
    let machineIDElementList = [0];

    let jobListElement = [""];
    let jobIDElementList = [0];

    let departmentListElement = [""];
    let departmentIDElementList = [0];

    let moldsListElement = [""];
    let moldsIDElementList = [0];

    let auxiliaryListElement = [""];
    let auxiliaryIDElementList = [0];

    //fetch machine data
    tasks.data.ResponseDictionaryDT?.Machines.forEach((element) => {
      if (element.MachineName !== "" && element.MachineName !== null) {
        if (isLocalLanguage(currentLanguage)) {
          machineListElement.push(element.MachineLName);
        } else {
          machineListElement.push(element.MachineName);
        }
        machineIDElementList.push(element.ID);
      }
    });
    for (let i = 1; i < machineListElement.length; i++) {
      machineList.push({ label: machineListElement[i], value: i });
      machineIDList.push(machineIDElementList[i]);
    }
    //remove empty first item '' from array
    if (machineList[0]?.label === "") {
      machineList.splice(0, 1);
      machineIDList.splice(0, 1);
    }
    setMachineList(machineList);
    setMachineIDList(machineIDList);

    //fetch Job data
    tasks.data.ResponseDictionaryDT?.Jobs.forEach((element) => {
      if (element.ERPJobID !== null) {
        jobListElement.push(
          (element.ERPJobID !== null ? element.ERPJobID.toString() : "-") +
            " (" +
            element.ID.toString() +
            ") " +
            (element.ProductName !== null ? element.ProductName : "-")
        );
        jobIDElementList.push(element.ID);
      }
    });
    for (let i = 1; i < jobListElement.length; i++) {
      jobList.push({ label: jobListElement[i], value: i });
      jobIDList.push(jobIDElementList[i]);
    }
    //remove empty first item '' from array
    if (jobList[0]?.label === "") {
      jobList.splice(0, 1);
      jobIDList.splice(0, 1);
    }
    setJobList(jobList);
    setJobIDList(jobIDList);

    //fetch Department data
    tasks.data.ResponseDictionaryDT?.Departments.forEach((element) => {
      if (element.EName !== "" && element.EName !== null) {
        if (isLocalLanguage(currentLanguage)) {
          departmentListElement.push(element.LName);
        } else {
          departmentListElement.push(element.EName);
        }
        departmentIDElementList.push(element.ID);
      }
    });
    for (let i = 1; i < departmentListElement.length; i++) {
      departmentList.push({ label: departmentListElement[i], value: i });
      departmentIDList.push(departmentIDElementList[i]);
    }
    //remove empty first item '' from array
    if (departmentList[0]?.label === "") {
      departmentList.splice(0, 1);
      departmentIDList.splice(0, 1);
    }
    setDepartmentList(departmentList);
    setDepartmentIDList(departmentIDList);

    //fetch Mold data
    if (tasks.data.ResponseDictionaryDT?.Molds !== undefined) {
      if (tasks.data.ResponseDictionaryDT?.Molds.length > 0) {
        tasks.data.ResponseDictionaryDT?.Molds.forEach((element) => {
          if (element.EName !== "" && element.EName !== null) {
            if (isLocalLanguage(currentLanguage)) {
              moldsListElement.push(element.LName);
            } else {
              moldsListElement.push(element.EName);
            }
            moldsIDElementList.push(element.ID);
          }
        });
      }
    }
    for (let i = 1; i < moldsListElement.length; i++) {
      moldsList.push({ label: moldsListElement[i], value: i });
      moldsIDList.push(moldsIDElementList[i]);
    }
    //remove empty first item '' from array
    if (moldsList[0]?.label === "") {
      moldsList.splice(0, 1);
      moldsIDList.splice(0, 1);
    }
    setMoldsList(moldsList);
    setMoldsIDList(moldsIDList);

    //fetch Auxiliary data
    if (tasks.data.ResponseDictionaryDT?.Auxiliaries !== undefined) {
      if (tasks.data.ResponseDictionaryDT?.Auxiliaries.length > 0) {
        tasks.data.ResponseDictionaryDT?.Auxiliaries.forEach((element) => {
          if (element.Name !== "" && element.Name !== null) {
            // if (isLocalLanguage(currentLanguage)) {
            //   auxiliaryListElement.push(element.LName);
            // } else {
            //   auxiliaryListElement.push(element.EName);
            // }
            auxiliaryListElement.push(element.Name);
            auxiliaryIDElementList.push(element.ID);
          }
        });
      }
    }
    for (let i = 1; i < auxiliaryListElement.length; i++) {
      auxiliaryList.push({ label: auxiliaryListElement[i], value: i });
      auxiliaryIDList.push(auxiliaryIDElementList[i]);
    }
    //remove empty first item '' from array
    if (auxiliaryList[0]?.label === "") {
      auxiliaryList.splice(0, 1);
      auxiliaryIDList.splice(0, 1);
    }
    setAuxiliaryList(auxiliaryList);
    setAuxiliaryIDList(auxiliaryIDList);
  }, [
    tasks.data.ResponseDictionaryDT?.Machines,
    tasks.data.ResponseDictionaryDT?.Jobs,
    tasks.data.ResponseDictionaryDT?.Departments,
    tasks.data.ResponseDictionaryDT?.Molds,
    tasks.data.ResponseDictionaryDT?.Auxiliaries,
  ]);

  const asigneList = [
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

  const asigneTaskToList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.TASK_CREATOR),
      value: 0,
    },
  ];
  const objectList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.WHICH_OBJECT),
      value: 0,
    },
  ];
  const levelListPlaceHolder = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_LEVEL),
      value: 0,
    },
  ];

  const assigneeListPlaceHolder = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_ASSIGNEE),
      value: 0,
    },
  ];

  //t(translations.RulesContainer.CREATE_RULE.SELECT_LEVEL)
  let [levelClicked, setLevelClicked] = useState("");
  const [levelValueClicked, setLevelValueClicked] = useState(0);
  const [asigneClicked, setAsigneClicked] = useState("");
  const [asigneValueClicked, setAsigneValueClicked] = useState(0);
  const [asigneTaskToClicked, setAsigneTaskToClicked] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeClicked, setTimeClicked] = useState("");
  const [priorityClicked, setPriorityClicked] = useState(
    `${t(translations.RulesContainer.CREATE_RULE.MEDIUM)}`
  );
  const [priorityLow, setPriorityLow] = useState(false);
  const [priorityMedium, setPriorityMedium] = useState(true);
  const [priorityHigh, setPriorityHigh] = useState(false);
  //to show input component
  const [subTask, setSubTask] = useState(false);

  const [subTaskList, setSubTaskList] = useState([""]);
  const [subTaskListCheckBox, setSubTaskListCheckBox] = useState([true]);
  const [inputText, setInputText] = useState("");

  const [itemSelected, setItemSelected] = useState(false);

  const [disableAdd, setDisableAdd] = useState(false);

  const [estimatedHour, setEstimatedHour] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("");

  //set time data
  //number of 15 min at 24 hours
  let index = (24 * 60) / 15;
  for (let i = 2; i < index; i++) {
    let timeDisplay = minutesToHm(i * 15).toString();
    timeList.push({ label: timeDisplay, value: i });
  }

  function minutesToHm(d: number) {
    d = Number(d);
    let h = Math.floor(d / 60);
    let m = Math.floor(d % 60);

    let hDisplay = h > 9 ? h : "0" + h;
    let mDisplay = m === 0 ? "0" + m : m;
    return hDisplay + ":" + mDisplay;
  }

  useEffect(() => {
    //if the all params is legal or one is changed then send it to SelectAction
    if (
      levelClicked !==
        t(translations.RulesContainer.CREATE_RULE.SELECT_LEVEL) &&
      asigneClicked !== asigneList[0].label &&
      asigneTaskToClicked !== asigneTaskToList[0].label &&
      (objectClicked !== "" || levelValueClicked - 1 === levelList[0].value) &&
      priorityClicked !== ""
    ) {
      let indexLevelClicked = levelClicked + "_" + levelValueClicked.toString();
      // if time not selected then send empty
      if (estimatedHour === "" && estimatedMinutes === "") {
        props.handleTaskParams(
          indexLevelClicked,
          asigneClicked,
          objectClicked,
          objectIdSelected,
          asigneTaskToClicked,
          "",
          priorityClicked,
          subTaskList,
          taskIdSelected,
          subTaskListCheckBox
        );
      } else {
        let estimatedDuration = estimatedHour + ":" + estimatedMinutes;
        console.log("estimatedDuration ", estimatedDuration);
        props.handleTaskParams(
          indexLevelClicked,
          asigneClicked,
          objectClicked,
          objectIdSelected,
          asigneTaskToClicked,
          estimatedDuration,
          priorityClicked,
          subTaskList,
          taskIdSelected,
          subTaskListCheckBox
        );
      }
    }
    //send missing params
    else {
      props.handleTaskParams(
        levelClicked,
        asigneClicked,
        objectClicked,
        objectIdSelected,
        "",
        "",
        priorityClicked,
        subTaskList,
        taskIdSelected,
        subTaskListCheckBox
      );
    }

    //if was data at state then display it
    if (
      data.levelClicked !== "" &&
      data.levelClicked !== undefined &&
      !itemSelected
    ) {
      if (data.levelClicked.includes("_")) {
        const levelIndexClickedArr = data.levelClicked.split("_");
        setLevelClicked(levelIndexClickedArr[0]);
      }

      //split time
      if (data.timeClicked !== "" && data.timeClicked !== "00:00") {
        let timeTask = data.timeClicked.split(":");
        setEstimatedHour(timeTask[0]);
        setEstimatedMinutes(timeTask[1]);
      } else {
        setEstimatedHour("");
        setEstimatedMinutes("");
      }
      setObjectIdSelected(data.objectIdSelected);
      handleInputChange(data.priorityClicked);
      setTaskIdSelected(data.userIdSelected);

      //make mutable array
      const subTasks = [...data.subTaskList];
      subTasks.sort((a, b) => a.order - b.order);

      if (subTasks[0] !== null) {
        setSubTaskList(subTasks);
      } else {
        setSubTask(false);
      }

      const subTasksCheckBox = [...data.subTaskListCheckBox];
      subTasksCheckBox.sort((a, b) => a.order - b.order);
      setSubTaskListCheckBox(subTasksCheckBox);

      setItemSelected(true);

      //edit when creating trigger
      if (data.levelClicked.includes("_")) {
        console.log("creating");
        console.log("data.levelClicked ", data.levelClicked);
        const levelIndexClickedArr = data.levelClicked.split("_");
        //Factory
        if (Number(levelIndexClickedArr[1]) === 1) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 1);
        }
        //Department
        else if (Number(levelIndexClickedArr[1]) === 2) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 2);

          departmentIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                departmentList[departmentIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                departmentList[departmentIDList.indexOf(element)].value
              );
            }
          });
        }
        //Machine
        else if (Number(levelIndexClickedArr[1]) === 3) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 3);

          machineIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                machineList[machineIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                machineList[machineIDList.indexOf(element)].value
              );
            }
          });
        }
        //Job
        else if (Number(levelIndexClickedArr[1]) === 4) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 4);

          jobIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(jobList[jobIDList.indexOf(element)].label);
              setObjectValueClicked(jobList[jobIDList.indexOf(element)].value);
            }
          });
        }
        //User Group
        else if (Number(levelIndexClickedArr[1]) === 5) {
          setLevelClicked(levelIndexClickedArr[0]);
          setLevelValueClicked(5);
          setObjectValueClicked(data.objectIdSelected);
          //get objectClicked above when fetch dataGroup
        }
        //Mold
        else if (Number(levelIndexClickedArr[1]) === 6) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 6);

          moldsIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(moldsList[moldsIDList.indexOf(element)].label);
              setObjectValueClicked(
                moldsList[moldsIDList.indexOf(element)].value
              );
            }
          });
        }
        //Auxiliary
        else if (Number(levelIndexClickedArr[1]) === 7) {
          //to fetch data
          handleSelectLevel(levelIndexClickedArr[0], 7);

          auxiliaryIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                auxiliaryList[auxiliaryIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                auxiliaryList[auxiliaryIDList.indexOf(element)].value
              );
            }
          });
        }
      }
      //edit when trigger already created
      else {
        console.log("already created");
        //Factory
        if (Number(data.levelClicked) === 1) {
          //to fetch data
          // handleSelectLevel(levelList[0].label, 1);
        }
        //Department
        else if (Number(data.levelClicked) === 2) {
          setObjectLevelList(departmentList);
          departmentIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                departmentList[departmentIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                departmentList[departmentIDList.indexOf(element)].value
              );
            }
          });
        }
        //Machine
        else if (Number(data.levelClicked) === 3) {
          setObjectLevelList(machineList);
          machineIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                machineList[machineIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                machineList[machineIDList.indexOf(element)].value
              );
            }
          });
        }
        //Job
        else if (Number(data.levelClicked) === 4) {
          setObjectLevelList(jobList);
          jobIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(jobList[jobIDList.indexOf(element)].label);
              setObjectValueClicked(jobList[jobIDList.indexOf(element)].value);
            }
          });
        }
        //User Group
        else if (Number(data.levelClicked) === 5) {
          setLevelValueClicked(5);
          setObjectValueClicked(data.objectIdSelected);
          //get objectClicked above when fetch dataGroup
        }
        //Mold
        else if (Number(data.levelClicked) === 6) {
          setObjectLevelList(moldsList);
          moldsIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(moldsList[moldsIDList.indexOf(element)].label);
              setObjectValueClicked(
                moldsList[moldsIDList.indexOf(element)].value
              );
            }
          });
        }
        //Auxiliary
        else if (Number(data.levelClicked) === 7) {
          setObjectLevelList(auxiliaryList);
          auxiliaryIDList.forEach((element) => {
            if (element === data.objectIdSelected) {
              setObjectClicked(
                auxiliaryList[auxiliaryIDList.indexOf(element)].label
              );
              setObjectValueClicked(
                auxiliaryList[auxiliaryIDList.indexOf(element)].value
              );
            }
          });
        }
      }
    }
  }, [
    data,
    levelClicked,
    asigneClicked,
    asigneTaskToClicked,
    objectClicked,
    timeClicked,
    priorityClicked,
    subTaskList,
    estimatedHour,
    estimatedMinutes,
  ]);

  useEffect(() => {
    //use this scroll but not for Timing dropDown
    if (data.dropDownClicked && data.dropDownIDClicked !== "Timing") {
      handleScrollToBottom();

      //reset dropDownClicked  at state
      const editData: NewRuleInterface = {
        ruleName: "",
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
        stopCause: "",
        stopGroup: "",
        causeIdSelected: 0,
        intervalType: "",
        eventTime: "",
        triggerDays: [],
        triggerWeekDays: [],
        userIdSelected: 0,
        dropDownClicked: false,
        dropDownIDClicked: "",
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
      dispatch(SET_DROPDOWN(editData));
    }
  }, [data, dispatch]);

  const handleScrollToBottom = () => {
    bottomElement?.scrollIntoView(false);
  };

  const handleInputChange = (item: string) => {
    setPriorityClicked(item);

    if (
      item === t(translations.RulesContainer.CREATE_RULE.LOW) ||
      item === "Low"
    ) {
      setPriorityLow(true);
      setPriorityMedium(false);
      setPriorityHigh(false);
    } else if (item === t(translations.RulesContainer.CREATE_RULE.MEDIUM)) {
      setPriorityLow(false);
      setPriorityMedium(true);
      setPriorityHigh(false);
    } else if (item === t(translations.RulesContainer.CREATE_RULE.HIGH)) {
      setPriorityLow(false);
      setPriorityMedium(false);
      setPriorityHigh(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function ListSubTask(subTasks: string[], subTasksCheckBox: boolean[]) {
    const [editSubTask, setEditSubTask] = useState(false);
    const [editSubTaskItem, setEditSubTaskItem] = useState("");
    const [inputTextEdited, setInputTextEdited] = useState("");
    const [deletePopUpTask, setDeletePopUpTask] = useState("");
    const [checkBox, setCheckBox] = useState(false);
    const taskRef = useMemo(
      () =>
        Array(subTasks.length)
          .fill(0)
          .map(() => createRef<HTMLInputElement>()),
      []
    );

    const handleEditAddTask = (task: string, index: number) => {
      if (taskRef[index]) taskRef[index].current?.focus();

      //update icons
      setEditSubTask(!editSubTask);
      //to update specific row
      setEditSubTaskItem(task);

      //disable add subTask when edit
      setDisableAdd(true);

      //console.log("taskRef ", taskRef[index]);
      // if (taskRef[index].current) {
      //   console.log("taskRef ", taskRef[index].current);
      //   taskRef[index].current?.focus();
      // }
    };

    const handleClickDelete = (task: string) => {
      setDeletePopUpTask(task);
    };

    const handlePopUpDelete = () => {
      if (subTaskList.includes(deletePopUpTask)) {
        let index = subTaskList.indexOf(deletePopUpTask);
        if (index !== -1) {
          subTaskList.splice(index, 1);
          subTaskListCheckBox.splice(index, 1);
        }
        //update icons and cline editSubTaskItem
        handleEditAddTask("", 0);

        //render and save new list
        setSubTaskList(subTaskList);
        setSubTaskListCheckBox(subTaskListCheckBox);
        // clean delete task
        setDeletePopUpTask("");

        //enable add subTask again
        setDisableAdd(false);
      }
    };

    const handleClickVe = (task: string) => {
      //if there is new text at input then update to new text
      if (inputTextEdited !== "") {
        if (subTaskList.includes(task)) {
          let index = subTaskList.indexOf(task);
          if (index !== -1) {
            //set new text
            subTaskList[index] = inputTextEdited;
          }
          //to update icon and cline task which was clicked
          handleEditAddTask("", 0);
          //update array
          setSubTaskList(subTaskList);
        }

        setInputTextEdited("");
        setEditSubTask(!editSubTask);
      } else {
        setEditSubTask(!editSubTask);
      }

      //enable add subTask again
      setDisableAdd(false);
    };

    const handlePopUpClicked = (title: string) => {
      if (title === t(translations.RulesContainer.CREATE_RULE.CANCEL)) {
        //to do somthing
      } else if (title === t(translations.RulesContainer.CREATE_RULE.DELETE)) {
        handlePopUpDelete();
      }
      setDeletePopUpTask("");
    };

    // This function is called when the input changes
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const enterText = event.target.value;
      setInputTextEdited(enterText);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCheckboxClicked = (task: string) => {
      setCheckBox(false);
      /*
       subTaskListCheckBox[subTasks.indexOf(task)] =
        !subTaskListCheckBox[subTasks.indexOf(task)];
      setSubTaskListCheckBox(subTaskListCheckBox);
      //to render and to see the checkBox
      setRefresh(!refresh);
       */
    };

    //only if there is more than one index because the first on is empty
    if (subTasks.length >= 1 && subTasks[0] !== "") {
      /*
                    ********* DONT DELETE THIS ********
                   checked={subTasksCheckBox[subTasks.indexOf(task)]}
                   onChange={() => {handleCheckboxClicked(task)}}
              */
      const listItems = subTasks.map((task, index) => (
        <TaskLine key={index}>
          <CheckBoxInput
            name={task}
            type="checkbox"
            checked={checkBox}
            onChange={() => {
              handleCheckboxClicked(task);
            }}
          />
          {editSubTask && task === editSubTaskItem ? (
            <InputLine
              placeholder={editSubTaskItem}
              defaultValue={editSubTaskItem}
              onChange={inputHandler}
              ref={taskRef[index]}
            />
          ) : (
            <TaskContainer>
              <Task> {task}</Task>
              <EditIcon onClick={() => handleEditAddTask(task, index)} />
            </TaskContainer>
          )}

          {editSubTask && task === editSubTaskItem ? (
            <EditSaveSubTaskContainer>
              <EditSaveSubTaskButton onClick={() => handleClickVe(task)}>
                {t(translations.RulesContainer.CREATE_RULE.SAVE_SUB_TASK)}
              </EditSaveSubTaskButton>
              <StyledIcon
                width={20}
                height={20}
                src={card_delete}
                onClick={() => handleClickDelete(task)}
              />
              {/*<DeleteIcon onClick={() => handleClickDelete(task)} />*/}
            </EditSaveSubTaskContainer>
          ) : (
            <></>
          )}
        </TaskLine>
      ));
      return (
        <ListContainer>
          {listItems}
          {deletePopUpTask !== "" ? (
            <BackgroundDeletePopUp>
              <DeletePopUp>
                <PopupDeleteSebTask
                  id={"props.id"}
                  handlePopUpClicked={(title) => handlePopUpClicked(title)}
                />
              </DeletePopUp>
            </BackgroundDeletePopUp>
          ) : (
            <></>
          )}
        </ListContainer>
      );
    }
  }

  const handleClickVeNew = () => {
    if (inputText !== "") {
      subTaskList.push(inputText);
      subTaskListCheckBox.push(true);
    }
    setSubTask(false);
    //cline input text
    setInputText("");

    //remove empty first item '' from array
    if (subTaskList[0] === "") {
      subTaskList.splice(0, 1);
      subTaskListCheckBox.splice(0, 1);
    }

    //enable add again
    setDisableAdd(false);
  };

  const handleClickDeleteNew = () => {
    //hide input line
    setSubTask(false);
    //cline input text
    setInputText("");

    //enable add again
    setDisableAdd(false);
  };

  const handleSelectLevel = (item: string, value: number) => {
    setLevelClicked(item);
    setLevelValueClicked(value);

    console.log("item ", item);
    console.log("value ", value);
    console.log("levelList ", levelList);
    console.log("levelListData ", levelListData);
    console.log("groupList ", groupList);
    //reset title Select an object
    setObjectLevelList([{ label: "", value: 0 }]);
    setObjectClicked("");

    //set new data
    //Factory
    if (value === 1) {
      setObjectLevelList([{ label: "", value: 0 }]);
    }
    //Department
    else if (value === 2) {
      setObjectLevelList(departmentList);
    }
    //Machine
    else if (value === 3) {
      setObjectLevelList(machineList);
    }
    //Job
    else if (value === 4) {
      setObjectLevelList(jobList);
    }
    //User Group
    else if (value === 5) {
      setObjectLevelList(groupList);
    }
    //Molds
    else if (value === 6) {
      setObjectLevelList(moldsList);
    }
    //Auxiliary
    else if (value === 7) {
      setObjectLevelList(auxiliaryList);
    }
  };

  const handleClickObject = (object: string, value: number) => {
    setObjectClicked(object);
    setObjectValueClicked(value);
    //Machine
    if (levelValueClicked === 3) {
      setObjectIdSelected(machineIDList[value - 1]);
      console.log("ID ", machineIDList[value - 1]);
    }
    //Department
    else if (levelValueClicked === 2) {
      setObjectIdSelected(departmentIDList[value - 1]);
      console.log("ID departmentIDList ", departmentIDList[value - 1]);
    }
    //Job
    else if (levelValueClicked === 4) {
      setObjectIdSelected(jobIDList[value - 1]);
      console.log("ID jobIDList ", jobIDList[value - 1]);
    }
    //User Group
    else if (levelValueClicked === 5) {
      setObjectIdSelected(value);
      console.log("ID groupIDList ", value);
    }
    //Mold
    else if (levelValueClicked === 6) {
      setObjectIdSelected(moldsIDList[value - 1]);
      console.log("ID moldsIDList ", moldsIDList[value - 1]);
    }
    //Auxiliary
    else if (levelValueClicked === 7) {
      setObjectIdSelected(auxiliaryIDList[value - 1]);
      console.log("ID AuxiliaryIDList ", auxiliaryIDList[value - 1]);
    }
  };

  const handleClickAssignee = (item: string, value: number) => {
    setAsigneClicked(item);
    setAsigneTaskToClicked("");
    setAsigneValueClicked(value);
  };

  const handleClickTaskTo = (item?: string, value?: number) => {
    if (item && value) {
      setAsigneTaskToClicked(item);
      setTaskIdSelected(value);
    }
  };

  useEffect(() => {
    if (data.objectClicked !== "" && objectClicked === "") {
      setObjectClicked(data.objectClicked);
      //getObjectIdSelected(data.objectClicked);
    }
  }, [asigneTaskToClicked, taskIdSelected]);

  const addSubTask = () => {
    if (!disableAdd) {
      setSubTask(true);
      //disable click add when adding new one
      setDisableAdd(true);
    }
  };

  useEffect(() => {
    if (subTask) {
      props.handleScrollToBottom();
    }
  }, [props, subTask]);

  // This function is called when the input changes
  // event: React.ChangeEvent<HTMLInputElement>
  const inputEstimatedHourHandler = (enterText: string) => {
    //const enterText = event.target.value;
    setEstimatedHour(enterText);
  };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  const inputEstimatedMinutesHandler = (enterText: string) => {
    // const enterText = event.target.value;
    setEstimatedMinutes(enterText);
  };

  return (
    <AddTaskContainer>
      <SelectContainer>
        <SelectContainerLeft>
          <SelectTitle>
            {t(translations.RulesContainer.CREATE_RULE.SELECT_TASK_LEVEL)}
          </SelectTitle>
          <DropDownLevelContainer>
            <SingleSelect
              placeholder={
                levelClicked === "" ? levelListPlaceHolder[0].label : ""
              }
              required={false}
              selectedItem={
                levelClicked !== ""
                  ? {
                      label: levelClicked,
                      value: levelValueClicked,
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
                  handleSelectLevel(item.label, item.value);
                } else {
                  setLevelClicked("");
                  setLevelValueClicked(0);
                }
              }}
              TitleText={""}
              items={levelListData}
              mode={DropDownMode.selectable}
              searchable={false}
            />
          </DropDownLevelContainer>

          <SelectTitle>
            {t(translations.RulesContainer.CREATE_RULE.TYPE_ASIGNE)}
          </SelectTitle>
          <DropDownLevelContainer>
            <SingleSelect
              placeholder={
                asigneClicked === "" ? assigneeListPlaceHolder[0].label : ""
              }
              required={false}
              selectedItem={
                asigneClicked !== ""
                  ? {
                      label: asigneClicked,
                      value: asigneValueClicked,
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
                  handleClickAssignee(item.label, item.value);
                } else {
                  setAsigneClicked("");
                  setAsigneValueClicked(0);
                }
              }}
              TitleText={""}
              items={asigneList}
              mode={DropDownMode.selectable}
              searchable={false}
            />
          </DropDownLevelContainer>

          <SelectTitle paddingTop={7}>
            {t(translations.RulesContainer.CREATE_RULE.SELECT_PRIORITY)}
          </SelectTitle>

          <SelectPriorityContainer marginTop={16}>
            <SelectPriorityTitle
              marginRight={16}
              marginLeft={0}
              selected={priorityLow}
              onClick={() => handleInputChange("Low")}
            >
              {t(translations.RulesContainer.CREATE_RULE.LOW)}
            </SelectPriorityTitle>

            <SelectPriorityTitle
              marginRight={16}
              marginLeft={0}
              onClick={() =>
                handleInputChange(
                  t(translations.RulesContainer.CREATE_RULE.MEDIUM)
                )
              }
              selected={priorityMedium}
            >
              {t(translations.RulesContainer.CREATE_RULE.MEDIUM)}
            </SelectPriorityTitle>

            <SelectPriorityTitle
              marginRight={0}
              marginLeft={0}
              onClick={() =>
                handleInputChange(
                  t(translations.RulesContainer.CREATE_RULE.HIGH)
                )
              }
              selected={priorityHigh}
            >
              {t(translations.RulesContainer.CREATE_RULE.HIGH)}
            </SelectPriorityTitle>
          </SelectPriorityContainer>
        </SelectContainerLeft>

        <SelectContainerRight>
          <div
            style={{
              visibility:
                levelValueClicked === 1 || levelClicked === ""
                  ? "hidden"
                  : "visible",
            }}
          >
            <SelectTitle paddingTop={0} paddingLeft={24}>
              {t(translations.RulesContainer.CREATE_RULE.SELECT_OBJECT)}
            </SelectTitle>
            <DropDownObjectContainer>
              <SingleSelect
                placeholder={
                  objectClicked === "" ? objectList[0].label : objectClicked
                }
                required={false}
                selectedItem={
                  objectClicked !== ""
                    ? {
                        label: objectClicked,
                        value: objectValueClicked,
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
                    handleClickObject(item.label, item.value);
                  } else {
                    setObjectClicked("");
                    setObjectValueClicked(0);
                  }
                }}
                TitleText={""}
                items={objectLevelList}
                mode={DropDownMode.selectable}
              />
            </DropDownObjectContainer>
          </div>

          <div
            style={{
              visibility:
                asigneClicked === asigneList[0].label || asigneClicked === ""
                  ? "hidden"
                  : "visible",
            }}
          >
            <SelectTitle paddingLeft={24}>
              {t(translations.RulesContainer.CREATE_RULE.ASSIGN_TASK_TO)}
            </SelectTitle>
            <DropDownObjectContainer>
              <SingleSelect
                placeholder={
                  asigneTaskToClicked === ""
                    ? asigneTaskToList[0].label
                    : asigneTaskToClicked
                }
                required={false}
                selectedItem={
                  asigneTaskToClicked !== ""
                    ? {
                        label: asigneTaskToClicked,
                        value: taskIdSelected,
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
                    handleClickTaskTo(item.label, item.value);
                  } else {
                    setAsigneTaskToClicked("");
                    setTaskIdSelected(0);
                  }
                }}
                TitleText={""}
                items={
                  asigneClicked === asigneList[0].label
                    ? []
                    : asigneClicked === asigneList[1].label
                    ? userList
                    : groupList
                }
                mode={DropDownMode.selectable}
              />
            </DropDownObjectContainer>
          </div>
          <EstimatedContainer>
            <SelectTitle paddingTop={7} paddingLeft={24}>
              {t(translations.RulesContainer.CREATE_RULE.ESTIMATED_TIME)}
            </SelectTitle>
            <EstimatedDurationContainer>
              <EstimatedTimeContainer>
                <InputTextField
                  placeholder={t(
                    translations.RulesContainer.CREATE_RULE
                      .ESTIMATED_HRS_PLACEHOLDER
                  )}
                  required={false}
                  TitleText={""}
                  value={estimatedHour}
                  onChange={inputEstimatedHourHandler}
                  maxLength={40}
                  type={InputType.number}
                  disableCopyPaste={true}
                />
                {/*<EstimatedTimeInput*/}
                {/*  placeholder={t(*/}
                {/*    translations.RulesContainer.CREATE_RULE*/}
                {/*      .ESTIMATED_HRS_PLACEHOLDER*/}
                {/*  )}*/}
                {/*  onKeyPress={(event) => {*/}
                {/*    if (!/[0-9]/.test(event.key)) {*/}
                {/*      event.preventDefault();*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  defaultValue={estimatedHour}*/}
                {/*  onChange={inputEstimatedHourHandler}*/}
                {/*  onPaste={(e) => {*/}
                {/*    e.preventDefault();*/}
                {/*    return false;*/}
                {/*  }}*/}
                {/*  onCopy={(e) => {*/}
                {/*    e.preventDefault();*/}
                {/*    return false;*/}
                {/*  }}*/}
                {/*/>*/}
                <EstimatedTimeTitle>
                  {t(translations.RulesContainer.CREATE_RULE.HRS)}
                </EstimatedTimeTitle>
              </EstimatedTimeContainer>

              <EstimatedTimeContainer>
                <InputTextField
                  placeholder={t(
                    translations.RulesContainer.CREATE_RULE
                      .ESTIMATED_MIN_PLACEHOLDER
                  )}
                  required={false}
                  TitleText={""}
                  value={estimatedMinutes}
                  onChange={inputEstimatedMinutesHandler}
                  maxLength={40}
                  type={InputType.number}
                  disableCopyPaste={true}
                />
                {/*<EstimatedTimeInput*/}
                {/*  placeholder={t(*/}
                {/*    translations.RulesContainer.CREATE_RULE*/}
                {/*      .ESTIMATED_MIN_PLACEHOLDER*/}
                {/*  )}*/}
                {/*  onKeyPress={(event) => {*/}
                {/*    if (!/[0-9]/.test(event.key)) {*/}
                {/*      event.preventDefault();*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  defaultValue={estimatedMinutes}*/}
                {/*  onChange={inputEstimatedMinutesHandler}*/}
                {/*  onPaste={(e) => {*/}
                {/*    e.preventDefault();*/}
                {/*    return false;*/}
                {/*  }}*/}
                {/*  onCopy={(e) => {*/}
                {/*    e.preventDefault();*/}
                {/*    return false;*/}
                {/*  }}*/}
                {/*/>*/}
                <EstimatedTimeTitle>
                  {t(translations.RulesContainer.CREATE_RULE.MINS)}
                </EstimatedTimeTitle>
              </EstimatedTimeContainer>
            </EstimatedDurationContainer>
          </EstimatedContainer>
          {/*
                        <DropDown id={'Timing'} data={timeList} marginTop={12} marginRight={12.5} marginBottom={17} marginLeft={0}
                        itemSelected={timeClicked} disableShadow={true} dropDownHeight={130} dropDownScrolling={true}
                        handleSelectItem={(getItemSelected) => { setTimeClicked(getItemSelected) }}
                        scrollToBottom={true} />
                         */}
        </SelectContainerRight>
      </SelectContainer>
      <div id="bottomDropDown">
        <div style={{ color: "transparent" }}></div>
      </div>
      <SubTask>{t(translations.RulesContainer.CREATE_RULE.SUBTASKS)}</SubTask>
      <AddSubTaskContainer>
        {ListSubTask(subTaskList, subTaskListCheckBox)}

        {subTask ? (
          <AddSubTaskLine>
            <CheckBoxInput
              name="AddTask"
              type="checkbox"
              checked={checkBox}
              onChange={() => {
                setCheckBox(false);
              }}
              width={13}
              height={13}
            />

            <InputLine
              placeholder={t(
                translations.RulesContainer.CREATE_RULE.NEW_SUBTASK
              )}
              onChange={(event) => setInputText(event.target.value)}
            />
            <SaveSubTaskButton onClick={() => handleClickVeNew()}>
              {t(translations.RulesContainer.CREATE_RULE.SAVE_SUB_TASK)}
            </SaveSubTaskButton>
            <StyledIcon
              width={20}
              height={20}
              src={card_delete}
              onClick={() => handleClickDeleteNew()}
            />
            {/*<DeleteIcon onClick={() => handleClickDeleteNew()} />*/}
          </AddSubTaskLine>
        ) : (
          <></>
        )}

        <AddTaskButton
          onClick={() => {
            addSubTask();
          }}
          clicked={disableAdd}
        >
          {/*<AddIcon />*/}
          <StyledIconDelete width={18} height={18} src={plus_create_blue} />
          {t(translations.RulesContainer.CREATE_RULE.ADD_SUB_TASK)}
        </AddTaskButton>
      </AddSubTaskContainer>
    </AddTaskContainer>
  );
};

export default AddActionTask;
