import { TActiveType } from "../../../../types";
import minus from "../../../../../assets/img/Calculator_minus.svg";
import multiplication from "../../../../../assets/img/Calculator_multiplication.svg";
import plus from "../../../../../assets/img/Calculator_plus.svg";
import division from "../../../../../assets/img/Calculator_division.svg";
import dot from "../../../../../assets/img/Calculator_dot.svg";

export const arrParamComponent = (
  activeType: TActiveType[],
  data: string[]
) => {
  return data.map((name) => ({
    name,
    isDigits: false,
    isActive: false,
    isSetting: true,
    isAble: !!activeType.find((item) => item === "Params"),
  }));
};

export const arrCalComponent = (activeType: TActiveType[]) => {
  const numberArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
    (name) => ({
      name,
      isActive: false,
      isSetting: true,
      isAble: !!activeType.find((item) => item === "Numbers"),
    })
  );
  const signArr = [
    { name: "-", img: minus },
    { name: "*", img: multiplication },
    { name: "+", img: plus },
    { name: "/", img: division },
    { name: ".", img: dot },
  ].map(({ name, img }) => ({
    name,
    img,
    isActive: false,
    isSetting: true,
    isAble: !!activeType.find((item) => item === name),
  }));
  return [...numberArr, ...signArr];
};

export const arrFuncComponent = (activeType: TActiveType[]) =>
  ["Sum", "Avg", "Min", "Max"].map((name) => ({
    name,
    isActive: false,
    isSetting: true,
    isAble: !!activeType.find((item) => item === "Functions"),
  }));
