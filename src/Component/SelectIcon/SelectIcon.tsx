import React, { useEffect, useState } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownText,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./styles";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import { ClickAwayListener } from "@material-ui/core";

// const options = [{value: 1, label: "Mangoes"}, {value:2, label: "Apples"}, {value:3, label:"Oranges"},
//                 {value:4, label:"SaMi"},{value:5, label: "Samiodeh"},{value:6, label: "sami odeh"},{value:7, label:"odehsami"}];

interface Item {
  value: number;
  label: string;
}

interface DropDownSearchInterface {
  data: Item[];
  border?: boolean;
  expandIcon?: boolean;
  Icon?: React.ReactNode;
  fitContent?: boolean;
  handleItemClicked: (label: string, value: number) => void;
  selected: Item;
  width?: number;
  IconOpen?: boolean;
}

const DropDownSearch: React.FC<DropDownSearchInterface> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Item>(props.selected);

  const {
    data,
    border,
    expandIcon,
    Icon,
    handleItemClicked,
    fitContent,
    width,
  } = props;

  useEffect(() => {
    setSelected(props.selected);
    console.log("props.selected ", props.selected);
  }, [props.selected]);

  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: Item) => {
    //setSelected(item);
    console.log("Item ", item);
    setIsOpen(false);
    handleItemClicked(item.label, item.value);
  };

  // useEffect(() => {
  //   handleItemClicked(selected.label, selected.value);
  // }, [handleItemClicked, selected]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <DropDownContainer>
        <DropDownHeader border={border} fitContent={fitContent} width={width}>
          {props.IconOpen ? <div onClick={toggling}> {Icon} </div> : Icon}

          <DropDownText onClick={toggling}>{selected?.label}</DropDownText>
          {expandIcon ? <ExpandMoreSharpIcon /> : null}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer fitContent={fitContent} width={width}>
            <DropDownList>
              {data.map((option: Item, index: number) => (
                <ListItem
                  key={index}
                  isSelected={
                    selected ? option.value === selected.value : false
                  }
                  onClick={() => selectItem(option)}
                >
                  {option.label}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </ClickAwayListener>
  );
};

export default DropDownSearch;
