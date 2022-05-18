import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Title,
  TitleReq,
  SearchWrapper,
  Header,
  DropDownContainer,
  DropDownHeader,
  DropDownText,
  DropDownListContainer,
  DropDownList,
  ListItem,
  StyledCheckmarkIcon,
} from "./styles";
import {
  DropDownMode,
  DropDownSelectInterface,
  Item,
  PlacementEnum,
} from "./types";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import checkmark from "../../../../../../assets/icons/checkmark.svg";
import SearchField from "../SearchField";
// import { useDebounce } from '../../../utils/CommonFunctions'

const DropDownSelect: React.FC<DropDownSelectInterface> = (props) => {
  const {
    placeholder,
    onSelect,
    required,
    TitleText,
    items,
    selectedItem,
    isError,
  } = props;
  const mode = props.mode ?? DropDownMode.selectable;
  const searchable = props.searchable ?? false;
  const searchPlaceHolder = props.searchPlaceHolder ?? "Search";
  const RequiredText = props.RequiredText ?? "Required";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setselected] = useState<Item | undefined>(selectedItem);
  const [searchInput, setsearchInput] = useState("");
  const [itemsResult, setitemsResult] = useState<Item[]>([]);
  const [setPlacement] = useState<PlacementEnum>(PlacementEnum.bottom);
  const refDropDown = useRef<HTMLDivElement>(null);
  const [Width, setWidth] = useState<number>(0);

  useEffect(() => {
    setitemsResult(items);
  }, [items]);

  //DEBOUNCE NOT WORKING IN ANGULARJS!!!!!!!
  // const debouncedSearch = useDebounce((searchValue : string) => setitemsResult(items.filter(elem => elem.label.includes(searchValue))), 600);

  useEffect(() => {
    setitemsResult(
      items.filter((elem) =>
        elem.label.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      )
    );
  }, [items, searchInput]);

  useEffect(() => {
    setselected(selectedItem);
  }, [selectedItem]);

  const toggling = () => {
    if (mode === DropDownMode.selectable) setIsOpen((prev) => !prev);
  };

  const ItemClicked = (item: Item) => {
    setIsOpen(false);
    if (selected?.value === item.value) {
      onSelect(undefined);
      setselected(undefined);
    } else {
      onSelect(item);
      setselected(item);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const determineDropUp = (e: any) => {
    if (!refDropDown.current) return;

    const windowHeight = window.innerHeight;
    const instOffsetWithMenu =
      refDropDown.current.getBoundingClientRect().bottom + 380; //55 search header
    if (instOffsetWithMenu >= windowHeight) {
      // @ts-ignore
      setPlacement(PlacementEnum.top);
    } else {
      // @ts-ignore
      setPlacement(PlacementEnum.bottom);
    }
  };

  useEffect(() => {
    setWidth(refDropDown.current?.getBoundingClientRect().width ?? 0);
  }, []);

  useEffect(() => {
    // if (isOpen) {
    //   window.addEventListener("resize", determineDropUp);
    //   window.addEventListener("scroll", determineDropUp);
    // }
    // return () => {
    //   window.removeEventListener("resize", determineDropUp);
    //   window.removeEventListener("scroll", determineDropUp);
    // };
  }, [isOpen]);

  const onEnterSearch = () => {
    setselected(itemsResult[0]);
    setIsOpen(false);
    setsearchInput("");
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (refDropDown.current && !refDropDown.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <Container>
      <Title mode={mode} isError={isError}>
        {TitleText}
      </Title>
      <DropDownContainer
        ref={refDropDown}
        Placement={PlacementEnum.bottom}
        isOpen={isOpen}
        mode={mode}
        isError={isError}
      >
        <DropDownHeader onClick={toggling} mode={mode}>
          <DropDownText
            width={Width}
            mode={mode}
            isPlaceholder={!selected?.label}
          >
            {selected ? selected.label : placeholder}
          </DropDownText>
          <ExpandMoreSharpIcon
            style={{
              color: mode === DropDownMode.selectable ? "#575757" : "#b9bec6",
              fontSize: "24px",
            }}
          />
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer Placement={PlacementEnum.bottom} mode={mode}>
            {searchable && (
              <Header>
                <SearchWrapper>
                  <SearchField
                    placeholder={searchPlaceHolder}
                    value={searchInput}
                    onChange={(text: string) => setsearchInput(text)}
                    TitleText={""}
                    onEnter={onEnterSearch}
                  />
                </SearchWrapper>
              </Header>
            )}
            <DropDownList>
              {itemsResult.map((option: Item, index: number) => (
                <ListItem
                  onClick={() => ItemClicked(option)}
                  isSelected={
                    selected ? option.value === selected.value : false
                  }
                  key={index}
                >
                  <DropDownText
                    mode={mode}
                    selected={selected && option.value === selected.value}
                  >
                    {option.label}
                  </DropDownText>
                  {selected && option.value === selected.value && (
                    <StyledCheckmarkIcon src={checkmark} alt="checkmark-icon" />
                  )}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {required && mode === DropDownMode.selectable && (
        <TitleReq isError={isError}>* {RequiredText}</TitleReq>
      )}
    </Container>
  );
};

export default DropDownSelect;
