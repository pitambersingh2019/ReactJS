import { FC } from "react";
import * as Styled from "./style";

interface IProps {
  color: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  showAll: boolean;
  count: number;
}

const SelectAhowAll: FC<IProps> = ({ color, onClick, showAll, count }) => {
  return (
    <Styled.ShowAllText color={color} onClick={onClick} cursor={!!count}>
      {showAll ? "Show All" : "Show Select (" + count + ")"}
    </Styled.ShowAllText>
  );
};

export default SelectAhowAll;
