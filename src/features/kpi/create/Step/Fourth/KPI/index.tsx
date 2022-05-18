import React, { FC } from "react";
import * as Styled from "./style";
import flagDefault from "./../../../../assets/img/Bookmark_default.svg";
import flagSelected from "./../../../../assets/img/Bookmark_selected.svg";
import { dataIKPI } from "../../../../reducer/types";
import {
  getDisplayComponent,
  IDataDisplayComponent,
} from "../../../../components";
import dots from "./../../../../assets/img/3_dots_menu.svg";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";
import MySwitch from "../../../../../../Component/CustomComponent/MySwitch";

interface IProps {
  kpi: dataIKPI;
  isPrimary: boolean;
}

const setViewComponent = (
  displayType: number,
  min: number,
  max: number,
  progress: string | number
) => {
  progress = typeof progress === "string" ? 0 : progress;
  const data: IDataDisplayComponent = {
    size: "m",
    min,
    max,
    progress,
    isPersent: true,
    isPrimary: false,
    media: {},
    isResultValid: true,
  };

  if (displayType >= 2 && displayType <= 4) {
    return getDisplayComponent.getGauge(
      data,
      (displayType / 2) as 1 | 2,
      "white"
    );
  }
  if (displayType === 5) {
    return getDisplayComponent.getGraph(data);
  }
  return getDisplayComponent.getValuePercent(data, "bottom-left");
};

const getNameComponent = (FormulaName: string) => {
  const name =
    FormulaName.length > 21 ? FormulaName.slice(0, 18) + "..." : FormulaName;

  const component = <Styled.KPIFormulaName>{name}</Styled.KPIFormulaName>;

  if (FormulaName.length > 21) {
    return <HtmlTooltip title={FormulaName}>{component}</HtmlTooltip>;
  }
  return component;
};

const KPIFouth: FC<IProps> = ({ kpi, isPrimary }) => {
  let ViewComponent = setViewComponent(
    kpi.DisplayType,
    kpi.MinValue,
    kpi.MaxValue,
    kpi.Result
  );

  return (
    <Styled.Wrapper>
      <Styled.KPISetting>
        <MySwitch checked={kpi.isActive} />
        <Styled.SettingFlag>
          <Styled.FlagWrapper isActiveKPI={kpi.isActive}>
            <img
              src={isPrimary ? flagSelected : flagDefault}
              draggable={false}
              alt=""
            />
          </Styled.FlagWrapper>
          <Styled.DotsWrapper>
            <img src={dots} draggable={false} alt="" />
          </Styled.DotsWrapper>
        </Styled.SettingFlag>
      </Styled.KPISetting>
      <Styled.DisplayWrapper>{ViewComponent}</Styled.DisplayWrapper>
      <Styled.KPINameWrapper>
        {getNameComponent(kpi.FormulaName)}
      </Styled.KPINameWrapper>
      <Styled.KPIFooter />
    </Styled.Wrapper>
  );
};

export default KPIFouth;
