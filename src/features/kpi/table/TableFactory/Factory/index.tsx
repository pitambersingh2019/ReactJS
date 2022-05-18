import { FC, useEffect, useState } from "react";
import * as Styled from "./style";
import KPI from "./KPI";
import { dataIKPI, IKPI, ISearchKpis } from "../../../reducer/types";
import { useDispatch, useSelector } from "react-redux";
import { closeMainKPI, setOpenKPIs } from "../../../reducer";
import CreateButtonFactory from "./CreateButton";
import PrimaryKPI from "./PrimaryKPI/intex";
import InfoFactory from "./InfoFactory";
import { KPIApi } from "../../../api";
import { OpenMainKPIAC } from "../../../reducer/actions/intex";
import {
  selectMainKPIs,
  selectNameKPI,
  selectOpenKPIs,
  selectTimePeriod,
} from "../../../reducer/selectors";

interface IProps {
  departmentName: string;
  departmentID: number;
  kpis: IKPI;
  seachKPI: string;
  primaryNumber: number;
  NumberOfKPIs: number;
  primaryKPI: dataIKPI;
  searchKPILength: ISearchKpis[];
}

const Factory: FC<IProps> = ({
  departmentName,
  kpis,
  NumberOfKPIs,
  departmentID,
  primaryKPI,
  seachKPI,
  searchKPILength,
}) => {
  const openKPIs = useSelector(selectOpenKPIs);
  const mainKPIs = useSelector(selectMainKPIs);
  const nameAllKPIs = useSelector(selectNameKPI);
  const timePeriod = useSelector(selectTimePeriod);
  const [open, setOpen] = useState<boolean>(openKPIs.includes(departmentID));
  const [currentFormulaID, setCurrentFormulaID] = useState<number>(0);
  const [dropKPI, setDropKPI] = useState<dataIKPI>(kpis.data[0]);
  const [filterKPIs, setFilterKPIs] = useState<dataIKPI[]>(kpis.data);

  useEffect(() => {
    setFilterKPIs(kpis.data);
  }, [kpis]);

  useEffect(() => {
    setFilterKPIs(kpis.data);
  }, [seachKPI]);

  useEffect(() => {
    setOpen(openKPIs.includes(departmentID));
  }, [openKPIs, filterKPIs]);

  const dispatch = useDispatch();

  const onDragDrop = () => {
    const dragKPI = filterKPIs.find(
      (item) => item.FormulaID === currentFormulaID
    );

    if (!dragKPI) return;
    const iDrop = filterKPIs.indexOf(dropKPI);
    const iDrag = filterKPIs.indexOf(dragKPI);
    if (iDrop === iDrag) return;
    if (dragKPI.isActive !== dropKPI.isActive) {
      setFilterKPIs((prev) => [...prev]);
      return;
    }
    let arrKPIs = filterKPIs.filter(
      (item) => item.FormulaID !== currentFormulaID
    );
    let indexDrop = arrKPIs.indexOf(dropKPI);
    if (iDrop > iDrag) indexDrop++;
    arrKPIs.splice(indexDrop, 0, dragKPI);

    const arr = arrKPIs.map((item, index) => ({
      ...item,
      DisplayOrder: index,
    }));

    setFilterKPIs(arr);
    KPIApi.setCustomerDefinedKPIsDisplayOrder(
      arr.map((item) => ({
        key: item.FormulaID,
        value: item.DisplayOrder,
      }))
    );
  };

  const getOpenKPI = () => {
    if (!kpis.data.length && kpis.isLoading) {
      return <div>Loading...</div>;
    }

    if (!kpis.data.length) {
      return <div>Empty</div>;
    }

    return (
      <>
        {filterKPIs
          .filter((item) =>
            item.FormulaName.toLocaleLowerCase().includes(
              seachKPI.toLocaleLowerCase()
            )
          )
          .map((item, index) => (
            <KPI
              key={index}
              filterKPIs={filterKPIs}
              kpi={item}
              isPrimary={item.isPrimary}
              departmentID={departmentID}
              departmentName={departmentName}
              setCurrentKPI={setCurrentFormulaID}
              setDropKPI={setDropKPI}
              onDragDrop={onDragDrop}
              creationDate={item.creationDate}
            />
          ))}
      </>
    );
  };

  const onClickKPI = () => {
    if (mainKPIs.isLoading) return;
    if (open) {
      dispatch(closeMainKPI({ departmentID }));
      return;
    }
    dispatch(OpenMainKPIAC(departmentID, timePeriod));
    dispatch(setOpenKPIs({ openKPIs: [...openKPIs, departmentID] }));
  };

  const getSecondColumn = () => {
    const dataName = nameAllKPIs.find(
      (item) => item.DepartmentID === departmentID
    );
    if (open) {
      return (
        <CreateButtonFactory
          departmentName={departmentName}
          departmentID={departmentID}
        />
      );
    }
    if (!open && dataName && dataName.Formulas.length && NumberOfKPIs) {
      return (
        <PrimaryKPI
          formulaName={primaryKPI.FormulaName}
          displayType={primaryKPI.DisplayType}
          min={primaryKPI.MinValue}
          max={primaryKPI.MaxValue}
          progress={primaryKPI.Result}
          isResultValid={primaryKPI.isResultValid}
        />
      );
    }
    return null;
  };
  return (
    <Styled.Wrapper draggable={false}>
      <Styled.PreviewKPI onClick={onClickKPI}>
        <InfoFactory
          departmentName={departmentName}
          NumberOfKPIs={NumberOfKPIs}
          searchKPILength={searchKPILength}
          open={open}
        />
        {getSecondColumn()}
      </Styled.PreviewKPI>
      {open && <Styled.KPIWrapper>{getOpenKPI()}</Styled.KPIWrapper>}
    </Styled.Wrapper>
  );
};

export default Factory;
