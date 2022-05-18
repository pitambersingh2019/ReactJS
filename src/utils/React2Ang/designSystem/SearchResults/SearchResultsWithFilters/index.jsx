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
import { TableContainer, TableWrapper } from "../styles";
import {
  getFilterRequest,
  getReportID,
  getSourceUserID,
  GetDefaultFilters,
} from "../utils";
import {
  GetColType,
  SearchResultGetInitialState,
  getRequestState,
  tryParseJSONObject,
  ConvertFiltersFromApi,
} from "../utils";
import { LoadUserID } from "../../../../../AppStart";
import { useTheme } from "styled-components";
import { TableStatus } from "../../Table/config";
import {
  FILTER_TYPES,
  Fields_TYPES,
  FILTER_OPTIONS,
} from "../../Table/FilterSelector/utils";
import { StyledToastContainer } from "../../../../../Component/Toast/ToastContainer";
function MainTable(props) {
  const theme = useTheme();
  //TEMPORARY LOAD SearchResult EXAMPLE!!!!
  const content = useMemo(
    () =>
      props.content ?? {
        data: {
          onlyNewTab: false,
          returnValue: false,
          disableLinks: false,
          openSearchInNewTab: false,
          reportID: 6,
          reportTitle: "Products",
          AppPartId: 220,
          chosenIds: [],
          showApply: false,
        },
        request: {
          reportID: 6,
          IsUserReport: false,
        },
        api: "GetResultSearchFields",
      },
    [props.content]
  );
  const [fields, setfields] = useState([]);
  const [initialFilters, setInitialFilters] = useState([]);
  const [filterSets, setFilterSets] = useState([]);
  const [hideFilterPanel, setHideFilterPanel] = useState(null);
  useEffect(() => {
    // console.log("DATAAAAAAAAAAA", content);
    const api = "DisplayReportSearchFields";
    const request = content.request;
    apiCall(api, "POST", request)
      .then((response) => {
        setfields(response.recordValue);
        const FilterItems = GetDefaultFilters(response.recordValue);
        setInitialFilters(FilterItems);

        var fieldID = response.recordValue.find((elem) => elem.Name === "ID");
        if (fieldID) {
          if (fieldID.DisplayCriteria === false) {
            setHideFilterPanel(true);
            // handleFiltering(FilterItems);
          } else setHideFilterPanel(false);
        } else {
          setHideFilterPanel(true);
          // handleFiltering(FilterItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [content, handleFiltering]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.IDLE,
  });
  const handleFiltering = useCallback(
    (items) => {
      settableData({
        columns: [],
        data: [],
        initialState: null,
        status: TableStatus.LOADING,
      });
      const sfCriteria = getFilterRequest(items);
      const request = { ...content.request, sfCriteria: sfCriteria };
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
            status: TableStatus.LOADED,
            initialState: initialState,
            ReportID: ReportID,
            SourceUserID: SourceUserID,
            Title: content?.data?.reportTitle,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [content]
  );
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

  const fetchFilterSets = useCallback(() => {
    apiCall(`GetReportFiltersForUser/${content.request.reportID}`, "GET", {})
      .then((res) => {
        const filters = ConvertFiltersFromApi(
          res.ResponseDictionaryDT.Filter,
          fields
        );
        setFilterSets(filters);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [content.request.reportID, fields]);

  useEffect(() => {
    fetchFilterSets();
  }, [content.request.reportID, fetchFilterSets]);

  const saveFilterSets = useCallback(
    (filterObject) => {
      const filterToApi = Object.assign({}, filterObject);
      if (filterToApi.filterSet) {
        filterToApi.filterSet = filterObject.filterSet.map((elem) => {
          const obj = {
            ...elem,
            criteriaSelectedItem: { value: elem.criteriaSelectedItem.value },
            containSelectedItem: {
              type: elem.containSelectedItem.type,
              value: elem.containSelectedItem.value,
            },
          };
          delete obj["text"];
          delete obj["systemPreset"];
          return obj;
        });
      }

      delete filterToApi["type"];
      let request = null;
      if (filterObject.type === "ADD") {
        request = {
          userFilter: [
            {
              id: 0,
              reportID: content.request.reportID,
              FilterName: filterToApi.name,
              columnFilter: JSON.stringify(filterToApi.filterSet),
              IsDefault: false,
              IsUserReport: false,
              IsActive: true,
            },
          ],
        };
      } else if (filterObject.type === "DELETE") {
        request = {
          userFilter: [
            {
              id: filterToApi.id,
              reportID: content.request.reportID,
              IsDefault: false,
              IsUserReport: false,
              IsActive: false,
            },
          ],
        };
      } else if (filterObject.type === "UPDATE") {
        request = {
          userFilter: [
            {
              id: filterToApi.id,
              reportID: content.request.reportID,
              FilterName: filterToApi.name,
              columnFilter: JSON.stringify(filterToApi.filterSet),
              IsDefault: false,
              IsUserReport: false,
              IsActive: true,
            },
          ],
        };
      }

      apiCall(`SaveReportFiltersForUser`, "POST", request)
        .then((res) => {
          fetchFilterSets();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [content.request.reportID, fetchFilterSets]
  );

  return (
    <TableWrapper
      style={{
        padding: "0px 0",
        height: "100%",
        width: "100%",
        OverflowY: "auto",
        overflowX: "hidden",
      }}
    >
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
          fields={fields}
          initialFilters={initialFilters}
          tableSizes={tableSizes}
          handleFiltering={handleFiltering}
          singleSelection={false}
          handleSaveState={handleSaveState}
          allowShare={true}
          allowFiltering={true}
          allowAdd={false}
          handleRestoreDefaults={handleRestoreDefaults}
          isRtl={theme.dir === "rtl" ? true : false}
          hideFilterPanel={hideFilterPanel}
          saveFilterSetsAPI={saveFilterSets}
          filterSetsAPI={filterSets}
          pageName={content.request.reportID === 1850 ? "STOPEVENTS" : null}
        />
      </TableContainer>
    </TableWrapper>
  );
}

export default MainTable;
