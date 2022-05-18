import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Container,
  LeftWrapper,
  ExportIconStyled,
  RightWrapper,
  RestoreIconStyled,
  FilterIconStyled,
  Wrapper,
  ShareIconStyled,
  Divider,
  DeleteIconStyled,
  AddWrapper,
  ArrowDownIconStyled,
  POSITION,
} from "./styles";
import ExportSelector from "../ExportSelector";
import FilterSelector from "../FilterSelector";
import RestoreSelector from "../RestoreMenu";
import ReactDOM from "react-dom";
import ShareTable from "../ShareTable";
import { AddFilterText, AddIconStyled } from "../FilterSelector/styles";
import ToolTip from "../Components/ToolTip";
import FilterSet from "../Components/FilterSets/FilterSets";
import Button from "../../../../../Component/DesignSystem/Buttons";
import WarningModalRestoreDefaults from "../WarningModal";
import { SelectedRowsCount } from "../styles";
import ReportEvent from "../EventHeader/ReportStopEvent";
import SplitEvent from "../EventHeader/SplitEvent";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import PopUp from "../../../../../Component/DesignSystem/PopUp";
const positionStrategy = (preferredPosition) => (parentRect, portalRect) => {
  // const scrollX = window.scrollX || window.pageXOffset;
  // const scrollY = window.scrollY || window.pageYOffset;
  const body = window.document.documentElement || window.document.body;

  // const additionalPadding = 15;

  const positions = {
    [POSITION.LEFT_BOTTOM]: {
      position: POSITION.LEFT_BOTTOM,
      top: 30,
      enoughSpace:
        parentRect.top + parentRect.height + portalRect.height + 100 <
        body.clientHeight,
    },
    [POSITION.LEFT]: {
      position: POSITION.LEFT,
      top: 30,
      enoughSpace:
        parentRect.top + parentRect.height + portalRect.height <
        body.clientHeight,
    },
  };

  // Horizontal fallback preferred
  let sortedPositions = [
    positions[preferredPosition],
    positions[POSITION.LEFT_BOTTOM],
    positions[POSITION.LEFT],
  ];

  const pickedPosition =
    sortedPositions.find(({ enoughSpace }) => enoughSpace) ||
    positions[preferredPosition];

  return {
    top: pickedPosition.top,
  };
};

