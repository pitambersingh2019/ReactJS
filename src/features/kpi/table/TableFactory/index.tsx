import { createRef, useEffect, useState } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectMainKPIs } from "../../reducer/selectors";
import Factory from "./Factory";
import * as Styled from "./styled";
import { ISearchKpis } from "../../reducer/types";

interface IProps {
  ableKPI: string[];
  searchKPI: string;
  searchKPILength: ISearchKpis[];
}

const TableFactory: FC<IProps> = ({ ableKPI, searchKPI, searchKPILength }) => {
  const mainKPIs = useSelector(selectMainKPIs);
  const [isLoading, setIsLoading] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [filterKPI, setFilterKPI] = useState(
    mainKPIs.data.filter((item) => ableKPI.includes(item.DepartmentName))
  );

  const ref = createRef<HTMLDivElement>();

  const changeScroll = () => {
    const scroll = ref.current ? ref.current.scrollTop : 0;
    if (isLoading) return;
    setScroll(scroll);
  };

  useEffect(() => {
    changeScroll();
    setIsLoading(mainKPIs.isLoading);
  }, [mainKPIs.isLoading]);

  useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.scrollTo({ top: scroll });
    }
  }, [isLoading]);

  useEffect(() => {
    changeScroll();
    setFilterKPI(
      mainKPIs.data.filter((item) => ableKPI.includes(item.DepartmentName))
    );
  }, [ableKPI, searchKPI, mainKPIs.data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!mainKPIs.data.length) {
    return <div>Empty</div>;
  }

  return (
    <Styled.FactoryWrapper ref={ref}>
      {filterKPI.map((item, index) => (
        <Factory
          key={index}
          departmentName={item.DepartmentName}
          departmentID={item.DepartmentID}
          kpis={item.kpis}
          seachKPI={searchKPI}
          primaryNumber={item.primary}
          NumberOfKPIs={item.NumberOfKPIs}
          primaryKPI={item.primaryKPI}
          searchKPILength={searchKPILength}
        />
      ))}
    </Styled.FactoryWrapper>
  );
};

export default TableFactory;
