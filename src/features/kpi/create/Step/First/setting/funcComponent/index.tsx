import { Dispatch, FC, SetStateAction, useContext } from "react";
import { CreateKPIContext } from "../../../..";
import { IFirstStep, IFormulaComponent } from "../../../../types";
import * as Styled from "./style";
import DotsSetting from "../dots";

interface IProps {
  name: string;
  isActive: boolean;
  isSetting: boolean;
  keyDate?: number;
  isAble: boolean;
}

const onClickSetting = (
  name: string,
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep
) => {
  const keyDate = +new Date();
  let addComponent: IFormulaComponent[] = [
    {
      component: "FuncComponent",
      props: {
        name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
      },
    },
    {
      component: "FuncComponent",
      props: {
        name: "(",
        isActive: false,
        isSetting: false,
        keyDate: keyDate - 1,
        isAble: true,
      },
    },
    {
      component: "PlusComponent",
      props: {
        isActive: false,
        isLast: false,
        keyDate: keyDate - 2,
      },
    },
    {
      component: "FuncComponent",
      props: {
        name: ")",
        isActive: false,
        isSetting: false,
        keyDate: keyDate - 3,
        isAble: true,
      },
    },
    {
      component: "PlusComponent",
      props: {
        isActive: false,
        isLast:
          settingStep.ActiveElement + 1 === settingStep.formulaComponent.length,
        keyDate: keyDate - 4,
      },
    },
  ];

  const newFormulaComponent = [...settingStep.formulaComponent];

  newFormulaComponent.splice(settingStep.ActiveElement, 1, ...addComponent);
  setStep((prev) => ({
    ...prev,
    formulaComponent: newFormulaComponent,
    ActiveElement: settingStep.ActiveElement + 2,
  }));
};

const onClickPreview = (
  name: string,
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep,
  keyDate: number
) => {
  if (name === "(" || name === ")") return;
  setStep((prev) => ({
    ...prev,
    ActiveElement: settingStep.formulaComponent.findIndex(
      (Element) => Element.props.keyDate === keyDate
    ),
    ActiveType: [],
  }));
};

const FuncComponent: FC<IProps> = ({
  name,
  isActive,
  isSetting,
  keyDate,
  isAble,
}) => {
  const contectCreate = useContext(CreateKPIContext);

  if (contectCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contectCreate;

  return (
    <Styled.Wrapper
      isSetting={isSetting}
      isAble={isAble}
      onClick={() => {
        if (isSetting) {
          onClickSetting(name, setFirstStepSetting, firstStepSetting);
          return;
        }
        if (keyDate !== undefined) {
          onClickPreview(name, setFirstStepSetting, firstStepSetting, keyDate);
        }
      }}
    >
      {isActive && <DotsSetting />}

      <Styled.WrapperNumber
        isActive={isActive}
        isSetting={isSetting}
        isSign={name === "(" || name === ")"}
      >
        {name}
      </Styled.WrapperNumber>
    </Styled.Wrapper>
  );
};

export default FuncComponent;
