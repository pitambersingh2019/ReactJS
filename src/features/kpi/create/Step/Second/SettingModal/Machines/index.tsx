import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IFilterMachine } from "../../../../../api/types";
import { TGroup } from "./GroupBy/GroupByWrapper";
import EndLineMachine from "./EndLine";
import HeaderSetting from "../SettingComponents/HeaderSetting";
import * as Styled from "./style";
import { ISecondStep } from "../../../../types";
import GroupBy, { IDataGroupBy, IItemData } from "./GroupBy";
import { translations } from "../../../../../../../locales/translations";
import { useTranslation } from "react-i18next";

interface IData {
  id: number;
  name: string;
}

interface IProps {
  machines: IFilterMachine[];
  selectMachines: IItemData[];
  endOfLine: number[];
  setSelectFilter: Dispatch<SetStateAction<ISecondStep>>;
}
export interface IInitialStateMachines {
  group: TGroup;
  openType: string;
  selected: IFilterMachine[];
  viewItem: IFilterMachine[];
  types: string[];
}

const getTypes = (machines: IFilterMachine[]) => {
  const setMachines = new Set<string>();
  machines.forEach((item) => {
    setMachines.add(item.MachineTypeName);
  });
  const arr: string[] = [];

  setMachines.forEach((value) => {
    arr.push(value);
  });

  return arr;
};

const getAllStatus = (openName: IData[], selectNameGroup: IData[]) => {
  let status = true;
  openName.forEach((item) => {
    if (!selectNameGroup.find((itemS) => itemS.id === item.id)) {
      status = false;
    }
  });
  return status;
};

const MashinesSetting: FC<IProps> = ({
  machines,
  selectMachines,
  endOfLine,
  setSelectFilter,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<IDataGroupBy>({
    group: "Machine Type",
    selected: selectMachines,
    types: getTypes(machines),
    allItem: machines.map((item) => ({
      id: item.ID,
      name: item.MachineName,
      type: item.MachineTypeName,
    })),
  });
  const [selectAll, setSelectAll] = useState(
    getAllStatus(data.allItem, data.selected)
  );

  useEffect(() => {
    setData((prev) => ({ ...prev, selected: selectMachines }));
  }, [selectMachines]);

  useEffect(() => {
    const { selected } = data;
    setSelectAll(getAllStatus(data.allItem, selected));
  }, [data.selected]);

  const onClickGroupName = (group: TGroup) => {
    setData((prev) => ({
      ...prev,
      group,
    }));
  };

  const onChangeSelectAll = () => {
    setSelectFilter((prev) => {
      return {
        ...prev,
        filter: {
          ...prev.filter,
          MachineIdFilter: selectAll
            ? []
            : machines.map((item) => ({
                ID: item.ID,
                GroupID: item.MachineGroupID,
                GroupName: item.MachineTypeName,
                Name: item.MachineName,
              })),
        },
      };
    });
    setSelectAll((prev) => !prev);
  };

  const onChangeEndOfLine = () => {
    setSelectFilter((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        IsEndOfLineFilter: !prev.filter.IsEndOfLineFilter.length
          ? [
              {
                ID: 1,
                GroupID: 1,
                GroupName: "",
                Name: "",
              },
            ]
          : [],
      },
    }));
  };

  const setNewSelected = (dataT: number[]) => {
    setSelectFilter((prev) => {
      return {
        ...prev,
        filter: {
          ...prev.filter,
          MachineIdFilter: machines
            .filter((item) => dataT.includes(item.ID))
            .map((item) => ({
              ID: item.ID,
              GroupID: item.MachineGroupID,
              GroupName: item.MachineTypeName,
              Name: item.MachineName,
            })),
        },
      };
    });
  };

  return (
    <Styled.Wrapper>
      <HeaderSetting
        status={selectAll}
        onChange={onChangeSelectAll}
        title={t(translations.CustomKPI.SecondStepMachineSelectionTitle)}
      />
      <EndLineMachine
        onChangeEndOfLine={onChangeEndOfLine}
        endOfLine={endOfLine}
      />
      <GroupBy
        data={data}
        groupName={[
          t(translations.CustomKPI.SecondStepMachineTypeTitle),
          t(translations.CustomKPI.SecondStepUngroupedTitle),
        ]}
        onClickGroupName={onClickGroupName}
        setNewSelected={setNewSelected}
      />
    </Styled.Wrapper>
  );
};

export default MashinesSetting;
