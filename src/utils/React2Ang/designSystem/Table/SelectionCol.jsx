/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import { SELECTION_WIDTH, SELECTION_COLS, aggregationTypes } from "./config";
import { Col, FooterTable, SelectionHeaderWrapper } from "./styles";
const Cols = ({
  headerGroups,
  tableBodyHeight,
  zindex,
  disableAggregations,
  aggregationState,
}) => {
  const selectionHeader = headerGroups[0].headers.find(
    (d) => d.id === SELECTION_COLS
  );

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
    <SelectionHeaderWrapper zindex={zindex}>
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup}
          {...headerGroup.getHeaderGroupProps()}
          style={{
            ...headerGroup.getHeaderGroupProps().style,
            width: SELECTION_WIDTH,
          }}
          className="tr"
        >
          <Col {...selectionHeader.getHeaderProps()} className="th"></Col>
          {!disableAggregations &&
            aggregationState &&
            !EmptyAggregationState && (
              <FooterTable tableBodyHeight={tableBodyHeight} />
            )}
        </div>
      ))}
    </SelectionHeaderWrapper>
  );
};

export default Cols;
