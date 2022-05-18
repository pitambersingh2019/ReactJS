import { FC } from "react";
import GroupByWrapper, { TGroup } from "./GroupByWrapper";
// import BackToGroup from "./BackToGroups";
import GroupView from "./GroupView";

export interface IItemData {
  id: number;
  name: string;
  type: string;
}

export interface IDataGroupBy {
  group: TGroup;
  selected: IItemData[];
  types: string[];
  allItem: IItemData[];
}

interface IProps {
  data: IDataGroupBy;
  groupName: TGroup[];
  onClickGroupName: (name: TGroup) => void;
  setNewSelected: (arr: number[]) => void;
}

const GroupBy: FC<IProps> = ({
  data,
  groupName,
  onClickGroupName,
  setNewSelected,
}) => {
  const { group, selected, allItem } = data;

  const onClickName = (machines: number[]) => {
    let newMachines = selected;
    machines.forEach((id) => {
      const machine = allItem.find((item) => item.id === id);
      if (!machine) return;
      const isMachines = newMachines.find((item) => item.id === id);
      newMachines = isMachines
        ? newMachines.filter((item) => item.id !== id)
        : [...newMachines, machine];
    });

    setNewSelected(newMachines.map((item) => item.id));
  };

  return (
    <GroupByWrapper
      selectGroup={group}
      onClickGroupName={onClickGroupName}
      groupName={groupName}
    >
      <GroupView data={data} onClickName={onClickName} />
    </GroupByWrapper>
  );
};

export default GroupBy;
