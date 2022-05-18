import { FC, useContext } from "react";
import { CreateKPIContext } from "../../../..";
import {
  IDataGetResultSearchFields,
  IResponseFilter,
  IRowData,
  TFilterMenu,
} from "../../../../../api/types";
import JobDefinitions from "../JobDefinitions";
import MashinesSetting from "../Machines";
import Shifts from "../Shifts";
import TableKPIFilter from "../TableSetting";
import * as Styled from "./styled";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";

interface IProps {
  openFilter: TFilterMenu;
  filterData: IResponseFilter;
  dataTable: IDataGetResultSearchFields;
}

interface IPropsTable {
  initialSelect: number[];
  dataTable: IRowData[];
}

const GetTable: FC<IPropsTable> = ({ children, initialSelect, dataTable }) => {
  const { t } = useTranslation();
  return (
    <Styled.WrapperTable>
      {children}
      <Styled.WrapperSelected>{`${initialSelect.length}/${dataTable.length} ${t(
        translations.CustomKPI.SecondStepSelectedTableFooter
      )}`}</Styled.WrapperSelected>
    </Styled.WrapperTable>
  );
};

const GetFilter: FC<IProps> = ({ openFilter, filterData, dataTable }) => {
  const createContext = useContext(CreateKPIContext);

  if (createContext === null) return <div></div>;

  const { secondStepSetting, setSecondStepSetting } = createContext;
  const { filter } = secondStepSetting;

  switch (openFilter) {
    case "Machines": {
      return (
        <MashinesSetting
          machines={filterData.Machines}
          selectMachines={filter.MachineIdFilter.map((item) => ({
            id: item.ID,
            name: item.Name,
            type: item.GroupName,
          }))}
          endOfLine={filter.IsEndOfLineFilter.map((item) => item.ID)}
          setSelectFilter={setSecondStepSetting}
        />
      );
    }
    case "Shift Name": {
      return (
        <Shifts
          shifts={filterData.ShiftDef}
          selectShifts={filter.ShiftNameFilter.map((item) => item.Name)}
          setSelectFilter={setSecondStepSetting}
        />
      );
    }
    case "Job Definition": {
      return (
        <JobDefinitions
          definitions={filterData.ERPJobDef}
          selectJob={filter.ERPJobDefFilter.map((item) => item.ID)}
          setSelectFilter={setSecondStepSetting}
        />
      );
    }
    case "Product Group": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.ProductGroupFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="ProductGroupFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }
    case "Products": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.ProductIdFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="ProductIdFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }
    case "Mold Group": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.MoldGroupFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="MoldGroupFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }
    case "Molds": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.MoldIdFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="MoldIdFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }
    case "Users": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.UserIdFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="UserIdFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }
    case "Clients": {
      if (!dataTable[0].length) return <div>Loading...</div>;
      const initialSelect = filter.ClientIdFilter.map((item) => item.ID);
      return (
        <GetTable initialSelect={initialSelect} dataTable={dataTable[1]}>
          <TableKPIFilter
            data={dataTable}
            name="ClientIdFilter"
            selectTable={initialSelect}
            setSelectFilter={setSecondStepSetting}
          />
        </GetTable>
      );
    }

    default: {
      return <div>Empty</div>;
    }
  }
};

export default GetFilter;
