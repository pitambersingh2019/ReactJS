import React, { useState, useEffect, useRef } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownInput,
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
  id: string;
  data: Item[];
  handleItemClicked: (label?: string, value?: number) => void;
  selected: Item;
  PlaceHolder: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
}

const DropDownSearch: React.FC<DropDownSearchInterface> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setinput] = useState<string>("");
  const [optionsResults, setoptionsResults] = useState<Item[]>([...props.data]);
  const [selected, setselected] = useState<Item>();

  const optionSelected = useRef<boolean>(false);

  const { marginTop, marginLeft, marginRight, marginBottom, width, height } =
    props;

  const toggling = () => {
    optionSelected.current = false;
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (input === "") {
        setIsOpen(true);
        setoptionsResults([...props.data]);
      } else {
        setoptionsResults(
          props.data.filter((elem: Item) =>
            elem.label.toLocaleLowerCase().includes(input.toLocaleLowerCase())
          )
        );
        if (optionsResults.length > 0) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    }
  };

  const onOptionClicked = (item: Item) => () => {
    optionSelected.current = true;
    setinput(item.label);
    setselected(item);
    props.handleItemClicked(item?.label, item?.value);
  };

  const inputHandle = (value: string) => {
    setinput(value);
    setselected(undefined);
  };

  useEffect(() => {
    if (optionSelected.current) {
      setIsOpen(false);
      optionSelected.current = false;
    } else {
      if (input === "") {
        setIsOpen(false);
        setoptionsResults([...props.data]);
      } else {
        //setoptionsResults(props.data);
        setoptionsResults(
          props.data.filter((elem: Item) =>
            elem.label.toLocaleLowerCase().includes(input.toLocaleLowerCase())
          )
        );
        if (optionsResults.length > 0) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    }
  }, [input, optionsResults.length, props.data]);

  useEffect(() => {
    if (
      props.data.find((elem: Item) => elem.value === props.selected.value) !==
      undefined
    ) {
      setselected(props.selected);
      setinput(props.selected.label);
      optionSelected.current = true;
    }
  }, [props.data, props.selected]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <DropDownContainer
        id={props.id}
        marginRight={marginRight}
        marginTop={marginTop}
        marginLeft={marginLeft}
        marginBottom={marginBottom}
      >
        <DropDownHeader height={height} width={width}>
          <DropDownInput
            value={input}
            placeholder={props.PlaceHolder}
            onChange={(e) => inputHandle(e.target.value)}
          />
          <ExpandMoreSharpIcon onClick={toggling} />
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList id={props.id}>
              {optionsResults.map((option: Item, index: number) => (
                <ListItem
                  isSelected={
                    selected ? option.value === selected.value : false
                  }
                  onClick={onOptionClicked(option)}
                  key={index}
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
