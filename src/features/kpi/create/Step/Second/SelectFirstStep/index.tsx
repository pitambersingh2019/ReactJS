import { FC, useState } from "react";
import * as Styled from "./style";
import arrowImg from "./../../../assets/img/Arow_dropdown.svg";

interface IProps {
  onChange: (value: string) => void;
  color: "#a7a7a7" | "unset";
  value: string;
  name: string;
  options: string[];
  formulaID: number;
}

const getOptions = (options: string[], onChange: (value: string) => void) => {
  return options.map((option) => {
    if (option === "Select display type") return;
    return (
      <Styled.Option
        key={option}
        onClick={() => {
          onChange(option);
        }}
      >
        {option}
      </Styled.Option>
    );
  });
};

const getSeletValue = (name: string, value: string) => {
  if (value !== "") return value;
  if (name === "select_level") return "Select level";
  return "Select display type";
};

const SelectFirstStep: FC<IProps> = ({
  onChange,
  color,
  value,
  options,
  name,
  formulaID,
}) => {
  const [active, setActive] = useState(false);
  const changeActiveStatus = () => {
    if (formulaID) return;
    setActive((prev) => !prev);
  };

  return (
    <Styled.KPISelect color={color} onClick={changeActiveStatus}>
      <Styled.SelectValue active={active} disable={!!formulaID}>
        <div>{getSeletValue(name, value)}</div>
        <Styled.ArrowWrapper>
          <img src={arrowImg} />
        </Styled.ArrowWrapper>
      </Styled.SelectValue>
      {active && (
        <Styled.WrapperOption>
          {getOptions(options, onChange)}
        </Styled.WrapperOption>
      )}
    </Styled.KPISelect>
  );
};

export default SelectFirstStep;
