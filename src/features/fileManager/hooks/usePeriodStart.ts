import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectSelectedPeriod } from "../redux/selectors";
import { SelectedPeriod } from "../ts";

const getPeriodStart = (selectedPeriod: SelectedPeriod) => {
  const now = new Date();
  if (selectedPeriod === "LastWeek") {
    return moment(now).subtract(1, "week").toDate();
  }
  if (selectedPeriod === "LastMonth") {
    return moment(now).subtract(1, "month").toDate();
  }
  if (selectedPeriod === "Last3Months") {
    return moment(now).subtract(3, "month").toDate();
  }
  if (selectedPeriod === "Last6Months") {
    return moment(now).subtract(6, "month").toDate();
  }
};

export default function usePeriodStart() {
  const [periodStart, setPeriodStart] = useState<Date | undefined>(undefined);
  const selectedPeriod = useAppSelector(selectSelectedPeriod);

  useEffect(() => {
    setPeriodStart(getPeriodStart(selectedPeriod));
  }, [selectedPeriod]);

  return { periodStart };
}
