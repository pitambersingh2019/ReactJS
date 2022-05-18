import React, { FC } from "react";
import {
  getDisplayComponent,
  IDataDisplayComponent,
} from "../../../../components";
import { TSize } from "../../../../components/gauge";
import { TDisplay } from "../../../types";
import * as Styled from "./style";

interface IProps {
  onClickDisplayButton: (value: TDisplay) => void;
  activeType: TDisplay;
}

const arrDisplayType: TDisplay[] = ["Gauge", "Graph", "Percent"];

const getViewComponent = (type: TDisplay) => {
  const getData = (size: TSize): IDataDisplayComponent => ({
    size,
    min: 0,
    max: 100,
    progress: 0,
    isPersent: false,
    isPrimary: false,
    media: {},
    isResultValid: false,
  });
  switch (type) {
    case "Gauge": {
      return getDisplayComponent.getGauge(getData("l"), 0);
    }
    case "Graph": {
      return getDisplayComponent.getGraph(getData("m"));
    }
    default: {
      return getDisplayComponent.getValuePercent(getData("xl"), "center");
    }
  }
};

const ChangeType: FC<IProps> = ({ onClickDisplayButton, activeType }) => {
  return (
    <Styled.WrapperType>
      {arrDisplayType.map((type) => (
        <Styled.WrapperTypeButton key={type}>
          <Styled.DisplayTypeButton
            isActive={type === activeType}
            onClick={() => {
              onClickDisplayButton(type);
            }}
          >
            <Styled.WrapperComponent bottom={type === "Percent" ? 35 : 20}>
              {getViewComponent(type)}
            </Styled.WrapperComponent>
          </Styled.DisplayTypeButton>
          <Styled.TypeButtonText isActive={type === activeType}>
            {type === "Percent" ? "Value" : type}
          </Styled.TypeButtonText>
        </Styled.WrapperTypeButton>
      ))}
    </Styled.WrapperType>
  );
};

export default ChangeType;
