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
import { FooterWrapper, Wrapper, Title } from "./styles";
import { getReportID, getSourceUserID } from "../utils";
import { GetColType, SearchResultGetInitialState } from "../utils";
import { useTheme } from "styled-components";
import { TableStatus } from "../../Table/config";
import Button from "../../../../../Component/DesignSystem/Buttons";
const searchParent = function (scope, functionName) {
  for (var i = 0; i < 15; i++) {
    if (scope[functionName] !== undefined) {
      return scope[functionName];
    }
    if (!scope || !scope.$parent) {
      break;
    }
    if (scope && scope.$parent) {
      scope = scope.$parent;
    }
  }
  console.log(`function ${functionName} not found`);
  return null;
};

function MainTable(props) {
  console.log("aaaaaaaAAAA", props);
  const theme = useTheme();
  const content = props.content;
  const request = props.content.request;
  const api = props.content.api;
  useEffect(() => {
    const requestGetName = {
      ReportID: content.request.reportID,
    };
    apiCall(api, "POST", request)
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
          Title: content.data.reportTitle.trim(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [api, content, request]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
    Title: "table",
  });

  useEffect(() => {
    if (TableWrapperRef.current) {
      const fullWidth = TableWrapperRef.current.getBoundingClientRect().width;
      const fullHeight = TableWrapperRef.current.getBoundingClientRect().height;
      settableSizes({ width: fullWidth, height: fullHeight });
    }
  }, []);
  const selectedValues = useRef(null);
  const handleOnApplyClick = (selected) => {
    selectedValues.current = selected;
  };

  const closeModal = useMemo(
    () => searchParent(props.$scope, "ok"),
    [props.$scope]
  );

  const rowClicked = useMemo(
    () => searchParent(props.$scope, "rowClicked"),
    [props.$scope]
  );

  const onSelectClickButton = () => {
    let IDS = null;
    let rows = null;
    if (content.data.multiSelect) {
      IDS = selectedValues.current.map((elem) => elem.values.ID);
      rows = selectedValues.current.map((elem) => ({
        ...elem.values,
        api: api,
      }));
    } else {
      IDS = selectedValues.current[0].values.ID;
      rows = { ...selectedValues.current[0].values, api: api };
    }
    rowClicked && rowClicked(IDS, null, null, rows);
  };

  return (
    <div style={{ padding: "20px", width: "100%", height: "80vh" }}>
      <Title>{tableData.Title}</Title>
      <TableContainer
        style={{
          height: "90%",
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
          singleSelection={props.content.data?.multiSelect ? false : true}
          // handleSaveState={handleSaveState}
          allowShare={false}
          allowFiltering={false}
          allowAdd={false}
          selectedIDS={content.data?.chosenIds}
          isRtl={theme.dir === "rtl" ? true : false}
          handleGetSelected={handleOnApplyClick}
        />
      </TableContainer>
      <FooterWrapper>
        <Button
          onClick={() => closeModal && closeModal()}
          label="Cancel"
          variant="purple-secondary"
        />
        <Button onClick={onSelectClickButton} label="Apply" variant="purple" />
      </FooterWrapper>
    </div>
  );
}

export default MainTable;
