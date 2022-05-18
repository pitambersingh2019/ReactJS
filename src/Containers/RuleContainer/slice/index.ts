import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  RulesContainerSlice,
  ErrorType,
  ResponseEvents,
  ResponseTriggers,
  CardsInterface,
  ResponseUserForTask,
  ResponseTaskLevelObject,
  ResponseDepartmentMachine,
  setActiveTriggerInterface,
  DeleteTriggerInterface,
  VIEW_ROWS_GRID,
  FILTERBY,
  SORTBY,
  SORTBY_TYPE,
  ResponseEditCard,
  ResponseParametersMachines,
  ResponseGetTasksObjects,
} from "./types";
import { Search_Filter_Sort } from "./model";
import { NewRuleInterface } from "../../CreateNewRule/slice";
import { ResponseMaintenance } from "./types/ResponseMaintenance";

export const initialState: RulesContainerSlice = {
  Triggers: {
    data: {},
    loading: false,
    error: null,
    cards: [],
    cardsResult: [],
    View: VIEW_ROWS_GRID.GRID,
    SearchValue: "",
    FilterBy: FILTERBY.ALL,
    SortBy: SORTBY.DATE_CREATED,
    SortBy_type: SORTBY_TYPE.ASC,
    ActivateRule: [], //to show a loading screen on each card when switching on/off
    DeleteRules: [], //to show a loading screen on each card when deleteing it
    LastCreateRuleID: null,
    DupicateRule: { data: undefined, rule: {}, status: false },
  },
  RulesSelectedInTable: [], //save the ID's of rules that we want to delete in table
  EventsReasons: {
    data: {},
    loading: false,
    error: null,
  },
  UsersForTask: {
    data: {},
    loading: false,
    error: null,
  },
  TaskLevelObject: {
    data: {},
    loading: false,
    error: null,
  },
  TaskSubjects: {
    data: {},
    loading: false,
    error: null,
  },
  DepartmentMachine: {
    data: {},
    loading: false,
    error: null,
  },
  CardEditData: { loading: false, data: {} },
  ParametersMachine: {
    loading: false,
    error: null,
    data: {},
  },
  Maintenance: {
    loading: false,
    error: null,
    data: {},
  },
};

