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
} from "../../../../Component/Toast/ToastContainer";
// import Table from "./Table";
import GridVirtualizerFixed from "../Table/GridTable";
import { apiCall } from "../../../Network";
import { useTheme } from "styled-components";
import {
  TableContainer,
  SaveChangesButton,
  TableWrapper,
  FooterWrapper,
  CancelButton,
  SubmitButton,
} from "./styles";
import {
  getColumnsFromResponse,
  getDataFromResponse,
  SearchResultGetInitialState,
  getAddRowData,
  MakeRequestUpdateData,
  MakeRequestUpdateDataApproveRecipes,
} from "./utils";
import PopUp from "../../../../Component/DesignSystem/PopUp";
import { TableStatus } from "../Table/config";
import { translations } from "../../../../locales/translations";
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
  const [updatedData, setUpdateData] = useState([]);

  const handleGetUpdatedData = useCallback((rows) => {
    setUpdateData(rows);
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
        const columns = getColumnsFromResponse(response);
        const data = getDataFromResponse(response);
        const initialState = SearchResultGetInitialState(
          response.ReportStructure
        );
        const AddRowData = getAddRowData(response);
        let error = false;
        if (response.error) {
          error = true;
          setShowValidationPopup((prev) => ({
            ...prev,
            content: response.error.ErrorDescription,
            value: true,
            width: null,
          }));
        }
        settableData({
          data: data,
          columns: columns,
          initialState: initialState,
          AddRowData: AddRowData,
          AllowDeleteEntry: response.AllowDeleteEntry,
          AllowNewEntry: response.AllowNewEntry,
          Title:
            theme.dir === "rtl"
              ? dataAboutTable.SubMenuLName
              : dataAboutTable.SubMenuEName,
          status: TableStatus.LOADED,
          error: error,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    content.request,
    dataAboutTable.SubMenuEName,
    dataAboutTable.SubMenuLName,
    theme.dir,
  ]);

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
    if (!updatedData.length) {
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
      updatedData,
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
          setUpdateData([]);
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
  const handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB = () => {
    const request = MakeRequestUpdateDataApproveRecipes(
      selectedValues,
      content,
      dataAboutTable
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
          setUpdateData([]);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedValues, setSelectedValues] = useState([]);
  const handleGetSelected = useCallback((selected) => {
    setSelectedValues(selected);
  }, []);

  const isSelectInsertTableOrUpdateDataTable = () => {
    if (
      props.data?.SubMenuExtID === 50200 ||
      props.data?.SubMenuExtID === 50300 ||
      props.data?.SubMenuExtID === 50100
    ) {
      return true;
    }
    return false;
  };
  const getFullHeightIncludeFooter = () => {
    if (isSelectInsertTableOrUpdateDataTable()) {
      return `calc(100% - 62px)`;
    } else if (
      !isSelectInsertTableOrUpdateDataTable() &&
      updatedData.length > 0
    ) {
      return `calc(100% - 62px)`;
    } else {
      return `100%`;
    }
  };
  return (
    <TableWrapper>
      {tableData.error ? null : (
        <React.Fragment>
          <StyledToastContainer />
          <TableContainer
            style={{
              height: props.heightStyle ?? getFullHeightIncludeFooter(),
              width: "100%",
              backgroundColor: "#ffffff",
              zIndex: 1,
              padding: props.paddingSide ? `0px ${props.paddingSide}px` : 0,
            }}
            className="reactTable"
            ref={TableWrapperRef}
          >
            <GridVirtualizerFixed
              tableData={tableData}
              initialState={tableData.initialState}
              tableSizes={tableSizes}
              singleSelection={false}
              allowShare={true}
              allowFiltering={false}
              allowAdd={tableData.AllowNewEntry}
              allowDelete={tableData.AllowDeleteEntry}
              handleGetUpdatedData={handleGetUpdatedData}
              handleValidation={handleValidation}
              SelectedFooterInHeader={props.SelectedFooterInHeader}
              handleGetSelected={handleGetSelected}
              isRtl={theme.dir === "rtl" ? true : false}
            />
          </TableContainer>
          {!isSelectInsertTableOrUpdateDataTable() && updatedData.length > 0 && (
            <FooterWrapper>
              <CancelButton onClick={() => FetchTableData()}>
                {t(translations.EditableTable.CANCEL)}
              </CancelButton>
              <SubmitButton
                onClick={
                  props.data?.SubMenuExtID === 50200
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : props.data?.SubMenuExtID === 50300
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : props.data?.SubMenuExtID === 50100
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : handleSaveButton
                }
                active={true}
              >
                {props.data?.SubMenuExtID === 50200
                  ? t(translations.EditableTable.CancelJobs)
                  : props.data?.SubMenuExtID === 50300
                  ? t(translations.EditableTable.TerminateJobs)
                  : props.data?.SubMenuExtID === 50100
                  ? t(translations.EditableTable.ApproveRecipes)
                  : t(translations.EditableTable.SaveChanges)}
              </SubmitButton>
            </FooterWrapper>
          )}
          {isSelectInsertTableOrUpdateDataTable() && (
            <FooterWrapper>
              <CancelButton onClick={() => FetchTableData()}>
                {t(translations.EditableTable.CANCEL)}
              </CancelButton>
              <SubmitButton
                onClick={
                  props.data?.SubMenuExtID === 50200
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : props.data?.SubMenuExtID === 50300
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : props.data?.SubMenuExtID === 50100
                    ? handle_ApproveRecipes_OR_CancelJob_OR_TerminateJOB
                    : handleSaveButton
                }
                active={true}
              >
                {props.data?.SubMenuExtID === 50200
                  ? t(translations.EditableTable.CancelJobs)
                  : props.data?.SubMenuExtID === 50300
                  ? t(translations.EditableTable.TerminateJobs)
                  : props.data?.SubMenuExtID === 50100
                  ? t(translations.EditableTable.ApproveRecipes)
                  : t(translations.EditableTable.SaveChanges)}
              </SubmitButton>
            </FooterWrapper>
          )}
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
