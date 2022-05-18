/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from "react";
import TextInput from "./EditableCell/TextInput";
import LinkItem from "./FixedCell/LinkItem";
import ModalTable from "./EditableCell/LinkItemSearch";
import CheckBox from "./EditableCell/CheckBox";
import {
  SingleDropDownEditableCell,
  SingleDropDownFixedCell,
} from "./EditableCell/SingleDropDown";
import ColorPicker from "./EditableCell/ColorPicker";
import NumberInput from "./EditableCell/NumberInput";
import DefaultCell from "./FixedCell";
import { TimePickerEditable, TimePickerFixed } from "./EditableCell/TimePicker";
import { DatePickerEditable, DatePickerFixed } from "./EditableCell/DatePicker";

const Cell = ({ value: record, ...props }) => {
  const getTextTemplate = useCallback(
    (record) => {
      // var required = !record.AllowNull;
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <TextInput {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <TextInput {...props} />;
        } else {
          return <DefaultCell {...props} />;
        }
      }
    },
    [props]
  );

  const getCheckBoxTemplate = useCallback(
    (record) => {
      // var required = !record.AllowNull;
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <CheckBox {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <CheckBox {...props} />;
        } else {
          return <DefaultCell {...props} />;
        }
      }
    },
    [props]
  );
  const getDropDownTemplate = useCallback(
    (record) => {
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <SingleDropDownEditableCell {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <SingleDropDownEditableCell {...props} />;
        } else {
          return <SingleDropDownFixedCell {...props} />;
        }
      }
    },
    [props]
  );
  const getColorTemplate = useCallback(
    (record) => {
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <ColorPicker {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <ColorPicker {...props} />;
        } else {
          return <DefaultCell {...props} />;
        }
      }
    },
    [props]
  );

  const getNumberTemplate = useCallback(
    (record) => {
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <NumberInput {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <NumberInput {...props} />;
        } else {
          return <DefaultCell {...props} />;
        }
      }
    },
    [props]
  );

  const getTimeTemplate = useCallback(
    (record) => {
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <TimePickerEditable {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <TimePickerEditable {...props} />;
        } else {
          return <TimePickerFixed {...props} />;
        }
      }
    },
    [props]
  );

  const getDateTimeTemplate = useCallback(
    (record) => {
      if (record.AddRow) {
        //this is new row!
        if (record.ShowOnNew == true) {
          return <DatePickerEditable {...props} />;
        } else {
          return null;
        }
      } else {
        if (record.AllowEntry == true) {
          return <DatePickerEditable {...props} />;
        } else {
          return <DatePickerFixed {...props} />;
        }
      }
    },
    [props]
  );

  //not done yet, child column table
  if (props.column?.isChild) {
    console.log("aaa", record, props);
  }
  if (record && props.column?.isChild) {
    if (record?.AddRow) {
      //this is new row!
      if (record?.ShowOnNew == true) {
        return <SingleDropDownEditableCell {...props} />;
      } else {
        return "null";
      }
    } else {
      if (record?.AllowEntry == true) {
        return <SingleDropDownEditableCell {...props} />;
      } else {
        return <SingleDropDownFixedCell {...props} />;
      }
    }
  }

  if (
    (record?.LinkTarget != "" && record?.LinkTarget != null) ||
    record?.SearchLinkReportID != null
  ) {
    if (record.AddRow) {
      //this is new row!
      if (record.ShowOnNew == true && record.SearchLinkReportID) {
        return <ModalTable {...props} />;
      } else {
        return null;
      }
    } else {
      if (record.AllowEntry == true) {
        if (record.SearchLinkReportID) return <ModalTable {...props} />;
        else return <LinkItem {...props} />;
      } else {
        if (record.LinkTarget != "") return <LinkItem {...props} />;
        else return <DefaultCell {...props} />;
      }
    }
  }

  switch (record?.DisplayType) {
    case 1:
      return getTextTemplate(record);
    case 2:
      return getDropDownTemplate(record);
    case 3:
      return getCheckBoxTemplate(record);
    case 18:
      return getColorTemplate(record);
    case 6:
      return getNumberTemplate(record);
    case 8:
      return getTimeTemplate(record);
    case 7:
      return getDateTimeTemplate(record);
    default:
      return <DefaultCell {...props} />;
  }
};
export default Cell;
