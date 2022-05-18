/* eslint-disable @typescript-eslint/no-unused-vars */
import { COL_TYPES, Fields_TYPES } from "../Table/FilterSelector/utils";
import Cell from "./Cells";
import SelectColumnFilter from "./FilterCells/DropDownFilter";
import CheckMarkCell from "./Cells/CheckMark";
import BooleabGraphicCell from "./Cells/Booleangraphic";
import DateCell from "./Cells/Date";
import { MENU_COLS, SELECTION_COLS } from "../Table/config";
import { FILTER_TYPES, FILTER_OPTIONS } from "../Table/FilterSelector/utils";
import { aggregationTypes } from "../Table/config";
import moment from "moment";
const sortBoolean = (rowA, rowB, id, desc) => {
  if (Number(rowA.values[id]) > Number(rowB.values[id])) return 1;
  if (Number(rowB.values[id]) > Number(rowA.values[id])) return -1;
  return 0;
};

export const filterContainTextDate = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    const d = moment(rowValue);
    if (d.isValid()) {
      const date = d.format("DD/MM/YYYY HH:mm:ss");
      return date
        .toLocaleLowerCase()
        .includes(String(filterValue).toLowerCase());
    } else {
      return false;
    }
  });
};

export const filterContainText = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue !== undefined
      ? String(rowValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      : true;
  });
};
export const filterBoolean = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue === filterValue || Number(filterValue) === rowValue;
  });
};
export const getFilterRequest = (Filters) => {
  console.log("FILTERS", Filters);
  const request = [];
  Filters.forEach((element) => {
    let fieldId = null;
    let valueKey = null;
    let value = null;
    let Item = null;
    switch (element.containSelectedItem.type) {
      case Fields_TYPES.TEXT_INPUT:
        fieldId = element.criteriaSelectedItem.value;
        valueKey = element.containSelectedItem.valueKey;
        value = element.val;
        Item = Object.assign(
          {},
          {
            FieldName: fieldId,
            [valueKey]: value,
            DataType: COL_TYPES.TEXT,
          }
        );
        request.push(Item);
        break;
      case Fields_TYPES.CHECKBOX_INPUT:
        fieldId = element.criteriaSelectedItem.value;
        valueKey = element.containSelectedItem.valueKey;
        value = element.val;
        Item = Object.assign(
          {},
          {
            FieldName: fieldId,
            [valueKey]: value,
            DataType: COL_TYPES.BOOLEAN,
          }
        );
        request.push(Item);
        break;
      case Fields_TYPES.CHECKBOX_INPUT2:
        fieldId = element.criteriaSelectedItem.value;
        valueKey = element.containSelectedItem.valueKey;
        value = element.val;
        Item = Object.assign(
          {},
          {
            FieldName: fieldId,
            [valueKey]: value,
            DataType: COL_TYPES.BOOLEAN,
          }
        );
        request.push(Item);
        break;
      case Fields_TYPES.NUM_INPUT:
        fieldId = element.criteriaSelectedItem.value;
        valueKey = element.containSelectedItem.valueKey;
        value = element.val;
        Item = Object.assign(
          {},
          {
            FieldName: fieldId,
            [valueKey]: value,
            DataType: COL_TYPES.NUM,
          }
        );
        request.push(Item);
        break;
      case Fields_TYPES.COMBO:
        fieldId = element.criteriaSelectedItem.value;
        valueKey = element.containSelectedItem.valueKey;
        value = element.val.map((elem) => elem.value);
        Item = Object.assign(
          {},
          {
            FieldName: fieldId,
            [valueKey]: value,
            DataType: COL_TYPES.NUM,
          }
        );
        request.push(Item);
        break;
      case Fields_TYPES.DATE_INPUT:
        if (element.containSelectedItem.label === FILTER_OPTIONS.BETWEEN) {
          fieldId = element.criteriaSelectedItem.value;
          valueKey = element.containSelectedItem.valueKey[0];
          value = moment(
            element.val["date1"].inputString,
            "DD/MM/YY HH:mm"
          ).format("YYYY-MM-DD HH:mm:ss");
          Item = Object.assign(
            {},
            {
              FieldName: fieldId,
              [valueKey]: value,
              DataType: COL_TYPES.DATE,
            }
          );
          request.push(Item);

          fieldId = element.criteriaSelectedItem.value;
          valueKey = element.containSelectedItem.valueKey[1];
          value = moment(
            element.val["date2"].inputString,
            "DD/MM/YY HH:mm"
          ).format("YYYY-MM-DD HH:mm:ss");
          Item = Object.assign(
            {},
            {
              FieldName: fieldId,
              [valueKey]: value,
              DataType: COL_TYPES.DATE,
            }
          );
          request.push(Item);
        } else {
          fieldId = element.criteriaSelectedItem.value;
          valueKey = element.containSelectedItem.valueKey;
          value = moment(
            element.val["date1"].inputString,
            "DD/MM/YY HH:mm"
          ).format("YYYY-MM-DD HH:mm:ss");
          Item = Object.assign(
            {},
            {
              FieldName: fieldId,
              [valueKey]: value,
              DataType: COL_TYPES.DATE,
            }
          );
          request.push(Item);
        }

        break;
    }
  });
  console.log(request);
  return request;
};

