import React, { useEffect, useState } from "react";
import {
  GroupDrop_down,
  GroupDrop_down_container,
  GroupDrop_down_list_a,
  RowGroup,
  SelectedCausesSpan,
} from "./styles";

export interface ItemGroup {
  label: string;
  value: number;
  selected: number;
}

export interface DropdownGroupMultiProps {
  onSelect: (item: ItemGroup) => void;
  items: ItemGroup[];
  selectedItem?: ItemGroup;
}

const DropdownGroupMulti: React.FC<DropdownGroupMultiProps> = (props) => {
  const { onSelect, items, selectedItem } = props;
  const [selected, setselected] = useState<ItemGroup | undefined>(selectedItem);
  const [itemsResult, setitemsResult] = useState<ItemGroup[]>([]);

  useEffect(() => {
    setitemsResult(items);
    if (selectedItem != undefined) {
      if (selectedItem.label !== "") {
        setselected(selectedItem);
      }
    }
  }, [items, selectedItem]);

  const ItemClicked = (item: ItemGroup) => {
    if (selected?.value === item.value) {
      // onSelect({ label: "", value: 0, selected: 0 });
      // setselected(undefined);
    } else {
      onSelect(item);
      setselected(item);
    }
  };

  return (
    <GroupDrop_down_container>
      <GroupDrop_down border={true}>
        <ul>
          {itemsResult?.map(
            (
              option: { label: string; value: number; selected: number },
              index
            ) => (
              <RowGroup
                key={index}
                id={option.label}
                onClick={() => ItemClicked(option)}
              >
                <li>
                  <GroupDrop_down_list_a
                    selected={
                      selected ? option.value === selected.value : false
                    }
                  >
                    {option.label}
                  </GroupDrop_down_list_a>
                  <SelectedCausesSpan visible={option.selected > 0}>
                    {"(" + option.selected + ")"}{" "}
                  </SelectedCausesSpan>
                </li>
              </RowGroup>
            )
          )}
        </ul>
      </GroupDrop_down>
    </GroupDrop_down_container>
  );
};

export default DropdownGroupMulti;
