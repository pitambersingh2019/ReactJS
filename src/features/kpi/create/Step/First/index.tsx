import Preview from "./preview";
import SettingFormula from "./setting";
import { CreateKPIContext } from "../..";
import { useContext, useEffect } from "react";
import { IFormulaComponent, TActiveType } from "../../types";
import LayoutStep from "../Layout";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import * as Styled from "./style";

const getIsAbleDot = (
  formulaComponents: IFormulaComponent[],
  activeElement: number
) => {
  let status = true;
  let statusForEach = false;
  const arr = [...formulaComponents].reverse();
  arr.forEach((item, index) => {
    if (
      index <= formulaComponents.length - (1 + activeElement) ||
      statusForEach ||
      !status
    )
      return;
    if (item.component === "CalComponent" && item.props.name === ".") {
      status = false;
    }
    if (
      item.component !== "CalComponent" ||
      (item.component === "CalComponent" && isNaN(item.props.name))
    ) {
      statusForEach = true;
    }
  });
  return status;
};

const getActiveType = (
  formulaComponents: IFormulaComponent[],
  activeElement: number,
  saveFormula: string,
  isFirstTime: boolean
): TActiveType[] => {
  if (
    formulaComponents[activeElement].component !== "PlusComponent" ||
    saveFormula !== "" ||
    isFirstTime
  ) {
    return [];
  }
  if (
    formulaComponents.length === 1 &&
    formulaComponents[0].component === "PlusComponent"
  ) {
    return ["Functions", "Numbers", "-"];
  }
  const current = formulaComponents[activeElement - 1].component;
  const currentName = formulaComponents[activeElement - 1].props.name;
  const isNumberCheck =
    current === "CalComponent" && isFinite(parseInt(currentName));
  const isNewFunc = current === "FuncComponent" && currentName === ")";
  const isAbleSign = isNumberCheck || current === "ParamComponent" || isNewFunc;
  const isNotNumber =
    current === "CalComponent" && isNaN(parseInt(currentName));
  const isFunction =
    formulaComponents[activeElement + 1]?.component === "FuncComponent";

  let activeType: TActiveType[] = [];
  if (current === "CalComponent" || currentName === "(") {
    activeType.push("Numbers");
  }
  if (isNumberCheck && getIsAbleDot(formulaComponents, activeElement)) {
    activeType.push(".");
  }
  if (isAbleSign) {
    activeType = [...activeType, "*", "+", "/"];
  }
  if (isAbleSign || currentName === "(") {
    activeType.push("-");
  }
  if ((isNotNumber && isFunction) || currentName === "(") {
    activeType.push("Params");
  }
  if (isNotNumber && !isFunction && currentName !== ".") {
    activeType.push("Functions");
  }
  return activeType;
};

const FirstStep = () => {
  const contextCreate = useContext(CreateKPIContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (contextCreate !== null) {
      contextCreate.setFirstStepSetting((prev) => {
        return {
          ...prev,
          ActiveType: getActiveType(
            prev.formulaComponent,
            prev.ActiveElement,
            prev.saveFormula,
            prev.isFirstTime
          ),
        };
      });
    }
  }, [
    contextCreate?.firstStepSetting.ActiveElement,
    contextCreate?.firstStepSetting.formula,
    contextCreate?.firstStepSetting.saveFormula,
    contextCreate?.firstStepSetting.isFirstTime,
  ]);

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting } = contextCreate;

  const mainTitle = () => {
    return <div>{t(translations.CustomKPI.FirstStepTitle)}</div>;
  };

  const subTitle = () => {
    return <div>{t(translations.CustomKPI.FirstStepSubTitle)}</div>;
  };

  if (
    firstStepSetting.status === "loading" ||
    firstStepSetting.status === "error"
  ) {
    return (
      <Styled.StatusWrapper
        color={firstStepSetting.status === "error" ? "#c73431" : "#050709"}
      >
        {firstStepSetting.status === "error" ? "Error" : "Loading..."}
      </Styled.StatusWrapper>
    );
  }

  return (
    <LayoutStep mainTitle={mainTitle()} subTitle={subTitle()}>
      <Preview />
      {!firstStepSetting.isFirstTime && (
        <SettingFormula ActiveType={firstStepSetting.ActiveType} />
      )}
    </LayoutStep>
  );
};

export default FirstStep;
