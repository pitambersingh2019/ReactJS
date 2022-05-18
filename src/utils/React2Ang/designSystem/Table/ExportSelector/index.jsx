/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from "react";
import { ColumnMenuStyled, Item, Divider } from "./styles";
import { SELECTION_COLS, MENU_COLS } from "../config";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import myFont from "./DavidLibre-Regular.ttf";

function fixRTLText(str) {
  if (/[\u0590-\u05FF]/.test(str)) return str.split("").reverse().join("");
  return str;
}
//used in editable table fields!
const getValueToExport_FiledTempllate2 = (field, col) => {
  switch (col.DisplayType) {
    case 2:
      const selected = col.comboValues
        .map((elem) => ({
          value: elem.ComboValueField,
          label: elem.ComboQueryEField,
        }))
        .find((elem) => elem.value.toString() === field.value);
      if (selected) return selected.label;
      return "";
    default:
      return field.value ? field.value : "";
  }
};
//used in searchResults fields!
const getValueToExport_FiledTempllate1 = (value, col) => {
  switch (col.DisplayType) {
    case "date":
      const d = moment(value, "YYYY-MM-DDTHH:mm:ss");
      console.log(value, d);
      if (d.isValid()) return "'" + d.format("DD/MM/YYYY HH:mm:ss").toString();
      return "";

    default:
      return value ? value : "";
  }
};

