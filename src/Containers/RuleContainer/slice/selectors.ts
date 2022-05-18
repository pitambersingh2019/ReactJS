import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.RulesContainerSlice || initialState;

export const selectEventReasons = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.EventsReasons
);

export const selectAllTriggers = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers
);

export const selectCards = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.cards
);

export const selectCardsResults = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.cardsResult
);

export const selectCountActiveRules = createSelector(
  [selectDomain],
  (RulesContainerSlice) => {
    let count = 0;
    RulesContainerSlice.Triggers.cards.forEach((elem) => {
      if (elem.IsActive) count += 1;
    });
    return count;
  }
);

export const selectLastCreated = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.LastCreateRuleID
);

export const selectErrorTriggers = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.error
);

export const selectLoadingTriggers = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.loading
);

export const selectActivateRuleSwitch = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.ActivateRule
);

export const selectDeletedRule = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.DeleteRules
);

export const selectAllUserForTask = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.UsersForTask
);

export const selectAllTaskLevelObject = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.TaskLevelObject
);

export const selectAllTaskSubjects = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.TaskSubjects
);

export const selectAllDepartmentMachine = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.DepartmentMachine
);

export const selectAllMaintenance = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Maintenance
);

export const selectParametersMachine = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.ParametersMachine
);

export const selectViewRules = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.View
);

export const selectIsSelectedRuleInTable = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.RulesSelectedInTable
);

export const selectSearchValue = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.SearchValue
);

export const selectSortBy = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.SortBy
);

export const selectFilterBy = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.FilterBy
);

export const selectEditData = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.CardEditData
);

export const selectEditDataLoading = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.CardEditData.loading
);

export const selectDuplicateData = createSelector(
  [selectDomain],
  (RulesContainerSlice) => RulesContainerSlice.Triggers.DupicateRule
);
