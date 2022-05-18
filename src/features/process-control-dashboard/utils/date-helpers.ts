import moment from "moment";
import { TimeOption } from "../context/useTimeFrame";

export const formatDate = (date: Date) =>
  moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

export const getStartEndTime = (
  selectedTimeFrame: TimeOption["value"],
  dates: {
    customStartDate: Date | null;
    customEndDate: Date | null;
  }
): { startTime: string; endTime: string } => {
  const now = new Date();
  if (selectedTimeFrame === "Hour") {
    return {
      endTime: formatDate(now),
      startTime: formatDate(moment(now).subtract(1, "hour").toDate()),
    };
  }
  if (selectedTimeFrame === "Day") {
    return {
      endTime: formatDate(now),
      startTime: formatDate(moment(now).subtract(24, "hours").toDate()),
    };
  }
  if (selectedTimeFrame === "Yesterday") {
    return {
      endTime: formatDate(moment(now).startOf("day").toDate()),
      startTime: formatDate(
        moment(now).subtract(1, "day").startOf("day").toDate()
      ),
    };
  }
  if (selectedTimeFrame === "Week") {
    return {
      endTime: formatDate(now),
      startTime: formatDate(moment(now).subtract(7, "days").toDate()),
    };
  }
  if (selectedTimeFrame === "Month") {
    return {
      endTime: formatDate(now),
      startTime: formatDate(moment(now).subtract(30, "days").toDate()),
    };
  }
  if (selectedTimeFrame === "Year") {
    return {
      endTime: formatDate(now),
      startTime: formatDate(moment(now).subtract(12, "months").toDate()),
    };
  }
  if (selectedTimeFrame === "Custom") {
    return {
      endTime: dates.customEndDate ? formatDate(dates.customEndDate) : "",
      startTime: dates.customStartDate ? formatDate(dates.customStartDate) : "",
    };
  }
  //if CurrentShift or CurrentJob or CurrentDay
  return {
    endTime: "",
    startTime: "",
  };
};
