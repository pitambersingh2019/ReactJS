/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import {
  notifyErrorToast,
  notifySuccessToast,
  StyledToastContainer,
} from "../../../../../Component/Toast/ToastContainer";
// import Table from "./Table";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { useTheme } from "styled-components";
import {
  TableContainer,
  SaveChangesButton,
  TableWrapper,
  FooterWrapper,
  CancelButton,
  SubmitButton,
} from "../../editableTable/styles";
import {
  getColumnsFromResponse,
  getDataFromResponse,
  SearchResultGetInitialState,
  getAddRowData,
  MakeRequestUpdateData,
  GetColType,
} from "../../editableTable/utils";
import PopUp from "../../../../../Component/DesignSystem/PopUp";
import { TableStatus } from "../../Table/config";
import { translations } from "../../../../../locales/translations";
import { useTranslation } from "react-i18next";

function MainTable(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const targetPairs = props.targetPairs;
  // console.log("targetPairs", targetPairs);
  //TEMPORARY LOAD editableDataTable EXAMPLE!!!!
  const dataAboutTable = useMemo(() => props.data ?? {}, [props.data]);
  const content = useMemo(
    () =>
      props.content ?? {
        data: {
          functionCallBack: "rowClicked",
          onlyNewTab: true,
          hasCheckbox: false,
        },
        request: {
          LeaderID: 0,
          formID: 5991,
          pairs: [],
        },
      },
    [props.content]
  );
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
    error: false,
  });
  const [validationError, setValidationError] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState({
    value: false,
    title: t(translations.EditableTable.SaveChanges),
    content: "",
    width: null,
  });
  const updatedData = useRef([]);

  const handleGetUpdatedData = useCallback((rows) => {
    updatedData.current = rows;
    console.log("updated rows", updatedData.current);
  }, []);

  const handleValidation = useCallback((validation) => {
    setValidationError(validation);
  }, []);

  const FetchTableData = useCallback(() => {
    settableData({ columns: [], data: [], status: TableStatus.LOADING });
    const api = "DisplayFormResults";
    const request = Object.assign({}, content.request);
    if (request.LeaderID !== 0) {
      delete request.LeaderID;
    }

    apiCall(api, "POST", request)
      .then((response) => {
        let error = false;
        if (response.error) {
          error = true;
          setShowValidationPopup((prev) => ({
            ...prev,
            content: response.error.ErrorDescription,
            value: true,
            width: null,
          }));
          return;
        }
        apiCall("GetJobsToAssign", "POST", {
          DepartmentID: props.content.data.selectedDepartmentIds || [],
        })
          .then((res) => {
            console.log("Res", res);
            const jobs = res.ResponseDictionaryDT.Jobs || [];
            const machines = res.ResponseDictionaryDT.Machines;

            const columns = getColumnsFromResponse(response);
            // const data = getDataFromResponse(response);
            // const AddRowData = getAddRowData(response);
            let data = [];
            // let cols = [];
            jobs.forEach((row) => {
              const rowData = {};
              Object.keys(row).map((colName) => {
                //find in recordTemplate
                const record = response.recordTemplate.find(
                  (elem) => elem.Name.toLowerCase() === colName.toLowerCase()
                );
                if (record) {
                  record.value = row[colName] ?? "";
                  if (record.Name === "MachineID") {
                    record.DisplayType = 2;
                    record.comboValues = machines
                      .filter((elem) => elem.machinetype === row.machinetype)
                      .map((elem) => ({
                        ComboValueField: elem.id,
                        ComboQueryEField: elem.machinename,
                      }));
                  }
                  rowData[record.Name] = record;
                }
              });
              data.push(rowData);
            });
            //get combos
            // const dep = response.AllrecordValue.find(
            //   (record) => record.Name === "Department"
            // );
            // const machineType = response.AllrecordValue.find(
            //   (record) => record.Name === "MachineType"
            // );
            // const comboValues = comboValues.filter(
            //   (value) =>
            //     dep.value === value.department ||
            //     machineType.value === value.machineType
            // );
            settableData({
              data: data,
              columns: columns,
              AllowDeleteEntry: response.AllowDeleteEntry,
              AllowNewEntry: response.AllowNewEntry,
              Title: dataAboutTable.SubMenuEName,
              status: TableStatus.LOADED,
              error: error,
            });
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [content.request, dataAboutTable.SubMenuEName]);

  useEffect(() => {
    FetchTableData();
  }, [dataAboutTable, content, FetchTableData]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
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

  const saveisLoading = useRef(false);
  const handleSaveButton = () => {
    if (saveisLoading.current) return;
    saveisLoading.current = true;
    if (!updatedData.current.length) {
      setShowValidationPopup((prev) => ({
        ...prev,
        content: t(translations.EditableTable.SavePopup),
        value: true,
        width: null,
      }));
      saveisLoading.current = false;
      return;
    }
    if (validationError) {
      setShowValidationPopup((prev) => ({
        ...prev,
        content: t(translations.EditableTable.ErrorPopup),
        value: true,
        width: null,
      }));
      saveisLoading.current = false;
      return;
    }
    const request = MakeRequestUpdateData(
      updatedData.current,
      content,
      dataAboutTable,
      targetPairs
    );
    const api = "multiRecordsUpsert";
    apiCall(api, "POST", request)
      .then((response) => {
        if (response.error === null) {
          notifySuccessToast(
            t(translations.EditableTable.SuccessToast),
            t(translations.EditableTable.UpdateToast),
            4000
          );
          updatedData.current = [];
          FetchTableData();
        } else {
          notifyErrorToast(
            t(translations.EditableTable.Error),
            t(translations.EditableTable.ErrorSubtitle),
            4000
          );
          if (response.AllErrors) {
            const contentError = response.AllErrors.join("\n");
            setShowValidationPopup((prev) => ({
              ...prev,
              content: contentError,
              value: true,
              width: 500,
            }));
          }
        }
        saveisLoading.current = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TableWrapper>
      {tableData.error ? null : (
        <React.Fragment>
          <StyledToastContainer />
          <TableContainer
            style={{
              height: "600px",
              width: "100%",
              backgroundColor: "#ffffff",
              zIndex: 1,
            }}
            className="reactTable"
            ref={TableWrapperRef}
          >
            <GridVirtualizerFixed
              tableData={tableData}
              initialState={tableData.initialState}
              tableSizes={tableSizes}
              singleSelection={false}
              allowShare={false}
              allowFiltering={false}
              allowAdd={tableData.AllowNewEntry}
              allowDelete={tableData.AllowDeleteEntry}
              handleGetUpdatedData={handleGetUpdatedData}
              handleValidation={handleValidation}
              isRtl={theme.dir === "rtl" ? true : false}
            />
          </TableContainer>
          <FooterWrapper>
            <CancelButton
              onClick={() => (props.close && props.close()) || FetchTableData()}
            >
              {t(translations.EditableTable.CANCEL)}
            </CancelButton>
            <SubmitButton onClick={handleSaveButton} active={true}>
              {t(translations.EditableTable.SaveChanges)}
            </SubmitButton>
          </FooterWrapper>
        </React.Fragment>
      )}
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
    </TableWrapper>
  );
}

export default MainTable;
