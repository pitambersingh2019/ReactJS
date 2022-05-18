import React, { useCallback, useEffect, useState } from "react";
import {
  SelectActionContainer,
  ActionTitle,
  ActionSubject,
  ActionDescription,
  InputDescription,
  DoneActionContainer,
  ActionSelection,
  ButtonsActionContainer,
  CancelActionButton,
  DoneActionButton,
  InputContainer,
  NotificationDropDownContainer,
  NotificationTitle,
  ChangeActionContainer,
  DropDownContainer,
  DropDownNotificationContainer,
  DropDownMainNotificationContainer,
  DropDownHeightContainer,
  ScrollDropDown,
  DropDownNotificationContainerR,
  DropDownNotificationContainerOne,
  SubSubjectTitle,
} from "./styles";

import AddActionTask from "../AddActionTask/AddActionTask";
//import DropDown from "../../../../Component/DropDown/DropDown";
import { useSelector, useDispatch } from "react-redux";
import {
  NewRuleInterface,
  selectRuleData,
  SET_DROPDOWN,
  GroupMessage,
} from "../../slice/index";
import {
  selectAllTaskLevelObject,
  selectAllTaskSubjects,
  selectAllUserForTask,
} from "../../../RuleContainer/slice/selectors";

import { loadAllUserForTask } from "../../../RuleContainer/slice";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import SelectDepMachine from "../selectMachine/SelectDepMachine";
import ModalInfo from "../../../../Component/ModalInfo";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import Maintenance from "../Maintenance/Maintenance";

interface SelectActionProps {
  actionItem: string;
  handleDoneActionClicked: (
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
  ) => void;
  handleClickCancel: () => void;
  handleClickChangeAction: () => void;
}

