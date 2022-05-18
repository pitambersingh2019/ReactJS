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
//import {set} from "husky";
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

const DropDownSearchNotFilter: React.FC<DropDownSearchInterface> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setinput] = useState<string>("");
  const [optionsResults, setoptionsResults] = useState<Item[]>([...props.data]);
  const [selected, setSelected] = useState<Item>();

  const optionSelected = useRef<boolean>(false);

  const inputElement = useRef<HTMLInputElement>(null);

  const { marginTop, marginLeft, marginRight, marginBottom, width, height } =
    props;

  const [toggle, setToggle] = useState<boolean>(false);

  const toggling = () => {
    console.log("toggling");
    setToggle(!toggle);

    optionSelected.current = false;
    if (isOpen) {
      setIsOpen(false);
      console.log("toggling2");
      if (input !== "") {
        console.log("toggling3");
        setIsOpen(true);
        setoptionsResults([...props.data]);
      }
    } else {
      if (input === "") {
        setIsOpen(true);
        setoptionsResults([...props.data]);
      } else {
        console.log("toggling4");

        setIsOpen(true);

        setoptionsResults([...props.data]);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    e.target.select();

  const onOptionClicked = (item: Item) => () => {
    optionSelected.current = true;
    setinput(item.label);
    setSelected(item);
    props.handleItemClicked(item?.label, item?.value);
  };

  const inputHandle = (value: string) => {
    setSelected(undefined);
    setToggle(false);
    //to set only HH:MM format
    if (value.length === 3 && !value.includes(":")) {
      console.log("Invaled");
    } else {
      if (value.includes(":")) {
        let checkTime = value.split(":");
        //to forbidden click 1:000
        if (checkTime[0].length === 2) {
          if (Number(checkTime[0]) > 23) {
            console.log("Invaled");
          } else if (Number(checkTime[1]) > 59) {
            console.log("Invaled");
          } else {
            //to set only HH:MM format
            if (input.length <= 5 && checkTime[1].length < 3) {
              setinput(value);
              console.log("Invaledeeee");
            }
            //to enable delete
            else if (checkTime[1].length < 3) {
              setinput(value);
              console.log("Invaledddd");
            }
          }
        }
      } else {
        if (Number(value) > 23) {
          console.log("Invaled");
        } else {
          setinput(value);
        }
      }
    }
  };

  const handleClickInput = () => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  };

  useEffect(() => {
    if (toggle) {
      setoptionsResults([...props.data]);
    } else {
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

          let flag = false;
          optionsResults.forEach((elem) => {
            if (
              elem.label.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            ) {
              setSelected({ label: elem.label, value: elem.value });
              flag = true;
            } else {
              setSelected({ label: input, value: props.data.length });
              props.handleItemClicked(input, props.data.length);
              flag = true;
            }
          });

          console.log("flag ", flag);
          console.log("optionsResults.length ", optionsResults.length);
          //if optionsResults was empty then get the input value
          if (!flag && optionsResults.length === 0 && input.length <= 5) {
            props.handleItemClicked(input, props.data.length);
          } else if (flag && optionsResults.length === 1 && input.length <= 5) {
            props.handleItemClicked(input, props.data.length);
          }

          if (optionsResults.length > 0) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }
      }
    }
  }, [input, optionsResults.length, props.data]);

  //to set current time / input time clicked / time selected from list
  useEffect(() => {
    if (
      props.data.find((elem: Item) => elem.value === props.selected.value) !==
      undefined
    ) {
      setSelected(props.selected);
      setinput(props.selected.label);
      optionSelected.current = true;
    } else {
      setSelected(props.selected);
      setinput(props.selected.label);
      if (isOpen) {
        setIsOpen(false);
      }
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
        <DropDownHeader height={height} width={width} isActive={isOpen}>
          <DropDownInput
            ref={inputElement}
            value={input}
            onKeyPress={(event) => {
              if (!/[0-9,:]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder={props.PlaceHolder}
            onChange={(e) => inputHandle(e.target.value)}
            onFocus={handleFocus}
            onClick={handleClickInput}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
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

export default DropDownSearchNotFilter;
