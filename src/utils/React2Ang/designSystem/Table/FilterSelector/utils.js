export const MODES = {
  INITIAL: "initial",
  ADDFILTER: "addfilter",
  EDITFILTER: "Editfilter",
};
export const COL_TYPES = {
  TEXT: "text",
  BOOLEAN: "boolean",
  NUM: "num",
  DATE: "date",
};
export const FILTER_OPTIONS = {
  CONTAINS: "Contains",
  NOT_CONTAINS: "Not Contains",
  EQUALS: "Equals",
  NOT_EQUALS: "Not Equals",
  GREATER_THAN_EQUAL: "Greater than equal",
  LESS_THAN_EQUAL: "Less than equal",
  BETWEEN: "Between",
};
export const Fields_TYPES = {
  TEXT_INPUT: "text",
  CHECKBOX_INPUT: "boolean",
  NUM_INPUT: "num",
  COMBO: "combo",
  DATE_INPUT: "date",
  CHECKBOX_INPUT2: "booleangraphic",
};
export const FILTER_TYPES = [
  {
    type: Fields_TYPES.TEXT_INPUT,
    DataType: COL_TYPES.TEXT,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.CONTAINS,
        symb: FILTER_OPTIONS.CONTAINS,
        valueKey: "Eq",
        inputField: Fields_TYPES.TEXT_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
      {
        value: 2,
        label: FILTER_OPTIONS.NOT_CONTAINS,
        symb: FILTER_OPTIONS.NOT_CONTAINS,
        valueKey: "NotEqual",
        inputField: Fields_TYPES.TEXT_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
    ],
  },
  {
    type: Fields_TYPES.CHECKBOX_INPUT,
    DataType: COL_TYPES.BOOLEAN,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.EQUALS,
        symb: "=",
        valueKey: "Eq",
        inputField: Fields_TYPES.CHECKBOX_INPUT,
        text: (data, checked) =>
          data.criteriaSelectedItem.label +
          " " +
          data.containSelectedItem.symb +
          " " +
          checked.toString(),
      },
    ],
  },
  {
    type: Fields_TYPES.CHECKBOX_INPUT2,
    DataType: COL_TYPES.BOOLEAN,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.EQUALS,
        symb: "=",
        valueKey: "Eq",
        inputField: Fields_TYPES.CHECKBOX_INPUT,
      },
    ],
  },
  {
    type: Fields_TYPES.NUM_INPUT,
    DataType: COL_TYPES.NUM,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.EQUALS,
        symb: "=",
        valueKey: "Eq",
        inputField: Fields_TYPES.NUM_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
      {
        value: 2,
        label: FILTER_OPTIONS.NOT_EQUALS,
        symb: "≠",
        valueKey: "NotEqual",
        inputField: Fields_TYPES.NUM_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
      {
        value: 3,
        label: FILTER_OPTIONS.GREATER_THAN_EQUAL,
        symb: ">=",
        valueKey: "GTEq",
        inputField: Fields_TYPES.NUM_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
      {
        value: 4,
        label: FILTER_OPTIONS.LESS_THAN_EQUAL,
        symb: "<=",
        valueKey: "LTEq",
        inputField: Fields_TYPES.NUM_INPUT,
        text: (filterData, text) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          text,
      },
    ],
  },
  {
    type: Fields_TYPES.COMBO,
    DataType: COL_TYPES.NUM,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.EQUALS,
        symb: "=",
        valueKey: "INclause",
        inputField: Fields_TYPES.COMBO,
        text: (filterData, items) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " [" +
          items.map((e) => `"${e.label}"`).join(", ") +
          "]",
      },
      {
        value: 2,
        label: FILTER_OPTIONS.NOT_EQUALS,
        symb: "<>",
        valueKey: "NotINclause",
        inputField: Fields_TYPES.COMBO,
        text: (filterData, items) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " [" +
          items.map((e) => `"${e.label}"`).join(", ") +
          "]",
      },
    ],
  },
  {
    type: Fields_TYPES.DATE_INPUT,
    DataType: COL_TYPES.DATE,
    OPTIONS: [
      {
        value: 1,
        label: FILTER_OPTIONS.EQUALS,
        symb: "=",
        valueKey: "Eq",
        inputField: Fields_TYPES.DATE_INPUT,
        text: (filterData, val) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          val.date1.inputString,
      },
      {
        value: 2,
        label: FILTER_OPTIONS.GREATER_THAN_EQUAL,
        symb: ">=",
        valueKey: "GTEq",
        inputField: Fields_TYPES.DATE_INPUT,
        text: (filterData, val) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          val.date1.inputString,
      },
      {
        value: 3,
        label: FILTER_OPTIONS.LESS_THAN_EQUAL,
        symb: "<=",
        valueKey: "LTEq",
        inputField: Fields_TYPES.DATE_INPUT,
        text: (filterData, val) =>
          filterData.criteriaSelectedItem.label +
          " " +
          filterData.containSelectedItem.symb +
          " " +
          val.date1.inputString,
      },
      {
        value: 4,
        label: FILTER_OPTIONS.BETWEEN,
        symb: null,
        valueKey: ["GTEq", "LTEq"],
        inputField: Fields_TYPES.DATE_INPUT,
        text: (filterData, val) =>
          filterData.criteriaSelectedItem.label +
          " = " +
          filterData.containSelectedItem.label +
          ": " +
          val.date1.inputString +
          " - " +
          val.date2.inputString,
      },
    ],
  },
];