function ColumnMenu({
  onClickHandler,
  sortedRows,
  allColumns,
  alldata,
  visibleColumns,
  Title,
  selectedFlatRows,
  selectedFlatRowsLength,
  isRtl,
}) {
  const rows = sortedRows;
  const handleExportVisibleDataToExcel = () => {
    // const ColOrder = visibleColumns.filter(
    //   (elem) => elem !== SELECTION_COLS && elem !== MENU_COLS
    // );

    let visibleCols = visibleColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) visibleCols = visibleCols.reverse();
    // const filteredcols = ColOrder.filter((el) => visibleCols.includes(el));
    const rowsValues = rows.map((elem) => elem.values);
    const rowsToExcel = [];
    rowsValues.forEach((elem) => {
      const row = Object.keys(elem).reduce(function (acc, key) {
        if (visibleCols.map((el) => el.value).indexOf(key) !== -1)
          acc[key] = elem[key];
        return acc;
      }, {});
      rowsToExcel.push(row);
    });

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";

    visibleCols.forEach((col) => {
      csvContent += col.label + ",";
    });
    csvContent += "\n";
    rowsToExcel.forEach((row) => {
      let line = "";
      visibleCols.forEach((col) => {
        if (col?.Name) {
          line +=
            getValueToExport_FiledTempllate2(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        } else {
          line +=
            getValueToExport_FiledTempllate1(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        }
      });
      line = line.replace(/\r?\n?/g, "");
      csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    const fileName = Title ?? "report";
    downloadLink.download = fileName + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // window.open(encodedUri);
  };

  const handleExportAllDataToExcel = () => {
    let Cols = allColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) Cols = Cols.reverse();
    const rowsToExcel = alldata;
    // console.log("alldata", alldata);
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";

    Cols.forEach((col) => {
      csvContent += col.label + ",";
    });
    csvContent += "\n";
    rowsToExcel.forEach((row) => {
      let line = "";
      Cols.forEach((col) => {
        if (col?.Name) {
          line +=
            getValueToExport_FiledTempllate2(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        } else {
          line +=
            getValueToExport_FiledTempllate1(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        }
      });
      line = line.replace(/\r?\n?/g, "");
      csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);

    const downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    const fileName = Title ?? "report";
    downloadLink.download = fileName + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // window.open(encodedUri);
  };

  const handleExportAllDataToPDF = () => {
    // eslint-disable-next-line no-debugger
    let Cols = allColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) Cols = Cols.reverse();
    const IDindex = Cols.findIndex((item) => item.value === "ID") ?? 0;
    const data = [];
    alldata.forEach((row) => {
      const rowinpdf = [];
      Cols.forEach((col) => {
        if (col?.Name) {
          rowinpdf.push(
            fixRTLText(
              getValueToExport_FiledTempllate2(
                row[col.value],
                allColumns.find((elem) => elem.id === col.value)
              )
            )
          );
        } else {
          rowinpdf.push(
            fixRTLText(
              getValueToExport_FiledTempllate1(
                row[col.value],
                allColumns.find((elem) => elem.id === col.value)
              )
            )
          );
        }
      });
      data.push(rowinpdf);
    });
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const font = myFont.split(",")[1];
    doc.addFileToVFS("Font.ttf", font);
    doc.addFont("Font.ttf", "font", "normal");
    // doc.setR2L(true);
    // add stuff to the pdf
    doc.setFont("font");
    doc.setFontSize(10);
    const headers = [Cols.map((elem) => fixRTLText(elem.label))];
    // doc.autoTable(content);
    doc.autoTable({
      head: headers,
      body: data,
      horizontalPageBreak: true,
      // horizontalPageBreakRepeat: IDindex,
      styles: {
        font: "font",
        fontStyle: "10",
      },
    });
    const fileName = Title ?? "report";
    doc.save(fileName + ".pdf");
    onClickHandler && onClickHandler();
  };

  const handleExportVisibleDataToPDF = () => {
    const PDFData = rows.map((elem) => elem.values);
    let Cols = visibleColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) Cols = Cols.reverse();
    const data = [];
    PDFData.forEach((row) => {
      const rowinpdf = [];
      Cols.forEach((col) => {
        if (col?.Name) {
          rowinpdf.push(
            getValueToExport_FiledTempllate2(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            )
          );
        } else {
          rowinpdf.push(
            getValueToExport_FiledTempllate1(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            )
          );
        }
      });
      data.push(rowinpdf);
    });
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    //const title = "Emerald Report " + new Date();
    const headers = [Cols.map((elem) => elem.label)];

    let content = {
      startY: 0,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    const fileName = Title ?? "report";
    doc.save(fileName + ".pdf");
    onClickHandler && onClickHandler();
  };

  const handleExportSelectedToPDF = () => {
    // eslint-disable-next-line no-debugger
    let Cols = allColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) Cols = Cols.reverse();
    const selectedData = selectedFlatRows.map((elem) => elem.values);
    const data = [];
    selectedData.forEach((row) => {
      const rowinpdf = [];
      Cols.forEach((col) => {
        if (col?.Name) {
          rowinpdf.push(
            getValueToExport_FiledTempllate2(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            )
          );
        } else {
          rowinpdf.push(
            getValueToExport_FiledTempllate1(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            )
          );
        }
      });
      data.push(rowinpdf);
    });
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    //const title = "Emerald Report " + new Date();
    const headers = [Cols.map((elem) => elem.label)];

    let content = {
      startY: 0,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    const fileName = Title ?? "report";
    doc.save(fileName + ".pdf");
    onClickHandler && onClickHandler();
  };

  const handleExportSelectedDataToExcel = () => {
    let Cols = allColumns
      .filter((elem) => elem.id !== SELECTION_COLS && elem.id !== MENU_COLS)
      .map((elem) => ({ value: elem.id, label: elem.Header, Name: elem.Name }));

    if (isRtl) Cols = Cols.reverse();
    const rowsToExcel = selectedFlatRows.map((elem) => elem.values);

    // console.log("alldata", alldata);
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";

    Cols.forEach((col) => {
      csvContent += col.label + ",";
    });
    csvContent += "\n";
    rowsToExcel.forEach((row) => {
      let line = "";
      Cols.forEach((col) => {
        if (col?.Name) {
          line +=
            getValueToExport_FiledTempllate2(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        } else {
          line +=
            getValueToExport_FiledTempllate1(
              row[col.value],
              allColumns.find((elem) => elem.id === col.value)
            ) + ",";
        }
      });
      line = line.replace(/\r?\n?/g, "");
      csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);

    const downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    const fileName = Title ?? "report";
    downloadLink.download = fileName + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // window.open(encodedUri);
  };

  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickHandler && onClickHandler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickHandler]);

  return (
    <ClickAwayListener onClickAway={onClickHandler}>
      <ColumnMenuStyled ref={ref}>
        <Item onClick={handleExportAllDataToPDF}>Export all data as PDF</Item>
        <Divider />
        <Item onClick={handleExportVisibleDataToPDF}>
          Export visible data as PDF
        </Item>
        {selectedFlatRowsLength > 0 && (
          <React.Fragment>
            <Divider />
            <Item onClick={handleExportSelectedToPDF}>
              Export selected data as PDF
            </Item>
          </React.Fragment>
        )}
        <Divider />
        <Item onClick={handleExportAllDataToExcel}>
          Export all data as Excel
        </Item>
        <Divider />
        <Item onClick={handleExportVisibleDataToExcel}>
          Export visible data as Excel
        </Item>
        {selectedFlatRowsLength > 0 && (
          <React.Fragment>
            <Divider />
            <Item onClick={handleExportSelectedDataToExcel}>
              Export selected data as Excel
            </Item>
          </React.Fragment>
        )}
      </ColumnMenuStyled>
    </ClickAwayListener>
  );
}

export default ColumnMenu;
