import { MutableRefObject, useEffect } from "react";
import { useJobActivation } from "../context/useJobActivation";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type UseAddJobActivationProps = {
  jobStartPlotLines: Highcharts.XAxisPlotLinesOptions[];
  chartRef: MutableRefObject<HighchartsReact.RefObject>;
};

export default function useAddJobActivation({
  jobStartPlotLines,
  chartRef,
}: UseAddJobActivationProps) {
  const { isJobActivationEnabled } = useJobActivation();

  useEffect(() => {
    if (jobStartPlotLines.length > 0) {
      jobStartPlotLines.forEach((plotLine) => {
        if (isJobActivationEnabled) {
          chartRef.current.chart.xAxis[0].addPlotLine({
            ...plotLine,
          });
        } else {
          plotLine.id &&
            chartRef.current.chart.xAxis[0].removePlotLine(plotLine.id);
        }
      });
    }
  }, [chartRef, isJobActivationEnabled, jobStartPlotLines]);
}
