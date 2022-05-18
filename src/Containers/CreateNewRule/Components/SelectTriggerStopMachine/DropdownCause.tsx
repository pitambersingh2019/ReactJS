import React, { useEffect, useState } from "react";
import { Item } from "../../../../Component/DesignSystem/DropDown/types";
import {
  CauseDrop_down_container,
  CauseDrop_down_list_a,
  CauseDropSelectAll,
  GroupDrop_down,
  SelectMachinedInput,
  Stop_cause_line,
} from "./styles";
import CheckIcon from "@material-ui/icons/Check";
import { translations } from "../../../../locales/translations";
import { useTranslation } from "react-i18next";

interface DropdownCauseProps {
  items: Item[];
  selectedItems: Item[];
  onSelect: (items: Item[]) => void;
}
const DropdownCauseMulti: React.FC<DropdownCauseProps> = (props) => {
  const { onSelect, items, selectedItems } = props;
  const [selected, setselected] = useState<Item[]>([]);
  const [revealSelected, setrevealSelected] = useState<boolean>(false);
  const [itemsResult, setitemsResult] = useState<Item[]>([]);
  const { t } = useTranslation();
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setitemsResult(items);
    if (selectedItems != undefined) {
      if (selectedItems.length !== 0) {
        if (selectedItems[0].label === "") {
          selectedItems.splice(0, 1);
        }
        setselected(selectedItems);

        //if was selected all items then set selectAll
        let index = 0;
        //check all group reasons
        items.forEach((element) => {
          //check all already selected if item wasn't selected then add it
          selectedItems.forEach((selected) => {
            if (element.value === selected.value) {
              index += 1;
            }
          });
        });
        console.log("selectedItems.length ", selectedItems.length);
        console.log("selected.length ", selected.length);
        console.log("selected ", selected);
        console.log("items.length ", items.length);
        console.log("index ", index);
        if (index === items.length) {
          setSelectAll(true);
        } else {
          setSelectAll(false);
        }
      }
    }
  }, [items, selectedItems]);

  const selectAllItems = () => {
    if (selectAll) {
      let returnedValue = [...selected];
      //check all group reasons
      items.forEach((element) => {
        //check all already selected if item wasn't selected then add it
        if (returnedValue.find((elem) => elem.value === element.value)) {
          returnedValue = returnedValue.filter(
            (elem) => elem.value !== element.value
          );
        }
      });
      onSelect(returnedValue);
      setselected(returnedValue);
      setSelectAll(false);
    } else {
      let returnedValue = [...selected];
      items.forEach((element) => {
        let flag = false;
        //check all already selected if item wasn't selected then add it
        selectedItems.forEach((selected) => {
          if (element.value === selected.value) {
            flag = true;
          }
        });
        if (!flag) {
          returnedValue.push(element);
        }
      });
      setSelectAll(true);
      onSelect(returnedValue);
      setselected(returnedValue);
    }
  };

  const ItemClicked = (item: Item) => {
    let returnedValue = [...selected];
    if (selected.find((elem) => elem.value === item.value)) {
      returnedValue = returnedValue.filter((elem) => elem.value !== item.value);
      //if show selected and no items to show then recover it to normal mode
      if (!returnedValue.length && revealSelected) {
        setrevealSelected(false);
      }
    } else {
      returnedValue.push(item);
    }
    setselected(returnedValue);
    onSelect(returnedValue);
  };

  return (
    <CauseDrop_down_container>
      <GroupDrop_down>
        {itemsResult.length > 0 ? (
          <Stop_cause_line>
            <SelectMachinedInput
              checked={selectAll}
              onClick={() => selectAllItems()}
            >
              {selected ? (
                <CheckIcon style={{ fontSize: "10px", color: "#ffffff" }} />
              ) : (
                ""
              )}
            </SelectMachinedInput>
            <li>
              <CauseDropSelectAll onClick={() => selectAllItems()}>
                {t(
                  translations.RulesContainer.CREATE_RULE.MACHINE_STOPS
                    .SELECT_ALL
                )}
              </CauseDropSelectAll>
            </li>
          </Stop_cause_line>
        ) : (
          <></>
        )}
        <ul>
          {itemsResult?.map(
            (option: { label: string; value: number }, index) => (
              <Stop_cause_line key={index} id={option.label}>
                <SelectMachinedInput
                  checked={
                    selected
                      ? selected.find((elem) => elem.value === option.value) !==
                        undefined
                      : false
                  }
                  onClick={() => ItemClicked(option)}
                >
                  {selected ? (
                    <CheckIcon style={{ fontSize: "10px", color: "#ffffff" }} />
                  ) : (
                    ""
                  )}
                </SelectMachinedInput>
                <li>
                  <CauseDrop_down_list_a onClick={() => ItemClicked(option)}>
                    {option.label}
                  </CauseDrop_down_list_a>
                </li>
              </Stop_cause_line>
            )
          )}
        </ul>
      </GroupDrop_down>
    </CauseDrop_down_container>
  );
};

export default DropdownCauseMulti;
