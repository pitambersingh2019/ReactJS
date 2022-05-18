import Gauge, { TSize } from "./gauge";
import Graph from "./graph";
import ValuePercent, { TPostionText } from "./valuePercent";

export interface IMedia {
  sm?: TSize; //640
  md?: TSize; //1024
  lg?: TSize; //1200
  xl?: TSize; //1400
}

export interface IDataDisplayComponent {
  size: TSize;
  min: number;
  max: number;
  progress: number;
  isPrimary: boolean;
  media: IMedia;
  isPersent: boolean;
  isResultValid: boolean;
}

const fixProgress = (persent: number) => {
  if (persent < 0 || isNaN(persent)) {
    return 0;
  }
  if (persent > 100) {
    return 100;
  }

  return persent;
};

const getPersent = (data: IDataDisplayComponent) => {
  const { progress, min, max } = data;
  const persent = ((progress - min) / (max - min)) * 100;
  const persentFix = fixProgress(persent);
  return [persent, persentFix];
};

export const getDisplayComponent = {
  getValuePercent: (
    data: IDataDisplayComponent,
    positionText: TPostionText,
    color?: string
  ) => {
    return (
      <ValuePercent
        key="percent"
        data={data}
        positionText={positionText}
        color={color}
      />
    );
  },
  getGauge: (
    data: IDataDisplayComponent,
    borderStyle: 0 | 1 | 2,
    bgColorInside?: string
  ) => {
    const dataPersent = getPersent(data);
    return (
      <Gauge
        key="gauge"
        data={data}
        borderStyle={borderStyle}
        bgColorInside={bgColorInside}
        persentFix={dataPersent[1]}
      />
    );
  },
  getGraph: (data: IDataDisplayComponent) => {
    const dataPersent = getPersent(data);
    return <Graph key="graph" data={data} persentFix={dataPersent[1] / 100} />;
  },
};
