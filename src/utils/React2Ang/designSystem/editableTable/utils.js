/* eslint-disable @typescript-eslint/no-unused-vars */
import Cell from "./Cells/index";
import SelectColumnFilter from "./FilterCells/DropDownFilter";
import { MENU_COLS, SELECTION_COLS } from "../Table/config";
import moment from "moment";
import { aggregationTypes } from "../Table/config";
const filterContainText = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const record = row.values[id].value;
    return record !== undefined
      ? String(record).toLowerCase().includes(String(filterValue).toLowerCase())
      : true;
  });
};

const filterComboBox = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id].value;
    return rowValue === filterValue;
  });
};

const SortText = (rowA, rowB, id, desc) => {
  if (rowA.values[id].value > rowB.values[id].value) return 1;
  if (rowB.values[id].value > rowA.values[id].value) return -1;
  return 0;
};

const SortNumericString = (rowA, rowB, id, desc) => {
  let a = Number.parseFloat(rowA.values[id].value);
  let b = Number.parseFloat(rowB.values[id].value);
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

const getChildType = (elem) => {
  return {
    Header: elem.ChildDisplayEName,
    accessor: elem.ChildName,
    Cell: Cell,
    filter: filterContainText,
    sortType: SortText,
    isChild: true,
    aggregations: [],
    ...elem,
  };
};
export const GetColType = (elem) => {
  switch (elem.DisplayType) {
    case 3:
      return {
        Header: elem.DisplayEName,
        accessor: elem.Name,
        Cell: Cell,
        Filteroptions: [
          { value: "False", label: "FALSE" },
          { value: "True", label: "TRUE" },
        ],
        Filter: SelectColumnFilter,
        filter: filterComboBox,
        sortType: SortText,
        aggregations: [],
        ...elem,
      };
    case 2:
      return {
        Header: elem.DisplayEName,
        accessor: elem.Name,
        Cell: Cell,
        Filteroptions: elem.comboValues.map((e) => ({
          value: e.ComboValueField.toString(),
          label: e.ComboQueryEField,
        })),
        Filter: SelectColumnFilter,
        filter: filterComboBox,
        sortType: SortText,
        aggregations: [],
        ...elem,
      };
    case 4:
    case 6:
      return {
        Header: elem.DisplayEName,
        accessor: elem.Name,
        Cell: Cell,
        filter: filterContainText,
        sortType: SortNumericString,
        aggregations: [
          aggregationTypes.AVG,
          aggregationTypes.MAX,
          aggregationTypes.MIN,
          aggregationTypes.SUM,
        ],
        ...elem,
      };

    case 7:
      return {
        Header: elem.DisplayEName,
        accessor: elem.Name,
        Cell: Cell,
        filter: filterContainText,
        sortType: SortText,
        aggregations: [],
        ...elem,
      };
    default:
      return {
        Header: elem.DisplayEName,
        accessor: elem.Name,
        Cell: Cell,
        filter: filterContainText,
        sortType: SortText,
        aggregations: [
          aggregationTypes.AVG,
          aggregationTypes.MAX,
          aggregationTypes.MIN,
          aggregationTypes.SUM,
        ],
        ...elem,
      };
  }
};

export const getColumnsFromResponse = (response) => {
  const columns = response.recordTemplate.flatMap((elem) => {
    return elem.ChildName
      ? [GetColType(elem), getChildType(elem)]
      : GetColType(elem);
  });
  return columns;
};

export const getDataFromResponse = (response) => {
  const data = [];
  response.AllrecordValue.forEach((columns) => {
    const column = {};
    columns.forEach((elem) => {
      column[elem.Name] = elem;
    });
    data.push(column);
  });
  return data;
};

//build row data to add it to table
export const getAddRowData = (response) => {
  const column = {};
  const row = response.recordTemplate.map((elem) => ({
    ...elem,
    value: "",
    AddRow: true,
  }));
  row.forEach((col) => {
    column[col.Name] = col;
  });
  return column;
};

//CONVERT API InitialState to Table State!
export const SearchResultGetInitialState = (initialState) => {
  const ReportColumnsOrder = initialState?.ReportColumnsOrder;
  const ReportHiddenColumns = initialState?.ReportHiddenColumns;
  const ReportFilter = initialState?.ReportFilter;
  const ReportSort = initialState?.ReportSort;

  const ColumnOrderStructure = ReportColumnsOrder
    ? JSON.parse(ReportColumnsOrder)
    : [];
  const ColumnDisplayStructure = ReportHiddenColumns
    ? JSON.parse(ReportHiddenColumns)
    : [];
  const ColumnFilterStructure = ReportFilter ? JSON.parse(ReportFilter) : [];
  const ColumnSortStructure = ReportSort ? JSON.parse(ReportSort) : [];

  if (initialState) {
    let hiddenColumns = [];
    if (ColumnDisplayStructure) {
      hiddenColumns = ColumnDisplayStructure.filter(
        (elem) => elem.visible === false
      ).map((elem) => elem.fieldName);
    }

    let columnOrder = [];
    if (ColumnOrderStructure) {
      columnOrder = ColumnOrderStructure.map((elem) => elem.fieldName);
    }

    let colWidths = [];
    if (ColumnOrderStructure) {
      colWidths = ColumnOrderStructure.filter(
        (elem) => !isNaN(+elem.width)
      ).map((elem) => ({
        [elem.fieldName]: elem.width,
      }));
    }

    let ColumnSort = [];
    if (ColumnSortStructure) {
      ColumnSort = ColumnSortStructure.filter(
        (elem) => Object.keys(elem.sort).length > 0
      )
        .sort((a, b) => (a.sort.priority > b.sort.priority ? 1 : -1))
        .map((elem) => ({
          id: elem.fieldName,
          desc: elem.sort.direction === "desc" ? true : false,
        }));
    }

    let ColumnFilter = [];
    if (ColumnFilterStructure) {
      ColumnFilter = ColumnFilterStructure.filter(
        (elem) => Object.keys(elem.filters[0]).length > 0
      );
    }

    let aggregations = {};
    if (ColumnOrderStructure) {
      aggregations = Object.assign(
        {},
        ...ColumnOrderStructure.filter((elem) => elem.aggregationType).map(
          (elem) => ({ [elem.fieldName]: elem.aggregationType })
        )
      );
    }

    const state = {
      aggregation: aggregations,
      hiddenColumns: hiddenColumns,
      columnOrder: [SELECTION_COLS, ...columnOrder, MENU_COLS],
      sortBy: ColumnSort,
      filters: [],
      columnWidths: {
        ...colWidths.reduce((r, c) => Object.assign(r, c), {}),
      },
    };
    return state;
  }
  return {
    hiddenColumns: [],
    columnOrder: [],
    sortBy: [],
    filters: [],
    columnWidths: {},
  };
};

export const getReportID = (initialState) => {
  const ReportSort = initialState.find(({ ReportSort }) => ReportSort);
  return ReportSort;
};
export const getSourceUserID = () => {
  try {
    const serialState = window.sessionStorage.getItem("ngStorage-userID");
    if (serialState === null) {
      return "undefined";
    }
    return serialState;
  } catch (err) {
    return "undefined";
  }
};

const getDataType = (DisplayType) => {
  switch (DisplayType) {
    case 1:
      return "text";
    case 6:
      return "num";
    case 3:
      return "num";
    case 2:
      return "num";
    case 18:
      return "text";
    case 4:
      return "num";
    case 8:
      return "Date";
    case 7:
      return "Date";
    default:
      return null;
  }
};
const getKeyValueOfType = (DisplayType) => {
  switch (DisplayType) {
    default:
      return "Eq";
  }
};
const getConvertedValue = (record) => {
  switch (record.DisplayType) {
    case 1:
      return record.value;
    case 6:
      return +record.value;
    case 3:
      return record.value === "True" ? 1 : 0;
    case 2:
      return +record.value;
    case 18:
      return record.value;
    case 4:
      return +record.value;
    case 8:
      return moment(record.value, "DD/MM/YYYY HH:mm:ss").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    case 7:
      return moment(record.value, "DD/MM/YY HH:mm").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    default:
      return null;
  }
};
export const MakeRequestUpdateData = (
  updatedData,
  content,
  dataAboutTable,
  targetPairs
) => {
  let pairs = updatedData.map((elem) => ({
    pairs: Object.keys(elem.row)
      .map((key) => {
        console.log(elem);
        const value = getConvertedValue(elem.row[key]);
        const dataType = getDataType(elem.row[key].DisplayType);

        if (
          !elem.row[key].ShowOnNew &&
          elem.row[key].Name !== "ID" &&
          elem.type === "New"
        )
          return null;
        return {
          FieldName: elem.row[key].Name,
          [getKeyValueOfType(elem.row[key].DisplayType)]: value,
          DataType: dataType,
        };
      })
      .filter((elem) => elem !== null),
    Action: elem.type,
  }));

  //in case that ID field is a text change it to num type
  pairs.forEach((elem) => {
    elem.pairs.forEach((elem2) => {
      if (elem2.FieldName === "ID") {
        elem2.Eq = +elem2.Eq;
        elem2.DataType = "num";
      }
    });
  });
  //end change ID filed to num type

  //targetPairs
  pairs = pairs.map((elem) => {
    if (elem.Action === "New" && targetPairs) {
      return {
        ...elem,
        pairs: [
          ...elem.pairs
            .filter((e) => e.DataType !== null)
            .filter((e) => e.FieldName !== targetPairs.FieldName),
          targetPairs,
        ],
      };
    }
    return { ...elem, pairs: elem.pairs.filter((e) => e.DataType !== null) };
  });
  console.log("PAIRS", pairs);
  return {
    TopObjectID: content.request.LeaderID,
    formID: content.request.formID,
    records: pairs,
    skipSaveOperation: dataAboutTable.SkipSaveOperation,
  };
};

export const MakeRequestUpdateDataApproveRecipes = (
  selectedRows,
  content,
  dataAboutTable
) => {
  const records = selectedRows.map((elem) => ({
    Action: "Update",
    pairs: [{ FieldName: "ID", Eq: +elem.values.ID.value, DataType: "num" }],
  }));
  return {
    TopObjectID: content.request.LeaderID,
    formID: content.request.formID,
    records: records,
    skipSaveOperation: dataAboutTable.SkipSaveOperation,
  };
};
