import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsExporting from "highcharts/modules/exporting";
import highchartsNoData from "highcharts/modules/no-data-to-display";
import highchartsExportData from "highcharts/modules/export-data";
import React, { MutableRefObject, useEffect, useState } from "react";
import moment from "moment";
import { CHART_CUSTOM_CLASS_NAME } from "../../../constants";
import { ResetIcon } from "./styles";
import resetIcon from "../../../../../assets/icons/zoom-reset.svg";
import { renderToString } from "react-dom/server";
import ChartTooltip from "./ChartTooltip/ChartTooltip";
import useAddParamLimits from "../../../hooks/useAddParamLimits";
import { YAxisPlotBands, YAxisPlotLines } from "../../../utils/chart-utils";
import useAddJobActivation from "../../../hooks/useAddJobActivation";
import ExportChart from "./ExportChart/ExportChart";

highchartsExporting(Highcharts);
highchartsNoData(Highcharts);
highchartsExportData(Highcharts);

type LineChartProps = {
  customOptions: {
    jobStartPlotLines: Highcharts.XAxisPlotLinesOptions[];
    series: Highcharts.SeriesOptionsType[];
    yAxisPlotBands: YAxisPlotBands;
    yAxisPlotLines: YAxisPlotLines;
  };
  chartTitle: string;
  showResetZoom: boolean;
  onZoom: (resetSelection: boolean) => void;
  onZoomAllCharts: ({
    max,
    min,
  }: Highcharts.AxisSetExtremesEventObject) => void;
};

const staticOptions: Highcharts.Options = {
  chart: {
    zoomType: "x",
    resetZoomButton: {
      theme: {
        style: {
          display: "none",
        },
      },
    },
  },
  title: {
    align: "left",
    style: {
      fontSize: "16px",
      fontFamily: "ProximaNova",
      fontWeight: "bold",
    },
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
    x: 0,
    y: 25,
    itemMarginBottom: 16,
    itemStyle: {
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "ProximaNova",
    },
    itemWidth: 140,
  },
  credits: { enabled: false },
  plotOptions: {
    series: {
      lineWidth: 1,
      states: {
        inactive: {
          opacity: 0.3,
        },
      },
      stickyTracking: false,
    },
  },
  exporting: {
    buttons: {
      contextButton: {
        enabled: false,
      },
    },
  },
  xAxis: {
    type: "datetime",
    gridLineWidth: 1,
    crosshair: true,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return renderToString(
        <ChartTooltip
          paramName={this.series.name}
          color={this.color}
          date={moment.utc(this.x).format("DD/MM/YY HH:mm:ss")}
          value={this.y}
        />
      );
    },
  },
  yAxis: [
    {
      title: {
        text: "",
      },
    },
    {
      opposite: true,
      title: {
        text: "",
      },
    },
  ],
};

const LineChart = React.forwardRef<
  HighchartsReact.RefObject | null,
  LineChartProps
>(
  (
    {
      customOptions: {
        series,
        jobStartPlotLines,
        yAxisPlotBands,
        yAxisPlotLines,
      },
      chartTitle,
      showResetZoom,
      onZoom,
      onZoomAllCharts,
    },
    ref
  ) => {
    const [options, setOptions] = useState<Highcharts.Options>({});

    const chartRef = ref as MutableRefObject<HighchartsReact.RefObject>;

    const { removePlotBandsLines, addPlotBandsLines } = useAddParamLimits({
      chartRef,
      yAxisPlotBands,
      yAxisPlotLines,
      options,
    });

    useAddJobActivation({ chartRef, jobStartPlotLines });

    const resetZoom = () => {
      if (chartRef && chartRef.current) {
        chartRef.current.chart.zoomOut();
      }
    };

    useEffect(() => {
      setOptions({
        ...staticOptions,
        chart: {
          ...staticOptions.chart,
          events: {
            selection: function (e) {
              // @ts-ignore
              onZoom(e.resetSelection);
              return undefined;
            },
          },
        },
        title: {
          ...staticOptions.title,
          text: chartTitle,
        },
        series,
        xAxis: {
          ...staticOptions.xAxis,
          events: {
            afterSetExtremes(e) {
              onZoomAllCharts(e);
            },
          },
        },
        plotOptions: {
          ...staticOptions.plotOptions,
          series: {
            ...staticOptions.plotOptions?.series,
            events: {
              mouseOver: (e) => {
                //@ts-ignore
                const isPrimaryYAxis = e.target?.options?.yAxis === 0;
                //@ts-ignore
                const seriesId = e.target?.options?.id;
                addPlotBandsLines(seriesId, isPrimaryYAxis);
              },
              mouseOut: (e) => {
                //@ts-ignore
                const isPrimaryYAxis = e.target?.options?.yAxis === 0;
                //@ts-ignore
                const seriesId = e.target?.options?.id;
                removePlotBandsLines(seriesId, isPrimaryYAxis);
              },
            },
          },
        },
      });
    }, [
      addPlotBandsLines,
      chartTitle,
      onZoom,
      onZoomAllCharts,
      removePlotBandsLines,
      series,
    ]);

    return (
      <div
        style={{ height: "100%", position: "relative", width: "100%" }}
        className={CHART_CUSTOM_CLASS_NAME}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%" } }}
          ref={ref}
        />
        {showResetZoom && (
          <ResetIcon src={resetIcon} alt="reset icon" onClick={resetZoom} />
        )}
        <ExportChart chartRef={chartRef} />
      </div>
    );
  }
);

LineChart.displayName = "LineChart";

export default LineChart;
