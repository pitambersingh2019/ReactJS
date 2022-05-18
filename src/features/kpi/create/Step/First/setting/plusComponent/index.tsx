import { Dispatch, FC, SetStateAction, useContext } from "react";
import * as Styled from "./style";
import plus from "./../../../../../assets/img/Add_new_element.svg";
import { IFirstStep, IFormulaComponent } from "../../../../types";
import { CreateKPIContext } from "../../../..";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import HtmlTooltip from "../../../../../../../Component/ToolTip/TooltipSelect";

interface IProps {
  isActive: boolean;
  isLast: boolean;
  keyDate?: number;
}

const onClickPreview = (
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep,
  keyDate: number
) => {
  const ActiveElement = settingStep.formulaComponent.findIndex(
    (Element) => Element.props.keyDate === keyDate
  );

  setStep((prev) => ({
    ...prev,
    ActiveElement,
  }));
};

const PlusComponent: FC<IProps> = ({ isActive, isLast, keyDate }) => {
  const contextCreate = useContext(CreateKPIContext);
  const { t } = useTranslation();

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;
  const { formulaComponent } = firstStepSetting;
  const numberElement = formulaComponent.findIndex(
    (item) => item.props.keyDate === keyDate
  );
  const formulaName = formulaComponent.map((item) => item.props.name);
  const isFunction = formulaName.includes(")", numberElement);

  const getTitleTolltip = (
    formulaComponent: IFormulaComponent[],
    ActiveElement: number,
    isFunction: boolean
  ) => {
    let afterParam = false;
    let afterNumber = false;

    if (ActiveElement === 0 || !isFunction) {
      return t(translations.CustomKPI.FirstStepPlusTooltip1);
    }

    const component = formulaComponent[ActiveElement - 1].component;
    const name = formulaComponent[ActiveElement - 1].props.name;

    if (
      component === "CalComponent" &&
      (isFinite(parseInt(name)) || name === ".")
    ) {
      afterNumber = true;
    }
    if (component === "ParamComponent") {
      afterParam = true;
    }
    if (afterNumber) {
      return t(translations.CustomKPI.FirstStepPlusTooltip2);
    }
    if (afterParam) {
      return t(translations.CustomKPI.FirstStepPlusTooltip3);
    }
    return t(translations.CustomKPI.FirstStepPlusTooltip4);
  };

  if (isActive) {
    return (
      <HtmlTooltip
        title={getTitleTolltip(formulaComponent, numberElement, isFunction)}
      >
        <Styled.WrapperBox />
      </HtmlTooltip>
    );
  }

  return (
    <HtmlTooltip
      title={getTitleTolltip(formulaComponent, numberElement, isFunction)}
    >
      <Styled.WrapperPlus
        onClick={() => {
          if (keyDate !== undefined) {
            onClickPreview(setFirstStepSetting, firstStepSetting, keyDate);
          }
        }}
      >
        <Styled.PlusLine />
        <Styled.Plus>
          <img src={plus} />
        </Styled.Plus>
        {!isLast && <Styled.PlusLine />}
      </Styled.WrapperPlus>
    </HtmlTooltip>
  );
};

export default PlusComponent;
