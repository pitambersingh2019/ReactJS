import React, { useEffect, useState } from "react";
import {
  Container,
  DropDownListContainerNoHeader,
  SearchWrapper,
  StyledIconDropDown,
  Title,
  TitleReq,
} from "./styles";
import {
  DropDownMode,
  MultiDropDownSelectInterface,
  Item,
  POSITION,
} from "./types";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownText,
  DropDownList,
  ListItem,
  StyledCheckmarkIcon,
  ShowSelectedContainer,
  ShowSelectedTitle,
  Header,
} from "./styles";
import Arowdropdown from "../../../assets/icons/Arowdropdown.svg";
import { ClickAwayListener } from "@material-ui/core";
import checkmark from "../../../assets/icons/checkmark.svg";
import SearchField from "../SearchField";
// import { useDebounce } from '../../../utils/CommonFunctions'

const MultiSelectNoHeader: React.FC<MultiDropDownSelectInterface> = (props) => {
  const { placeholder, onSelect, required, TitleText, items, selectedItems } =
    props;
  const mode = props.mode ?? DropDownMode.selectable;
  const searchable = props.searchable ?? false;
  const showSelected = props.showSelected ?? false;
  const searchPlaceHolder = props.searchPlaceHolder ?? "Search";
  const RequiredText = props.RequiredText ?? "Required";
  const showSelectedText = props.showSelectedText ?? "Show Selected";
  const showAll = props.showAllText ?? "Show All";

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selected, setselected] = useState<Item[]>(selectedItems ?? []);
  const [searchInput, setsearchInput] = useState("");
  const [itemsResult, setitemsResult] = useState<Item[]>([]);
  const [revealSelected, setrevealSelected] = useState<boolean>(false);

  //DEBOUNCE NOT WORKING IN ANGULARJS!!!!!!!
  // const debouncedSearch = useDebounce((text: string) => setitemsResult(items.filter(elem => elem.label.includes(text))), 600);

  useEffect(() => {
    if (revealSelected)
      setitemsResult(
        selected.filter((elem) =>
          elem.label.toLocaleLowerCase().includes(searchInput)
        )
      );
    else
      setitemsResult(
        items.filter((elem) =>
          elem.label.toLocaleLowerCase().includes(searchInput)
        )
      );
  }, [items, revealSelected, searchInput, selected]);

  useEffect(() => {
    setitemsResult(items);
  }, [items]);

  useEffect(() => {
    if (revealSelected) setitemsResult(selected);
    else setitemsResult(items);
  }, [items, revealSelected, selected]);

  const toggling = () => {
    if (mode === DropDownMode.selectable) setIsOpen((prev) => !prev);
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

  const handleShowSelected = () => {
    if (selected.length) setrevealSelected((prev) => !prev);
  };

  return (
    <Container>
      <Title mode={mode}> {TitleText} </Title>
      <ClickAwayListener onClickAway={() => setIsOpen(true)}>
        <DropDownContainer
          Placement={POSITION.BOTTOM}
          isOpen={isOpen}
          mode={mode}
        >
          <DropDownHeader onClick={toggling} mode={mode}>
            <DropDownText mode={mode}>
              {selected.length > 0
                ? selected.length <= 2
                  ? selected.map(
                      (elem, i) =>
                        elem.label + (i === selected.length - 1 ? "" : ", ")
                    )
                  : selected[0].label +
                    ", " +
                    selected[0].label +
                    "...+" +
                    (selected.length - 2).toString() +
                    " More"
                : placeholder}
            </DropDownText>
            <StyledIconDropDown src={Arowdropdown} />
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainerNoHeader
              mode={mode}
              Placement={POSITION.BOTTOM}
            >
              {(searchable || showSelected) && (
                <Header>
                  {searchable && (
                    <SearchWrapper>
                      <SearchField
                        placeholder={searchPlaceHolder}
                        value={searchInput}
                        onChange={(text: string) => setsearchInput(text)}
                        TitleText={""}
                      />
                    </SearchWrapper>
                  )}
                  {showSelected && (
                    <ShowSelectedContainer>
                      <ShowSelectedTitle
                        active={selected.length ? true : false}
                        onClick={handleShowSelected}
                      >
                        {revealSelected ? showAll : showSelectedText}
                      </ShowSelectedTitle>
                    </ShowSelectedContainer>
                  )}
                </Header>
              )}
              <DropDownList>
                {itemsResult.map((option: Item, index: number) => (
                  <ListItem
                    onClick={() => ItemClicked(option)}
                    isSelected={
                      selected
                        ? selected.find(
                            (elem) => elem.value === option.value
                          ) !== undefined
                        : false
                    }
                    key={index}
                  >
                    <DropDownText mode={mode}>{option.label}</DropDownText>
                    {selected &&
                      selected.find((elem) => elem.value === option.value) !==
                        undefined && (
                        <StyledCheckmarkIcon
                          src={checkmark}
                          alt="checkmark-icon"
                        />
                      )}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainerNoHeader>
          )}
        </DropDownContainer>
      </ClickAwayListener>
      {required && mode === DropDownMode.selectable && (
        <TitleReq>* {RequiredText}</TitleReq>
      )}
    </Container>
  );
};

export default MultiSelectNoHeader;
