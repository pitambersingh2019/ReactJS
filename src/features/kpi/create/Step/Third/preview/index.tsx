import React, { FC } from "react";
import { TSize } from "../../../../components/gauge";
import infoImg from "./../../../../assets/img/info.svg";

import { TDisplay, TGuageType } from "../../../types";
import InfoAboutDisplay from "./Info";
import * as Styled from "./style";
import {
  getDisplayComponent,
  IDataDisplayComponent,
  IMedia,
} from "../../../../components";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";

interface IProps {
  typeDisplay: TDisplay;
  gaugeType: TGuageType;
  digits: number;
}

const getPreviewComponent = (dispalyType: TDisplay, gaugeType: TGuageType) => {
  const getData = (size: TSize, media: IMedia): IDataDisplayComponent => ({
    size,
    min: 0,
    max: 100,
    progress: 70,
    isPersent: false,
    isPrimary: false,
    media,
    isResultValid: true,
  });
  if (dispalyType === "Gauge") {
    return getDisplayComponent.getGauge(
      getData("l", { md: "m", sm: "s" }),
      gaugeType === "single" ? 1 : 2,
      "white"
    );
  }
  if (dispalyType === "Graph") {
    return getDisplayComponent.getGraph(getData("m", { md: "s" }));
  }
  return getDisplayComponent.getValuePercent(getData("l", {}), "center");
};

const Preview: FC<IProps> = ({ typeDisplay, gaugeType }) => {
  const { t } = useTranslation();

  return (
    <Styled.SettingPreview>
      <Styled.Preview>
        <Styled.PreviewText>
          {t(translations.CustomKPI.ThirdStepPreviewTitle)}
        </Styled.PreviewText>
        {typeDisplay === "Gauge" && gaugeType === "single" && (
          <HtmlTooltip
            title={<div>{t(translations.CustomKPI.ThirdStepColorTooltip)}</div>}
          >
            <Styled.PreviewInfo>
              <img src={infoImg} alt="" />
            </Styled.PreviewInfo>
          </HtmlTooltip>
        )}
      </Styled.Preview>
      <Styled.ComponentWrapper>
        {getPreviewComponent(typeDisplay, gaugeType)}
      </Styled.ComponentWrapper>
      {(typeDisplay === "Graph" ||
        (typeDisplay === "Gauge" && gaugeType === "3 ranges")) && (
        <InfoAboutDisplay />
      )}
    </Styled.SettingPreview>
  );
};

export default Preview;