export const DefaultPendingJobCustomCol = (name) => {
  return {
    Header: name,
    accessor: name,
    Cell: Cell,
    filter: filterContainText,
  };
};

export const GetColType = (elem) => {
  switch (elem.DisplayType) {
    case "boolean":
      return {
        Header: elem.DisplayEName,
        accessor: elem.FieldName,
        Cell: CheckMarkCell,
        Filteroptions: [
          { value: false, label: "FALSE" },
          { value: true, label: "TRUE" },
        ],
        Filter: SelectColumnFilter,
        filter: filterBoolean,
        sortType: sortBoolean,
        aggregations: [],
        ...elem,
      };
    case "booleangraphic":
      return {
        Header: elem.DisplayEName,
        accessor: elem.FieldName,
        Cell: BooleabGraphicCell,
        Filteroptions: [
          { value: false, label: "FALSE" },
          { value: true, label: "TRUE" },
        ],
        Filter: SelectColumnFilter,
        filter: filterBoolean,
        sortType: sortBoolean,
        aggregations: [],
        ...elem,
      };
    case "date":
      return {
        Header: elem.DisplayEName,
        accessor: elem.FieldName,
        Cell: DateCell,
        filter: filterContainTextDate,
        aggregations: [aggregationTypes.MAX, aggregationTypes.MIN],
        ...elem,
      };
    case "num":
      return {
        Header: elem.DisplayEName,
        accessor: elem.FieldName,
        Cell: Cell,
        filter: filterContainText,
        aggregations: [
          aggregationTypes.AVG,
          aggregationTypes.MAX,
          aggregationTypes.MIN,
          aggregationTypes.SUM,
        ],
        ...elem,
      };
    default:
      return {
        Header: elem.DisplayEName,
        accessor: elem.FieldName,
        Cell: Cell,
        filter: filterContainText,
        aggregations: [],
        ...elem,
      };
  }
};

