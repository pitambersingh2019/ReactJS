import React, { useContext, useEffect, useState } from "react";
import { CreateKPIContext, getDisplayTypeID } from "../..";
import * as Styled from "./style";
import Result from "./Result";
import { TDisplay } from "../../types";
import {
  getDisplayComponent,
  IDataDisplayComponent,
} from "../../../components";
import { dataIKPI } from "../../../reducer/types";
import Tabs from "../Second/Tabs";
import filterImg from "./../../../assets/img/Filter_modal.svg";
import KPIFouth from "./KPI";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import RowActiveCK from "./RowActive";
import HtmlTooltip from "../../../../../Component/ToolTip/TooltipSelect";

const getDisplay = (dispalyType: TDisplay) => {
  const data: IDataDisplayComponent = {
    size: "s",
    min: 0,
    max: 100,
    progress: 0,
    isPersent: false,
    isPrimary: false,
    media: {},
    isResultValid: false,
  };
  if (dispalyType === "Gauge") {
    return getDisplayComponent.getGauge(data, 0, "white");
  }
  if (dispalyType === "Graph") {
    return getDisplayComponent.getGraph(data);
  }
  return getDisplayComponent.getValuePercent(data, "center");
};

const initialKPI: dataIKPI = {
  isResultValid: true,
  isPrimary: false,
  DecimalsRound: 0,
  Formula: "",
  Filter: "",
  DisplayOrder: -1,
  FormulaName: "",
  DisplayType: 1,
  MaxValue: 100,
  MaxValueDay: 100,
  MaxValueMonth: 100,
  MaxValueShift: 100,
  MaxValueWeek: 100,
  MinValue: 0,
  MinValueDay: 0,
  MinValueMonth: 0,
  MinValueShift: 0,
  MinValueWeek: 0,
  Result: 70,
  isActive: true,
  FormulaID: -1,
  creationDate: "",
};

const getSaveFormula = (formula: string) => {
  if (formula.length <= 150)
    return <Styled.ResultStep>{formula}</Styled.ResultStep>;
  return (
    <HtmlTooltip
      title={<Styled.TooltipWrapper>{formula}</Styled.TooltipWrapper>}
    >
      <Styled.ResultStep>{`${formula.slice(0, 150)}...`}</Styled.ResultStep>
    </HtmlTooltip>
  );
};

const FouthStep = () => {
  const contextCreate = useContext(CreateKPIContext);
  const [kpi, setKpi] = useState<dataIKPI>(initialKPI);
  const { t } = useTranslation();

  useEffect(() => {
    if (contextCreate !== null) {
      const {
        firstStepSetting,
        secondStepSetting,
        thirdStepSetting,
        fourthStepSetting,
      } = contextCreate;
      const { KPIName } = firstStepSetting;
      const { displayType } = secondStepSetting;
      const { gaugeType, digists } = thirdStepSetting;
      const { isActive, isPrimary } = fourthStepSetting;

      setKpi((prev) => ({
        ...prev,
        FormulaName: KPIName,
        DisplayType: getDisplayTypeID(displayType, gaugeType),
        isActive,
        DecimalsRound: digists,
        isPrimary,
      }));
    }
  }, [contextCreate]);

  if (contextCreate === null) return <div></div>;

  const {
    firstStepSetting,
    secondStepSetting,
    fourthStepSetting,
    setFourthStepSetting,
  } = contextCreate;

  const onChangeActive = () => {
    setFourthStepSetting((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const onClickPrimary = () => {
    setFourthStepSetting((prev) => ({
      ...prev,
      isPrimary: !prev.isPrimary,
    }));
  };

  const { saveFormula } = firstStepSetting;
  const { displayType, filter } = secondStepSetting;
  const { isActive, isPrimary } = fourthStepSetting;

  return (
    <Styled.Wrapper>
      <Styled.ResultWrapper>
        <RowActiveCK
          isActive={isActive}
          isPrimary={isPrimary}
          onClickActive={onChangeActive}
          onClickPrimary={onClickPrimary}
        />
        <Result
          step={1}
          gap={16}
          title={t(translations.CustomKPI.FourthStepFormula)}
        >
          {getSaveFormula(saveFormula)}
        </Result>
        <Result
          step={2}
          gap={13}
          title={t(translations.CustomKPI.SecondStepFilterSetting)}
          img={filterImg}
        >
          <Styled.TabsWrapper>
            <Tabs tabs={filter} isTooltip={true} />
          </Styled.TabsWrapper>
        </Result>
        <Result
          step={2}
          gap={8}
          title={t(translations.CustomKPI.FourthStepDisplayType)}
        >
          <Styled.DisplayWrapper>
            <Styled.ResultStep>
              {displayType === "Percent" ? "Value" : displayType}
            </Styled.ResultStep>
            {getDisplay(displayType)}
          </Styled.DisplayWrapper>
        </Result>
      </Styled.ResultWrapper>
      <Styled.PreviewWrapper>
        <Styled.Title>
          {t(translations.CustomKPI.FourthStepPreview)}
        </Styled.Title>
        <KPIFouth kpi={kpi} isPrimary={isPrimary && isActive} />
      </Styled.PreviewWrapper>
    </Styled.Wrapper>
  );
};

export default FouthStep;
