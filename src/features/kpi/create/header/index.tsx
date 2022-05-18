import React, { createRef, FC, useEffect, useState } from "react";
import { TStep } from "../../reducer/types";
import * as Styled from "./style";
import editImg from "./../../assets/img/Edit.svg";
import infoImg from "./../../assets/img/info.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import HtmlTooltip from "../../../../Component/ToolTip/TooltipSelect";

interface IProps {
  stepCreate: TStep;
  stepCheck: boolean[];
  KPIName: string;
  changeKPIName: (KPIName: string) => void;
}

const HeaderCreate: FC<IProps> = ({
  stepCreate,
  stepCheck,
  KPIName,
  changeKPIName,
}) => {
  const [modeName, setModeName] = useState(false);
  const refInput = createRef<HTMLInputElement>();
  const { t } = useTranslation();

  const stepName: string[] = [
    t(translations.CustomKPI.CreateHeaderFormulaTitle),
    t(translations.CustomKPI.CreateHeaderGeneralSettingsTitle),
    t(translations.CustomKPI.CreateHeaderTargetSettingsTitle),
    t(translations.CustomKPI.CreateHeaderSummaryTitle),
  ];

  useEffect(() => {
    if (modeName === true && refInput.current) refInput.current.focus();
  }, [modeName]);

  const changeModeName = () => {
    if (!KPIName.length) changeKPIName("New KPI");
    setModeName((prev) => !prev);
  };

  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeModeName();
    }
  };

  const getWithTooltip = () => {
    const element = <Styled.KPIName>{KPIName}</Styled.KPIName>;
    if (KPIName.length <= 35) {
      return element;
    }
    return (
      <HtmlTooltip
        title={<Styled.WrapperTooltip>{KPIName}</Styled.WrapperTooltip>}
      >
        {element}
      </HtmlTooltip>
    );
  };

  const getElementsName = () => {
    if (modeName) {
      return (
        <Styled.KPINameInput
          width={KPIName.length}
          value={KPIName}
          onChange={(e) => {
            changeKPIName(e.target.value);
          }}
          onBlur={changeModeName}
          ref={refInput}
          onKeyPress={onClickEnter}
        />
      );
    }
    return (
      <Styled.WrapperKPIName>
        {getWithTooltip()}
        <Styled.KPINameImgWrapper cursor={true} onClick={changeModeName}>
          <img src={editImg} alt="" />
        </Styled.KPINameImgWrapper>
        <HtmlTooltip
          title={<div>{t(translations.CustomKPI.CreateHeaderTooltip)}</div>}
        >
          <Styled.KPINameImgWrapper cursor={false}>
            <img src={infoImg} alt="" />
          </Styled.KPINameImgWrapper>
        </HtmlTooltip>
      </Styled.WrapperKPIName>
    );
  };

  return (
    <Styled.HeaderCreate>
      <Styled.FirstColumn>
        {getElementsName()}
        <Styled.StepName>{stepName[stepCreate - 1]}</Styled.StepName>
      </Styled.FirstColumn>
      <Styled.StepWrapper>
        <Styled.StepNumber>
          {t(translations.CustomKPI.CraeteHeaderStep) + " " + stepCreate}/4
        </Styled.StepNumber>
        <Styled.StepPointWrapper>
          {stepCheck.map((_, index) => (
            <Styled.StepPoint
              key={index + 1}
              active={index + 1 <= stepCreate}
            />
          ))}
        </Styled.StepPointWrapper>
      </Styled.StepWrapper>
    </Styled.HeaderCreate>
  );
};

export default HeaderCreate;
