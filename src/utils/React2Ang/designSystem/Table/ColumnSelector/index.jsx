import React, { useState, useCallback, useRef, useEffect } from "react";
import { MENU_COLS, SELECTION_COLS } from "../config";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DraggedItem from "./DraggedItem";
import { PositioningPortal } from "@codastic/react-positioning-portal";
import {
  SideLeftPanelTable,
  ColumnSelectorStyled,
  HeaderSelector,
  TitleStyled,
  ContentTextStyled,
  ColsSelectorWrapper,
  StyledIconMenu,
  SearchColWrapper,
  DividerFooter,
  ItemWrapper,
  ShareIconItemStyled,
  FooterItemText,
  FooterContainer,
  RestoreIconItemStyled,
  POSITION,
} from "./styles";
import Item from "./Item";
import SearchFieldColSelector from "../Components/SearchFieldColSelector";

const positionStrategy = (preferredPosition) => (parentRect, portalRect) => {
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;
  const body = window.document.documentElement || window.document.body;

  const additionalPadding = 0;

  const positions = {
    [POSITION.LEFT_BITTOM]: {
      position: POSITION.LEFT,
      top: parentRect.top + parentRect.height + scrollY + additionalPadding,
      left: parentRect.left + scrollX - portalRect.width - additionalPadding,
      enoughSpace: parentRect.left - portalRect.width - additionalPadding > 0,
    },
    [POSITION.RIGHT_BOTTOM]: {
      position: POSITION.RIGHT,
      top: parentRect.top + scrollY + parentRect.height + additionalPadding,
      left: parentRect.left + scrollX + parentRect.width + additionalPadding,
      enoughSpace:
        parentRect.left +
          parentRect.width +
          portalRect.width +
          additionalPadding <
        body.clientWidth,
    },
  };

  // Horizontal fallback preferred
  let sortedPositions = [
    positions[preferredPosition],
    positions[POSITION.LEFT_BITTOM],
    positions[POSITION.RIGHT_BOTTOM],
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

  return {
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
};

const ColumnSelector = ({
  allColumns,
  setColumnOrder,
  setShowShareTable,
  Title,
  allowShare,
  handleRestoreDefaultsButton,
}) => {
  const [search, setsearch] = useState("");
  const [show, setshow] = useState(false);
  const DragHeaderStart = useRef(null);
  const DragHeaderEnd = useRef(null);
  const Wrapperref = useRef(null);
  const Draggedref = useRef();
  const [isDragging, setisDragging] = useState({ value: false, column: null });

  const onDragStart = useCallback((e, column) => {
    e.dataTransfer.effectedAllowed = "move";
    e.dataTransfer.setDragImage(e.target, 500000, 500000);
    DragHeaderStart.current = column.id;
    setisDragging({ value: true, column: column });
  }, []);

  // event when dragging
  const onDrag = useCallback((e) => {
    // const dem = Wrapperref.current.getBoundingClientRect();
    const x = e.clientX - e.target.offsetWidth / 2 + "px";
    const y = e.clientY + e.target.offsetHeight + 4 + "px";
    Draggedref.current.style.top = y;
    Draggedref.current.style.left = x;
    // Draggedref.current.style.top =
    //   e.pageY -
    //   Wrapperref.current.getBoundingClientRect().top -
    //   e.target.getBoundingClientRect().height -
    //   e.target.offsetHeight / 2 +
    //   "px";
    // Draggedref.current.style.left =
    //   e.pageX - e.target.getBoundingClientRect().left + "px";
  }, []);
  const toggleShowColSelector = () => {
    setshow((prev) => !prev);
  };

  const handleEnterDragHeader = useCallback((e, column) => {
    DragHeaderEnd.current = column.id;
  }, []);
  // event when drag end
  const onDragEnd = useCallback(() => {
    let columnsArray = allColumns.map((d) => d.id);
    const col1Index = columnsArray.indexOf(DragHeaderStart.current);
    const col2Index = columnsArray.indexOf(DragHeaderEnd.current);
    [columnsArray[col1Index], columnsArray[col2Index]] = [
      columnsArray[col2Index],
      columnsArray[col1Index],
    ];

    setColumnOrder(columnsArray);
    setisDragging({ value: false, column: null });
    DragHeaderEnd.current = null;
    DragHeaderStart.current = null;
  }, [allColumns, setColumnOrder]);

  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setshow(false);
      }
    }
    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show]);

  const handleRestoreItemHandle = () => {
    handleRestoreDefaultsButton && handleRestoreDefaultsButton();
    setshow(false);
  };
  return (
    <SideLeftPanelTable ref={Wrapperref}>
      <PositioningPortal
        positionStrategy={positionStrategy(POSITION.LEFT_BITTOM)}
        isOpen={show}
        portalElement={
          <div style={{ position: "absolute", zIndex: 999999 }}></div>
        }
        onOpen={() => setshow(true)}
        onShouldClose={() => setshow(false)}
        portalContent={({ strategy }) => (
          <ColumnSelectorStyled
            position={strategy ? strategy.position : undefined}
            shift={strategy ? strategy.shift : undefined}
            ref={ref}
          >
            <HeaderSelector>
              <TitleStyled>{Title} Column Selector</TitleStyled>
              <ContentTextStyled>
                Select which column appear in the table
              </ContentTextStyled>
            </HeaderSelector>
            <SearchColWrapper>
              <SearchFieldColSelector
                placeholder="Search for columns"
                value={search}
                onChange={(text) => setsearch(text)}
              />
            </SearchColWrapper>

            <ColsSelectorWrapper>
              {isDragging.value && (
                <DraggedItem
                  ref={Draggedref}
                  column={isDragging.column}
                  show={isDragging.value}
                />
              )}

              {allColumns
                .filter((d) => d.id !== MENU_COLS && d.id !== SELECTION_COLS)
                .filter((d) =>
                  d.Header.toLowerCase().includes(search.toLowerCase())
                )
                .map((column, index) => (
                  <Item
                    key={index}
                    column={column}
                    dragstart={onDragStart}
                    dragenter={handleEnterDragHeader}
                    dragend={onDragEnd}
                    drag={onDrag}
                    draggeditem={isDragging.column}
                  />
                ))}
            </ColsSelectorWrapper>

            <FooterContainer>
              <DividerFooter />
              {allowShare && (
                <ItemWrapper onClick={() => setShowShareTable(true)}>
                  <ShareIconItemStyled />
                  <FooterItemText>Share customised table</FooterItemText>
                </ItemWrapper>
              )}
              <ItemWrapper onClick={handleRestoreItemHandle}>
                <RestoreIconItemStyled />
                <FooterItemText>Restore to defaults</FooterItemText>
              </ItemWrapper>
            </FooterContainer>
          </ColumnSelectorStyled>
        )}
      >
        <StyledIconMenu onClick={toggleShowColSelector} open={show} />
      </PositioningPortal>
    </SideLeftPanelTable>
  );
};

export default ColumnSelector;
