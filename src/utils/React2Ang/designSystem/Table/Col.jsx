/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo, useRef } from "react";
import moment from "moment";
import {
  Col,
  ColWrapper,
  ColContainer,
  ArrowContainer,
  ArrowUp,
  ArrowDown,
  FilterContainer,
  ColContentLeft,
  ColContentRight,
  MenuIconStyled,
  ColumnMeniInformations,
  ColContent,
  FooterTable,
  ColumnAddCell,
  FooterTableAdd,
  SortingIconStyled,
  Resizer,
} from "./styles";
import ToolTip from "./Components/ToolTip";
import { aggregationTypes } from "./config";
import ColumnMenu from "./ColumnMenu";

function getMax(arr) {
  return arr.reduce((max, v) => (max >= v ? max : v), -Infinity);
}
function getMin(arr) {
  return arr.reduce((min, v) => (min <= v ? min : v), Infinity);
}
//get number of date to calculate min,max.
const getValueofNumericRow = (
  columnName,
  columnDisplayType,
  values,
  aggregateType
) => {
  let agg = null;

  //template of field?
  if (columnName) {
    values = values
      .filter((elem) => elem && !isNaN(+elem.value))
      .map((elem) => +elem.value);
  } else {
    if (columnDisplayType === "date") {
      values = values
        .filter((elem) => elem !== null)
        .map((elem) => moment(elem).unix())
        .filter((elem) => !isNaN(+elem));

      if (values.length > 0) {
        if (aggregateType === aggregationTypes.MAX) {
          agg = getMax(values);
          return agg
            ? "Max: " + moment.unix(agg).format("MMMM DD, YYYY")
            : null;
        } else {
          agg = getMin(values);
          return agg
            ? "Min: " + moment.unix(agg).format("MMMM DD, YYYY")
            : null;
        }
      }
    } else {
      values = values
        .filter((elem) => elem && !isNaN(+elem))
        .map((elem) => +elem);
    }
  }
  if (values.length > 0) {
    if (aggregateType === aggregationTypes.MAX) {
      agg = getMax(values);
      return agg !== null ? "Max: " + agg.toFixed(2) : null;
    } else {
      agg = getMin(values);
      return agg !== null ? "Min: " + agg.toFixed(2) : null;
    }
  }
};
const Column = ({
  column,
  dragstart,
  dragend,
  dragenter,
  drag,
  draggable,
  tableBodyHeight,
  sortbystate,
  aggregationState,
  dispatch,
  disableAggregations,
  draggedCol,
  isRtl,
  width,
  longPressEvent,
}) => {
  const [showMenu, setshowMenu] = useState({
    value: false,
    info: null,
    type: aggregationTypes.NONE,
  });
  //hide menu when colid changes!
  useEffect(() => {
    setshowMenu({ value: false, info: null, type: aggregationTypes.NONE });
  }, [column.id]);

  const handleOpenMenu = () => {
    if (!showMenu.value) setshowMenu((prev) => ({ ...prev, value: true }));
  };
  const handleMultiSort = () => {
    // toggleSortBy: ƒ (desc, multi)
    column.toggleSortBy(undefined, true);
  };

  const SortIndex = useMemo(
    () =>
      sortbystate ? sortbystate.findIndex((elem) => elem.id === column.id) : -1,
    [column.id, sortbystate]
  );

  const SumRows = useMemo(() => {
    if (column.isChild) return null;
    let values = column.filteredRows.map((elem) => elem.values[column.id]);
    let sum = null;
    if (values.length > 0) {
      if (column.Name) {
        values = values
          .filter((elem) => elem && !isNaN(+elem.value))
          .map((elem) => elem.value);
      } else {
        values = values.filter((elem) => !isNaN(+elem));
      }
      if (values.length > 0) sum = values.reduce((a, b) => +a + +b, 0);
    }
    return sum ? "Sum: " + sum.toFixed(2) : null;
  }, [column.Name, column.filteredRows, column.id, column.isChild]);

  const CountRows = useMemo(() => {
    let values = column.filteredRows.map((elem) => elem.values[column.id]);
    if (column.Name) {
      values = values
        .filter((elem) => elem && elem.value)
        .map((elem) => elem.value);
    } else {
      values = values.filter((elem) => elem);
    }
    return "Count: " + values.length;
  }, [column.Name, column.filteredRows, column.id]);
  const MaxRows = useMemo(() => {
    let values = column.filteredRows.map((elem) => elem.values[column.id]);
    if (column.isChild) return null;
    return getValueofNumericRow(
      column.Name,
      column.DisplayType,
      values,
      aggregationTypes.MAX
    );
  }, [
    column.DisplayType,
    column.Name,
    column.filteredRows,
    column.id,
    column.isChild,
  ]);

  const MinRows = useMemo(() => {
    let values = column.filteredRows.map((elem) => elem.values[column.id]);
    if (column.isChild) return null;
    return getValueofNumericRow(
      column.Name,
      column.DisplayType,
      values,
      aggregationTypes.MIN
    );
  }, [
    column.DisplayType,
    column.Name,
    column.filteredRows,
    column.id,
    column.isChild,
  ]);

  const AvgRows = useMemo(() => {
    if (column.isChild) return null;
    let values = column.filteredRows.map((elem) => elem.values[column.id]);
    let sum = null;
    if (values.length > 0) {
      if (column.Name) {
        values = values
          .filter((elem) => elem && !isNaN(+elem.value))
          .map((elem) => elem.value);
      } else {
        values = values.filter((elem) => elem && !isNaN(+elem));
      }
      if (values.length > 0) sum = values.reduce((a, b) => +a + +b, 0);
    }
    return sum ? "Average: " + (sum / values.length).toFixed(2) : null;
  }, [column.Name, column.filteredRows, column.id, column.isChild]);

  useEffect(() => {
    if (aggregationState) {
      if (!aggregationState[column.id]) {
        setshowMenu((prev) => ({ ...prev, info: null }));
      } else {
        switch (aggregationState[column.id]) {
          case aggregationTypes.COUNT:
            setshowMenu((prev) => ({
              ...prev,
              info: CountRows,
              type: aggregationTypes.COUNT,
            }));
            break;
          case aggregationTypes.SUM:
            setshowMenu((prev) => ({
              ...prev,
              info: SumRows,
              type: aggregationTypes.SUM,
            }));
            break;
          case aggregationTypes.MAX:
            setshowMenu((prev) => ({
              ...prev,
              info: MaxRows,
              type: aggregationTypes.MAX,
            }));
            break;
          case aggregationTypes.MIN:
            setshowMenu((prev) => ({
              ...prev,
              info: MinRows,
              type: aggregationTypes.MIN,
            }));
            break;
          case aggregationTypes.AVG:
            setshowMenu((prev) => ({
              ...prev,
              info: AvgRows,
              type: aggregationTypes.AVG,
            }));
            break;
        }
      }
    }
  }, [
    AvgRows,
    CountRows,
    MaxRows,
    MinRows,
    SumRows,
    aggregationState,
    column.filteredRows,
    column.id,
  ]);

  const refTitlecontent = useRef(null);
  const [isOverflowed, setIsOverflow] = useState(false);
  useEffect(() => {
    if (refTitlecontent.current) {
      const isOverf = refTitlecontent.current.scrollWidth > width - 70;
      setIsOverflow(isOverf);
    }
  }, [width]);

  const EmptyAggregationState = useMemo(
    () =>
      !aggregationState ||
      Object.keys(aggregationState).length === 0 ||
      Object.keys(aggregationState).every(
        (k) => aggregationState[k] === aggregationTypes.NONE
      ),
    [aggregationState]
  );

  return (
    <Col
      {...column.getHeaderProps()}
      className="th"
      draggable={draggable}
      onDragStart={(e) => draggable && dragstart(e, column)}
      onDragEnter={(e) => draggable && dragenter(e, column)}
      onDrag={(e) => draggable && drag(e)}
      onDragEnd={(e) => draggable && dragend(e)}
    >
      {draggedCol && draggedCol.id === column.id ? (
        <div
          style={{
            width: "100%",
            height: tableBodyHeight + 80,
            background: `repeating-linear-gradient(
              -45deg,
              #ffffff,
              #ffffff 15px,
              #f6f7fc 15px,
              #f6f7fc 20px
            )`,
            zIndex: 5,
          }}
        ></div>
      ) : (
        <ColWrapper>
          <Resizer
            isRtl={isRtl}
            {...column.getResizerProps()}
            className={`resizer ${column.isResizing ? "isResizing" : ""}`}
          >
            <div
              style={{ height: "100%", width: "2px", backgroundColor: "#fff" }}
            ></div>
          </Resizer>
          <React.Fragment>
            <ColContainer>
              <ColContentLeft>
                {/* {columnTarget === column.id ? "aaa" : "bbb"} */}
                <ToolTip
                  title={isOverflowed ? column.Header : ""}
                  PopperProps={{
                    disablePortal: true,
                  }}
                >
                  <ColContent ref={refTitlecontent} width={width}>
                    {column.render("Header")}
                  </ColContent>
                </ToolTip>
                {column.canSort &&
                  (column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowContainer
                        {...column.getSortByToggleProps()}
                        onClick={handleMultiSort}
                      >
                        <ArrowDown />
                      </ArrowContainer>
                    ) : (
                      <ArrowContainer
                        {...column.getSortByToggleProps()}
                        onClick={handleMultiSort}
                      >
                        <ArrowUp />
                      </ArrowContainer>
                    )
                  ) : (
                    <ArrowContainer
                      {...column.getSortByToggleProps()}
                      onClick={handleMultiSort}
                    >
                      <SortingIconStyled />
                    </ArrowContainer>
                  ))}
                {SortIndex >= 0 && SortIndex + 1}
              </ColContentLeft>
              <ColContentRight>
                <MenuIconStyled
                  onClick={!showMenu.value ? handleOpenMenu : undefined}
                  open={showMenu.value}
                />

                {showMenu.value && (
                  <ColumnMenu
                    column={column}
                    selectedType={showMenu.type}
                    onClickHandler={() =>
                      setshowMenu((prev) => ({ ...prev, value: false }))
                    }
                    onClearFilter={() =>
                      setshowMenu({
                        value: false,
                        info: null,
                        type: aggregationTypes.NONE,
                      })
                    }
                    dispatch={dispatch}
                  />
                )}
              </ColContentRight>
            </ColContainer>
            <FilterContainer
              draggable={true}
              onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {column.canFilter ? column.render("Filter") : null}
            </FilterContainer>
          </React.Fragment>
        </ColWrapper>
      )}
      {!disableAggregations && aggregationState && !EmptyAggregationState && (
        <FooterTable tableBodyHeight={tableBodyHeight}>
          {showMenu.info && (
            <ColumnMeniInformations>{showMenu.info}</ColumnMeniInformations>
          )}
        </FooterTable>
      )}
    </Col>
  );
};

export default Column;