const Header = ({
  sortedRows,
  allColumns,
  visibleColumns,
  alldata,
  handleRestoreSorting,
  handleRestoreFilter,
  handleRestoreHiddenCols,
  handleAddFilters,
  handleRemoveFilterFromItems,
  handleClearFilterItems,
  FilterItems,
  fields,
  allowFiltering,
  allowShare,
  showShareTable,
  setShowShareTable,
  handleAddRow,
  zindex,
  allowAdd,
  selectedRowIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch,
  AddDeletedRowId,
  allowDelete,
  handleRestoreDefaults,
  Title,
  tableLoaded,
  firstTimeFilterApply,
  initialFilters,
  selectedFlatRows,
  selectedFilterSet,
  setSelectedFilterSet,
  handleAddFilterSet,
  handleUpdateFilterSet,
  handleRemoveFilterSet,
  filterSets,
  selectedFlatRowsLength,
  handleSetFilterFromHeaderDropDown,
  tableData,
  showSaveFilterButton,
  showFilterSaveButton,
  hideFilterSaveButton,
  isRtl,
  SelectedFooterInHeader,
  pageName,
  deletedRowsIds,
  rowsLenght,
  handleRestoreDefaultsButton,
  showModalRestore,
  setShowModalRestore,
  setshowFilter,
  showFilter,
  editedFilterId,
  handleClearEditItem,
}) => {
  const [showExport, setshowExport] = useState(false);
  const [showRestore, setshowRestore] = useState(false);
  const [showReportEvent, setShowReportEvent] = useState(false);
  const [showSplitEvent, setShowSplitEvent] = useState(false);
  const { t } = useTranslation();

  const enabledDeleteButton = useMemo(
    () =>
      typeof selectedRowIds === "object"
        ? Object.keys(selectedRowIds).length > 0
        : false,
    [selectedRowIds]
  );

  const handleDeleteClick = () => {
    dispatch({ type: "deleteSelections" });
    AddDeletedRowId(Object.keys(selectedRowIds));
  };

  const filterParent = useRef(null);
  const filterPortal = useRef(null);
  const [filterPosition, setFilterPosition] = useState(null);
  useEffect(() => {
    if (filterParent.current && filterPortal.current && showFilter) {
      const BestPositions = positionStrategy(POSITION.LEFT_BOTTOM)(
        filterParent.current.getBoundingClientRect(),
        filterPortal.current.getBoundingClientRect()
      );
      setFilterPosition(BestPositions);
      console.log("BestPositions", BestPositions);
    }
  }, [showFilter]);

  // useEffect(() => {
  //   const element = document.querySelector(".FilterReactPanel");
  //   return () => {
  //     console.log("elementkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", element);
  //     document.body.removeChild(element);
  //   };
  // }, []);

  const [showValidationPopup, setShowValidationPopup] = useState({
    value: false,
    title: t(translations.EditableTable.Error),
    content: "",
  });
  const handleShowSplitEvent = () => {
    if (!selectedFlatRows || !selectedFlatRows[0]) {
      return;
    }
    if (!selectedFlatRows[0].values.EndTime) {
      setShowValidationPopup((prev) => ({
        ...prev,
        content: t(translations.Table.STOP_EVENT_NOT_FINISHED),
        value: true,
        width: null,
      }));
      return;
    }
    setShowSplitEvent(true);
  };
  return (
    <Container style={{ zIndex: zindex }}>
      <LeftWrapper>
        {allowAdd && (
          <AddWrapper onClick={handleAddRow}>
            <ToolTip
              PopperProps={{
                disablePortal: true,
              }}
              title={"Add line"}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                <AddIconStyled disabledColor={false} />
                <AddFilterText disabledColor={false}>Add</AddFilterText>
              </div>
            </ToolTip>
          </AddWrapper>
        )}
        {allowAdd && <Divider />}
        <Wrapper>
          {tableLoaded && (
            <ToolTip
              PopperProps={{
                disablePortal: true,
              }}
              title={showExport ? "" : "Export"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={() => setshowExport((prev) => !prev)}
              >
                <ExportIconStyled open={showExport}></ExportIconStyled>
                <ArrowDownIconStyled />
              </div>
            </ToolTip>
          )}
          {showExport && (
            <>
              <ExportSelector
                sortedRows={sortedRows}
                Title={Title}
                alldata={alldata}
                isRtl={isRtl}
                allColumns={allColumns}
                visibleColumns={visibleColumns}
                onClickHandler={() => setshowExport(false)}
                selectedFlatRows={selectedFlatRows}
                selectedFlatRowsLength={selectedFlatRowsLength}
              />
            </>
          )}
        </Wrapper>
        {allowDelete && <Divider />}
        {allowDelete && (
          <Wrapper onClick={handleDeleteClick}>
            <ToolTip
              PopperProps={{
                disablePortal: true,
              }}
              title={"Delete data"}
            >
              <DeleteIconStyled enabled={enabledDeleteButton} />
            </ToolTip>
          </Wrapper>
        )}
        {SelectedFooterInHeader && <Divider />}
        {SelectedFooterInHeader && (
          <SelectedRowsCount>
            {pageName === "PendingJobs" ? (
              <React.Fragment>
                {Object.keys(selectedRowIds)[0] ? (
                  <React.Fragment>
                    <div style={{ fontSize: "16px" }}>Selected item:&nbsp;</div>
                    <div
                      style={{
                        color: "#1580fc",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Job {selectedFlatRows[0].values.ID}
                    </div>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            ) : (
              <>
                {Math.max(rowsLenght - deletedRowsIds.size, 0) ? (
                  <React.Fragment>
                    {Object.keys(selectedRowIds).length} /{" "}
                    {Math.max(rowsLenght - deletedRowsIds.size, 0)} Selected
                  </React.Fragment>
                ) : null}
              </>
            )}
          </SelectedRowsCount>
        )}
        {tableLoaded && pageName === "STOPEVENTS" && (
          <React.Fragment>
            <Button
              label="Split Event Retroactively"
              variant="purple-secondary"
              size="ssm"
              onClick={handleShowSplitEvent}
              disabled={selectedFlatRows.length === 1 ? false : true}
            />
            <Button
              label="Report Stop Event"
              variant="purple-secondary"
              size="ssm"
              disabled={selectedFlatRows.length === 0}
              onClick={() => setShowReportEvent(true)}
            />
          </React.Fragment>
        )}
        {showReportEvent && (
          <ReportEvent
            onClose={() => setShowReportEvent(false)}
            eventIDS={selectedFlatRows.map((e) => e.values.ID)}
            machines={selectedFlatRows.map((e) => e.values.MachineIdentifier)}
          />
        )}
        {showSplitEvent && (
          <SplitEvent
            onClose={() => setShowSplitEvent(false)}
            row={selectedFlatRows[0]}
          />
        )}
      </LeftWrapper>
      <RightWrapper>
        {allowFiltering && filterSets.length > 0 && (
          <FilterSet
            filterSets={filterSets}
            handleSetFilterFromHeaderDropDown={
              handleSetFilterFromHeaderDropDown
            }
          />
        )}
        {allowShare && (
          <Wrapper>
            <ToolTip
              PopperProps={{
                disablePortal: true,
              }}
              title={showShareTable ? "" : "Share Customised Table"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ShareIconStyled
                  onClick={() => setShowShareTable(true)}
                  open={showShareTable}
                />
              </div>
            </ToolTip>

            {showShareTable && (
              <ShareTable
                onClose={() => setShowShareTable(false)}
                tableData={tableData}
              />
            )}
          </Wrapper>
        )}
        <Wrapper>
          <ToolTip
            PopperProps={{
              disablePortal: true,
            }}
            title={showRestore ? "" : "Restore"}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RestoreIconStyled
                onClick={() => setshowRestore((prev) => !prev)}
                open={showRestore}
              />
            </div>
          </ToolTip>

          {showRestore && (
            <RestoreSelector
              onClickHandler={() => setshowRestore(false)}
              handleRestoreSorting={handleRestoreSorting}
              handleRestoreFilter={handleRestoreFilter}
              handleRestoreHiddenCols={handleRestoreHiddenCols}
              handleRestoreDefaultsButton={handleRestoreDefaultsButton}
            />
          )}
        </Wrapper>
        {showModalRestore && (
          <WarningModalRestoreDefaults
            handleRestoreSorting={handleRestoreSorting}
            handleRestoreFilter={handleRestoreFilter}
            handleRestoreHiddenCols={handleRestoreHiddenCols}
            handleRestoreDefaults={handleRestoreDefaults}
            onClose={() => setShowModalRestore(false)}
          />
        )}
        {allowFiltering && (
          <Wrapper>
            <ToolTip
              PopperProps={{
                disablePortal: true,
              }}
              title={showFilter ? "" : "Filters"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                ref={filterParent}
              >
                <FilterIconStyled
                  onClick={() => setshowFilter(true)}
                  open={showFilter}
                />
              </div>
            </ToolTip>
            {showFilter && (
              <FilterSelector
                filterPosition={filterPosition}
                fields={fields}
                ref={filterPortal}
                allColumns={allColumns}
                onClickHandler={() => setshowFilter(false)}
                FilterItems={FilterItems}
                handleAddFilters={handleAddFilters}
                handleUpdateFilterSet={handleUpdateFilterSet}
                handleClearFilterItems={handleClearFilterItems}
                handleRemoveFilterFromItems={handleRemoveFilterFromItems}
                firstTimeFilterApply={firstTimeFilterApply}
                initialFilters={initialFilters}
                selectedFilterSet={selectedFilterSet}
                setSelectedFilterSet={setSelectedFilterSet}
                handleAddFilterSet={handleAddFilterSet}
                handleRemoveFilterSet={handleRemoveFilterSet}
                filterSets={filterSets}
                showSaveFilterButton={showSaveFilterButton}
                showFilterSaveButton={showFilterSaveButton}
                hideFilterSaveButton={hideFilterSaveButton}
                editedFilterId={editedFilterId}
                handleClearEditItem={handleClearEditItem}
              />
            )}
          </Wrapper>
        )}
      </RightWrapper>
      {showValidationPopup.value &&
        ReactDOM.createPortal(
          <PopUp
            TitleText={showValidationPopup.title}
            ContentText={showValidationPopup.content}
            ButtonLabel={t(translations.EditableTable.ButtonLabel)}
            width={showValidationPopup.width}
            onClosePopUp={() =>
              setShowValidationPopup((prev) => ({ ...prev, value: false }))
            }
          />,
          document.body
        )}
    </Container>
  );
};

export default Header;
