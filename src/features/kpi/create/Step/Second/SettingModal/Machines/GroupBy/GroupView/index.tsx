import { FC } from "react";
import { IDataGroupBy } from "..";
import InputDefault from "../../../../../../../../../Component/CustomComponent/InputDefault";
import ItemMachine from "./Item";
import * as Styled from "./style";

interface IProps {
  data: IDataGroupBy;
  onClickName: (id: number[]) => void;
}

const GroupView: FC<IProps> = ({ data, onClickName }) => {
  const { group, selected, types, allItem } = data;
  if (group === "Ungrouped") {
    return (
      <Styled.MachineNameWrapper>
        {allItem.map((item) => (
          <Styled.InputDefaultWrapper key={item.id + item.name}>
            <InputDefault
              type="checkbox"
              text={item.name}
              onClick={() => {
                onClickName([item.id]);
              }}
              isActive={!!selected.find((itemS) => itemS.id === item.id)}
              color="#6d6dc5"
            />
          </Styled.InputDefaultWrapper>
        ))}
      </Styled.MachineNameWrapper>
    );
  }

  return (
    <Styled.MachineNameWrapper>
      {types.map((item) => (
        <ItemMachine
          key={item}
          titleName={item}
          select={selected}
          dataItem={allItem.filter((itemD) => itemD.type === item)}
          onSelect={(machines) => {
            onClickName(machines.map((item) => item.id));
          }}
        />
      ))}
    </Styled.MachineNameWrapper>
  );
};

export default GroupView;