const slice = createSlice({
  name: "RulesContainerSlice",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    fetchTriggers(state) {},
    loadAllTriggers(state) {
      state.Triggers.loading = true;
      state.Triggers.error = null;
      state.Triggers.data = {};
      state.Triggers.cards = [];
    },
    TriggersLoaded(
      state,
      action: PayloadAction<{ data: ResponseTriggers; cards: CardsInterface[] }>
    ) {
      state.Triggers.data = action.payload.data;
      state.Triggers.loading = false;
      state.Triggers.cards = action.payload.cards;
      state.Triggers.cardsResult = Search_Filter_Sort(
        action.payload.cards,
        state.Triggers.FilterBy,
        state.Triggers.SortBy,
        state.Triggers.SearchValue,
        state.Triggers.SortBy_type
      );
      // state.Triggers.cardsResult = action.payload.cards;
    },
    TriggersError(state, action: PayloadAction<ErrorType>) {
      state.Triggers.error = action.payload;
      state.Triggers.loading = false;
    },
    SetViewOfRules(state) {
      if (state.Triggers.View === VIEW_ROWS_GRID.GRID) {
        state.Triggers.View = VIEW_ROWS_GRID.ROWS;
      } else {
        state.Triggers.View = VIEW_ROWS_GRID.GRID;
      }

      state.RulesSelectedInTable = [];
    },
    LoadAllEventReasonAndGroup(state) {
      state.EventsReasons.loading = true;
      state.EventsReasons.error = null;
      state.EventsReasons.data = {};
    },
    EventReasonAndGroupLoaded(state, action: PayloadAction<ResponseEvents>) {
      const data = action.payload;
      state.EventsReasons.data = data;
      state.EventsReasons.loading = false;
    },
    EventReasonAndGroupError(state, action: PayloadAction<ErrorType>) {
      state.EventsReasons.error = action.payload;
      state.EventsReasons.loading = false;
    },
    loadAllUserForTask(state) {
      state.UsersForTask.loading = true;
      state.UsersForTask.error = null;
      state.UsersForTask.data = {};
    },
    UserForTaskLoaded(state, action: PayloadAction<ResponseUserForTask>) {
      state.UsersForTask.data = action.payload;
      state.UsersForTask.loading = false;
    },
    UserForTaskError(state, action: PayloadAction<ErrorType>) {
      state.UsersForTask.error = action.payload;
      state.UsersForTask.loading = false;
    },
    loadAllTaskLevelObjectk(state) {
      state.TaskLevelObject.loading = true;
      state.TaskLevelObject.error = null;
      state.TaskLevelObject.data = {};
    },
    TaskLevelObjectLoaded(
      state,
      action: PayloadAction<ResponseTaskLevelObject>
    ) {
      state.TaskLevelObject.data = action.payload;
      state.TaskLevelObject.loading = false;
    },
    TaskLevelObjectError(state, action: PayloadAction<ErrorType>) {
      state.TaskLevelObject.error = action.payload;
      state.TaskLevelObject.loading = false;
    },
    TaskSubjectsLoaded(state, action: PayloadAction<ResponseGetTasksObjects>) {
      state.TaskSubjects.data = action.payload;
      state.TaskSubjects.loading = false;
    },
    loadAllTaskSubjects(state) {
      state.TaskSubjects.loading = true;
      state.TaskSubjects.error = null;
      state.TaskSubjects.data = {};
    },
    loadAllDepartmentMachine(state) {
      state.DepartmentMachine.loading = true;
      state.DepartmentMachine.error = null;
      state.DepartmentMachine.data = {};
    },
    DepartmentMachineLoaded(
      state,
      action: PayloadAction<ResponseDepartmentMachine>
    ) {
      state.DepartmentMachine.data = action.payload;
      state.DepartmentMachine.loading = false;
    },
    DepartmentMachineError(state, action: PayloadAction<ErrorType>) {
      state.DepartmentMachine.error = action.payload;
      state.DepartmentMachine.loading = false;
    },
    SetActiveTriggerCard(
      state,
      action: PayloadAction<setActiveTriggerInterface>
    ) {
      //see saga for the call
      if (action.payload.ID)
        state.Triggers.ActivateRule.push(action.payload.ID);
    },
    SetSortType(state) {
      if (state.Triggers.SortBy_type === SORTBY_TYPE.ASC) {
        state.Triggers.SortBy_type = SORTBY_TYPE.DES;
      } else {
        state.Triggers.SortBy_type = SORTBY_TYPE.ASC;
      }
      state.Triggers.cardsResult = Search_Filter_Sort(
        state.Triggers.cards,
        state.Triggers.FilterBy,
        state.Triggers.SortBy,
        state.Triggers.SearchValue,
        state.Triggers.SortBy_type
      );
    },
    ClearActiveTriggerCard(
      state,
      action: PayloadAction<{ id: number | undefined; success: boolean }>
    ) {
      if (action.payload.id) {
        state.Triggers.ActivateRule = state.Triggers.ActivateRule.filter(
          (id) => id !== action.payload.id
        );
      }
    },
    DeleteTrigger(state, action: PayloadAction<DeleteTriggerInterface>) {
      state.Triggers.DeleteRules.push(action.payload.ID);
    },
    DeleteTriggerDone(state, action: PayloadAction<number>) {
      state.Triggers.DeleteRules = state.Triggers.DeleteRules.filter(
        (id) => id !== action.payload
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DeleteSelectedRules(state) {
      //see action in saga!
    },
    DeleteSelectedRulesDone(state) {
      //see action in saga!
      state.RulesSelectedInTable = [];
    },
    SetIsSelectedRule(
      state,
      action: PayloadAction<{ id: number; isSelected: boolean }>
    ) {
      // state.RulesSelectedInTable = action.payload;
      // state.RulesSelectedInTable.push(action.payload);
      if (action.payload.isSelected) {
        state.RulesSelectedInTable.push(action.payload.id);
        state.RulesSelectedInTable = Array.from(
          new Set(state.RulesSelectedInTable)
        );
      } else
        state.RulesSelectedInTable = state.RulesSelectedInTable.filter(
          (id) => id !== action.payload.id
        );
    },
    SearchInCards(state, action: PayloadAction<string>) {
      state.Triggers.SearchValue = action.payload;
      state.Triggers.cardsResult = Search_Filter_Sort(
        state.Triggers.cards,
        state.Triggers.FilterBy,
        state.Triggers.SortBy,
        action.payload,
        state.Triggers.SortBy_type
      );
    },
    SetFilter(state, action: PayloadAction<FILTERBY>) {
      state.Triggers.FilterBy = action.payload;
      state.Triggers.cardsResult = Search_Filter_Sort(
        state.Triggers.cards,
        action.payload,
        state.Triggers.SortBy,
        state.Triggers.SearchValue,
        state.Triggers.SortBy_type
      );
    },
    SetSort(state, action: PayloadAction<SORTBY>) {
      state.Triggers.SortBy = action.payload;
      state.Triggers.cardsResult = Search_Filter_Sort(
        state.Triggers.cards,
        state.Triggers.FilterBy,
        action.payload,
        state.Triggers.SearchValue,
        state.Triggers.SortBy_type
      );
      //console.log("  state.Triggers.cardsResult.sort",   state.Triggers.cardsResult)
      //state.Triggers.cardsResult.sort((elem1,elem2)  => {return Number(elem2.IsActive) - Number(elem1.IsActive)});
      //console.log("  state.Triggers.cardsResult.sort",   state.Triggers.cardsResult)
      //state.Triggers.cardsResult = Search_Filter_Sort(state.Triggers.cardsResult,state.Triggers.FilterBy,state.Triggers.SortBy,state.Triggers.SearchValue);
    },
    SetLastCreateRuleID(state, action: PayloadAction<number>) {
      state.Triggers.LastCreateRuleID = action.payload;
    },
    ClearLastCreateRuleID(state) {
      state.Triggers.LastCreateRuleID = null;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GetAllCardData(state, action: PayloadAction<CardsInterface>) {
      state.CardEditData.loading = false;
    },
    GetAllCardDataDone(state, action: PayloadAction<any>) {
      state.CardEditData.data = action.payload;
      state.CardEditData.loading = true;
    },
    ResetCardEditData(state) {
      state.CardEditData.data = {};
      state.CardEditData.loading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DUPLICATE_GET_DATA_RULE: (state, action: PayloadAction<CardsInterface>) => {
      //see call in saga
    },
    DUPLICATE_GET_DATA_RULE_DONE: (
      state,
      action: PayloadAction<{
        data: ResponseEditCard;
        rule: CardsInterface;
        status: boolean;
      }>
    ) => {
      state.Triggers.DupicateRule.data = action.payload.data;
      state.Triggers.DupicateRule.status = action.payload.status;
      state.Triggers.DupicateRule.rule = action.payload.rule;
    },
    DUPLICATE_SEND_REQUEST_RULE: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ dup: NewRuleInterface; notification_type: any }>
    ) => {
      //see call in saga
    },
    DUPLICATE_RULE_CLEAR: (state) => {
      state.Triggers.DupicateRule.data = {};
      state.Triggers.DupicateRule.status = false;
      state.Triggers.DupicateRule.rule = {};
    },
    loadAllParametersMachines(state) {
      state.ParametersMachine.loading = true;
      state.ParametersMachine.error = null;
      state.ParametersMachine.data = {};
    },
    parametersMachinesLoaded(
      state,
      action: PayloadAction<{ data: ResponseParametersMachines }>
    ) {
      state.ParametersMachine.data = action.payload.data;
      state.ParametersMachine.loading = false;
    },
    loadAllMaintenance(state) {
      state.Maintenance.loading = true;
      state.Maintenance.error = null;
      state.Maintenance.data = {};
    },
    maintenanceLoaded(
      state,
      action: PayloadAction<{ data: ResponseMaintenance }>
    ) {
      state.Maintenance.data = action.payload.data;
      state.Maintenance.loading = false;
    },
  },
});

//, ID : string, Name: string, RuleText: string}

export const {
  loadAllTriggers,
  TriggersLoaded,
  loadAllParametersMachines,
  parametersMachinesLoaded,
  loadAllMaintenance,
  maintenanceLoaded,
  TriggersError,
  DeleteSelectedRules,
  DeleteSelectedRulesDone,
  LoadAllEventReasonAndGroup,
  EventReasonAndGroupLoaded,
  EventReasonAndGroupError,
  loadAllUserForTask,
  UserForTaskError,
  UserForTaskLoaded,
  loadAllTaskLevelObjectk,
  TaskLevelObjectLoaded,
  TaskLevelObjectError,
  loadAllDepartmentMachine,
  DepartmentMachineLoaded,
  DepartmentMachineError,
  DUPLICATE_RULE_CLEAR,
  SetActiveTriggerCard,
  ClearActiveTriggerCard,
  fetchTriggers,
  SetSortType,
  DUPLICATE_SEND_REQUEST_RULE,
  DeleteTrigger,
  DeleteTriggerDone,
  SetViewOfRules,
  SetIsSelectedRule,
  DUPLICATE_GET_DATA_RULE,
  DUPLICATE_GET_DATA_RULE_DONE,
  SearchInCards,
  SetFilter,
  SetSort,
  SetLastCreateRuleID,
  ClearLastCreateRuleID,
  GetAllCardData,
  GetAllCardDataDone,
  ResetCardEditData,
  TaskSubjectsLoaded,
  loadAllTaskSubjects,
} = slice.actions;

export default slice.reducer;
