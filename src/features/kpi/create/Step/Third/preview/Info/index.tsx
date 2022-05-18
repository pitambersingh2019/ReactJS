import Mark from "../../../../../components/mark";
import * as Styled from "./style";
import infoImg from "./../../../../../assets/img/info.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import HtmlTooltip from "../../../../../../../Component/ToolTip/TooltipSelect";

const InfoAboutDisplay = () => {
  const { t } = useTranslation();

  const markState = [
    {
      text: `% ${t(translations.CustomKPI.ThirdStepMark)} > 50`,
      color: "#6ec563",
    },
    {
      text: `25 > % ${t(translations.CustomKPI.ThirdStepMark)} > 50`,
      color: "#f5a628",
    },
    {
      text: `% ${t(translations.CustomKPI.ThirdStepMark)} < 25`,
      color: "#850f16",
    },
  ];

  return (
    <Styled.PreviewInfoWrapper>
      <Styled.InfoHoverWrapper>
        <HtmlTooltip
          title={<div>{t(translations.CustomKPI.ThirdStepColorTooltip)}</div>}
        >
          <Styled.InfoHover>
            <img src={infoImg} />
          </Styled.InfoHover>
        </HtmlTooltip>
      </Styled.InfoHoverWrapper>
      <Styled.MarkWrapper>
        {markState.map((mark) => (
          <Styled.PreviewInfo key={mark.text}>
            <Mark width={20} height={10} backgroundColor={mark.color} />
            <div>{mark.text}</div>
          </Styled.PreviewInfo>
        ))}
      </Styled.MarkWrapper>
    </Styled.PreviewInfoWrapper>
  );
};

export default InfoAboutDisplay;
