import React, { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStepCreate,
  setIsCreate,
  setCreateState,
  initialCreateState,
} from "../reducer";
import { selectCreateState, selectStepCreate } from "../reducer/selectors";
import SecondStep from "./Step/Second";
import ThirdStep from "./Step/Third";
import * as Styled from "./style";
import { TStep } from "../reducer/types";
import { InitialValue, TDisplay, TGuageType } from "./types";
import {
  initialFirstStep,
  initialSecondStep,
  initialThirdStep,
} from "./initialValueStep";
import useCheckCreate from "./hook";
import HeaderCreate from "./header";
import ButtonCreate from "./buttonCreate";
import FirstStep from "./Step/First";
import FouthStep from "./Step/Fourth";
import { saveKPIAC } from "../reducer/actions/intex";
import { IFilterLabels, IKPISave } from "../api/types";

type TNameFilterId = keyof IFilterLabels;

export const CreateKPIContext = createContext<InitialValue | null>(null);

const step = [
  <FirstStep key="first_step" />,
  <SecondStep key="second_step" />,
  <ThirdStep key="third_step" />,
  <FouthStep key="fouth_step" />,
];

export const getDisplayTypeID = (
  displayType: TDisplay,
  guageType: TGuageType
): number => {
  if (displayType === "Gauge" && guageType === "single") {
    return 2;
  }
  if (displayType === "Gauge" && guageType === "3 ranges") {
    return 4;
  }
  if (displayType === "Graph") {
    return 5;
  }
  return 1;
};

export const getFilterString = (filter: IFilterLabels) => {
  const keyFilter = Object.keys(filter) as TNameFilterId[];
  const arr1 = keyFilter
    .filter((key) => filter[key].length !== 0)
    .map((key) => {
      if (key === "ShiftNameFilter") {
        return `${key} in (${filter[key]
          .map((item) => `'${item.Name}'`)
          .join(",")})`;
      }
      return `${key} in (${filter[key].map((item) => item.ID).join(",")})`;
    });
  return arr1.join(" AND ");
};

const Create = () => {
  const stepCreate = useSelector(selectStepCreate);
  const { formulaID, MinValue, MaxValue } = useSelector(selectCreateState);

  const dispatch = useDispatch();

  const {
    stepCheck,
    firstStepSetting,
    setFirstStepSetting,
    secondStepSetting,
    setSecondStepSetting,
    thirdStepSetting,
    setThirdStepSetting,
    fourthStepSetting,
    setFourthStepSetting,
  } = useCheckCreate();

  const value: InitialValue = {
    stepCheck,
    firstStepSetting,
    setFirstStepSetting,
    secondStepSetting,
    setSecondStepSetting,
    thirdStepSetting,
    setThirdStepSetting,
    fourthStepSetting,
    setFourthStepSetting,
  };

  const onClickApply = () => {
    const kpi: IKPISave = {
      MainKPI: fourthStepSetting.isPrimary,
      FormulaID: formulaID,
      FormulaName: firstStepSetting.KPIName,
      Formula: firstStepSetting.formula,
      Filter: getFilterString(secondStepSetting.filter),
      MinValue: MinValue,
      MaxValue: MaxValue,
      MinValueShift: thirdStepSetting.shift.min,
      MaxValueShift: thirdStepSetting.shift.max,
      MinValueDay: thirdStepSetting.day.min,
      MaxValueDay: thirdStepSetting.day.max,
      MinValueWeek: thirdStepSetting.week.min,
      MaxValueWeek: thirdStepSetting.week.max,
      MinValueMonth: thirdStepSetting.month.min,
      MaxValueMonth: thirdStepSetting.month.max,
      IsActive: fourthStepSetting.isActive,
      DecimalsRound: thirdStepSetting.digists,
      DepartmentID: secondStepSetting.departmentID,
      DisplayType: getDisplayTypeID(
        secondStepSetting.displayType,
        thirdStepSetting.gaugeType
      ),
    };
    dispatch(saveKPIAC(kpi));
    onCloseFormKPI();
  };

  const onClickBackNext = (stepNum: 1 | -1) => {
    const step = (stepCreate + stepNum) as TStep;
    dispatch(setStepCreate({ step }));
  };

  const onChangeKPIName = (KPIName: string) => {
    if (KPIName.length > 200) return;
    setFirstStepSetting((prev) => ({
      ...prev,
      KPIName,
    }));
  };

  const onCloseFormKPI = () => {
    setFirstStepSetting(initialFirstStep);
    setSecondStepSetting(initialSecondStep);
    setThirdStepSetting(initialThirdStep);
    dispatch(setIsCreate());
    dispatch(setStepCreate({ step: 1 }));
    dispatch(setCreateState(initialCreateState));
  };

  return (
    <Styled.Wrapper>
      <HeaderCreate
        stepCheck={stepCheck}
        stepCreate={stepCreate}
        KPIName={firstStepSetting.KPIName}
        changeKPIName={onChangeKPIName}
      />
      <Styled.WrapperContent>
        <CreateKPIContext.Provider value={value}>
          {step[stepCreate - 1]}
        </CreateKPIContext.Provider>
      </Styled.WrapperContent>
      <ButtonCreate
        stepCheck={stepCheck}
        stepCreate={stepCreate}
        onClickClose={onCloseFormKPI}
        onClickBackNext={onClickBackNext}
        onClickApply={onClickApply}
      />
    </Styled.Wrapper>
  );
};

export default Create;
