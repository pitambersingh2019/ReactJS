/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import { MENU_COLS, SIDE_COL_WIDTH, aggregationTypes } from "./config";
import { Col, FooterTable, MenuSideHeaderWrapper } from "./styles";
import ColumnSelector from "./ColumnSelector";
const Cols = ({
  headerGroups,
  allColumns,
  setColumnOrder,
  TableOffsetTop,
  setShowShareTable,
  tableBodyHeight,
  Title,
  isRtl,
  zindex,
  disableAggregations,
  aggregationState,
  allowShare,
  handleRestoreDefaultsButton,
}) => {
  const menuHeader = headerGroups[0].headers.find((d) => d.id === MENU_COLS);
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
    <MenuSideHeaderWrapper isRtl={isRtl} zindex={zindex}>
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup}
          {...headerGroup.getHeaderGroupProps()}
          style={{
            ...headerGroup.getHeaderGroupProps().style,
            width: 40,
          }}
          className="tr"
        >
          <Col {...menuHeader.getHeaderProps()}>
            <ColumnSelector
              Title={Title}
              allColumns={allColumns}
              setColumnOrder={setColumnOrder}
              setShowShareTable={setShowShareTable}
              allowShare={allowShare}
              handleRestoreDefaultsButton={handleRestoreDefaultsButton}
            />
            {!disableAggregations &&
              aggregationState &&
              !EmptyAggregationState && (
                <FooterTable tableBodyHeight={tableBodyHeight} />
              )}
          </Col>
        </div>
      ))}
    </MenuSideHeaderWrapper>
  );
};

export default Cols;
