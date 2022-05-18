import { MutableRefObject, useCallback, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useShowParamLimits } from "../context/useParamLimits";
import { YAxisPlotBands, YAxisPlotLines } from "../utils/chart-utils";

type UseAddParamLimitsProps = {
  chartRef: MutableRefObject<HighchartsReact.RefObject>;
  options: Highcharts.Options;
  yAxisPlotBands: YAxisPlotBands;
  yAxisPlotLines: YAxisPlotLines;
};

export default function useAddParamLimits({
  chartRef,
  yAxisPlotBands: { primaryPlotBands, secondaryPlotBands },
  yAxisPlotLines: { primaryPlotLines, secondaryPlotLines },
  options,
}: UseAddParamLimitsProps) {
  const { isShowParamLimitsEnabled } = useShowParamLimits();

  const removePlotLines = useCallback(
    (
      plotLinesArray: Highcharts.AxisPlotLinesOptions[],
      isPrimaryYAxis: boolean
    ) => {
      plotLinesArray.forEach((plotline) => {
        plotline.id &&
          chartRef?.current?.chart.yAxis[isPrimaryYAxis ? 0 : 1].removePlotLine(
            plotline.id
          );
      });
    },
    [chartRef]
  );

  const setPlotLines = useCallback(
    (
      plotLinesArray: Highcharts.AxisPlotLinesOptions[],
      isPrimaryYAxis: boolean
    ) => {
      if (plotLinesArray.length > 0) {
        plotLinesArray.forEach((plotline) => {
          isShowParamLimitsEnabled
            ? chartRef?.current?.chart.yAxis[
                isPrimaryYAxis ? 0 : 1
              ].addPlotLine(plotline)
            : plotline.id &&
              chartRef?.current?.chart.yAxis[
                isPrimaryYAxis ? 0 : 1
              ].removePlotLine(plotline.id);
        });
      }
    },
    [chartRef, isShowParamLimitsEnabled]
  );

  const getExtremes = useCallback(
    (isPrimaryYAxis: boolean) =>
      isPrimaryYAxis
        ? chartRef.current.chart.yAxis[0].getExtremes()
        : chartRef.current.chart.yAxis[1].getExtremes(),
    [chartRef]
  );

  const removePlotBands = useCallback(
    (
      plotBandsArray: Highcharts.AxisPlotBandsOptions[],
      isPrimaryYAxis: boolean
    ) => {
      plotBandsArray.forEach((plotBand) => {
        plotBand.id &&
          chartRef?.current?.chart.yAxis[isPrimaryYAxis ? 0 : 1].removePlotBand(
            plotBand.id
          );
      });
    },
    [chartRef]
  );

  const setPlotBands = useCallback(
    (
      plotBandsArray: Highcharts.AxisPlotBandsOptions[],
      isPrimaryYAxis: boolean
    ) => {
      if (isShowParamLimitsEnabled && plotBandsArray.length > 0) {
        const initExtremes = getExtremes(isPrimaryYAxis);
        plotBandsArray.forEach((plotBand) => {
          if (plotBand.id?.includes("max-band")) {
            const fromValue = Number(plotBand.from);
            //update Y axis max value if param limit is greater than current Y axis max
            if (initExtremes.max < fromValue) {
              chartRef.current.chart.yAxis[isPrimaryYAxis ? 0 : 1].update({
                max: fromValue + fromValue * 0.1,
              });
            }
            const updatedExtr = getExtremes(isPrimaryYAxis);
            chartRef.current.chart.yAxis[isPrimaryYAxis ? 0 : 1].addPlotBand({
              ...plotBand,
              to: updatedExtr.max,
            });
          }
          if (plotBand.id?.includes("min-band")) {
            const toValue = Number(plotBand.to);
            if (initExtremes.min > toValue) {
              chartRef.current.chart.yAxis[isPrimaryYAxis ? 0 : 1].update({
                min: toValue - toValue * 0.1,
              });
            }
            const updatedExtr = getExtremes(isPrimaryYAxis);
            chartRef.current.chart.yAxis[isPrimaryYAxis ? 0 : 1].addPlotBand({
              ...plotBand,
              from: updatedExtr.min,
            });
          }
        });
      } else {
        removePlotBands(plotBandsArray, isPrimaryYAxis);
      }
    },
    [chartRef, getExtremes, isShowParamLimitsEnabled, removePlotBands]
  );

  const addPlotBandsLines = useCallback(
    (seriesId: string, isPrimaryYAxis: boolean) => {
      if (options.series && options.series.length > 1) {
        const plotBands = isPrimaryYAxis
          ? [...primaryPlotBands]
          : [...secondaryPlotBands];

        const plotBandsArray = plotBands.filter((plotBand) =>
          plotBand.id?.includes(seriesId)
        );
        setPlotBands(plotBandsArray, isPrimaryYAxis);

        const plotLines = isPrimaryYAxis
          ? [...primaryPlotLines]
          : [...secondaryPlotLines];

        const plotLinesArray = plotLines.filter((plotLine) =>
          plotLine.id?.includes(seriesId)
        );

        setPlotLines(plotLinesArray, isPrimaryYAxis);

        // hide NOT active yXis. NOTE: visible or labels.enabled props causes blinking
        chartRef.current.chart.yAxis[isPrimaryYAxis ? 1 : 0].update({
          labels: {
            style: {
              color: "#fff",
            },
          },
        });
      }
    },
    [
      chartRef,
      options.series,
      primaryPlotBands,
      primaryPlotLines,
      secondaryPlotBands,
      secondaryPlotLines,
      setPlotBands,
      setPlotLines,
    ]
  );

  const removePlotBandsLines = useCallback(
    (seriesId: string, isPrimaryYAxis: boolean) => {
      if (options.series && options.series.length > 1) {
        const plotBands = isPrimaryYAxis
          ? [...primaryPlotBands]
          : [...secondaryPlotBands];

        const plotBandsArray = plotBands.filter((plotBand) =>
          plotBand.id?.includes(seriesId)
        );
        removePlotBands(plotBandsArray, isPrimaryYAxis);

        const plotLines = isPrimaryYAxis
          ? [...primaryPlotLines]
          : [...secondaryPlotLines];

        const plotLinesArray = plotLines.filter((plotLine) =>
          plotLine.id?.includes(seriesId)
        );

        removePlotLines(plotLinesArray, isPrimaryYAxis);

        //show again NOT active yXis
        chartRef.current.chart.yAxis[isPrimaryYAxis ? 1 : 0].update({
          labels: {
            style: {
              color: "#666666",
            },
          },
        });
      }
    },
    [
      chartRef,
      options.series,
      primaryPlotBands,
      primaryPlotLines,
      removePlotBands,
      removePlotLines,
      secondaryPlotBands,
      secondaryPlotLines,
    ]
  );

  useEffect(() => {
    if (options.series?.length === 1 && Object.keys(options).length > 0) {
      if (primaryPlotBands.length > 0) {
        setPlotBands(primaryPlotBands, true);
        setPlotLines(primaryPlotLines, true);
      }
      if (secondaryPlotBands.length > 0) {
        setPlotBands(secondaryPlotBands, false);
        setPlotLines(secondaryPlotLines, false);
      }
    }
  }, [
    options,
    primaryPlotBands,
    primaryPlotLines,
    secondaryPlotBands,
    secondaryPlotLines,
    setPlotBands,
    setPlotLines,
  ]);

  useEffect(() => {
    //reset Y axis scale to the default value after hiding plot bands and lines
    if (
      !isShowParamLimitsEnabled &&
      chartRef.current.chart.yAxis[0] &&
      chartRef.current.chart.yAxis[1]
    ) {
      chartRef.current.chart.yAxis[0].update({
        max: undefined,
        min: undefined,
      });
      chartRef.current.chart.yAxis[1].update({
        max: undefined,
        min: undefined,
      });
    }
  }, [chartRef, isShowParamLimitsEnabled]);

  return {
    addPlotBandsLines,
    removePlotBandsLines,
  };
}
