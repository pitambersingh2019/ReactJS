import { Dispatch, FC, SetStateAction, useContext } from "react";
import { CreateKPIContext } from "../../../..";
import { IFirstStep, IFormulaComponent } from "../../../../types";
import * as Styled from "./style";
import DotsSetting from "../dots";

interface IProps {
  img?: string;
  keyDate?: number;
  name: string;
  isActive: boolean;
  isSetting: boolean;
  isAble: boolean;
}

const onClickSetting = (
  name: string,
  setStep: Dispatch<SetStateAction<IFirstStep>>,
  settingStep: IFirstStep,
  img?: string
) => {
  const keyDate = +new Date();
  let addComponent: IFormulaComponent[] = [
    {
      component: "CalComponent",
      props: {
        img: img,
        name: name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
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
  setStep((prev) => {
    return {
      ...prev,
      ActiveElement: settingStep.formulaComponent.findIndex(
        (Element) => Element.props.keyDate === keyDate
      ),
      ActiveType: [],
    };
  });
};

const CalComponent: FC<IProps> = ({
  img,
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
          onClickSetting(name, setFirstStepSetting, firstStepSetting, img);
          return;
        }
        if (keyDate !== undefined) {
          onClickPreview(setFirstStepSetting, firstStepSetting, keyDate);
        }
      }}
    >
      {isActive && <DotsSetting />}

      <Styled.WrapperNumber isActive={isActive} isSetting={isSetting}>
        {img ? <img src={img} /> : name}
      </Styled.WrapperNumber>
    </Styled.Wrapper>
  );
};

export default CalComponent;
