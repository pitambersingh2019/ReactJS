/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useEffect, useRef, useState } from "react";
// import Table from "./Table";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall, apiCallMulti } from "../../../../Network";
import { TableContainer, FooterWrapper, Container } from "./styles";
import {
  GetColType,
  SearchResultGetInitialState,
  getReportID,
  getSourceUserID,
  DefaultPendingJobCustomCol,
} from "../utils";
import { useTheme } from "styled-components";
import Dialog from "../Components/Dialog/ConfirmDialog";
import {
  notifyErrorToast,
  notifySuccessToast,
  StyledToastContainer,
} from "../../../../../Component/Toast/ToastContainer";
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
  const theme = useTheme();
  //TEMPORARY LOAD editableDataTable EXAMPLE!!!!
  //   {
  //     "data": {
  //         "functionCallBack": null,
  //         "onlyNewTab": true,
  //         "returnValue": false,
  //         "openSearchInNewTab": false,
  //         "removeSelectOption": false,
  //         "activateJob": true,
  //         "multiSelect": false
  //     },
  //     "request": {
  //         "MachineID": "48"
  //     },
  //     "api": "GetJobsListForMachine"
  // }

  const closeModal = useMemo(
    () => searchParent(props.$scope, "$close"),
    [props.$scope]
  );
  const content = props.content;
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
  });

  useEffect(() => {
    apiCallMulti(
      ["GetJobsListForMachine", "GetPendingJobsCustomParams"],
      "POST",
      [content.request, content.request]
    )
      .then((response) => {
        const firstResponse = response[0].data;
        const secondResponse = response[1].data;

        const Fields = firstResponse[0];
        let data = firstResponse[1];
        let datacustom = secondResponse.ResponseDataTable[0];
        let columns = Fields.map((elem) => {
          return GetColType(elem);
        });

        if (datacustom.length > 0) {
          const hash = new Map();
          data.forEach((obj) => {
            hash.set(obj.ID, obj);
          });
          datacustom.forEach((obj) => {
            if (hash.has(obj.ID))
              hash.set(
                obj.ID,
                Object.assign({}, { ...hash.get(obj.ID), ...obj })
              );
          });
          data = Array.from(hash.values());
          let newcols = Object.keys(datacustom[0]);
          newcols = newcols.filter((col) => col !== "ID");
          console.log("new cols", newcols);
          newcols = newcols.map((colname) =>
            DefaultPendingJobCustomCol(colname)
          );
          columns = [...columns, ...newcols];
        }
        const ReportState = firstResponse[2];
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [content]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  // useEffect(() => {
  //   if (TableWrapperRef.current) {
  //     const fullWidth = TableWrapperRef.current.getBoundingClientRect().width;
  //     const fullHeight = TableWrapperRef.current.getBoundingClientRect().height;
  //     settableSizes({ width: fullWidth, height: fullHeight });
  //   }
  // }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      settableSizes({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      });
    });

    if (TableWrapperRef.current)
      resizeObserver.observe(TableWrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [confirmMessage, setConfirmMessage] = useState(false);
  const [selectedValues, setselectedValues] = useState([]);
  const handleGetSelected = (selected) => {
    setselectedValues(selected);
  };

  // const [errorMessage, seterrorMessage] = useState({
  //   value: false,
  //   title: "Error",
  //   content: "",
  // });

  const handleActiviateJob = () => {
    setConfirmMessage((prev) => ({ ...prev, value: false }));
    const request = {
      ...content.request,
      JobID: selectedValues[0]?.values?.ID,
    };
    apiCall("ActivateJobForMachine", "POST", request)
      .then((response) => {
        if (response.error !== null) {
          // seterrorMessage((prev) => ({
          //   ...prev,
          //   value: true,
          //   content: response.error.ErrorMessage,
          // }));
          notifyErrorToast("Error", response.error.ErrorMessage, 3000);
        } else {
          notifySuccessToast("Success", "Job activated!", 3000);
          setTimeout(() => closeModal(), 3000);
        }
        setConfirmMessage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleActivateJobButton = () => {
    if (selectedValues.length > 0) {
      setConfirmMessage(true);
    }
  };

  return (
    <Container>
      <StyledToastContainer />
      <TableContainer
        style={{
          height: "500px",
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
          allowShare={true}
          allowFiltering={false}
          allowAdd={false}
          handleGetSelected={handleGetSelected}
          isRtl={theme.dir === "rtl" ? true : false}
          pageName="PendingJobs"
        />
      </TableContainer>
      <FooterWrapper>
        <Dialog
          Title={"Confirm!"}
          Content={
            "Are you sure you want to Activate Job ID " +
            selectedValues[0]?.values?.ID
          }
          onConfirm={handleActiviateJob}
          isOpen={confirmMessage}
          setOpen={setConfirmMessage}
        >
          <div style={{ right: 0, bottom: 0, position: "absolute" }}>
            <Button
              disabled={selectedValues.length > 0 ? false : true}
              onClick={handleActivateJobButton}
              label="Activate Job"
              variant="purple"
            />
          </div>
        </Dialog>
      </FooterWrapper>
    </Container>
  );
}

export default MainTable;
