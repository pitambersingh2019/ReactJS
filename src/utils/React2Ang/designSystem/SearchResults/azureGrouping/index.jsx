/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import TextInputCell from "./TextInputCell";
import SelectColumnFilter from "../FilterCells/DropDownFilter";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { TableContainer, FooterAzureMapping } from "../styles";
import { filterContainText, filterCombo, SortText } from "./utils";
import { useTheme } from "styled-components";
import ReactDOM from "react-dom";
import { TableStatus } from "../../Table/config";
import PopUp from "../../../../../Component/DesignSystem/PopUp";
import DropDownCell from "./DropDownCell";
import {
  notifyErrorToast,
  notifySuccessToast,
  StyledToastContainer,
} from "../../../../../Component/Toast/ToastContainer";
import { translations } from "../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons/index";

function MainTable(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const noSubmitValidate = useRef(false);
  const deleteRows = useRef([]);
  const [showValidationPopup, setShowValidationPopup] = useState({
    value: false,
    title: t(translations.EditableTable.SaveChanges),
    content: "",
    width: null,
  });
  const fetchTable = useCallback(() => {
    settableData({
      columns: [],
      data: [],
      status: TableStatus.LOADING,
    });
    noSubmitValidate.current = false;
    deleteRows.current = [];
    apiCall("GetGroupsForMapping", "GET", {})
      .then((response) => {
        const data = [];
        response.ActiveMapping.forEach((elem) => {
          const row = {};
          Object.keys(elem).map((key) => {
            row[key] = { value: elem[key] };
          });
          data.push(row);
        });
        const LocalGroups = response.Groups[0];
        const ClientGroups = response.Groups[1];

        let columns = [
          {
            accessor: "LocalGroupID",
            Header: "Local Group",
            Name: "LocalGroupID",
            Cell: DropDownCell,
            filter: filterCombo,
            Filteroptions: LocalGroups.Value.map((elem) => ({
              value: elem.key,
              label: elem.value,
            })),
            comboValues: LocalGroups.Value.map((elem) => ({
              ComboValueField: elem.key,
              ComboQueryEField: elem.value,
            })),
            DisplayType: 2,
            Filter: SelectColumnFilter,
            sortType: SortText,
            aggregations: [],
          },
          {
            accessor: "ClientGroupID",
            Header: "Client Group",
            Cell: DropDownCell,
            Name: "ClientGroupID",
            filter: filterCombo,
            Filteroptions: ClientGroups.Value.map((elem) => ({
              value: elem.key,
              label: elem.value,
            })),
            comboValues: ClientGroups.Value.map((elem) => ({
              ComboValueField: elem.key,
              ComboQueryEField: elem.value,
            })),
            DisplayType: 2,
            Filter: SelectColumnFilter,
            sortType: SortText,
            aggregations: [],
          },
          {
            accessor: "Priority",
            Header: "Priority",
            Name: "Priority",
            Cell: TextInputCell,
            filter: filterContainText,
            sortType: SortText,
            aggregations: [],
          },
        ];

        const AddRowData = {
          ID: { value: 0, AddRow: true },
          LocalGroupID: { value: "", AddRow: true },
          ClientGroupID: { value: "", AddRow: true },
          Priority: { value: 0, AddRow: true },
        };
        settableData({
          columns: columns,
          data: data,
          Title: "AzureGroupsMapping",
          AddRowData: AddRowData,
          status: TableStatus.LOADED,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchTable();
  }, [fetchTable, tableData]);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
  });

  useEffect(() => {
    if (TableWrapperRef.current) {
      const fullWidth = TableWrapperRef.current.getBoundingClientRect().width;
      const fullHeight = TableWrapperRef.current.getBoundingClientRect().height;
      settableSizes({ width: fullWidth, height: fullHeight });
    }
  }, []);

  const handleGetUpdatedData = useCallback((rows) => {
    deleteRows.current = rows
      .filter((elem) => elem.type === "Delete")
      .map((elem) => ({ ID: elem.row.ID.value }));
    console.log("updated rows", deleteRows.current);
  }, []);

  const handleValidation = useCallback((validation) => {
    noSubmitValidate.current = validation;
  }, []);

  const [updatedData, setUpdatedData] = useState([]);
  const handleGetUpdatedDataFull = useCallback((UpdatedData) => {
    const data = [];
    UpdatedData.forEach((elemRow) => {
      const row = {};
      Object.keys(elemRow).forEach((keyCol) => {
        if (keyCol === "Priority") {
          row[keyCol] = +elemRow[keyCol].value;
        } else {
          row[keyCol] = elemRow[keyCol].value;
        }
      });
      data.push(row);
    });
    setUpdatedData(data);
  }, []);

  const handleSaveButton = () => {
    if (noSubmitValidate.current) {
      setShowValidationPopup((prev) => ({
        ...prev,
        content: t(translations.EditableTable.ErrorPopup),
        value: true,
        width: null,
      }));
      return;
    }

    const request = {
      groupMapping: updatedData,
    };
    apiCall("MapGroups", "POST", request)
      .then((res) => {
        if (res.error === null) {
          //if table updated with deleteions rows
          if (deleteRows.current.length > 0) {
            apiCall("DeleteMapGroup", "POST", {
              groupMapping: deleteRows.current,
            })
              .then((res) => {
                if (res.error === null) {
                  notifySuccessToast(
                    t(translations.EditableTable.SuccessToast),
                    t(translations.EditableTable.UpdateToast),
                    4000
                  );
                  fetchTable();
                } else {
                  //error!
                  notifyErrorToast(
                    t(translations.EditableTable.Error),
                    t(translations.EditableTable.ErrorSubtitle),
                    4000
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //updated table without any deleteion
            notifySuccessToast(
              t(translations.EditableTable.SuccessToast),
              t(translations.EditableTable.UpdateToast),
              4000
            );
            fetchTable();
          }
        } else {
          //error!
          notifyErrorToast(
            t(translations.EditableTable.Error),
            t(translations.EditableTable.ErrorSubtitle),
            4000
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <StyledToastContainer />
      <TableContainer
        style={{
          height: "calc(100% - 100px)",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
        className="reactTable"
        ref={TableWrapperRef}
      >
        <GridVirtualizerFixed
          tableData={tableData}
          tableSizes={tableSizes}
          singleSelection={false}
          allowShare={false}
          allowFiltering={false}
          allowAdd={true}
          allowDelete={true}
          handleGetUpdatedData={handleGetUpdatedData}
          handleGetUpdatedDataFull={handleGetUpdatedDataFull}
          handleValidation={handleValidation}
          isRtl={theme.dir === "rtl" ? true : false}
        />
      </TableContainer>
      <FooterAzureMapping>
        <Button
          label="Cancel"
          variant="purple-secondary"
          onClick={fetchTable}
        />
        <Button
          label="Save Changes"
          variant="purple"
          onClick={handleSaveButton}
        />
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
      </FooterAzureMapping>
    </div>
  );
}

export default MainTable;
