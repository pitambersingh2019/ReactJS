import React, { useContext } from "react";
import * as Styled from "./style";
import Preview from "./preview";
import Setting from "./settingDisplay";
import { CreateKPIContext } from "../..";
import ChangeSelection from "./../../../assets/img/Change_Selection.svg";
import { useDispatch } from "react-redux";
import { setStepCreate } from "../../../reducer";
import LayoutStep from "../Layout";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

const ThirdStep = () => {
  const createContext = useContext(CreateKPIContext);
  const dispath = useDispatch();
  const { t } = useTranslation();

  if (createContext === null) return <div></div>;

  const onClickChangeType = () => {
    dispath(setStepCreate({ step: 2 }));
  };

  const { thirdStepSetting, setThirdStepSetting, secondStepSetting } =
    createContext;

  const onClickGaugeType = (gaugeType: "single" | "3 ranges") => {
    setThirdStepSetting({ ...thirdStepSetting, gaugeType });
  };

  const mainTitle = () => {
    return (
      <div>
        {secondStepSetting.displayType === "Percent"
          ? "Value"
          : secondStepSetting.displayType}
      </div>
    );
  };

  const subTitle = () => {
    return (
      <Styled.DisplayTypeText onClick={onClickChangeType}>
        <Styled.ImgWrapper>
          <img src={ChangeSelection} />
        </Styled.ImgWrapper>
        <div>{t(translations.CustomKPI.ThirdStepChangeType)}</div>
      </Styled.DisplayTypeText>
    );
  };

  return (
    <LayoutStep mainTitle={mainTitle()} subTitle={subTitle()}>
      <Styled.Wrapper>
        <Setting
          isGauge={secondStepSetting.displayType === "Gauge"}
          gaugeType={thirdStepSetting.gaugeType}
          onClickGaugeType={onClickGaugeType}
        />
        <Preview
          typeDisplay={secondStepSetting.displayType}
          gaugeType={thirdStepSetting.gaugeType}
          digits={thirdStepSetting.digists}
        />
      </Styled.Wrapper>
    </LayoutStep>
  );
};

export default ThirdStep;
