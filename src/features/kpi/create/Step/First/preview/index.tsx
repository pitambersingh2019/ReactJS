import React, { useContext, useEffect } from "react";
import { CreateKPIContext } from "../../..";
import { IFormulaComponent } from "../../../types";
import CalComponent from "../setting/calComponent";
import FuncComponent from "../setting/funcComponent";
import ParamComponent from "../setting/paramComponent";
import PlusComponent from "../setting/plusComponent";
import HeaderPreview from "./header";
import ResultPreview from "./result";
import SettingPreview from "./setting";
import * as Styled from "./style";
import firstTimeImg from "./../../../../assets/img/Add_new_element.svg";
import firstTimeHoverImg from "./../../../../assets/img/Add_new_element_hover.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";

const getFormulaFromComponents = (components: IFormulaComponent[]) => {
  let formula = "";
  for (let i = 0; i < components.length; i++) {
    if (components[i].component === "PlusComponent") continue;
    if (components[i].component === "ParamComponent") formula += "[";
    formula += components[i].props.name;
    if (components[i].component === "ParamComponent") formula += "]";
  }
  return formula;
};

interface IGetFormulaComponent extends IFormulaComponent {
  isActive: boolean;
}

const getFormulaComponent = ({
  component,
  props,
  isActive,
}: IGetFormulaComponent) => {
  if (component === "FuncComponent") {
    return <FuncComponent {...props} isActive={isActive} key={props.keyDate} />;
  }
  if (component === "CalComponent") {
    return <CalComponent {...props} isActive={isActive} key={props.keyDate} />;
  }
  if (component === "ParamComponent") {
    return (
      <ParamComponent {...props} isActive={isActive} key={props.keyDate} />
    );
  }
  if (component === "PlusComponent") {
    return <PlusComponent {...props} isActive={isActive} key={props.keyDate} />;
  }
};

const Preview = () => {
  const contextCreate = useContext(CreateKPIContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (contextCreate !== null) {
      contextCreate.setFirstStepSetting((prev) => ({
        ...prev,
        formula: getFormulaFromComponents(
          contextCreate.firstStepSetting.formulaComponent
        ),
      }));
    }
  }, [contextCreate?.firstStepSetting.formulaComponent]);

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;

  const formulaPreview = firstStepSetting.formulaComponent.map((item, index) =>
    getFormulaComponent({
      ...item,
      isActive: firstStepSetting.ActiveElement === index,
    })
  );

  const onClickFirstElement = () => {
    setFirstStepSetting((prev) => ({
      ...prev,
      isFirstTime: false,
    }));
  };

  const getBody = (isFirstTime: boolean, saveFormula: string) => {
    if (isFirstTime) {
      return (
        <Styled.FirstTimeWrapper onClick={onClickFirstElement}>
          <HtmlTooltip
            title={
              <div>{t(translations.CustomKPI.FirstStepAddNewTooltip)}</div>
            }
          >
            <Styled.FTWTwo>
              <Styled.FirstTimeImgWrapper>
                <img src={firstTimeHoverImg} alt="" />
              </Styled.FirstTimeImgWrapper>
              <Styled.FirstTimeImgWrapper>
                <img src={firstTimeImg} alt="" />
              </Styled.FirstTimeImgWrapper>

              <Styled.FirstTimeText>
                {t(translations.CustomKPI.FirstStepAddNew)}
              </Styled.FirstTimeText>
            </Styled.FTWTwo>
          </HtmlTooltip>
        </Styled.FirstTimeWrapper>
      );
    }
    if (saveFormula === "") {
      return <Styled.Formula dir="ltr">{formulaPreview}</Styled.Formula>;
    }

    return (
      <Styled.SaveFormula dir="ltr">
        {firstStepSetting.saveFormula}
      </Styled.SaveFormula>
    );
  };

  return (
    <Styled.PreviewFormulaWrapper>
      <HeaderPreview />
      <Styled.PreviewFormulaBody>
        {getBody(firstStepSetting.isFirstTime, firstStepSetting.saveFormula)}
        {firstStepSetting.saveFormula === "" && !firstStepSetting.isFirstTime && (
          <React.Fragment>
            <SettingPreview />
            <ResultPreview formula={firstStepSetting.formula} />
          </React.Fragment>
        )}
      </Styled.PreviewFormulaBody>
    </Styled.PreviewFormulaWrapper>
  );
};

export default Preview;
