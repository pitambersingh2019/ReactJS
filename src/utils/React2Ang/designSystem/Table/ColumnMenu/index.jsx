import React, { useRef, useEffect } from "react";
import { ColumnMenuStyled, Item, Divider, DividerStroke } from "./styles";
import { aggregationTypes } from "../config";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const ColumnMenu = ({
  column,
  onClickHandler,
  dispatch,
  selectedType,
  onClearFilter,
}) => {
  const handleCountRows = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.COUNT,
      colid: column.id,
    });
    onClickHandler && onClickHandler();
  };

  const handleSumRows = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.SUM,
      colid: column.id,
    });
    onClickHandler && onClickHandler();
  };

  const handleMaxRows = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.MAX,
      colid: column.id,
    });
    onClickHandler && onClickHandler();
  };

  const handleAvgRows = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.AVG,
      colid: column.id,
    });
    onClickHandler && onClickHandler();
  };

  const handleMinRows = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.MIN,
      colid: column.id,
    });
    onClickHandler && onClickHandler();
  };

  const handleClearFilter = () => {
    dispatch({
      type: "aggregation",
      aggregationType: aggregationTypes.NONE,
      colid: column.id,
    });
    onClearFilter && onClearFilter();
  };

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickHandler && onClickHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <ClickAwayListener onClickAway={onClickHandler}>
      <ColumnMenuStyled ref={ref}>
        <Item
          onClick={handleCountRows}
          selected={selectedType === aggregationTypes.COUNT}
        >
          Count
        </Item>
        <Divider />

        {column.aggregations?.includes(aggregationTypes.SUM) && (
          <>
            <Item
              onClick={handleSumRows}
              selected={selectedType === aggregationTypes.SUM}
            >
              Sum
            </Item>
            <Divider />
          </>
        )}
        {column.aggregations?.includes(aggregationTypes.MIN) && (
          <>
            <Item
              onClick={handleMinRows}
              selected={selectedType === aggregationTypes.MIN}
            >
              Min
            </Item>
            <Divider />
          </>
        )}
        {column.aggregations?.includes(aggregationTypes.MAX) && (
          <>
            <Item
              onClick={handleMaxRows}
              selected={selectedType === aggregationTypes.MAX}
            >
              Max
            </Item>
            <Divider />
          </>
        )}
        {column.aggregations?.includes(aggregationTypes.AVG) && (
          <>
            <Item
              onClick={handleAvgRows}
              selected={selectedType === aggregationTypes.AVG}
            >
              Average
            </Item>
            <Divider />
          </>
        )}
        <Item onClick={handleClearFilter}>Clear filter</Item>
        {!column.disableHide && (
          <>
            <DividerStroke />
            <Item onClick={() => column.toggleHidden()}>Hide column</Item>
          </>
        )}
      </ColumnMenuStyled>
    </ClickAwayListener>
  );
};

export default ColumnMenu;
