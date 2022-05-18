import { FC } from "react";
import InputDefault from "../../../../../../../../Component/CustomComponent/InputDefault";

import * as Styled from "./style";

interface IData {
  id: number;
  check: boolean;
}

interface IProps {
  data: IData[];
  statusAll: boolean;
  onClickCheck: (id: number) => void;
  onClickAll: (status: boolean) => void;
}

const TableSelectColumn: FC<IProps> = ({
  data,
  onClickCheck,
  onClickAll,
  statusAll,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.HeaderColumn>
        <InputDefault
          type="checkbox"
          onClick={() => {
            onClickAll(statusAll);
          }}
          isActive={statusAll}
          color="#6d6dc5"
        />
      </Styled.HeaderColumn>
      <Styled.WrapperItem>
        {data.map((item, index) => (
          <Styled.Itemcolumn key={item.id} isLast={index === data.length - 1}>
            <InputDefault
              type="checkbox"
              onClick={() => {
                onClickCheck(item.id);
              }}
              isActive={item.check}
              color="#6d6dc5"
            />
          </Styled.Itemcolumn>
        ))}
      </Styled.WrapperItem>
    </Styled.Wrapper>
  );
};

export default TableSelectColumn;
