import minus from "../../../assets/img/Calculator_minus.svg";
import multiplication from "../../../assets/img/Calculator_multiplication.svg";
import plus from "../../../assets/img/Calculator_plus.svg";
import division from "../../../assets/img/Calculator_division.svg";
import dot from "../../../assets/img/Calculator_dot.svg";
import { IFormulaComponent } from "../../types";

const getImgComponent = (name: string) => {
  if (name === "-") return minus;
  if (name === "+") return plus;
  if (name === "*") return multiplication;
  if (name === "/") return division;
  if (name === ".") return dot;
};

const getComponentThirdStep = (
  name: string | number,
  isLast: boolean,
  keyDate: number
): IFormulaComponent => {
  if (typeof name === "number") {
    return {
      component: "CalComponent",
      props: {
        name: name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
      },
    };
  }
  if (
    name.toLocaleUpperCase() === "SUM" ||
    name.toLocaleUpperCase() === "AVG" ||
    name.toLocaleUpperCase() === "MIN" ||
    name.toLocaleUpperCase() === "MAX"
  ) {
    return {
      component: "FuncComponent",
      props: {
        name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
      },
    };
  }
  if (name === "(" || name === ")") {
    return {
      component: "FuncComponent",
      props: {
        name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
      },
    };
  }
  if (
    name === "-" ||
    name === "*" ||
    name === "+" ||
    name === "/" ||
    name === "."
  ) {
    return {
      component: "CalComponent",
      props: {
        img: getImgComponent(name),
        name: name,
        isActive: false,
        isSetting: false,
        keyDate,
        isAble: true,
      },
    };
  }
  if (name === "plus") {
    return {
      component: "PlusComponent",
      props: {
        isActive: isLast,
        isLast,
        keyDate,
      },
    };
  }
  return {
    component: "ParamComponent",
    props: {
      name,
      isDigits: true,
      isActive: false,
      isSetting: false,
      keyDate,
      isAble: true,
    },
  };
};

export const getFormulaComponent = (formula: string) => {
  let name = "";
  let formulaComponent = [];
  const keyDate = new Date().getMilliseconds();
  for (let i = 0; i < formula.length; i++) {
    let letter = formula[i];
    switch (letter) {
      case "(": {
        formulaComponent.push(getComponentThirdStep(name, false, keyDate * i));
        formulaComponent.push(
          getComponentThirdStep(letter, false, keyDate * keyDate * i)
        );
        name = "";
        break;
      }
      case ")": {
        formulaComponent.push(
          getComponentThirdStep("plus", false, keyDate * i)
        );
        formulaComponent.push(
          getComponentThirdStep(letter, false, keyDate * keyDate * i)
        );
        if (formula.length - 1 === i) {
          formulaComponent.push(
            getComponentThirdStep("plus", true, keyDate * keyDate * keyDate * i)
          );
        }
        break;
      }
      case "]": {
        formulaComponent.push(getComponentThirdStep(name, false, keyDate * i));
        if (formula.length - 1 === i) {
          formulaComponent.push(
            getComponentThirdStep("plus", true, keyDate * keyDate * i)
          );
        }
        name = "";
        break;
      }
      default: {
        if (letter === "[") break;
        if (isFinite(parseInt(letter))) {
          formulaComponent.push(
            getComponentThirdStep(parseInt(letter), false, keyDate * i)
          );
          if (formula.length - 1 === i) {
            formulaComponent.push(
              getComponentThirdStep("plus", true, keyDate * keyDate * i)
            );
          }
          break;
        }
        if (
          letter === "-" ||
          letter === "+" ||
          letter === "*" ||
          letter === "/" ||
          letter === "."
        ) {
          formulaComponent.push(
            getComponentThirdStep(letter, false, keyDate * i)
          );
          if (formula.length - 1 === i) {
            formulaComponent.push(
              getComponentThirdStep("plus", true, keyDate * keyDate * i)
            );
          }
          break;
        }
        name = name + letter;
      }
    }
  }
  return formulaComponent;
};
