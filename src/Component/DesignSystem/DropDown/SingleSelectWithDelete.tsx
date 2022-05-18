import React, { useEffect, useRef, useState } from "react";
import {
  WithDeleteContainer,
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
  StyledDeleteIcon,
  DropDownTextWithDelete,
} from "./styles";
import {
  DropDownMode,
  DropDownSelectWithDeleteInterface,
  Item,
  POSITION,
} from "./types";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import { ClickAwayListener } from "@material-ui/core";
import DeleteIcon from "../../../assets/icons/card_delete.svg";
import SearchField from "../SearchField";
// import { useDebounce } from '../../../utils/CommonFunctions'
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";

const DropDownSelect: React.FC<DropDownSelectWithDeleteInterface> = (props) => {
  const {
    placeholder,
    onSelect,
    onDelete,
    required,
    TitleText,
    items,
    selectedItem,
    isError,
  } = props;
  const mode = props.mode ?? DropDownMode.selectable;
  const searchable = props.searchable ?? false;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setselected] = useState<Item | undefined>(selectedItem);
  const [searchInput, setsearchInput] = useState("");
  const [itemsResult, setitemsResult] = useState<Item[]>([]);
  const [setPlacement] = useState<POSITION>(POSITION.BOTTOM);
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
    console.log("Height, ", Width);
  }, [Width]);

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

  return (
    <WithDeleteContainer>
      <Title mode={mode} isError={isError}>
        {TitleText}
      </Title>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <DropDownContainer
          ref={refDropDown}
          Placement={POSITION.BOTTOM}
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
            <DropDownListContainer Placement={POSITION.BOTTOM} mode={mode}>
              {searchable && (
                <Header>
                  <SearchWrapper>
                    <SearchField
                      placeholder={
                        props.searchPlaceHolder ??
                        t(translations.TasksManagement.Search)
                      }
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
                    isSelected={
                      selected ? option.value === selected.value : false
                    }
                    key={index}
                  >
                    <DropDownTextWithDelete
                      onClick={() => ItemClicked(option)}
                      mode={mode}
                      selected={selected && option.value === selected.value}
                    >
                      {option.childComponent
                        ? option.childComponent
                        : option.label}
                      {/* {option.label} */}
                    </DropDownTextWithDelete>
                    <StyledDeleteIcon
                      src={DeleteIcon}
                      alt="delete-icon"
                      onClick={() => onDelete(option)}
                    />
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </ClickAwayListener>
      {required && mode === DropDownMode.selectable && (
        <TitleReq isError={isError}>
          *{" "}
          {props.searchPlaceHolder ??
            t(translations.RulesContainer.CREATE_RULE.REQUIRED)}
        </TitleReq>
      )}
    </WithDeleteContainer>
  );
};

export default DropDownSelect;
