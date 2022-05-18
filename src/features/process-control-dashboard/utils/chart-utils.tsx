import moment from "moment";
import { renderToString } from "react-dom/server";
import ChartPlotLineLabel from "../components/DasboardView/Charts/ChartPlotLineLabel.tsx/ChartPlotLineLabel";
import { JobDetails, PCGraphData } from "../ts";

export type YAxisMax = {
  yAxisMaxPrimary: number | null;
  yAxisMaxSecondary: number | null;
};

export type YAxisPlotLines = {
  primaryPlotLines: Highcharts.AxisPlotLinesOptions[];
  secondaryPlotLines: Highcharts.AxisPlotLinesOptions[];
};

export type YAxisPlotBands = {
  primaryPlotBands: Highcharts.AxisPlotBandsOptions[];
  secondaryPlotBands: Highcharts.AxisPlotBandsOptions[];
};

function createPlotLinesBands(item: PCGraphData) {
  const maxLimitArray = item.data.Graph.filter((d) => d.HValue);
  const maxLimit = maxLimitArray.length > 0 ? maxLimitArray[0].HValue : null;
  const minLimitArray = item.data.Graph.filter((d) => d.LValue);
  const minLimit = minLimitArray.length > 0 ? minLimitArray[0].LValue : null;

  const primaryPlotLines = [] as Highcharts.AxisPlotLinesOptions[];
  const secondaryPlotLines = [] as Highcharts.AxisPlotLinesOptions[];

  const primaryPlotBands = [] as Highcharts.AxisPlotBandsOptions[];
  const secondaryPlotBands = [] as Highcharts.AxisPlotBandsOptions[];

  if (maxLimit) {
    const maxValue: Highcharts.AxisPlotLinesOptions = {
      value: maxLimit,
      color: "#C73431",
      width: 2,
      dashStyle: "ShortDash" as Highcharts.DashStyleValue,
      zIndex: 1,
      id: `max-line-${item.machineId}-${item.paramName}`,
    };

    const maxBand: Highcharts.AxisPlotBandsOptions = {
      from: maxLimit,
      color: "#fadad9",
      id: `max-band-${item.machineId}-${item.paramName}`,
    };
    if (item.isSecondaryAxis) {
      secondaryPlotLines.push(maxValue);
      secondaryPlotBands.push(maxBand);
    } else {
      primaryPlotLines.push(maxValue);
      primaryPlotBands.push(maxBand);
    }
  }
  if (minLimit) {
    const minValue = {
      value: minLimit,
      color: "#C73431",
      width: 2,
      dashStyle: "ShortDash" as Highcharts.DashStyleValue,
      zIndex: 1,
      id: `min-line-${item.machineId}-${item.paramName}`,
    };
    const minBand: Highcharts.AxisPlotBandsOptions = {
      to: minLimit,
      color: "#fadad9",
      id: `min-band-${item.machineId}-${item.paramName}`,
    };
    if (item.isSecondaryAxis) {
      secondaryPlotLines.push(minValue);
      secondaryPlotBands.push(minBand);
    } else {
      primaryPlotLines.push(minValue);
      primaryPlotBands.push(minBand);
    }
  }

  return {
    primaryPlotLines,
    secondaryPlotLines,
    primaryPlotBands,
    secondaryPlotBands,
  };
}

function createJobStartEvent(details: JobDetails[]) {
  const jobStartPlotLines = [] as Highcharts.XAxisPlotLinesOptions[];
  details.forEach((detailsItem) => {
    jobStartPlotLines.push({
      id: `job-start-${detailsItem.JobID}`,
      color: "#afafaf",
      width: 2,
      value: new Date(detailsItem.StartTime).getTime(),
      zIndex: 5,
      dashStyle: "Dash",
      label: {
        style: {
          display: "none",
          backgroundColor: "white",
          padding: "12px",
          border: "1px solid #e4e7eb",
        },
        rotation: 0,
        useHTML: true,
        formatter: function () {
          const v = moment(detailsItem.StartTime).valueOf();
          const time = moment.utc(v).format("DD/MM/YY HH:mm:ss");
          return renderToString(
            <ChartPlotLineLabel jobDetails={detailsItem} timeStamp={time} />
          );
        },
      },
      events: {
        mouseover: function () {
          this.label.element.style.display = "block";
        },
        mouseout: function () {
          this.label.element.style.display = "none";
        },
      },
    });
  });
  return jobStartPlotLines;
}

export function createOptions({ graphData }: { graphData: PCGraphData[] }) {
  let yAxisPlotLines: YAxisPlotLines = {
    primaryPlotLines: [],
    secondaryPlotLines: [],
  };

  let yAxisPlotBands: YAxisPlotBands = {
    primaryPlotBands: [],
    secondaryPlotBands: [],
  };

  let jobStartPlotLines: Highcharts.XAxisPlotLinesOptions[] = [];

  const options = graphData.map((d) => {
    if (d.data.Graph?.length > 0) {
      const res = d.data.Graph?.reduce((result, item) => {
        result.push([
          moment.utc(item.RecordTime).valueOf(), //render time without timezone conversion
          item[d.paramName] ? Number(item[d.paramName]) : null,
        ]);
        return result;
      }, [] as [number, number | null][]);

      if (d.showParamLim) {
        //create horizontal plot lines
        const {
          primaryPlotLines,
          secondaryPlotLines,
          primaryPlotBands,
          secondaryPlotBands,
        } = createPlotLinesBands(d);

        yAxisPlotLines.primaryPlotLines.push(...primaryPlotLines);
        yAxisPlotLines.secondaryPlotLines.push(...secondaryPlotLines);
        yAxisPlotBands.primaryPlotBands.push(...primaryPlotBands);
        yAxisPlotBands.secondaryPlotBands.push(...secondaryPlotBands);
      }

      // //create vertical plot lines only if one machine selected
      const isOneMachine = graphData
        .map((data) => data.machineId)
        .every((machine, i, arr) => machine === arr[0]);

      if (isOneMachine && d.data.Details) {
        jobStartPlotLines = createJobStartEvent(d.data.Details);
      }

      return {
        data: res,
        name: `${d.machineDisplayName} | ${d.paramDisplayName}`,
        isSecondaryAxis: d.isSecondaryAxis,
        id: `${d.machineId}-${d.paramName}`,
      };
    }
  });

  const series: Highcharts.SeriesOptionsType[] = options.map((o) => ({
    data: o?.data || [],
    name: o?.name || "",
    type: "spline",
    yAxis: o?.isSecondaryAxis ? 1 : 0,
    id: o?.id,
  }));

  return {
    yAxisPlotLines,
    jobStartPlotLines,
    series,
    yAxisPlotBands,
  };
}
