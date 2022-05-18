import { ErrorType } from "./Error";
import { EventsAndGroup, ResponseEvents } from "./ResponseEvents";
import {
  IntervalType,
  ResponseList,
  ResponseTriggers,
} from "./ResponseTriggers";
import { ResponseUserForTask } from "./ResponseUserForTask";
import { ResponseTaskLevelObject } from "./ResponseTaskLevelObject";
import { ResponseGetTasksObjects } from "./ResponseGetTasksObjects";
import { ResponseDepartmentMachine } from "./ResponseDepartmentMachine";
import {
  CardsInterface,
  DeleteTriggerInterface,
  setActiveTriggerInterface,
  VIEW_ROWS_GRID,
  ConditionType,
} from "./others";

import { FILTERBY, SORTBY, SORTBY_TYPE } from "./Filters";
import { ResponseEditCard } from "./ResponseEditCard";
import {} from "../../../CreateNewRule/slice";
import { ResponseParametersMachines } from "./ResponseParametersMachines";

export interface RulesContainerSlice {
  Triggers: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseTriggers;
    cards: CardsInterface[];
    cardsResult: CardsInterface[];
    View: VIEW_ROWS_GRID;
    SearchValue: string;
    FilterBy: FILTERBY;
    SortBy: SORTBY;
    SortBy_type: SORTBY_TYPE;
    ActivateRule: number[];
    DeleteRules: number[];
    LastCreateRuleID: number | null;
    DupicateRule: {
      data: ResponseEditCard | undefined;
      rule: any | undefined;
      status: boolean;
    };
  };
  RulesSelectedInTable: number[];
  EventsReasons: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseEvents;
  };
  UsersForTask: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseUserForTask;
  };
  TaskLevelObject: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseTaskLevelObject;
  };
  TaskSubjects: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseGetTasksObjects;
  };
  DepartmentMachine: {
    loading: boolean;
    error?: ErrorType | null;
    data: ResponseDepartmentMachine;
  };
  ParametersMachine: {
    loading: boolean;
    error?: ErrorType | null;
    data: any;
  };
  Maintenance: {
    loading: boolean;
    error?: ErrorType | null;
    data: any;
  };
  CardEditData: { loading: boolean; data: ResponseEditCard };
}

export interface Map {
  [key: string]: string | undefined;
}

export { ErrorType, VIEW_ROWS_GRID };
export type { EventsAndGroup, ResponseEvents };
export { FILTERBY, SORTBY, SORTBY_TYPE };
export { IntervalType };
export type { ResponseList, ResponseTriggers };
export type { ResponseUserForTask };
export type { ResponseTaskLevelObject };
export type { ResponseGetTasksObjects };
export type { ResponseDepartmentMachine };
export type {
  CardsInterface,
  DeleteTriggerInterface,
  setActiveTriggerInterface,
};
export type { ResponseEditCard };
export type { ResponseParametersMachines };
export { ConditionType };
