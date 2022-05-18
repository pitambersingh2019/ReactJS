import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IFilterData } from "..";
import SearchComponent from "../../../../../../../../Component/CustomComponent/Search";
import sortDefaultImg from "./../../../../../../assets/img/Sorting_columns_default.svg";
import sortImg from "./../../../../../../assets/img/Sorting_columns.svg";
import * as Styled from "./style";

interface IData {
  name: string;
  id: number;
}

interface ISort {
  position: number;
  mode: "ABC" | "CBA";
}

interface IProps {
  title: string;
  fieldName: string;
  data: IData[];
  dataAll: IData[];
  isLast: boolean;
  onSort: (column: string) => void;
  dataSort?: ISort;
  setFilterData: Dispatch<SetStateAction<IFilterData>>;
}

const TableColumn: FC<IProps> = ({
  title,
  fieldName,
  data,
  isLast,
  dataAll,
  dataSort,
  onSort,
  setFilterData,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const arrId = dataAll
      .filter((item) => item.name.includes(search))
      .map((item) => item.id);
    setFilterData((prev) => ({
      ...prev,
      [fieldName]: arrId,
    }));
  }, [search]);

  const onChangeserch = (text: string) => {
    setSearch(text);
  };

  const onClickSort = () => {
    onSort(fieldName);
  };

  return (
    <Styled.Wrapper>
      <Styled.HeaderColumn isLast={isLast}>
        <Styled.TitleWrapper>
          <Styled.Title>{title}</Styled.Title>
          <Styled.SortWrapper
            onClick={onClickSort}
            isABC={dataSort ? dataSort.mode === "ABC" : false}
          >
            <img src={dataSort ? sortImg : sortDefaultImg} alt="" />
          </Styled.SortWrapper>
          {dataSort && <Styled.Title>{dataSort.position}</Styled.Title>}
        </Styled.TitleWrapper>
        <SearchComponent
          value={search}
          onChange={onChangeserch}
          border="all"
          isPadding={false}
          type="tableSearch"
        />
      </Styled.HeaderColumn>
      <Styled.WrapperItem isLast={isLast}>
        {data.map((item, index) => (
          <Styled.Itemcolumn key={item.id} isLast={index === data.length - 1}>
            {item.name}
          </Styled.Itemcolumn>
        ))}
      </Styled.WrapperItem>
    </Styled.Wrapper>
  );
};

export default TableColumn;