//CONVERT API InitialState to Table State!
export const SearchResultGetInitialState = (initialState) => {
  let ReportColumnsOrder = {};
  let ReportHiddenColumns = {};
  let ReportFilter = {};
  let ReportSort = {};
  if (initialState) {
    ReportColumnsOrder = initialState.find(
      ({ ReportColumnsOrder }) => ReportColumnsOrder
    );
    ReportHiddenColumns = initialState.find(
      ({ ReportHiddenColumns }) => ReportHiddenColumns
    );
    ReportFilter = initialState.find(({ ReportFilter }) => ReportFilter);
    ReportSort = initialState.find(({ ReportSort }) => ReportSort);
  }

  const ColumnOrderStructure = ReportColumnsOrder
    ? JSON.parse(ReportColumnsOrder.ReportColumnsOrder)
    : [];
  const ColumnDisplayStructure = ReportHiddenColumns
    ? JSON.parse(ReportHiddenColumns.ReportHiddenColumns)
    : [];
  const ColumnFilterStructure = ReportFilter
    ? JSON.parse(ReportFilter.ReportFilter)
    : [];
  const ColumnSortStructure = ReportSort
    ? JSON.parse(ReportSort.ReportSort)
    : [];

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

    let aggregations = {};
    if (ColumnOrderStructure) {
      aggregations = Object.assign(
        {},
        ...ColumnOrderStructure.filter((elem) => elem.aggregationType).map(
          (elem) => ({ [elem.fieldName]: elem.aggregationType })
        )
      );
    }

    let ColumnSortBy = [];
    if (ColumnSortStructure) {
      ColumnSortBy = ColumnSortStructure.filter((elem) => elem.id);
    }

    let ColumnFilters = [];
    if (ColumnFilterStructure) {
      ColumnFilters = ColumnFilterStructure.filter((elem) => elem.id);
    }
    const state = {
      aggregation: aggregations,
      hiddenColumns: hiddenColumns,
      columnOrder: [SELECTION_COLS, ...columnOrder, MENU_COLS],
      sortBy: ColumnSortBy,
      filters: ColumnFilters,
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
  const ReportID = initialState.find(({ ReportID }) => ReportID);
  return ReportID?.ReportID;
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

export const getRequestState = (tableState, columns, user, reportID) => {
  const aggregations = tableState.aggregation;
  const ColOrder = tableState.columnOrder;
  const ColSizes = tableState.columnResizing.columnWidths;
  const ColSizesMap = new Map();
  for (const [key, value] of Object.entries(ColSizes)) {
    ColSizesMap.set(key, value);
  }
  const ColOrderArr = ColOrder.filter(
    (col) => col !== MENU_COLS && col !== SELECTION_COLS
  );
  const ColOrderWithSizes = ColOrderArr.map((col) => {
    const width = ColSizesMap.get(col);
    return {
      fieldName: col,
      width: width ?? "*",
      aggregationType: aggregations[col],
    };
  });

  let hiddenColumns = tableState.hiddenColumns;
  hiddenColumns = hiddenColumns.map((col) => ({
    fieldName: col,
    visible: false,
  }));
  const ColsVisibility = columns
    .map((elem) => elem.FieldName)
    .filter((col) => col !== MENU_COLS && col !== SELECTION_COLS)
    .filter((elem) => !tableState.hiddenColumns.includes(elem))
    .map((col) => ({
      fieldName: col,
      visible: true,
    }))
    .concat(hiddenColumns);
  const ColsFiltersState = tableState.filters;
  const ColsSortByState = tableState.sortBy;

  const request = {
    UserReportStructure: {
      UserID: user,
      ReportID: reportID,
      IsUserReport: false,
      ColumnOrderStructure: JSON.stringify(ColOrderWithSizes),
      ColumnDisplayStructure: JSON.stringify(ColsVisibility),
      ColumnFilter: JSON.stringify(ColsFiltersState),
      ColumnSort: JSON.stringify(ColsSortByState),
    },
  };
  return request;
};

export const GetDefaultFilters = function (reportFields) {
  const Items = [];
  const MapBoolean = new Map([
    ["true", true],
    ["false", false],
  ]);
  let id = 0;
  for (var i = 0; i < reportFields.length; i++) {
    if (reportFields[i].DefaultValue.length) {
      for (var k = 0; k < reportFields[i].DefaultValue.length; k++) {
        let FilterType = FILTER_TYPES.find(
          (filterType) => filterType.type === reportFields[i].DisplayTypeName
        );
        const containSelectedItem = FilterType.OPTIONS.find(
          (elem) => elem.symb === reportFields[i].DefaultValue[k].Comp
        );
        containSelectedItem.type = reportFields[i].DisplayTypeName;
        const criteriaSelectedItem = {
          value: reportFields[i].Name,
          label: reportFields[i].DisplayEName,
          helper: reportFields[i],
        };
        let val = null;
        let text = null;
        switch (reportFields[i].DisplayTypeName) {
          case Fields_TYPES.CHECKBOX_INPUT:
            val = MapBoolean.get(
              reportFields[i].DefaultValue[k].Value[0]?.toLowerCase()
            );
            text =
              criteriaSelectedItem.label +
              " " +
              containSelectedItem.symb +
              " " +
              val.toString();
            break;
          case Fields_TYPES.NUM_INPUT:
            val = reportFields[i].DefaultValue[k].Value[0];
            text =
              criteriaSelectedItem.label +
              " " +
              containSelectedItem.symb +
              " " +
              val.toString();
            break;
          case Fields_TYPES.TEXT_INPUT:
            val = reportFields[i].DefaultValue[k].Value[0];
            text =
              criteriaSelectedItem.label +
              " " +
              containSelectedItem.symb +
              " " +
              val.toString();
            break;
          case Fields_TYPES.COMBO:
            val = reportFields[i].DefaultValue[k].Value.map((elem) => ({
              value: elem,
              label: reportFields[i].comboValues.find(
                (e) => e.ComboValueField === elem
              ).DisplayEName,
            }));
            text =
              criteriaSelectedItem.label +
              " " +
              containSelectedItem.symb +
              " [" +
              val.map((e) => `"${e.label}"`).join(" ") +
              "]";
            break;
          case Fields_TYPES.DATE_INPUT:
            val = {
              date1: {
                format: "DD/MM/YY HH:mm",
                inputString: moment(
                  reportFields[i].DefaultValue[k].Value[0],
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD/MM/YY HH:mm"),
              },
            };
            text =
              criteriaSelectedItem.label +
              " " +
              containSelectedItem.symb +
              " " +
              val.date1.inputString;
            break;
        }
        const Item = Object.assign(
          {},
          {
            containSelectedItem: containSelectedItem,
            criteriaSelectedItem: criteriaSelectedItem,
            id: id,
            text: text,
            val: val,
            systemPreset: true,
          }
        );
        console.log("Item", Item);
        id += 1;
        Items.push(Item);
      }
    }
  }
  return Items;
};

export const tryParseJSONObject = (jsonString) => {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const ConvertFiltersFromApi = (Filters, fields) => {
  const getFilterContainSelectedItem = (type, value) => {
    const filterType = FILTER_TYPES.find((elem) => elem.type === type);
    const options = filterType.OPTIONS.find((elem) => elem.value === value);
    return { ...options };
  };

  const getFilterText = (filterData) => {
    switch (filterData.containSelectedItem.inputField) {
      case Fields_TYPES.CHECKBOX_INPUT:
      case Fields_TYPES.TEXT_INPUT:
      case Fields_TYPES.NUM_INPUT:
      case Fields_TYPES.COMBO:
      case Fields_TYPES.DATE_INPUT:
        return filterData.containSelectedItem.text(filterData, filterData.val);

      default:
        return null;
    }
  };

  const filtersReturnVal = Filters.map((elem) => {
    const filter = tryParseJSONObject(elem.Filter);
    if (filter) {
      let valid = true;
      const filterWithHelpers = filter.map((elem) => {
        const field = fields.find(
          (f) => f.Name === elem.criteriaSelectedItem.value
        );
        if (field) {
          const containSelectedItem = {
            ...elem.containSelectedItem,
            ...getFilterContainSelectedItem(
              elem.containSelectedItem.type,
              elem.containSelectedItem.value
            ),
          };
          let obj = {
            ...elem,
            criteriaSelectedItem: {
              ...elem.criteriaSelectedItem,
              label: field.DisplayEName,
              helper: field,
            },
            containSelectedItem: containSelectedItem,
          };
          obj.text = getFilterText(obj);
          return obj;
        }
        valid = false;
        return null;
      });
      if (valid) {
        const filterSet = {
          label: elem.FilterName,
          value: elem.ID,
          data: filterWithHelpers,
        };
        return filterSet;
      }
    }
    return null;
  }).filter((elem) => elem !== null);

  return filtersReturnVal;
};
