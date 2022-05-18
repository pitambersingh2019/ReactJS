import { FC, useState, useEffect } from "react";
import * as Styled from "./style";
import arrowImg from "./../../../../../../../../assets/img/Arow_dropdown.svg";
import InputDefault from "../../../../../../../../../../Component/CustomComponent/InputDefault";

interface ISelect {
  name: string;
  id: number;
  type: string;
}

interface IProps {
  titleName: string;
  select: ISelect[];
  dataItem: ISelect[];
  onSelect: (name: ISelect[]) => void;
}

const getAllHalf = (allDay: number[], select: number[]) => {
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

const ItemMachine: FC<IProps> = ({ titleName, dataItem, onSelect, select }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    const data = getAllHalf(
      dataItem.map((item) => item.id),
      select.map((item) => item.id)
    );
    setIsAll(data[1]);
    setIsHalf(data[0]);
  }, [select, dataItem]);

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
                ? dataItem
                : dataItem.filter(
                    (item) => !select.map((item) => item.id).includes(item.id)
                  )
            );
          }}
        />
        <Styled.NameWrapper onClick={changeIsOpen}>
          <Styled.ShiftArrow isOpen={isOpen}>
            <img src={arrowImg} />
          </Styled.ShiftArrow>
          <Styled.ShiftText>{titleName}</Styled.ShiftText>
        </Styled.NameWrapper>
      </Styled.Shift>
      {isOpen && (
        <Styled.WrapperDays>
          {dataItem.map((item) => (
            <InputDefault
              key={item.name + item.id}
              text={item.name}
              type="checkbox"
              color="#6d6fc3"
              isActive={!!select.find((itemS) => itemS.id === item.id)}
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

export default ItemMachine;
