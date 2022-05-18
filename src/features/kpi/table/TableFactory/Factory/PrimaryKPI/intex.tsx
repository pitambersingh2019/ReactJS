import { FC } from "react";
import {
  getDisplayComponent,
  IDataDisplayComponent,
} from "../../../../components";
import * as Styled from "./style";

interface IProps {
  formulaName: string;
  displayType: number;
  min: number;
  max: number;
  progress: string | number;
  isResultValid: boolean;
}

const setViewComponent = (
  displayType: number,
  min: number,
  max: number,
  progress: string | number,
  isResultValid: boolean
) => {
  progress = typeof progress !== "number" || isNaN(progress) ? 0 : progress;

  const data: IDataDisplayComponent = {
    size: "s",
    min,
    max,
    progress,
    isPersent: true,
    isPrimary: true,
    media: {},
    isResultValid,
  };

  if (displayType >= 2 && displayType <= 4) {
    return getDisplayComponent.getGauge(
      data,
      (displayType / 2) as 1 | 2,
      "#fafafa"
    );
  }
  if (displayType === 5) {
    return getDisplayComponent.getGraph(data);
  }
  return getDisplayComponent.getValuePercent(data, "bottom-left");
};

const PrimaryKPI: FC<IProps> = ({
  formulaName,
  displayType,
  min,
  max,
  progress,
  isResultValid,
}) => {
  const ViewComponent = setViewComponent(
    displayType,
    min,
    max,
    progress,
    isResultValid
  );

  const name =
    formulaName.length > 35 ? formulaName.slice(0, 32) + "..." : formulaName;

  return (
    <Styled.SecondColumn>
      <Styled.FormulaName>{name}</Styled.FormulaName>
      <Styled.WrapperDisplay>{ViewComponent}</Styled.WrapperDisplay>
    </Styled.SecondColumn>
  );
};

export default PrimaryKPI;
