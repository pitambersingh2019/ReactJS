import moment from "moment";
import momentTz from "moment-timezone";
import { DateReturned } from "../../../Component/DesignSystem/DatePicker/types";
import { Status, Task } from "../ts";

// yyyy-mm-dd T hh-mm-ss format
export const DATETIME_REGEX =
  /(19|20)[0-9][0-9]-(0[0-9]|1[0-2])-(0[1-9]|([12][0-9]|3[01]))T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;

export const formatDate = (dateString: DateReturned) =>
  moment(dateString).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

export const getTooltipFormattedDate = (createDate: string) =>
  moment(createDate).format("D/MM/YYYY, H:mm");

export const getTimeFromNow = (dateString: string) => {
  const localeUTC = momentTz.tz(dateString, "Asia/Jerusalem");
  const date = new Date(localeUTC.format());

  const now = new Date();

  const diff = Math.abs(+now - +date); //in miliseconds
  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / (60 * 60));
  const days = Math.floor(seconds / (60 * 60 * 24));
  const months = Math.floor(seconds / (60 * 60 * 24 * 30.5));
  return { months, days, hours, mins, seconds };
};

export const isDateValid = (dateString: string) => {
  if (!DATETIME_REGEX.test(dateString)) {
    return false;
  }
  const momentDate = moment(
    dateString,
    moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  );
  return momentDate.isValid();
};

export const isStartOverdue = (task: Task) =>
  (task.TaskStatus === Status.Unassigned ||
    task.TaskStatus === Status["To Do"]) &&
  moment(task.TaskStartTimeTarget).isBefore(moment(new Date()));
