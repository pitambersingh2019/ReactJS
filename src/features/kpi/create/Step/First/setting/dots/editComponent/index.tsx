import { FC, useContext, useState } from "react";
import { CreateKPIContext } from "../../../../..";
import { IFormulaComponent, TComponent } from "../../../../../types";
import * as Styled from "./style";
import minus from "../../../../../../assets/img/Calculator_minus.svg";
import multiplication from "../../../../../../assets/img/Calculator_multiplication.svg";
import plus from "../../../../../../assets/img/Calculator_plus.svg";
import division from "../../../../../../assets/img/Calculator_division.svg";
import dot from "../../../../../../assets/img/Calculator_dot.svg";
import SearchComponent from "../../../../../../../../Component/CustomComponent/Search";
import selectImg from "./../../../../../../../../assets/icons/selectMark.svg";

interface IProps {
  onClick: () => void;
  params?: string[];
}

const getPoints = (
  title: TComponent,
  formulaComponents: IFormulaComponent[],
  activeElement: number,
  params?: string[]
) => {
  if (title === "FuncComponent") {
    return ["Sum", "Avg", "Min", "Max"];
  }
  if (title === "ParamComponent") {
    return params || [];
  }
  if (title === "CalComponent") {
    const currentName = formulaComponents[activeElement].props.name;
    const last = formulaComponents[activeElement - 1]?.component;
    const lastName = formulaComponents[activeElement - 1]?.props.name;
    const next = formulaComponents[activeElement + 1].component;
    const nextName = formulaComponents[activeElement + 1].props.name;
    if (isNaN(parseInt(currentName)) && currentName !== ".") {
      return ["-", "+", "x", "/"];
    }
    if (
      last === "CalComponent" &&
      !isNaN(parseInt(lastName)) &&
      ((next === "CalComponent" && !isNaN(parseInt(nextName))) ||
        next === "PlusComponent")
    ) {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    }
    if (currentName === ".") {
      return ["."];
    }
    if (!isNaN(parseInt(currentName))) {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    }
  }
  return [];
};

const getTitle = (component: TComponent) => {
  if (component === "FuncComponent") {
    return "Select Function";
  }
  if (component === "CalComponent") {
    return "Select Calculator";
  }
  if (component === "ParamComponent") {
    return "Select Parameters";
  }
};

const EditComponent: FC<IProps> = ({ onClick, params }) => {
  const contextCreate = useContext(CreateKPIContext);
  const [search, setSearch] = useState("");

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;
  const { ActiveElement, formulaComponent } = firstStepSetting;
  const title = formulaComponent[ActiveElement].component;

  const points = getPoints(title, formulaComponent, ActiveElement, params);

  const onSelect = (name: string) => {
    const newFormulaComponent = [...formulaComponent];
    newFormulaComponent[ActiveElement] = {
      component: newFormulaComponent[ActiveElement].component,
      props: {
        ...newFormulaComponent[ActiveElement].props,
        name,
      },
    };
    if (newFormulaComponent[ActiveElement].props.img) {
      newFormulaComponent[ActiveElement].props.img = null;
    }
    if (name === "-") {
      newFormulaComponent[ActiveElement].props.img = minus;
    }
    if (name === "x") {
      newFormulaComponent[ActiveElement].props.img = multiplication;
    }
    if (name === "+") {
      newFormulaComponent[ActiveElement].props.img = plus;
    }
    if (name === "/") {
      newFormulaComponent[ActiveElement].props.img = division;
    }
    if (name === ".") {
      newFormulaComponent[ActiveElement].props.img = dot;
    }

    setFirstStepSetting((prev) => ({
      ...prev,
      formulaComponent: newFormulaComponent,
    }));
    onClick();
  };

  const changeSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <Styled.Wrapper>
      <Styled.WrapperTitle>
        <Styled.Title>{getTitle(title)}</Styled.Title>
      </Styled.WrapperTitle>
      {points.length > 5 && (
        <Styled.WrapperTitle>
          <Styled.SearchWrapper>
            <SearchComponent
              value={search}
              onChange={changeSearch}
              border="all"
              placeholder="Search"
              type="parameters"
            />
          </Styled.SearchWrapper>
        </Styled.WrapperTitle>
      )}
      <Styled.WrapperPoint>
        {points
          .filter((item) =>
            item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((name) => (
            <Styled.PointContainer key={name}>
              <Styled.PointWrapper
                isActive={
                  formulaComponent[ActiveElement].props.name === name ||
                  formulaComponent[ActiveElement].props.name ===
                    "[" + name + "]"
                }
              >
                <Styled.Point
                  onClick={() => {
                    onSelect(name);
                  }}
                >
                  {name}
                </Styled.Point>
                <Styled.PointImg>
                  {(formulaComponent[ActiveElement].props.name === name ||
                    formulaComponent[ActiveElement].props.name ===
                      "[" + name + "]") && <img src={selectImg} alt="" />}
                </Styled.PointImg>
              </Styled.PointWrapper>
            </Styled.PointContainer>
          ))}
      </Styled.WrapperPoint>
    </Styled.Wrapper>
  );
};

export default EditComponent;
