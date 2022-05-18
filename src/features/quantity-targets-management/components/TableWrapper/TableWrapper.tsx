import { useEffect } from "react";
import Spinner from "../../../targets-management/components/Spinner/Spinner";
import useTableData from "../../hooks/useTableData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getUnitsTargetValues,
  updateLocalSelectedPeriods,
  updateSelectedPeriods,
} from "../../redux/quantityTargetsManagementSlice";
import { SelectedPeriod, SelectedTimeRange } from "../../ts";
import Table from "./Table/Table";

export default function TableWrapper() {
  const dispatch = useAppDispatch();
  const { loading, unitsTargetValues, selectedTimeRange } = useAppSelector(
    (state) => state.qtm
  );

  const { columns, tableData } = useTableData(unitsTargetValues);

  useEffect(() => {
    dispatch(
      getUnitsTargetValues({
        recurringPeriod: selectedTimeRange,
        manualPeriod: 0,
        periodStart: [],
      })
    );
  }, [dispatch, selectedTimeRange]);

  useEffect(() => {
    if (
      (selectedTimeRange === SelectedTimeRange.Shift ||
        selectedTimeRange === SelectedTimeRange.Day) &&
      unitsTargetValues.length > 0
    ) {
      const initialPeriods: SelectedPeriod[] =
        unitsTargetValues[0].DepartmentPeriodTargets?.map((target) => ({
          name: target.PeriodName,
          checked: true,
        }));
      dispatch(updateSelectedPeriods(initialPeriods));
      dispatch(updateLocalSelectedPeriods(initialPeriods));
    }
  }, [dispatch, selectedTimeRange, unitsTargetValues]);

  if (loading) return <Spinner />;

  return <Table columns={columns} data={tableData} />;
}
