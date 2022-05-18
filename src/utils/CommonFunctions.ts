import { useCallback } from "react";
import debounce from "lodash.debounce";
import moment from "moment";
import {
  FEW_SECONDS_AGO,
  LESS_THAN_MIN,
  MIN_AGO,
  HOUR_AGO,
  WEEK_AGO,
  TWO_WEEKS_AGO,
  THREE_WEEKS_AGO,
  DAYS_AGO,
  MONTHS_AGO,
  TODAY,
} from "./Constants";

export function useDebounce(callback: any, delay: number) {
  const debouncedFn = useCallback(
    debounce((...args: any[]) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
  return debouncedFn;
}

export const isLocalLanguage = (lang: string) => {
  return lang !== "eng";
};

export const timeAgo = (prevDate: string) => {
  if (prevDate === null) {
    return "";
  }
  //let formatted = moment(prevDate, moment.ISO_8601).format('MM/DD/YYYY HH:mm');
  let datem = moment(prevDate);
  let dateComponent = datem.utc().format("YYYY-MM-DD");
  let timeComponent = datem.utc().format("HH:mm:ss");
  let formatted = dateComponent + " " + timeComponent;

  const date = new Date(prevDate);
  const diff = Number(new Date()) - Number(date);
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      if (seconds <= 25) {
        return [0, FEW_SECONDS_AGO];
      } else {
        return [0, LESS_THAN_MIN];
      }
    case diff < hour:
      return [Math.round(diff / minute), MIN_AGO];
    case diff < day:
      return [Math.round(diff / hour), HOUR_AGO];
    case diff < month:
      const days = Math.round(diff / day);
      if (days === 7) {
        return [0, WEEK_AGO];
      } else if (days === 14) {
        return [0, TWO_WEEKS_AGO];
      } else if (days === 21) {
        return [0, THREE_WEEKS_AGO];
      } else {
        return [days, DAYS_AGO];
      }
    case diff < year:
      return [Math.round(diff / month), MONTHS_AGO];
    default:
      return [formatted, "DATE"];
  }
};

export const timeAgoLastFired = (prevDate: string) => {
  if (prevDate === null) {
    return "";
  }
  let formatted = moment(prevDate, moment.ISO_8601).format("MM/DD/YYYY HH:mm");
  const date = new Date(prevDate);
  const diff = Number(new Date()) - Number(date);
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  switch (true) {
    case diff < minute:
      return [0, TODAY];
    case diff < hour:
      return [0, TODAY];
    case diff < day:
      return [0, TODAY];
    case diff < month:
      const days = Math.round(diff / day);
      if (days === 7) {
        return [0, WEEK_AGO];
      } else if (days === 14) {
        return [0, TWO_WEEKS_AGO];
      } else if (days === 21) {
        return [0, THREE_WEEKS_AGO];
      } else {
        return [days, DAYS_AGO];
      }
    default:
      return [formatted, "DATE"];
  }
};

export const DateTime = (prevDate: string) => {
  if (prevDate === null) {
    return "";
  }
  let datem = moment(prevDate);
  //DD/MM/YY HH:mm
  // let dateComponent = datem.format("DD MMM YYYY");
  // let timeComponent = datem.format("hh:mm A");
  let dateComponent = datem.format("DD/MM/YYYY");
  let timeComponent = datem.format("HH:mm");
  return dateComponent + ", " + timeComponent;

  //    return moment(prevDate, moment.ISO_8601).format('DD MMM YYYY, hh:mm A');
};

//temporary functions start!

export const checkMenuDOM = () => {
  if (document.getElementById("side-menu")) return true;
  return false;
};

//temporart functions end!
