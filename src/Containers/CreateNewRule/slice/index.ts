import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../Redux/rootReducer";
export enum GroupMessage {
  DepartmentMachine = "DepartmentMachine",
  DepartemntMachineLines = "DepartemntMachineLines",
  DepartemntMachineGroups = "DepartemntMachineGroups",
}

export interface NewRuleInterface {
  ruleName: string;
  intervalType: string;
  eventTime: string;
  triggerDays: any[];
  triggerWeekDays: any[];
  stopGroup: string;
  stopCause: string;
  causeIdSelected: number;
  subject: string;
  subSubject: number;
  description: string;
  levelClicked: string;
  asigneClicked: string;
  objectClicked: string;
  objectIdSelected: number;
  asigneTaskToClicked: string;
  timeClicked: string;
  priorityClicked: string;
  subTaskList: string[];
  subMachinesList: string[];
  subMachinesIDList: number[];
  GroupMessage: GroupMessage;
  subNotifyClicked: string;
  userIdSelected: number;
  editClicked?: boolean;
  dropDownClicked?: boolean;
  dropDownIDClicked?: string;
  subTaskListCheckBox: boolean[];
  isActive: boolean;
  stopReasonID: number[];
  triggerCondition: {
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
  }[];
  amountTimePeriod: number;
  timeIntervalPeriod: string;
  eventTypePeriod: string;
  eventValuePeriod: string;
  maintenanceType: number;
  maintenanceEntityID: number;
  maintenanceReason: number;
  note: string;
}

const initialState: NewRuleInterface = {
  ruleName: "",
  intervalType: "",
  eventTime: "",
  triggerDays: [""],
  triggerWeekDays: [""],
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
  editClicked: false,
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

const createNewRuleSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    SET_TRIGGER_ROW: (state, action: PayloadAction<NewRuleInterface>) => {
      state.ruleName = action.payload.ruleName;
      state.stopCause = action.payload.stopCause;
      state.causeIdSelected = action.payload.causeIdSelected;
      state.stopGroup = action.payload.stopGroup;
      state.intervalType = action.payload.intervalType;
      state.eventTime = action.payload.eventTime;
      state.triggerDays = action.payload.triggerDays;
      state.triggerWeekDays = action.payload.triggerWeekDays;
      state.stopReasonID = action.payload.stopReasonID;
      state.triggerCondition = action.payload.triggerCondition;
      state.amountTimePeriod = action.payload.amountTimePeriod;
      state.timeIntervalPeriod = action.payload.timeIntervalPeriod;
      state.eventTypePeriod = action.payload.eventTypePeriod;
      state.eventValuePeriod = action.payload.eventValuePeriod;
    },
    SET_ACTION_ROW: (state, action: PayloadAction<NewRuleInterface>) => {
      state.ruleName = action.payload.ruleName;
      state.subject = action.payload.subject;
      state.subSubject = action.payload.subSubject;
      state.description = action.payload.description;
      state.levelClicked = action.payload.levelClicked;
      state.asigneClicked = action.payload.asigneClicked;
      state.objectClicked = action.payload.objectClicked;
      state.asigneTaskToClicked = action.payload.asigneTaskToClicked;
      state.timeClicked = action.payload.timeClicked;
      state.priorityClicked = action.payload.priorityClicked;
      state.subTaskList = action.payload.subTaskList;
      state.subMachinesList = action.payload.subMachinesList;
      state.subNotifyClicked = action.payload.subNotifyClicked;
      state.userIdSelected = action.payload.userIdSelected;
      state.objectIdSelected = action.payload.objectIdSelected;
      state.subMachinesIDList = action.payload.subMachinesIDList;
      state.subTaskListCheckBox = action.payload.subTaskListCheckBox;
      state.maintenanceType = action.payload.maintenanceType;
      state.maintenanceEntityID = action.payload.maintenanceEntityID;
      state.maintenanceReason = action.payload.maintenanceReason;
      state.note = action.payload.note;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    SAVE_NEW_CARD: () => {},
    SET_INITIAL_DATA: (state, action: PayloadAction<NewRuleInterface>) => {
      state.editClicked = action.payload.editClicked;
    },
    SET_DATA: (state, action: PayloadAction<NewRuleInterface>) => {
      state.ruleName = action.payload.ruleName;
      state.stopCause = action.payload.stopCause;
      state.causeIdSelected = action.payload.causeIdSelected;
      state.stopGroup = action.payload.stopGroup;
      state.intervalType = action.payload.intervalType;
      state.eventTime = action.payload.eventTime;
      state.triggerDays = action.payload.triggerDays;
      state.triggerWeekDays = action.payload.triggerWeekDays;
      state.subject = action.payload.subject;
      state.subSubject = action.payload.subSubject;
      state.description = action.payload.description;
      state.levelClicked = action.payload.levelClicked;
      state.asigneClicked = action.payload.asigneClicked;
      state.objectClicked = action.payload.objectClicked;
      state.asigneTaskToClicked = action.payload.asigneTaskToClicked;
      state.timeClicked = action.payload.timeClicked;
      state.priorityClicked = action.payload.priorityClicked;
      state.subTaskList = action.payload.subTaskList;
      state.subMachinesList = action.payload.subMachinesList;
      state.subNotifyClicked = action.payload.subNotifyClicked;
      state.userIdSelected = action.payload.userIdSelected;
      state.objectIdSelected = action.payload.objectIdSelected;
      state.subMachinesIDList = action.payload.subMachinesIDList;
      state.editClicked = action.payload.editClicked;
      state.subTaskListCheckBox = action.payload.subTaskListCheckBox;
      state.isActive = action.payload.isActive;
      state.stopReasonID = action.payload.stopReasonID;
      state.triggerCondition = action.payload.triggerCondition;
      state.amountTimePeriod = action.payload.amountTimePeriod;
      state.timeIntervalPeriod = action.payload.timeIntervalPeriod;
      state.eventTypePeriod = action.payload.eventTypePeriod;
      state.eventValuePeriod = action.payload.eventValuePeriod;
      state.maintenanceType = action.payload.maintenanceType;
      state.maintenanceEntityID = action.payload.maintenanceEntityID;
      state.maintenanceReason = action.payload.maintenanceReason;
      state.note = action.payload.note;
    },
    SET_DROPDOWN: (state, action: PayloadAction<NewRuleInterface>) => {
      state.dropDownClicked = action.payload.dropDownClicked;
      state.dropDownIDClicked = action.payload.dropDownIDClicked;
    },
    SET_CARD_ACTIVE: (state, action: PayloadAction<NewRuleInterface>) => {
      state.isActive = action.payload.isActive;
    },
    CLEAR_MACHINES: (state) => {
      state.subMachinesIDList = [];
      state.subMachinesList = [];
    },
    SET_RULENAME_DATA: (state, action: PayloadAction<NewRuleInterface>) => {
      state.ruleName = action.payload.ruleName;
      state.triggerCondition = action.payload.triggerCondition;
    },
  },
});

export const {
  SET_TRIGGER_ROW,
  SET_ACTION_ROW,
  SAVE_NEW_CARD,
  SET_INITIAL_DATA,
  SET_DATA,
  SET_DROPDOWN,
  SET_CARD_ACTIVE,
  CLEAR_MACHINES,
  SET_RULENAME_DATA,
} = createNewRuleSlice.actions;

const selectRuleData = (state: RootState) => state.rules;
export { selectRuleData };

export default createNewRuleSlice.reducer;