const SelectAction: React.FC<SelectActionProps> = (props) => {
  const data = useSelector(selectRuleData);
  const userForTaskData: RulesContainerSlice["UsersForTask"] =
    useSelector(selectAllUserForTask);
  const taskSubjects: RulesContainerSlice["TaskSubjects"] = useSelector(
    selectAllTaskSubjects
  );
  const dispatch = useDispatch();
  const [getData, setGetData] = useState(true);

  const { t } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const [title_content_modal, setTitle_content_modal] = useState({
    Title: "",
    Content: "",
  });

  const tasks: RulesContainerSlice["TaskLevelObject"] = useSelector(
    selectAllTaskLevelObject
  );

  const [userList, setUserList] = useState([{ label: "", value: 0 }]);
  let userListElement = [""];
  let userIDElementList = [0];
  const [userIDList, setUserIDList] = useState([0]);
  const [userIdSelected, setUserIdSelected] = useState(0);

  const [groupList, setGroupList] = useState([{ label: "", value: 0 }]);
  let groupListElement = [""];
  let groupIDElementList = [0];
  const [groupIDList, setGroupIDList] = useState([0]);

  let bottomElement = document.getElementById("bottom");

  const subNotificationPlaceHolder = [
    {
      lebal: t(
        translations.RulesContainer.CREATE_RULE.SUBNOTIFICATION_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  const subSubjectPlaceHolder = [
    {
      lebal: t(
        translations.RulesContainer.CREATE_RULE.SELECT_SUB_SUBJECT_PLACEHOLDER
      ),
      value: 0,
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

  const [subjectList, setSubjectList] = useState([{ label: "", value: 0 }]);
  const [subSubjectList, setSubSubjectList] = useState([
    { label: "", value: 0, subjectID: 0 },
  ]);
  const [subSubjectSortedList, setSubSubjectSortedList] = useState([
    { label: "", value: 0, subjectID: 0 },
  ]);

  useEffect(() => {
    //fetch user data
    dispatch(loadAllUserForTask());
  }, []);

  useEffect(() => {
    if (taskSubjects) {
      taskSubjects.data.ResponseDictionaryDT?.Subjects.forEach((subject) => {
        setSubjectList((prevState) => [
          ...prevState,
          {
            label: subject.DisplayName,
            value: subject.ID,
          },
        ]);

        //if was edit then display data
        if (
          data.description !== "" &&
          data.description !== undefined &&
          !itemSelected
        ) {
          if (data.subject !== "") {
            //edit after create trigger
            if (subject.ID === Number(data.subject)) {
              setSubjectClicked(subject.DisplayName);
              setSubjectValueClicked(subject.ID);
            }
          }
        }
      });

      setSubjectList((prevState) =>
        prevState.filter((elem) => elem.label !== "")
      );

      taskSubjects.data.ResponseDictionaryDT?.SubSubjects.forEach(
        (subSubject) => {
          setSubSubjectList((prevState) => [
            ...prevState,
            {
              label: subSubject.DisplayName,
              value: subSubject.ID,
              subjectID: subSubject.SubjectID,
            },
          ]);
          //if was edit then display data
          if (
            data.description !== "" &&
            data.description !== undefined &&
            !itemSelected
          ) {
            if (data.subSubject !== 0) {
              if (data.subSubject === subSubject.ID) {
                setSubSubjectClicked({
                  label: subSubject.DisplayName,
                  value: subSubject.ID,
                  subjectID: subSubject.SubjectID,
                });
              }

              if (data.subject.includes("_")) {
                let subjectIdClickedArr = data.subject.split("_");
                //set subSubject data
                if (Number(subjectIdClickedArr[1]) === subSubject.SubjectID) {
                  setSubSubjectSortedList((prevState) => [
                    ...prevState,
                    {
                      label: subSubject.DisplayName,
                      value: subSubject.ID,
                      subjectID: subSubject.SubjectID,
                    },
                  ]);
                }
              } else {
                //set subSubject data
                if (Number(data.subject) === subSubject.SubjectID) {
                  setSubSubjectSortedList((prevState) => [
                    ...prevState,
                    {
                      label: subSubject.DisplayName,
                      value: subSubject.ID,
                      subjectID: subSubject.SubjectID,
                    },
                  ]);
                }
              }
            }
          }
        }
      );
      setSubSubjectList((prevState) =>
        prevState.filter((elem) => elem.label !== "")
      );

      setSubSubjectSortedList((prevState) =>
        prevState.filter((elem) => elem.label !== "")
      );
    }
  }, [
    taskSubjects.data.ResponseDictionaryDT?.Subjects,
    taskSubjects.data.ResponseDictionaryDT?.SubSubjects,
  ]);

  useEffect(() => {
    if (getData) {
      //fetch users data
      userForTaskData.data.ResponseDictionaryDT?.Users.forEach((element) => {
        if (element.DisplayName !== "" && element.DisplayName !== null) {
          userListElement.push(element.DisplayName);
          userIDElementList.push(element.ID);
        }
      });

      for (let i = 1; i < userListElement.length; i++) {
        userList.push({ label: userListElement[i], value: i });
        userIDList.push(userIDElementList[i]);
      }
      //remove empty first item '' from array
      if (userList[0]?.label === "") {
        userList.splice(0, 1);
        userIDList.splice(0, 1);
      }
      setUserList(userList);
      setUserIDList(userIDList);

      //get service call list
      if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
      ) {
        setDataList(userList);
      }

      //fetch groups data
      tasks.data.ResponseDictionaryDT?.UserDefinitions.forEach((element) => {
        if (element.EName !== "" && element.EName !== null) {
          groupListElement.push(element.EName);
          groupIDElementList.push(element.ID);
        }
      });
      for (let i = 1; i < groupListElement.length; i++) {
        groupList.push({ label: groupListElement[i], value: i });
        groupIDList.push(groupIDElementList[i]);
      }
      //remove empty first item '' from array
      if (groupList[0]?.label === "") {
        groupList.splice(0, 1);
        groupIDList.splice(0, 1);
      }
      setGroupList(groupList);
      setGroupIDList(groupIDList);
      setGetData(false);
    }
  }, [userForTaskData, tasks]);

  const subjectTaskPlaceHolder = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SUBJECTLIST.TYPE),
      value: 0,
    },
  ];

  const [subjectClicked, setSubjectClicked] = useState("");
  const [subSubjectClicked, setSubSubjectClicked] = useState({
    label: "",
    value: 0,
    subjectID: 0,
  });
  const [subjectValueClicked, setSubjectValueClicked] = useState(0);
  const [taskAdded, setTaskAdded] = useState(false);
  const [inputText, setInputText] = useState("");

  const [levelClicked, setLevelClicked] = useState("");
  const [asigneClicked, setAsigneClicked] = useState("");
  const [asigneTaskToClicked, setAsigneTaskToClicked] = useState("");
  const [objectClicked, setObjectClicked] = useState("");
  const [timeClicked, setTimeClicked] = useState("");
  const [priorityClicked, setPriorityClicked] = useState("");
  const [subTaskList, setSubTaskList] = useState([""]);
  const [placeHolder, setPlaceHolder] = useState("");
  const [dataList, setDataList] = useState([{ label: "", value: 0 }]);
  const [subNotifyClicked, setSubNotifyClicked] = useState("");
  const [subNotifyValueClicked, setSubNotifyValueClicked] = useState(0);
  const [message, setMessage] = useState("");
  const [subMachinesList, setSubMachinesList]: any[] = useState([]);
  const [subMachinesIDList, setSubMachinesIDList]: any[] = useState([]);
  const [objectIdSelected, setObjectIdSelected] = useState(0);
  const [subTaskListCheckBox, setSubTaskListCheckBox] = useState([true]);

  const [itemSelected, setItemSelected] = useState(false);
  const [changeActionBtn, setChangeActionBtn] = useState(false);

  const [maintenanceType, setMaintenanceType] = useState(0);
  const [maintenanceEntityID, setMaintenanceEntityID] = useState(0);
  const [maintenanceReason, setMaintenanceReason] = useState(0);
  const [note, setNote] = useState("");
  const [editMaintenance, setEditMaintenance] = useState(false);

  useEffect(() => {
    if (
      props.actionItem ===
      t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
    ) {
      setPlaceHolder(
        t(translations.RulesContainer.CREATE_RULE.TASK_DESCRIPTION_TEXT)
      );
      setDataList(subjectList);
    } else if (
      props.actionItem ===
      t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
    ) {
      setPlaceHolder(
        t(translations.RulesContainer.CREATE_RULE.WRITE_NOTIFICATION_TEXT)
      );
      setDataList(notificationList);
      //if 'Create a task' wasn't selected then enable taskAdded for click Done
      setTaskAdded(true);
    } else if (
      props.actionItem === t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
    ) {
      setPlaceHolder(
        t(translations.RulesContainer.CREATE_RULE.MESSAGE_TO_TECHNICIAN)
      );

      //reset data list if was fetched
      if (userList.length > 0) {
        setDataList(userList);
      }
      //if 'Create a task' wasn't selected then enable taskAdded for click Done
      setTaskAdded(true);
    } else {
      setPlaceHolder(
        t(translations.RulesContainer.CREATE_RULE.MESSAGE_FOR_MACHINE)
      );
      //if 'Create a task' wasn't selected then enable taskAdded for click Done
      setTaskAdded(true);
    }

    //if was data at state then display it
    if (
      data.description !== "" &&
      data.description !== undefined &&
      !itemSelected
    ) {
      // to show Change Action Button
      setChangeActionBtn(true);

      setInputText(data.description);
      if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
      ) {
        if (data.subject !== "") {
          if (data.subject.includes("_")) {
            let subjectIdClickedArr = data.subject.split("_");
            setSubjectClicked(subjectIdClickedArr[0]);
            setSubjectValueClicked(Number(subjectIdClickedArr[1]));
          }
        }
      } else {
        setSubjectClicked(data.subject);
      }

      if (data.subNotifyClicked !== "") {
        setSubNotifyClicked(data.subNotifyClicked);
        if (data.subject === notificationList[1].label) {
          console.log("notificationList[1] ", data.subject);
        } else if (data.subject === notificationList[2].label) {
          console.log("notificationList[2] ", data.subject);
        }
        //user clicked
        userList.forEach((item) => {
          if (item.label === data.subNotifyClicked) {
            setSubNotifyValueClicked(item.value);
            setSubjectClicked(notificationList[1].label);
          }
        });
        //group clicked
        groupList.forEach((item) => {
          if (item.label === data.subNotifyClicked) {
            setSubNotifyValueClicked(item.value);
            setSubjectClicked(notificationList[2].label);
            console.log("subjectEdit.value ", item.value);
          }
        });
      }

      setUserIdSelected(data.userIdSelected);

      if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
      ) {
        if (data.subject === "") {
          if (userIDList.indexOf(data.userIdSelected) !== undefined) {
            if (userIDList.indexOf(data.userIdSelected) >= 0) {
              let subjectEdit =
                userList[userIDList.indexOf(data.userIdSelected)];
              setSubjectClicked(subjectEdit.label);
            }
          }
        }
      } else if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
      ) {
        console.log("data.userIdSelected ", data.userIdSelected);
      } else if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
      ) {
        if (data.subject === "") {
          if (userList[userIDList.indexOf(data.userIdSelected)] !== undefined) {
            let subjectEdit = userList[userIDList.indexOf(data.userIdSelected)];
            setSubjectClicked(subjectEdit.label);
          }
        }
      }

      setItemSelected(true);
    }
    if (data.maintenanceType !== 0) {
      // to show Change Action Button
      setChangeActionBtn(true);

      setMaintenanceType(data.maintenanceType);
      setMaintenanceEntityID(data.maintenanceEntityID);
      setMaintenanceReason(data.maintenanceReason);
      setNote(data.note);
      setEditMaintenance(true);
    }
  }, [data, subjectClicked, inputText, placeHolder]);

  useEffect(() => {
    //if we get dropDownClicked only from Timing dropDown then use this scroll
    if (data.dropDownClicked && data.dropDownIDClicked === "Timing") {
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

  const handleTaskParams = (
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
  ) => {
    //to enable Done button
    setTaskAdded(true);
    setLevelClicked(level);
    setAsigneClicked(asigne);
    setAsigneTaskToClicked(asigneTask);
    setObjectClicked(object);
    setTimeClicked(time);
    setPriorityClicked(priority);
    setSubTaskList(subTaskList);
    setObjectIdSelected(objectIdSelected);
    setUserIdSelected(taskIdSelected);
    setSubTaskListCheckBox(subTaskListCheckBox);
  };

  const handleSendMessageParamsIds = useCallback(
    (
      subMachinesListObj: { id: number; name: string }[],
      GroupMessage1: GroupMessage
    ) => {
      let subMachinesList: string[] = [];
      let subMachinesIDList: number[] = [];

      console.log("GroupMessage", GroupMessage1);
      subMachinesListObj.forEach((elem) => {
        subMachinesList.push(elem.name);
        subMachinesIDList.push(elem.id);
      });
      console.log("subMachinesListObj", subMachinesListObj);

      setSubMachinesList(subMachinesList);
      setSubMachinesIDList(subMachinesIDList);
    },
    []
  );

  const handleSendMessageParamsInput = useCallback((message: string) => {
    setMessage(message);
  }, []);

  const handleClickDone = () => {
    //it's only for notification to send number value not string
    let subjectSend = subjectClicked;
    //message
    if (
      props.actionItem ===
      t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE)
    ) {
      if (message === "" && subMachinesIDList.length === 0) {
        setTitle_content_modal({
          Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE1),
          Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
        });
        setshowModal(true);
        return;
      } else if (subMachinesIDList.length === 0) {
        setTitle_content_modal({
          Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE2),
          Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
        });
        setshowModal(true);
        return;
      } else if (message === "") {
        setTitle_content_modal({
          Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE3),
          Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
        });
        setshowModal(true);
        return;
      }
      // setItemSelected(false);
      props.handleDoneActionClicked(
        subjectSend,
        subSubjectClicked.value,
        userIdSelected,
        message,
        levelClicked,
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
      );
      //}
    }
    //service call, send notification, create task
    else {
      //get userID / groupID
      let index = 0;
      let itemIdSelected = 0;
      let subNotification = "";
      let indexSubjectClicked = "";
      //get id item clicked
      if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.BOOK_CALL)
      ) {
        userList.forEach((item) => {
          if (item.label === subjectClicked) {
            index = item.value - 1;
          }
        });
        itemIdSelected = userIDList[index];
      } else if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
      ) {
        if (
          (subjectClicked === "" ||
            subjectClicked === notificationList[0].label) &&
          inputText === ""
        ) {
          setTitle_content_modal({
            Title: t(
              translations.RulesContainer.InfoModals.TITLE_NOTIFICATION3
            ),
            Content: t(
              translations.RulesContainer.InfoModals.CONTENT_NOTIFICATION
            ),
          });
          setshowModal(true);
          return;
        } else if (inputText === "") {
          setTitle_content_modal({
            Title: t(
              translations.RulesContainer.InfoModals.TITLE_NOTIFICATION2
            ),
            Content: t(
              translations.RulesContainer.InfoModals.CONTENT_NOTIFICATION
            ),
          });
          setshowModal(true);
          return;
        } else if (
          subjectClicked === "" ||
          subjectClicked === notificationList[0].label
        ) {
          setTitle_content_modal({
            Title: t(
              translations.RulesContainer.InfoModals.TITLE_NOTIFICATION1
            ),
            Content: t(
              translations.RulesContainer.InfoModals.CONTENT_NOTIFICATION
            ),
          });
          setshowModal(true);
          return;
        }

        //user clicked
        if (subjectClicked === notificationList[1].label) {
          subjectSend = notificationList[1].value.toString();
          userList.forEach((item) => {
            if (item.label === subNotifyClicked) {
              index = item.value - 1;
            }
          });

          itemIdSelected = userIDList[index];
          subNotification = userList[index].label;
          console.log("subNotifyClicked ", userList[index].label);
        }
        //group
        else if (subjectClicked === notificationList[2].label) {
          subjectSend = notificationList[2].value.toString();
          groupList.forEach((item) => {
            if (item.label === subNotifyClicked) {
              index = item.value - 1;
            }
          });
          itemIdSelected = groupIDList[index];
          subNotification = groupList[index].label;
          console.log("subNotifyClicked g ", groupList[index].label);
        }
      } else if (
        props.actionItem ===
        t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
      ) {
        subjectList.forEach((element) => {
          if (element.label === subjectClicked) {
            // itemIdSelected = element.value;
            indexSubjectClicked = subjectClicked + "_" + element.value;
            console.log("indexSubjectClicked ", indexSubjectClicked);
          }
        });
      }

      //enable click Done only after add action task and subject and description
      if (
        taskAdded &&
        subjectClicked !== subjectTaskPlaceHolder[0].label &&
        subjectClicked !== "" &&
        inputText !== ""
      ) {
        //notification
        if (
          props.actionItem ===
          t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION)
        ) {
          //if subNotifyClicked wasn't selected
          if (subNotifyClicked === "") {
            props.handleDoneActionClicked(
              subjectSend,
              subSubjectClicked.value,
              itemIdSelected,
              inputText,
              levelClicked,
              asigneClicked,
              objectClicked,
              objectIdSelected,
              asigneTaskToClicked,
              timeClicked,
              priorityClicked,
              subTaskList,
              subMachinesList,
              subMachinesIDList,
              subNotification,
              subTaskListCheckBox,
              maintenanceType,
              maintenanceEntityID,
              maintenanceReason,
              note
            );
          } else {
            props.handleDoneActionClicked(
              subjectSend,
              subSubjectClicked.value,
              itemIdSelected,
              inputText,
              levelClicked,
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
            );
          }
        }
        //task, service call
        else {
          //task
          if (
            props.actionItem ===
              t(translations.RulesContainer.CREATE_RULE.CREATE_TASK) &&
            asigneTaskToClicked !== ""
          ) {
            //userIdSelected
            props.handleDoneActionClicked(
              indexSubjectClicked === "" ? subjectClicked : indexSubjectClicked,
              subSubjectClicked.value,
              userIdSelected,
              inputText,
              levelClicked,
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
            );
          } else if (
            props.actionItem ===
              t(translations.RulesContainer.CREATE_RULE.BOOK_CALL) &&
            inputText !== "" &&
            subjectClicked !== ""
          ) {
            props.handleDoneActionClicked(
              subjectSend,
              subSubjectClicked.value,
              itemIdSelected,
              inputText,
              levelClicked,
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
            );
          }
          // error params missing
          else {
            setTitle_content_modal({
              Title: t(translations.RulesContainer.InfoModals.TITLE_TASK),
              Content: t(translations.RulesContainer.InfoModals.CONTENT_TASK),
            });
            setshowModal(true);
          }
        }
      } else {
        setTitle_content_modal({
          Title: t(translations.RulesContainer.InfoModals.TITLE_TASK),
          Content: t(translations.RulesContainer.InfoModals.CONTENT_TASK),
        });
        setshowModal(true);
      }
    }
  };

  const handleNotifyClicked = (notify: string) => {
    setSubjectClicked(notify);
    setSubNotifyClicked("");
  };

  const handleScrollToBottom = () => {
    bottomElement?.scrollIntoView(false);
  };

  const handleSubjectClicked = (subject: string, value: number) => {
    setSubjectClicked(subject);
    setSubjectValueClicked(value);
    console.log("subject ", subject);
    console.log("value ", value);

    //clean old data
    setSubSubjectClicked({ label: "", value: 0, subjectID: 0 });
    setSubSubjectSortedList((prevState) =>
      prevState.filter((elem) => elem.label === "")
    );

    subSubjectList.forEach((subSubject) => {
      if (value === subSubject.subjectID) {
        setSubSubjectSortedList((prevState) => [...prevState, subSubject]);
      }
    });

    setSubSubjectSortedList((prevState) =>
      prevState.filter((elem) => elem.label !== "")
    );
  };

  const handleServiceCallClicked = (technician: string, value: number) => {
    setSubjectClicked(technician);
    setSubjectValueClicked(value);
  };

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length < 2000) {
      setInputText(event.target.value);
    }
  };

  return (
    <SelectActionContainer>
      <ActionTitle>
        {props.actionItem}
        {changeActionBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangeAction();
            }}
          >
            <ShuffleIcon />
            {t(translations.RulesContainer.CREATE_RULE.CHANGE_ACTION)}
          </ChangeActionContainer>
        ) : (
          <></>
        )}
      </ActionTitle>

      {props.actionItem ===
      t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE) ? (
        <SelectDepMachine
          handleMessageParamsIds={(subMachinesListObj, GroupMessage) =>
            handleSendMessageParamsIds(subMachinesListObj, GroupMessage)
          }
          handleMessageParamsInput={(message) =>
            handleSendMessageParamsInput(message)
          }
        />
      ) : (
        <ScrollDropDown
          task={
            props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
          }
        >
          {props.actionItem ===
          t(translations.RulesContainer.CREATE_RULE.CREATE_TASK) ? (
            // <ActionSubject>
            //   {t(translations.RulesContainer.CREATE_RULE.SELECT_SUBJECT)}
            // </ActionSubject>
            <NotificationDropDownContainer>
              <NotificationTitle>
                {t(translations.RulesContainer.CREATE_RULE.SELECT_SUBJECT)}
              </NotificationTitle>
              {(subjectValueClicked !== 0 || data.subject !== "") &&
              subSubjectSortedList.length !== 0 ? (
                <SubSubjectTitle>
                  {t(
                    translations.RulesContainer.CREATE_RULE.SELECT_SUB_SUBJECT
                  )}
                </SubSubjectTitle>
              ) : (
                <></>
              )}
            </NotificationDropDownContainer>
          ) : props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION) ? (
            subjectClicked === notificationList[1].label ||
            subjectClicked === notificationList[2].label ? (
              <NotificationDropDownContainer>
                <NotificationTitle>
                  {t(translations.RulesContainer.CREATE_RULE.SELECT_NOTIFY)}
                </NotificationTitle>
                <NotificationTitle>
                  {subjectClicked === notificationList[1].label
                    ? t(translations.RulesContainer.CREATE_RULE.SELECT_USER)
                    : t(translations.RulesContainer.CREATE_RULE.SELECT_GROUP)}
                </NotificationTitle>
              </NotificationDropDownContainer>
            ) : (
              <ActionSubject>
                {t(translations.RulesContainer.CREATE_RULE.SELECT_NOTIFY)}
              </ActionSubject>
            )
          ) : props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.BOOK_CALL) ? (
            <ActionSubject>
              {t(translations.RulesContainer.CREATE_RULE.SELECT_TECHNICIAN)}
            </ActionSubject>
          ) : (
            <></>
          )}
          {props.actionItem ===
          t(translations.RulesContainer.CREATE_RULE.SEND_NOTIFICATION) ? (
            subjectClicked === notificationList[1].label ||
            subjectClicked === notificationList[2].label ? (
              <NotificationDropDownContainer>
                <DropDownNotificationContainer>
                  <DropDownHeightContainer>
                    <SingleSelect
                      placeholder={dataList[0].label}
                      required={false}
                      selectedItem={
                        subjectClicked !== ""
                          ? {
                              label: subjectClicked,
                              value:
                                subjectClicked === notificationList[1].label
                                  ? 1
                                  : 2,
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
                        // @ts-ignore
                        if (item !== undefined) {
                          handleNotifyClicked(item.label);
                        } else {
                          handleNotifyClicked(dataList[0].label);
                        }
                      }}
                      TitleText={""}
                      items={dataList}
                      mode={DropDownMode.selectable}
                      searchable={false}
                    />
                  </DropDownHeightContainer>
                </DropDownNotificationContainer>
                <DropDownNotificationContainerR>
                  <DropDownHeightContainer>
                    <SingleSelect
                      placeholder={
                        subNotifyClicked === ""
                          ? subNotificationPlaceHolder[0].lebal
                          : subNotifyClicked
                      }
                      required={false}
                      selectedItem={
                        subNotifyClicked !== ""
                          ? {
                              label: subNotifyClicked,
                              value: subNotifyValueClicked,
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
                          setSubNotifyClicked(item.label);
                          console.log("SubNotifyValueClicked ", item.value);
                          setSubNotifyValueClicked(item.value);
                        } else {
                          setSubNotifyClicked("");
                          setSubNotifyValueClicked(0);
                        }
                      }}
                      TitleText={""}
                      items={
                        subjectClicked === notificationList[1].label
                          ? userList
                          : groupList
                      }
                      mode={DropDownMode.selectable}
                    />
                  </DropDownHeightContainer>
                </DropDownNotificationContainerR>
              </NotificationDropDownContainer>
            ) : (
              <DropDownMainNotificationContainer>
                <DropDownNotificationContainerOne>
                  <SingleSelect
                    placeholder={dataList[0].label}
                    required={false}
                    selectedItem={
                      subjectClicked !== ""
                        ? {
                            label: subjectClicked,
                            value:
                              subjectClicked === notificationList[0].label
                                ? 0
                                : subjectClicked === notificationList[1].label
                                ? 1
                                : 2,
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
                      // @ts-ignore
                      if (item !== undefined) {
                        handleNotifyClicked(item.label);
                      } else {
                        handleNotifyClicked(dataList[0].label);
                      }
                    }}
                    TitleText={""}
                    items={dataList}
                    mode={DropDownMode.selectable}
                    searchable={false}
                  />
                </DropDownNotificationContainerOne>
              </DropDownMainNotificationContainer>
            )
          ) : props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.CREATE_TASK) ? (
            <NotificationDropDownContainer>
              <DropDownNotificationContainer>
                <DropDownHeightContainer>
                  <SingleSelect
                    placeholder={subjectTaskPlaceHolder[0].label}
                    required={false}
                    selectedItem={
                      subjectClicked !== ""
                        ? {
                            label: subjectClicked,
                            value: subjectValueClicked,
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
                        handleSubjectClicked(item.label, item.value);
                      } else {
                        setSubjectClicked("");
                        setSubjectValueClicked(0);
                      }
                    }}
                    TitleText={""}
                    items={dataList}
                    mode={DropDownMode.selectable}
                    searchable={false}
                  />
                </DropDownHeightContainer>
              </DropDownNotificationContainer>
              <DropDownNotificationContainerR>
                {(subjectValueClicked !== 0 || data.subject !== "") &&
                subSubjectSortedList.length !== 0 ? (
                  <DropDownHeightContainer>
                    <SingleSelect
                      placeholder={
                        subSubjectClicked.label === ""
                          ? subSubjectPlaceHolder[0].lebal
                          : subSubjectClicked.label
                      }
                      required={false}
                      selectedItem={
                        subSubjectClicked.label !== ""
                          ? {
                              label: subSubjectClicked.label,
                              value: subSubjectClicked.value,
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
                          setSubSubjectClicked({
                            label: item.label,
                            value: item.value,
                            subjectID: subjectValueClicked,
                          });
                          console.log("setSubSubjectClicked ", item.value);
                        } else {
                          setSubSubjectClicked({
                            label: "",
                            value: 0,
                            subjectID: 0,
                          });
                        }
                      }}
                      TitleText={""}
                      items={subSubjectSortedList}
                      mode={DropDownMode.selectable}
                    />
                  </DropDownHeightContainer>
                ) : (
                  <></>
                )}
              </DropDownNotificationContainerR>
            </NotificationDropDownContainer>
          ) : props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.BOOK_CALL) ? (
            <DropDownContainer>
              <DropDownHeightContainer>
                <SingleSelect
                  placeholder={t(
                    translations.RulesContainer.CREATE_RULE
                      .SELECT_TECHNICIAN_PLACEHOLDER
                  )}
                  required={false}
                  selectedItem={
                    subjectClicked !== ""
                      ? {
                          label: subjectClicked,
                          value: subjectValueClicked,
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
                      handleServiceCallClicked(item.label, item.value);
                    } else {
                      setSubjectClicked("");
                      setSubjectValueClicked(0);
                    }
                  }}
                  TitleText={""}
                  items={dataList}
                  mode={DropDownMode.selectable}
                />
              </DropDownHeightContainer>
            </DropDownContainer>
          ) : (
            <Maintenance
              editRow={editMaintenance}
              maintenanceTypeEdit={maintenanceType}
              maintenanceEntityIDEdit={maintenanceEntityID}
              maintenanceReasonEdit={maintenanceReason}
              noteEdit={note}
              handleDoneActionClicked={(
                maintenanceType,
                maintenanceEntityID,
                maintenanceReason,
                note
              ) => {
                props.handleDoneActionClicked(
                  subjectClicked,
                  subSubjectClicked.value,
                  0,
                  inputText,
                  levelClicked,
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
                );
              }}
              handleClickCancel={() => {
                props.handleClickCancel();
              }}
            />
          )}

          {props.actionItem ===
          t(
            translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
              .MAINTENANCE_TICKET
          ) ? (
            <></>
          ) : (
            <ActionDescription>
              {props.actionItem ===
              t(translations.RulesContainer.CREATE_RULE.CREATE_TASK)
                ? t(
                    translations.RulesContainer.CREATE_RULE
                      .WRITE_DESCRIPTION_TEXT
                  )
                : props.actionItem ===
                  t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE)
                ? ""
                : t(translations.RulesContainer.CREATE_RULE.WRITE_MESSAGE_TEXT)}
            </ActionDescription>
          )}

          {props.actionItem ===
            t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE) ||
          props.actionItem ===
            t(
              translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                .MAINTENANCE_TICKET
            ) ? (
            <></>
          ) : (
            <InputContainer>
              <InputDescription
                placeholder={placeHolder}
                value={inputText}
                onChange={handleChangeTextArea}
              />
            </InputContainer>
          )}

          {props.actionItem ===
          t(translations.RulesContainer.CREATE_RULE.CREATE_TASK) ? (
            <AddActionTask
              handleTaskParams={(
                level,
                asigne,
                object,
                objectIdSelected,
                asigneTask,
                time,
                priority,
                subTaskList,
                taskIdSelected,
                subTaskListCheckBox
              ) =>
                handleTaskParams(
                  level,
                  asigne,
                  object,
                  objectIdSelected,
                  asigneTask,
                  time,
                  priority,
                  subTaskList,
                  taskIdSelected,
                  subTaskListCheckBox
                )
              }
              handleScrollToBottom={() => handleScrollToBottom()}
            />
          ) : (
            <></>
          )}

          <div id="bottom">
            <div style={{ color: "transparent" }}></div>
            <div style={{ color: "transparent" }}></div>
          </div>
        </ScrollDropDown>
      )}
      {props.actionItem ===
      t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .MAINTENANCE_TICKET
      ) ? (
        <></>
      ) : (
        <DoneActionContainer>
          <ActionSelection></ActionSelection>

          <ButtonsActionContainer>
            <CancelActionButton
              onClick={() => {
                props.handleClickCancel();
              }}
            >
              {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
            </CancelActionButton>

            <ModalInfo
              TitleText={title_content_modal.Title}
              ContentText={title_content_modal.Content}
              showModal={showModal}
              setshowModal={setshowModal}
            >
              <DoneActionButton onClick={handleClickDone}>
                {t(translations.RulesContainer.CREATE_RULE.DONE)}
              </DoneActionButton>
            </ModalInfo>
          </ButtonsActionContainer>
        </DoneActionContainer>
      )}
    </SelectActionContainer>
  );
};

export default SelectAction;
