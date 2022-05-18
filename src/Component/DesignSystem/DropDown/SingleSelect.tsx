import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { DropDownMode, DropDownSelectInterface, Item, POSITION } from "./types";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import checkmark from "../../../assets/icons/checkmark.svg";
import SearchField from "../SearchField";
// import { useDebounce } from '../../../utils/CommonFunctions'
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
import { PositioningPortal } from "@codastic/react-positioning-portal";
import ToolTip from "./ToolTip";
const DropDownSelect: React.FC<DropDownSelectInterface> = (props) => {
  const {
    placeholder,
    onSelect,
    required,
    TitleText,
    items,
    selectedItem,
    isError,
    dropDownListHeight,
    varient = "",
    allowEmptySelect = true,
  } = props;
  const mode = props.mode ?? DropDownMode.selectable;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setselected] = useState<Item | undefined>(selectedItem);
  const [searchInput, setsearchInput] = useState("");
  const [itemsResult, setitemsResult] = useState<Item[]>([]);
  const refDropDown = useRef<HTMLDivElement>(null);
  const [strategyPlacment, setStrategyPlacment] = useState<POSITION>(
    POSITION.BOTTOM
  );
  const [textWidths, setTextWidths] = useState<number[]>([]);
  const searchable =
    props.searchable ?? (props.items.length > 5 ? true : false);
  const Itemslenght = useRef(0);
  useEffect(() => {
    setitemsResult(items);
    Itemslenght.current = items.length;
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
    if (itemsResult.length > 0) {
      if (mode === DropDownMode.selectable) setIsOpen((prev) => !prev);
    } else {
      setIsOpen(false);
      //clean search to enable open again
      setsearchInput("");
    }
  };

  const ItemClicked = (item: Item) => {
    setIsOpen(false);
    if (allowEmptySelect) {
      if (selected?.value === item.value) {
        onSelect(undefined);
        setselected(undefined);
      } else {
        onSelect(item);
        setselected(item);
      }
    } else {
      onSelect(item);
      setselected(item);
    }

    setsearchInput("");
  };

  const onEnterSearch = () => {
    setselected(itemsResult[0]);
    setIsOpen(false);
    setsearchInput("");
  };

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
          top: parentRect.top + scrollY + additionalPadding,
          left: parentRect.left + scrollX + horizontalCenter,
          enoughSpace:
            parentRect.top + portalRect.height + additionalPadding <
            body.clientHeight,
        },
        [POSITION.TOP]: {
          position: POSITION.TOP,
          top:
            parentRect.top -
            portalRect.height +
            parentRect.height +
            scrollY -
            additionalPadding,
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
      setStrategyPlacment(demensions.strategy.position);
      return demensions;
    },
    []
  );
  /*
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        refDropDown.current &&
        !ref.current.contains(event.target) &&
        !refDropDown.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
*/
  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     console.log("Hello World", entries[0].contentRect.height);
  //     // setWidth(entries[0].contentRect.width);
  //   });

  //   if (refDropDown.current) resizeObserver.observe(refDropDown.current);
  //   console.log("aa");
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [isOpen]);

  useEffect(() => {
    const Texts = itemsResult.map((elem) => elem.label);
    const widths = Texts.map((elem) => {
      const item = document.createElement("div");
      item.style.cssText = `  outline: none;
    border: none;
    overflow: hidden;
    user-select: none;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    white-space: nowrap;
    text-overflow: ellipsis;`;
      item.innerText = elem;
      document.body.appendChild(item);
      const itemWidth = item.getBoundingClientRect().width;
      document.body.removeChild(item);
      return itemWidth;
    });
    setTextWidths(widths);
  }, [itemsResult]);

  return (
    <Container Title={TitleText}>
      <Title mode={mode} isError={isError}>
        {TitleText}
      </Title>
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
          <div
            style={{
              display: "flex",
              flexDirection:
                strategyPlacment === POSITION.BOTTOM
                  ? "column"
                  : "column-reverse",
            }}
          >
            <DropDownContainer
              Placement={strategyPlacment}
              varient={varient}
              isOpen={isOpen}
              mode={mode}
              isError={isError}
              width={relatedWidth}
            >
              <DropDownHeader onClick={toggling} mode={mode} varient={varient}>
                <DropDownText
                  // width={Width}
                  mode={mode}
                  isPlaceholder={!selected?.label}
                >
                  {selected ? selected.label : placeholder}
                </DropDownText>
                <ExpandMoreSharpIcon
                  style={{
                    color:
                      mode === DropDownMode.selectable ? "#575757" : "#b9bec6",
                    fontSize: "24px",
                  }}
                />
              </DropDownHeader>
            </DropDownContainer>
            <DropDownListContainer
              varient={varient}
              Placement={strategy ? strategy.position : undefined}
              width={relatedWidth}
              mode={mode}
              ref={refDropDown}
              visibileItemsHeight={Math.min(itemsResult.length, 5)}
            >
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
              <DropDownList maxHeight={dropDownListHeight} varient={varient}>
                {itemsResult.map((option: Item, index: number) => (
                  <ListItem
                    varient={varient}
                    onClick={() => ItemClicked(option)}
                    isSelected={
                      selected ? option.value === selected.value : false
                    }
                    key={index}
                  >
                    {textWidths[
                      itemsResult.findIndex(
                        (elem) => elem.value === option.value
                      )
                    ] >
                    relatedWidth - 70 ? (
                      <ToolTip title={option.label} placement="top-start">
                        <DropDownText
                          mode={mode}
                          selected={selected && option.value === selected.value}
                          width={relatedWidth}
                        >
                          {option.childComponent
                            ? option.childComponent
                            : option.label}
                        </DropDownText>
                      </ToolTip>
                    ) : (
                      <DropDownText
                        mode={mode}
                        selected={selected && option.value === selected.value}
                        width={relatedWidth}
                      >
                        {option.childComponent
                          ? option.childComponent
                          : option.label}
                      </DropDownText>
                    )}

                    {selected && option.value === selected.value && (
                      <StyledCheckmarkIcon
                        src={checkmark}
                        alt="checkmark-icon"
                      />
                    )}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          </div>
        )}
      >
        <div>
          <DropDownContainer
            Placement={strategyPlacment}
            varient={varient}
            // position={strategy ? strategy.position : undefined}
            isOpen={isOpen}
            mode={mode}
            isError={isError}
          >
            <DropDownHeader onClick={toggling} mode={mode} varient={varient}>
              <DropDownText
                // width={Width}
                mode={mode}
                isPlaceholder={!selected?.label}
              >
                {selected ? selected.label : placeholder}
              </DropDownText>
              <ExpandMoreSharpIcon
                style={{
                  color:
                    mode === DropDownMode.selectable ? "#575757" : "#b9bec6",
                  fontSize: "24px",
                }}
              />
            </DropDownHeader>
          </DropDownContainer>
        </div>
      </PositioningPortal>
      {required && mode === DropDownMode.selectable && (
        <TitleReq isError={isError}>
          * {t(translations.RulesContainer.CREATE_RULE.REQUIRED)}
        </TitleReq>
      )}
    </Container>
  );
};

export default DropDownSelect;
