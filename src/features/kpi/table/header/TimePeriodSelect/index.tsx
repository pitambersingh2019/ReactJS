import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeTimePeriod } from "../../../reducer";
import { TTimePeriod } from "../../../reducer/types";
import img from "./../../../../../assets/icons/selectMark.svg";
import * as Styled from "./style";

interface IProps {
  timePeriodName: string[];
  timePeriod: TTimePeriod;
  onClickTimePeriod: () => void;
}

const TimePeriodSelect: FC<IProps> = ({
  timePeriodName,
  timePeriod,
  onClickTimePeriod,
}) => {
  const dispath = useDispatch();

  const onClickTime = (index: number) => {
    onClickTimePeriod();
    dispath(
      changeTimePeriod({
        timePeriod: (index + 1) as TTimePeriod,
      })
    );
  };

  return (
    <div>
      <Styled.TimePeriodSelect>
        {timePeriodName.map((item, index) => (
          <Styled.Wrapper
            key={item}
            activeField={index === timePeriod - 1}
            onClick={() => {
              onClickTime(index);
            }}
          >
            <Styled.TimePeriodSelectField>{item}</Styled.TimePeriodSelectField>
            <Styled.SelectImg>
              <img src={index === timePeriod - 1 ? img : undefined} />
            </Styled.SelectImg>
          </Styled.Wrapper>
        ))}
      </Styled.TimePeriodSelect>
      <Styled.BlackWrapper onClick={onClickTimePeriod}></Styled.BlackWrapper>
    </div>
  );
};

export default TimePeriodSelect;
