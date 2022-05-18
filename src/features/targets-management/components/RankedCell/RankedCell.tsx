import { useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import SmallSingleSelect from "../../../../Component/DesignSystem/DropDown/SmallSingleSelect";
import { Item } from "../../../../Component/DesignSystem/DropDown/types";
import { StyledRankedCell } from "./ranked-cell.styles";

type RankedCellProps = {
  row: Row & {
    depth: number;
  };
  isEditing: boolean;
  column: Column;
  setValue: (val: number, columnId: string, isValidValue: boolean) => void;
};

export default function RankedCell({
  row,
  isEditing,
  column,
  setValue,
}: RankedCellProps) {
  const [machineRank, setMachineRank] = useState<Item | undefined>(undefined);

  const items: Item[] = useMemo(
    () => [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ],
    []
  );

  const handleSelect = (item?: Item) => {
    setMachineRank(item);
    item &&
      item.value < 4 &&
      column.id &&
      setValue(item.value, column.id, true);
  };

  useEffect(() => {
    if (row.depth === 2) {
      const initRank = row.values.MachineRank;
      setMachineRank(items.find((item) => item.value === initRank));
    }
  }, [row.depth, row.values.MachineRank, items]);

  if (isEditing && row.depth === 2) {
    return (
      <SmallSingleSelect
        selectedItem={machineRank}
        items={items}
        onSelect={handleSelect}
      />
    );
  }

  if (row.depth === 2) {
    return <StyledRankedCell>{row.values.MachineRank}</StyledRankedCell>;
  }

  return null;
}
