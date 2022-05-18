import React, { useEffect, useState } from "react";
import HeaderTable from "./header";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMainKPIs,
  selectNameKPI,
  selectTimePeriod,
} from "../reducer/selectors";
import { changeTimePeriod } from "../reducer";
import TableFactory from "./TableFactory";
import { ISearchKpis } from "../reducer/types";
import * as Styled from "./style";

const TableKPI = () => {
  const mainKPIs = useSelector(selectMainKPIs);
  const timePeriod = useSelector(selectTimePeriod);
  const nameAllKPI = useSelector(selectNameKPI);
  const [search, setSearch] = useState<string>("");
  const [ableKPI, setAbleKPI] = useState<string[]>([]);
  const [searchKPILength, setSearchKPILength] = useState<ISearchKpis[]>([]);

  useEffect(() => {
    let arrName: string[] = [];
    let searchKpis: ISearchKpis[] = [];
    if (search === "") {
      arrName = nameAllKPI.map((item) => item.DepartmentName);
    } else {
      for (let i = 0; i < nameAllKPI.length; i++) {
        const formulaNames = nameAllKPI[i].Formulas;
        const nameMainKPI = nameAllKPI[i].DepartmentName;
        for (let j = 0; j < formulaNames.length; j++) {
          const isSearchFormula = formulaNames[
            j
          ].FormulaName.toLocaleLowerCase().includes(
            search.toLocaleLowerCase()
          );
          if (isSearchFormula && !arrName.includes(nameMainKPI)) {
            let kpisLength = formulaNames.filter((item) =>
              item.FormulaName.toLocaleLowerCase().includes(
                search.toLocaleLowerCase()
              )
            )?.length;
            searchKpis.push({
              departmentName: nameMainKPI,
              numberOfKPIs: kpisLength,
            });
            arrName.push(nameMainKPI);
          }
        }
      }
    }
    setAbleKPI(arrName);
    setSearchKPILength(searchKpis);
  }, [search, nameAllKPI]);

  const changeSearch = (value: string) => {
    setSearch(value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTimePeriod({ timePeriod }));
  }, []);

  return (
    <Styled.Wrapper>
      <HeaderTable
        timePeriod={timePeriod}
        searchValue={search}
        isLoading={mainKPIs.isLoading}
        changeSearchValue={changeSearch}
      />
      <TableFactory
        ableKPI={ableKPI}
        searchKPI={search}
        searchKPILength={searchKPILength}
      />
    </Styled.Wrapper>
  );
};

export default TableKPI;
