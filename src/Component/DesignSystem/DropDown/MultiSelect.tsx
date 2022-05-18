import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
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
  DropDownListContainer,
  DropDownList,
  ListItem,
  StyledCheckmarkIcon,
  ShowSelectedContainer,
  ShowSelectedTitle,
  Header,
} from "./styles";
import Arowdropdown from "../../../assets/icons/Arowdropdown.svg";
import checkmark from "../../../assets/icons/checkmark.svg";
import SearchField from "../SearchField";
import { PositioningPortal } from "@codastic/react-positioning-portal";
// import { useDebounce } from '../../../utils/CommonFunctions'

const MultiDropDownSelect: React.FC<MultiDropDownSelectInterface> = (props) => {
  const { placeholder, onSelect, required, TitleText, items, selectedItems } =
    props;
  const mode = props.mode ?? DropDownMode.selectable;
  const searchable = props.searchable ?? items.length > 5 ? true : false;
  const showSelected = props.showSelected ?? false;
  const searchPlaceHolder = props.searchPlaceHolder ?? "Search";
  const RequiredText = props.RequiredText ?? "Required";
  const showSelectedText = props.showSelectedText ?? "Show Selected";
  const showAll = props.showAllText ?? "Show All";

  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          elem.label
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase())
        )
      );
    else
      setitemsResult(
        items.filter((elem) =>
          elem.label
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase())
        )
      );
  }, [items, revealSelected, searchInput, selected]);

  useEffect(() => {
    setitemsResult(items);
    //reset show selected if was selected to show new data list
    setrevealSelected(false);
  }, [items]);

  useEffect(() => {
    setselected(selectedItems ?? []);
  }, [selectedItems]);

  // useEffect(() => {
  //   if (revealSelected) setitemsResult(selected);
  //   else setitemsResult(items);
  // }, [items, revealSelected, selected]);

  const toggling = () => {
    if (itemsResult.length > 0) {
      if (mode === DropDownMode.selectable) setIsOpen((prev) => !prev);
    } else {
      setIsOpen(false);
      //clean search to enable open again
      setsearchInput("");
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
    setsearchInput("");
  };

  const handleShowSelected = () => {
    if (selected.length) setrevealSelected((prev) => !prev);
  };

  const [strategy, setStrategy] = useState<POSITION>(POSITION.BOTTOM);
  const positionStrategy = useCallback(
    (preferredPosition: POSITION) => (parentRect: any, portalRect: any) => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const body = window.document.documentElement || window.document.body;

      const horizontalCenter = (parentRect.width - portalRect.width) / 2;
      const additionalPadding = 0;

      const positions = {
        [POSITION.BOTTOM]: {
          position: POSITION.BOTTOM,
          top: parentRect.top + parentRect.height + scrollY + additionalPadding,
          left: parentRect.left + scrollX + horizontalCenter,
          enoughSpace:
            parentRect.top +
              parentRect.height +
              portalRect.height +
              additionalPadding <
            body.clientHeight,
        },
        [POSITION.TOP]: {
          position: POSITION.TOP,
          top: parentRect.top - portalRect.height + scrollY - additionalPadding,
          left: parentRect.left + scrollX + horizontalCenter,
          enoughSpace:
            parentRect.top - portalRect.height - additionalPadding > 0,
        },
      };

      // Horizontal fallback preferred
      let sortedPositions = [
        positions[preferredPosition],
        positions[POSITION.BOTTOM],
        positions[POSITION.TOP],
      ];

      const pickedPosition =
        sortedPositions.find(({ enoughSpace }) => enoughSpace) ||
        positions[preferredPosition];

      const finalTop = Math.max(
        Math.min(
          pickedPosition.top,
          body.clientHeight + scrollY - portalRect.height
        ),
        scrollY
      );
      const shiftY = Math.max(
        Math.min(
          finalTop - pickedPosition.top,
          portalRect.height / 2 - additionalPadding
        ),
        portalRect.height / -2 + additionalPadding
      );

      const finalLeft = Math.max(
        Math.min(
          pickedPosition.left,
          body.clientWidth + scrollX - portalRect.width
        ),
        scrollX
      );
      const shiftX = Math.max(
        Math.min(
          finalLeft - pickedPosition.left,
          portalRect.width / 2 - additionalPadding
        ),
        portalRect.width / -2 + additionalPadding
      );

      const demensions = {
        top: Math.max(
          Math.min(
            pickedPosition.top,
            body.clientHeight + scrollY - portalRect.height
          ),
          scrollY
        ),
        left: Math.max(
          Math.min(
            pickedPosition.left,
            body.clientWidth + scrollX - portalRect.width
          ),
          scrollX
        ),
        strategy: {
          position: pickedPosition.position,
          shift:
            pickedPosition.position === "top" ||
            pickedPosition.position === "bottom"
              ? shiftX
              : shiftY,
        },
      };
      setStrategy(demensions.strategy.position);
      return demensions;
    },
    []
  );

  return (
    <Container Title={TitleText}>
      <Title mode={mode}> {TitleText} </Title>
      <PositioningPortal
        positionStrategy={positionStrategy(POSITION.BOTTOM)}
        isOpen={isOpen}
        portalElement={
          <div style={{ position: "absolute", zIndex: 9999999 }} />
        }
        onShouldClose={() => {
          setIsOpen(false);
          //clean search to enable open again
          setsearchInput("");
        }}
        portalContent={({ relatedWidth, strategy }) => (
          <DropDownListContainer
            varient={""}
            mode={mode}
            visibileItemsHeight={5}
            Placement={strategy ? strategy.position : undefined}
            width={relatedWidth}
          >
            {(searchable || showSelected) && (
              <Header hideBorder={showSelected}>
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
                      {revealSelected ? showAll : showSelectedText} (
                      {selected.length})
                    </ShowSelectedTitle>
                  </ShowSelectedContainer>
                )}
              </Header>
            )}
            <DropDownList varient="">
              {itemsResult.map((option: Item, index: number) => (
                <ListItem
                  varient=""
                  onClick={() => ItemClicked(option)}
                  isSelected={
                    selected
                      ? selected.find((elem) => elem.value === option.value) !==
                        undefined
                      : false
                  }
                  key={index}
                >
                  <DropDownText
                    mode={mode}
                    selected={
                      selected
                        ? selected.find(
                            (elem) => elem.value === option.value
                          ) !== undefined
                        : false
                    }
                  >
                    {option.label}
                  </DropDownText>
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
          </DropDownListContainer>
        )}
      >
        <DropDownContainer
          Placement={strategy}
          isOpen={isOpen}
          mode={mode}
          varient={""}
        >
          <DropDownHeader onClick={toggling} mode={mode} varient="">
            <DropDownText mode={mode}>
              {selected.length > 0
                ? selected.length <= 2
                  ? selected.map(
                      (elem, i) =>
                        elem.label + (i === selected.length - 1 ? "" : ", ")
                    )
                  : selected[0].label +
                    ", " +
                    selected[1].label +
                    "...+" +
                    (selected.length - 2).toString() +
                    " More"
                : placeholder}
            </DropDownText>
            <StyledIconDropDown src={Arowdropdown} />
          </DropDownHeader>
        </DropDownContainer>
      </PositioningPortal>
      {required && mode === DropDownMode.selectable && (
        <TitleReq>* {RequiredText}</TitleReq>
      )}
    </Container>
  );
};

export default MultiDropDownSelect;
