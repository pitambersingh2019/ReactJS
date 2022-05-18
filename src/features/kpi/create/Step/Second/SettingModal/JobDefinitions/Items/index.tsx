import { FC } from "react";
import InputDefault from "../../../../../../../../Component/CustomComponent/InputDefault";
import * as Styled from "./style";

interface IData {
  name: string;
  id: number;
}

interface IProps {
  selected: IData[];
  allItem: IData[];
  onClickName: (id: number) => void;
}

const GroupView: FC<IProps> = ({ selected, allItem, onClickName }) => {
  return (
    <Styled.MachineNameWrapper>
      {allItem.map((item) => (
        <Styled.InputWrapper key={item.id + item.name}>
          <InputDefault
            type="checkbox"
            text={item.name}
            onClick={() => {
              onClickName(item.id);
            }}
            isActive={!!selected.find((itemS) => itemS.id === item.id)}
            color="#6d6dc5"
          />
        </Styled.InputWrapper>
      ))}
    </Styled.MachineNameWrapper>
  );
};

export default GroupView;
