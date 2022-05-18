import HighchartsReact from "highcharts-react-official";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AUTO_NAME_DIVIDER } from "../../../constants";
import { useCharts } from "../../../context/useCharts";
import { useZoomAll } from "../../../context/useZoomAll";
import { useZoomed } from "../../../context/useZoomed";
import { PCChart } from "../../../ts";
import { createOptions } from "../../../utils/chart-utils";
import LineChart from "./LineChart";

type LineChartWrapperProps = {
  chartData: PCChart;
};

export default function LineChartWrapper({ chartData }: LineChartWrapperProps) {
  const { setRef, charts } = useCharts();
  const [chartRef, setChartRef] =
    useState<React.RefObject<HighchartsReact.RefObject>>();

  const { isZoomed, setIsZoomed } = useZoomed();
  const { zoomAll } = useZoomAll();

  const graphData = Object.values(chartData).flat();

  const options = useMemo(
    () =>
      createOptions({
        graphData,
      }),
    [graphData]
  );

  const chartTitle = useMemo(
    () => Object.keys(chartData)[0].replace(AUTO_NAME_DIVIDER, ", "),
    [chartData]
  );

  const showResetZoomIcon = useCallback(() => {
    if (zoomAll) {
      return isZoomed !== -1;
    }

    return (
      isZoomed ===
      (chartRef as MutableRefObject<HighchartsReact.RefObject>)?.current?.chart
        .index
    );
  }, [chartRef, isZoomed, zoomAll]);

  const onZoom = (resetSelection: boolean) => {
    if (resetSelection) {
      setIsZoomed(-1);
    } else {
      setIsZoomed(
        (chartRef as MutableRefObject<HighchartsReact.RefObject>).current.chart
          .index
      );
    }
  };

  const onZoomAllCharts = ({
    max,
    min,
  }: Highcharts.AxisSetExtremesEventObject) => {
    if (zoomAll) {
      charts.forEach((chart) =>
        chart.current?.chart.xAxis[0].setExtremes(min, max)
      );
    }
  };

  useEffect(() => {
    setChartRef(setRef());
  }, [setRef]);

  return chartRef ? (
    <LineChart
      ref={chartRef}
      customOptions={options}
      chartTitle={chartTitle}
      showResetZoom={showResetZoomIcon()}
      onZoom={onZoom}
      onZoomAllCharts={onZoomAllCharts}
    />
  ) : null;
}
