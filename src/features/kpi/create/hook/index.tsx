import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { KPIApi } from "../../api";
import { IFilterLabels } from "../../api/types";
import { selectCreateState } from "../../reducer/selectors";
import {
  initialFilter,
  initialFirstStep,
  initialFourthStep,
  initialSecondStep,
  initialThirdStep,
} from "../initialValueStep";
import { IFirstStep, IFourthStep, ISecondStep, IThirdStep } from "../types";
import { getFormulaComponent } from "./thirdComponent/intex";

type namesArr = "shift" | "day" | "week" | "month";

const useCheckCreate = () => {
  const {
    DepartmentName,
    departmentID,
    displayType,
    gaugeType,
    formula,
    KPIName,
    filter,
    isActive,
    digists,
    isPrimary,
    formulaID,
    ...createMinMax
  } = useSelector(selectCreateState);
  const [firstStepSetting, setFirstStepSetting] =
    useState<IFirstStep>(initialFirstStep);

  const [secondStepSetting, setSecondStepSetting] =
    useState<ISecondStep>(initialSecondStep);

  const [thirdStepSetting, setThirdStepSetting] =
    useState<IThirdStep>(initialThirdStep);
  const [stepCheck, setStepCheck] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [fourthStepSetting, setFourthStepSetting] =
    useState<IFourthStep>(initialFourthStep);

  const setFirst = () => {
    setFirstStepSetting((prev) => ({
      ...prev,
      KPIName,
      status: "loading",
      formulaID,
      formula,
      saveFormula: formula,
      formulaComponent:
        formula === "" ? prev.formulaComponent : getFormulaComponent(formula),
      ActiveElement:
        formula === "" ? 0 : getFormulaComponent(formula).length - 1,
      isFirstTime: formula === "",
    }));
  };

  const setSecond = async () => {
    try {
      const { data: dataDepartmets } = await KPIApi.getDepartments();
      const { departments: departmets } = dataDepartmets;
      const { data: dataFilter } = await KPIApi.getCustomKPIsFilterLabels(
        filter
      );
      const { FilterLabels } = dataFilter.ResponseDictionaryValues;
      const { data: dataInsightFilters } = await KPIApi.getInsightFilters(
        departmentID
      );

      type TFilterKeys = keyof IFilterLabels;
      const arrLabels: TFilterKeys[] = [
        "ClientIdFilter",
        "ERPJobDefFilter",
        "IsEndOfLineFilter",
        "MachineIdFilter",
        "MoldGroupFilter",
        "MoldIdFilter",
        "ProductGroupFilter",
        "ProductIdFilter",
        "ShiftNameFilter",
        "UserIdFilter",
      ];

      const filterLab = { ...initialFilter };

      arrLabels.forEach((item) => {
        if (FilterLabels[item] !== undefined) {
          filterLab[item] = FilterLabels[item];
        }
      });
      setFirstStepSetting((prev) => ({ ...prev, status: "ok" }));
      setSecondStepSetting((prev) => ({
        ...prev,
        departmentID,
        departmets,
        filter: filterLab,
        level: DepartmentName,
        displayType,
        filterData: dataInsightFilters.ResponseDictionary,
      }));
    } catch {
      setFirstStepSetting((prev) => ({ ...prev, status: "error" }));
    }
  };

  const setThird = () => {
    setThirdStepSetting((prev) => ({
      ...prev,
      gaugeType: gaugeType !== "" ? gaugeType : "3 ranges",
      shift: {
        min: createMinMax.MinValueShift,
        max: createMinMax.MaxValueShift,
      },
      day: {
        min: createMinMax.MinValueDay,
        max: createMinMax.MaxValueDay,
      },
      week: {
        min: createMinMax.MinValueWeek,
        max: createMinMax.MaxValueWeek,
      },
      month: {
        min: createMinMax.MinValueMonth,
        max: createMinMax.MaxValueMonth,
      },
      digists: digists as 0 | 1 | 2,
    }));
  };

  const setFourth = () => {
    setFourthStepSetting((prev) => ({
      ...prev,
      isActive,
      isPrimary,
    }));
  };

  useEffect(() => {
    setFirst();
    setSecond();
    setThird();
    setFourth();
  }, []);

  useEffect(() => {
    let newStepCheck = [...stepCheck];
    newStepCheck[0] = firstStepSetting.saveFormula !== "";

    setStepCheck(newStepCheck);
  }, [firstStepSetting]);

  useEffect(() => {
    let newStepCheck = [...stepCheck];
    newStepCheck[1] = secondStepSetting.level !== "";

    setStepCheck(newStepCheck);
  }, [secondStepSetting]);

  useEffect(() => {
    let newStepCheck = [...stepCheck];
    const arrName: namesArr[] = ["shift", "day", "week", "month"];
    let statusArr = [false, false, false, false];
    for (let i = 0; i < arrName.length; i++) {
      if (
        (thirdStepSetting[arrName[i]].max === 0 &&
          thirdStepSetting[arrName[i]].min === 0) ||
        thirdStepSetting[arrName[i]].max - thirdStepSetting[arrName[i]].min > 0
      ) {
        statusArr[i] = true;
      }
    }
    newStepCheck[2] =
      statusArr[0] && statusArr[1] && statusArr[2] && statusArr[3];

    if (newStepCheck[0] && newStepCheck[1] && newStepCheck[2]) {
      newStepCheck[3] = true;
    } else {
      newStepCheck[3] = false;
    }
    setStepCheck(newStepCheck);
  }, [thirdStepSetting]);

  return {
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
};

export default useCheckCreate;
