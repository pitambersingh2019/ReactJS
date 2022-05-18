import * as Styled from "./style";
import filterImg from "../../../../assets/img/Filter_settings.svg";
import Tabs from "../Tabs";
import { FC } from "react";
import { IFilterLabels } from "../../../../api/types";

type TNameFilterId = keyof IFilterLabels;

interface IProps {
  text: string;
  onClick: () => void;
  disable: boolean;
  onClickTabs: (name: TNameFilterId) => void;
  filter: IFilterLabels;
}

const FilterSSCK: FC<IProps> = ({
  text,
  disable,
  filter,
  onClick,
  onClickTabs,
}) => {
  return (
    <Styled.FilterWrapper>
      <Styled.FilterButtonWrapper onClick={onClick} disable={disable}>
        <Styled.FilterImgWrapper>
          <img src={filterImg} />
        </Styled.FilterImgWrapper>
        <Styled.FilterText>{text}</Styled.FilterText>
      </Styled.FilterButtonWrapper>
      <Styled.TabsWrapper>
        <Tabs tabs={filter} clearFilterID={onClickTabs} isTooltip={true} />
      </Styled.TabsWrapper>
    </Styled.FilterWrapper>
  );
};

export default FilterSSCK;
