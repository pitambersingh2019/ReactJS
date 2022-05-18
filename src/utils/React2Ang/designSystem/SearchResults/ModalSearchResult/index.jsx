/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
// import Table from "./Table";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { TableContainer } from "../styles";
import {
  Container,
  Wrapper,
  FooterStyled,
  ApplyButton,
  CancelButton,
  Title,
} from "./styles";
import { getReportID, getSourceUserID, getFilterRequest } from "../utils";
import {
  GetColType,
  SearchResultGetInitialState,
  GetDefaultFilters,
} from "../utils";
import { useTheme } from "styled-components";
import { TableStatus } from "../../Table/config";
import { createPortal } from "react-dom";
import Button from "../../../../../Component/DesignSystem/Buttons";
function MainTable(props) {
  const theme = useTheme();
  const content = props.content;
  const onCloseModal = props.onCloseModal;
  const handleGetSelectedValue = props.handleGetSelectedValue;

  useEffect(() => {
    const request = content
      ? content.request
      : {
          reportID: 6,
          IsUserReport: false,
          sfCriteria: [],
        };

    apiCall("DisplayReportSearchFields", "POST", request)
      .then((response) => {
        console.log("res", response);
        const FilterItems = GetDefaultFilters(response.recordValue);
        const sfCriteria = getFilterRequest(FilterItems);
        const requestWithCriteria = Object.assign(
          { sfCriteria: sfCriteria },
          request
        );
        apiCall("GetResultSearchFields", "POST", requestWithCriteria)
          .then((response) => {
            const Fields = response[0];
            let data = response[1];
            const columns = Fields.map((elem) => {
              return GetColType(elem);
            });
            const ReportState = response[2];
            const initialState = SearchResultGetInitialState(ReportState);
            const ReportID = getReportID(ReportState);
            const SourceUserID = getSourceUserID();
            apiCall("GetReportName", "POST", requestGetName)
              .then((res) => {
                if (!res.error) {
                  // console.log("table name", res.TabObject);
                  settableData({
                    columns: columns,
                    data: data,
                    initialState: initialState,
                    ReportID: ReportID,
                    SourceUserID: SourceUserID,
                    status: TableStatus.LOADED,
                    Title: res.TabObject.SubMenuEName,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    const requestGetName = {
      ReportID: content.request.reportID,
    };
  }, [content]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((el) => {
      settableSizes({
        width: el[0].contentRect.width,
        height: el[0].contentRect.height,
      });
    });
    resizeObserver.observe(TableWrapperRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // const handleSaveState = useCallback((tableState) => {
  //   console.log("update api!", tableState);
  // }, []);

  const [selectedValues, setSelectedValues] = useState([]);
  const handleOnApplyClick = (selected) => {
    setSelectedValues(selected);
  };

  const handleApplyClick = useCallback(() => {
    handleGetSelectedValue && handleGetSelectedValue(selectedValues);
  }, [handleGetSelectedValue, selectedValues]);

  const handleCancelClick = () => {
    onCloseModal && onCloseModal();
  };
  return createPortal(
    <Container onClick={handleCancelClick}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <div style={{ width: "100%", height: "100%" }}>
          <Title>{tableData.Title}</Title>
          <TableContainer
            style={{
              height: "600px",
              width: "100%",
              backgroundColor: "#ffffff",
            }}
            className="reactTable"
            ref={TableWrapperRef}
          >
            <GridVirtualizerFixed
              tableData={tableData}
              initialState={tableData.initialState}
              tableSizes={tableSizes}
              singleSelection={true}
              // handleSaveState={handleSaveState}
              // initialFilters={initialFilters}
              selectedIDS={["175"]}
              allowShare={true}
              allowFiltering={false}
              allowAdd={false}
              isRtl={theme.dir === "rtl" ? true : false}
              handleGetSelected={handleOnApplyClick}
            />
          </TableContainer>
        </div>
        <FooterStyled>
          <Button
            onClick={handleCancelClick}
            label="Cancel"
            variant="purple-secondary"
            size="md"
          />
          <Button
            onClick={handleApplyClick}
            label="Apply"
            variant="purple"
            size="md"
            disabled={!selectedValues.length}
          />
        </FooterStyled>
      </Wrapper>
    </Container>,
    document.body
  );
}

export default MainTable;
