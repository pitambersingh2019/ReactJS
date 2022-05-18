import { useState } from "react";
import { Item } from "../../../../../../../../Component/DesignSystem/DropDown/types";
import Select from "./Select/Select";

type ComboCellProps = {
  onSelect: (value: string) => void;
  items: Item[];
  selectedItem: Item | undefined;
};

export default function ComboCell({
  onSelect,
  items,
  selectedItem,
}: ComboCellProps) {
  const [selected, setSelected] = useState(selectedItem);

  const handleSelect = (item: Item) => {
    setSelected(item);
    onSelect(item.value.toString());
  };

  return (
    <Select onSelect={handleSelect} items={items} selectedItem={selected} />
  );
}
