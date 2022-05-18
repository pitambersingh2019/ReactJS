import { Dispatch, FC, SetStateAction, useContext } from "react";
import { CreateKPIContext } from "../../../..";
import { IFirstStep, IFormulaComponent } from "../../../../types";
import * as Styled from "./style";
import DotsSetting from "../dots";
import HtmlTooltip from "../../../../../../../Component/ToolTip/TooltipSelect";

interface IProps {
  name: string;
  isDigits: boolean;
  isActive: boolean;
  isSetting: boolean;
  isAble: boolean;
  params: string[];
  keyDate?: number;
}

const onClickSetting = (
  name: string,
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep,
  params: string[]
) => {
  const keyDate = +new Date();
  let addComponent: IFormulaComponent[] = [
    {
      component: "ParamComponent",
      props: {
        name: name,
        isDigits: true,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
        params,
      },
    },
    {
      component: "PlusComponent",
      props: {
        isActive: false,
        isLast:
          settingStep.ActiveElement + 1 === settingStep.formulaComponent.length,
        keyDate: keyDate - 1,
      },
    },
  ];

  const newFormulaComponent = [...settingStep.formulaComponent];
  newFormulaComponent.splice(settingStep.ActiveElement, 1, ...addComponent);
  setStep((prev) => ({
    ...prev,
    formulaComponent: newFormulaComponent,
    ActiveElement: settingStep.ActiveElement + 1,
  }));
};

const onClickPreview = (
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep,
  keyDate: number
) => {
  setStep((prev) => ({
    ...prev,
    ActiveElement: settingStep.formulaComponent.findIndex(
      (Element) => Element.props.keyDate === keyDate
    ),
    ActiveType: [],
  }));
};

const getToolTipParams = (name: string) => {
  const element = document.createElement("div");
  element.style.cssText = `
    width:fit-content;
    font-family: ProximaNova, sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #050709;
  `;
  element.innerHTML = name;
  document.body.appendChild(element);
  const { width } = element.getBoundingClientRect();

  document.body.removeChild(element);

  return width > 164 ? (
    <HtmlTooltip title={name}>
      <Styled.Text dir="ltr">{name}</Styled.Text>
    </HtmlTooltip>
  ) : (
    <Styled.Text>{name}</Styled.Text>
  );
};

const ParamComponent: FC<IProps> = ({
  name,
  isDigits,
  isActive,
  isSetting,
  keyDate,
  isAble,
  params,
}) => {
  const contextCreate = useContext(CreateKPIContext);

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;

  return (
    <Styled.Wrapper
      isSetting={isSetting}
      isAble={isAble}
      onClick={() => {
        if (isSetting) {
          onClickSetting(name, setFirstStepSetting, firstStepSetting, params);
          return;
        }
        if (keyDate !== undefined) {
          onClickPreview(setFirstStepSetting, firstStepSetting, keyDate);
        }
      }}
    >
      {isActive && <DotsSetting params={params} />}

      <Styled.WrapperText isActive={isActive} isSetting={isSetting}>
        {isDigits ? (
          <Styled.Text>{`[ ${name} ]`}</Styled.Text>
        ) : (
          getToolTipParams(name)
        )}
      </Styled.WrapperText>
    </Styled.Wrapper>
  );
};

export default ParamComponent;
