import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IDataGetResultSearchFields, IRowData } from "../../../../../api/types";
import { ISecondStep } from "../../../../types";
import TableColumn from "./Column";
import TableSelectColumn from "./SelectColunm";
import * as Styled from "./style";

type TName =
  | "ProductGroupFilter"
  | "ProductIdFilter"
  | "MoldGroupFilter"
  | "MoldIdFilter"
  | "UserIdFilter"
  | "ClientIdFilter";

interface ISort {
  name: string;
  mode: "ABC" | "CBA";
}
interface IProps {
  data: IDataGetResultSearchFields;
  name: TName;
  selectTable: number[];
  setSelectFilter: Dispatch<SetStateAction<ISecondStep>>;
}

export interface IFilterData {
  ID: number[];
  [key: string]: number[];
}

const getItemDataName = (value: number | string | null) => {
  if (value === null) return "";
  return value.toString();
};

const getName = (name: TName) => {
  if (name === "MoldGroupFilter" || name === "ProductGroupFilter") {
    return "Group Name";
  }
  if (name === "ClientIdFilter") {
    return "Name";
  }
  if (name === "MoldIdFilter") {
    return "Mold Name";
  }
  if (name === "ProductIdFilter") {
    return "Product Name";
  }
  return "First Name";
};

const getSort = (data: ISort[], column: string) => {
  return data
    .filter((item) => item.name === column)
    .map((itemM) => {
      return {
        position: data.findIndex((item) => item.name === column) + 1,
        mode: itemM.mode,
      };
    })[0];
};

const sortData = (first: IRowData, second: IRowData, setting: ISort) => {
  const a = first[setting.name];
  const b = second[setting.name];
  const val = setting.mode === "ABC" ? 1 : -1;
  if (!a && !b) return 0;
  if (!a) return -1 * val;
  if (!b) return 1 * val;
  if (a > b) return 1 * val;
  if (a < b) return -1 * val;
  return 0;
};

const TableKPIFilter: FC<IProps> = ({
  data,
  name,
  selectTable,
  setSelectFilter,
}) => {
  const [filterData, setFilterData] = useState<IFilterData>({ ID: [] });
  const [columnData, rowData] = data;
  const [clearData, setClearData] = useState<IRowData[]>(rowData);
  const [selectItem, setSelectItem] = useState<number[]>([]);
  const [dataSort, setDataSort] = useState<ISort[]>([]);

  useEffect(() => {
    setSelectItem(
      rowData
        .filter((item) => selectTable.includes(item.ID))
        .map((item) => item.ID)
    );
  }, [selectTable]);

  useEffect(() => {
    if (dataSort.length !== 0) {
      setClearData((prev) => {
        const newData = [...prev];
        newData.sort((a, b) => sortData(a, b, dataSort[0]));
        return newData;
      });
    } else {
      setFilterData((prev) => ({ ...prev }));
    }
  }, [dataSort]);

  useEffect(() => {
    const newDataID = filterData.ID.filter((item) => {
      let status = true;
      columnData.forEach((itemC) => {
        if (!filterData[itemC.FieldName].includes(item)) {
          status = false;
        }
      });
      return status;
    });

    let newData = newDataID.map(
      (id) => rowData.filter((itemR) => itemR.ID === id)[0]
    );

    setClearData(newData);
  }, [filterData]);

  const onSelect = (select: number[]) => {
    const selectData = rowData.filter((item) => select.includes(item.ID));
    let dataName = "";
    const displayName = getName(name);
    columnData.forEach((item) => {
      if (item.DisplayEName === displayName) {
        dataName = item.FieldName;
      }
    });

    setSelectFilter((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        [name]: selectData.map((item) => ({
          ID: item.ID,
          GroupID: 0,
          GroupName: "",
          Name: item[dataName],
        })),
      },
    }));
  };

  const onClickCheck = (id: number) => {
    if (selectItem.includes(id)) {
      onSelect(selectItem.filter((item) => item !== id));
      return;
    }
    onSelect([...selectItem, id]);
  };

  const onClickCheckAll = (status: boolean) => {
    if (status) {
      onSelect([]);
      return;
    }
    onSelect(rowData.map((item) => item.ID));
  };

  const onSort = (name: string) => {
    setDataSort((prev) => {
      let arr = [...prev];
      const itemSort = prev.find((item) => item.name === name);
      if (itemSort) {
        if (itemSort.mode === "CBA") {
          const index = prev.findIndex((item) => item.name === name);
          arr.splice(index, 1);
        } else {
          arr = prev.map((item) => {
            if (item.name !== name) return item;
            return {
              mode: "CBA",
              name: item.name,
            };
          });
        }
      } else {
        arr.push({ mode: "ABC", name });
      }
      return arr;
    });
  };

  return (
    <Styled.WrapperScroll>
      <Styled.Wrapper>
        <TableSelectColumn
          data={clearData.map((item) => {
            return {
              id: item.ID,
              check: selectItem.includes(item.ID),
            };
          })}
          statusAll={
            rowData.filter((item) => !selectItem.includes(item.ID)).length ===
              0 && selectItem.length !== 0
          }
          onClickCheck={onClickCheck}
          onClickAll={onClickCheckAll}
        />
        {columnData.map((item, index) => {
          return (
            <TableColumn
              key={index}
              setFilterData={setFilterData}
              isLast={index === columnData.length - 1}
              title={item.DisplayEName}
              fieldName={item.FieldName}
              onSort={onSort}
              dataSort={getSort(dataSort, item.FieldName)}
              data={clearData.map((itemR) => ({
                id: itemR.ID,
                name: getItemDataName(itemR[item.FieldName]),
              }))}
              dataAll={rowData.map((itemR) => ({
                id: itemR.ID,
                name: getItemDataName(itemR[item.FieldName]),
              }))}
            />
          );
        })}
      </Styled.Wrapper>
    </Styled.WrapperScroll>
  );
};

export default TableKPIFilter;
