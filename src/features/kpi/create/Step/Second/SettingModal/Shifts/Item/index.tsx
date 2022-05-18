import { FC, useState, useEffect } from "react";
import InputDefault from "../../../../../../../../Component/CustomComponent/InputDefault";
import * as Styled from "./style";
import arrowImg from "./../../../../../../assets/img/Arow_dropdown.svg";
import { IShiftsDef } from "../../../../../../api/types";

interface IProps {
  shiftName: string;
  select: IShiftsDef[];
  dayName: string[];
  onSelect: (name: string[]) => void;
}

const getAllHalf = (allDay: string[], select: string[]) => {
  let isHalf = false;
  let isAll = true;
  allDay.forEach((item, index) => {
    if (select.includes(item)) {
      isHalf = true;
    }
    if (!select.includes(item)) {
      isAll = false;
    }
    if (select.includes(item) && index === allDay.length - 1 && isAll) {
      isHalf = false;
    }
  });
  return [isHalf, isAll];
};

const ItemShift: FC<IProps> = ({ shiftName, dayName, onSelect, select }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    const data = getAllHalf(
      dayName,
      select.map((item) => item.ShiftName)
    );
    setIsAll(data[1]);
    setIsHalf(data[0]);
  }, [select, dayName]);

  const changeIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Styled.Wrapper>
      <Styled.Shift>
        <InputDefault
          type="checkbox"
          color="#6d6fc3"
          isActive={isAll}
          isHalf={isHalf}
          onClick={() => {
            onSelect(
              isAll
                ? dayName
                : dayName.filter(
                    (item) =>
                      !select.map((item) => item.ShiftName).includes(item)
                  )
            );
          }}
        />
        <Styled.NameWrapper onClick={changeIsOpen}>
          <Styled.ShiftArrow isOpen={isOpen}>
            <img src={arrowImg} />
          </Styled.ShiftArrow>
          <Styled.ShiftText>{shiftName}</Styled.ShiftText>
        </Styled.NameWrapper>
      </Styled.Shift>
      {isOpen && (
        <Styled.WrapperDays>
          {dayName.map((item) => (
            <InputDefault
              key={item}
              text={item}
              type="checkbox"
              color="#6d6fc3"
              isActive={!!select.find((itemS) => itemS.ShiftName === item)}
              onClick={() => {
                onSelect([item]);
              }}
            />
          ))}
        </Styled.WrapperDays>
      )}
    </Styled.Wrapper>
  );
};

export default ItemShift;
