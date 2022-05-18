import { useCallback, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";
import { useCustomTimeFrame } from "../context/useCustomTimeFrame";
import { TimeOption, useTimeFrame } from "../context/useTimeFrame";
import {
  APIPCGraphData,
  PCChart,
  PCDisplay,
  PCGraphData,
  PCGraphDataParam,
  PCGraphDataParams,
} from "../ts";
import { getStartEndTime } from "../utils/date-helpers";

export default function usePCDisplayGraphData() {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [pcGraphsData, setPCGraphsData] = useState<PCChart[] | undefined>(
    undefined
  );
  const [updatedAt, setUpdatedAt] = useState<Date>();

  const { timeFrameSelectedOption } = useTimeFrame();
  const { dates } = useCustomTimeFrame();

  const prepareParams = useCallback(
    (pcDisplays: PCDisplay[]): PCGraphDataParams[] => {
      const { startTime, endTime } = getStartEndTime(
        timeFrameSelectedOption.value,
        dates
      );

      return pcDisplays.map((pcDisplay) => {
        const seriesParams = pcDisplay.PCParams.map((d) => ({
          machineId: d.MachineID,
          paramName: d.ParamName,
          machineDisplayName: d.MachineName,
          paramDisplayName: d.ParamDisplayName,
          isSecondaryAxis: d.IsSecondaryAxis,
          showParamLim: d.ShowParamLimits,
          params: {
            MachineID: d.MachineID,
            ParameterName: d.ParamName,
            endTime,
            startTime,
            Current: getCurrentValue(timeFrameSelectedOption.value),
          },
        }));
        return {
          chartName: pcDisplay.DisplayName,
          seriesParams,
        };
      });
    },
    [dates, timeFrameSelectedOption.value]
  );

  const fetchData = useCallback(
    async (param: PCGraphDataParam) => {
      if (
        (timeFrameSelectedOption.value === "Custom" &&
          param.params.startTime !== "" &&
          param.params.endTime !== "") ||
        timeFrameSelectedOption.value !== "Custom"
      ) {
        try {
          const values = await api
            .post<APIPCGraphData | null>(API_URLS.getPCGraphData, param.params)
            .then((res) => res.data);
          if (values) {
            return {
              machineId: param.machineId,
              machineDisplayName: param.machineDisplayName,
              paramName: param.paramName,
              paramDisplayName: param.paramDisplayName,
              isSecondaryAxis: param.isSecondaryAxis,
              showParamLim: param.showParamLim,
              data: values,
            };
          }
        } catch (err) {
          setStatus("error");
        }
      }
    },
    [timeFrameSelectedOption.value]
  );

  const fetchPCGraphData = useCallback(
    async (pcDisplays: PCDisplay[]) => {
      const chartsData = [] as PCChart[];
      const paramsArray = prepareParams(pcDisplays);
      setStatus("loading");
      await Promise.all(
        paramsArray.map(async (params) => {
          let chart = [] as PCGraphData[];
          await Promise.all(
            params.seriesParams.map(async (p) => {
              const res = await fetchData(p);
              res && chart.push(res);
            })
          );

          chartsData.push({ [params.chartName]: chart });
        })
      );
      const ordered = pcDisplays.flatMap((display) => {
        const chart = chartsData.find(
          (obj) => Object.keys(obj)[0] === display.DisplayName
        );
        return chart ? [chart] : [];
      });
      setPCGraphsData(ordered);
      setStatus("success");
      setUpdatedAt(new Date());
    },
    [fetchData, prepareParams]
  );

  return { pcGraphsData, status, fetchPCGraphData, updatedAt };
}

const getCurrentValue = (
  selectedOption: TimeOption["value"]
): 0 | 1 | 2 | 6 => {
  if (selectedOption === "CurrentShift") {
    return 1;
  }
  if (selectedOption === "CurrentDay") {
    return 2;
  }
  if (selectedOption === "CurrentJob") {
    return 6;
  }

  return 0;
};
