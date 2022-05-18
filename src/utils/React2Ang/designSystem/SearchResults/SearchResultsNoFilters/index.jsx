/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
// import Table from "./Table";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { TableContainer } from "../styles";
import { getReportID, getSourceUserID, getRequestState } from "../utils";
import { GetColType, SearchResultGetInitialState } from "../utils";
import { LoadUserID } from "../../../../../AppStart";
import { useTheme } from "styled-components";
import { TableStatus } from "../../Table/config";
import { StyledToastContainer } from "../../../../../Component/Toast/ToastContainer";
function MainTable(props) {
  const theme = useTheme();
  //TEMPORARY LOAD SearchResult EXAMPLE!!!!
  const content = props.content;
  useEffect(() => {
    const request = content
      ? content.request
      : {
          reportID: 6,
          IsUserReport: false,
          sfCriteria: [],
        };

    apiCall("GetResultSearchFields", "POST", request)
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
        settableData({
          columns: columns,
          data: data,
          initialState: initialState,
          ReportID: ReportID,
          SourceUserID: SourceUserID,
          status: TableStatus.LOADED,
          Title: content.data.reportTitle,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleSaveState = useCallback(
    (tableState) => {
      const user = LoadUserID();
      const ReportID = content.request.reportID;
      const request = getRequestState(
        tableState,
        tableData.columns,
        +user,
        ReportID
      );
      apiCall("SaveReportStructureForUser", "POST", request);
    },
    [content.request.reportID, tableData.columns]
  );

  const handleRestoreDefaults = (showModalWarning) => {
    //ClearReportDefinition
    //get userID
    window.sessionStorage.setItem(
      "RestoreDefaultsTableModal",
      showModalWarning
    );
    const user = LoadUserID();
    const request = {
      clearReportStructure: {
        UserID: +user,
        ReportID: content.request.reportID,
        IsUserReport: false,
      },
    };
    apiCall("ClearReportDefinition", "POST", request).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div style={{ padding: "0px 8px", width: "100%", height: "100%" }}>
      <StyledToastContainer />
      <TableContainer
        style={{
          height: "100%",
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
          singleSelection={false}
          handleSaveState={handleSaveState}
          allowShare={true}
          allowFiltering={false}
          allowAdd={false}
          SelectedFooterInHeader={props.SelectedFooterInHeader}
          handleRestoreDefaults={handleRestoreDefaults}
          isRtl={theme.dir === "rtl" ? true : false}
        />
      </TableContainer>
    </div>
  );
}

export default MainTable;
