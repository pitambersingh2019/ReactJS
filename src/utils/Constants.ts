import { PromiseToastInterface } from "../Component/Toast/type";

export const FEW_SECONDS_AGO = "FEW_SECONDS_AGO";
export const LESS_THAN_MIN = "LESS_THAN_MIN";
export const MIN_AGO = "MIN_AGO";
export const HOUR_AGO = "HOUR_AGO";
export const DAYS_AGO = "DAYS_AGO";
export const WEEK_AGO = "WEEK_AGO";
export const TWO_WEEKS_AGO = "TWO_WEEKS_AGO";
export const THREE_WEEKS_AGO = "THREE_WEEKS_AGO";
export const MONTHS_AGO = "MONTHS_AGO";
export const TODAY = "TODAY";

//TOASTS
export const SetActiveToast: PromiseToastInterface = {
  success: {
    Title: "Rule Activated / Deactivated Successfully ",
    SubTitle: "The action completed",
  },
  pending: {
    Title: "Loading please wait...",
    SubTitle: "",
  },
  error: {
    Title: "Error",
    SubTitle: "The action didn't complete",
  },
};
