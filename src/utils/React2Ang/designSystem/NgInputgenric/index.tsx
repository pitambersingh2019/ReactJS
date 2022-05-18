import React, { useCallback, useEffect, useState } from "react";
import store from "../../../../Redux/store";
import { Provider } from "react-redux";
import { selectLanguage, selectIsRtl } from "../../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
// import { getService } from '../react-to-angular'
import InputText from "../../../../Component/DesignSystem/InputText";
import {
  InputMode,
  InputType,
} from "../../../../Component/DesignSystem/InputText/types";
import { isLocalLanguage } from "../../../CommonFunctions";
import SingleDropDown from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import MultiDropDown from "../../../../Component/DesignSystem/DropDown/MultiSelect";
import { displayFormResults, ContentEntity, ComboValuesEntity } from "./types";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import TextAreaField from "../../../../Component/DesignSystem/TextArea";

import InputSearchFieldPopup from "../../../../Component/DesignSystem/SearchFieldPopup";
import DatePicker from "../../../../Component/DesignSystem/DatePicker";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Grid from "@mui/material/Grid";
import {
  DateFormat,
  DateReturned,
} from "../../../../Component/DesignSystem/DatePicker/types";
import moment from "moment";

import CheckBox from "../../../../Component/DesignSystem/CheckBox";

import { customTheme } from "../../../../styles/theme";
import ProductPreview from "../../../../Component/DesignSystem/ProductPreview";
import PasswordInput from "../../../../Component/DesignSystem/PasswordInput";
import ColorPicker from "../../../../Component/DesignSystem/ColorPicker";
import { device } from "../../../devices";
import ModalSelectTable from "../SearchResults/ModalSearchResult";
import { translations } from "../../../../locales/translations";
/*OLD METHOD
    // const [onupdate, setcommonFunctions] = useState(null);
    // useEffect(() => {
    //     setcommonFunctions(getService("commonFunctions"));
    // },[])

*/

const TitleButton = styled.a`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1268fb;
  cursor: pointer;
`;

const InputWrapper = styled.div<{
  order: number;
  fullSize: any;
}>`
  //default:
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100px;
  /* align-self: center; */
  order: ${(p) => p.order};
  @media ${device.laptop} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(50% - 40px)")};
  }
  @media ${device.laptopL} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(50% - 48px)")};
  }
  @media ${device.desktop} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(33.3333333% - 24px)")};
  }
  @media ${device.LaptopM} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(33.3333333% - 40px)")};
  }
  @media ${device.LaptopML} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(33.3333333% - 40px)")};
  }
  @media ${device.desktopS} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(25% - 50px)")};
  }
  @media ${device.desktopL} {
    flex: ${(p) => (p.fullSize ? "0 1 100%" : "0 1 calc(25% - 50px)")};
  }
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AAA: ContentEntity = {
  AllowEntry: false,
  AllowNull: false,
  CheckBoxSelectAllOption: false,
  ChildDisplayEName: "Child Name",
  ChildDisplayLName: "Child Name",
  ChildDisplayOrder: 0,
  ChildDisplayTypeName: null,
  ChildName: "SAMI",
  ComboAddParentCriteria: false,
  ComboDisplayList: true,
  DataSource: "TblProduct",
  DataSourceKey: false,
  DecimalPoint: 0,
  DefaultValue: 0,
  DisplayEName: "Machine Type",
  DisplayLName: "Machine Type",
  DisplayOrder: 4,
  DisplayType: 3,
  DisplayTypeName: "Combo",
  FileDisplayHeight: 0,
  FileDisplayWidth: 0,
  GroupID: null,
  HasSearchBox: false,
  Hint: "",
  LinkTarget: "",
  MandatoryField: true,
  MaxValue: null,
  MinValue: null,
  Name: "MachineType",
  ObjectTypeID: 0,
  SearchLinkReportID: null,
  ShowInCriteria: false,
  ShowInResult: true,
  ShowOnNew: true,
  ToolTip: "",
  comboValues: [
    {
      ChildcomboValues: [],
      ComboChainField: null,
      ComboQueryEField: "Injection",
      ComboQueryHField: "Injection",
      ComboValueField: 1,
      isDefault: false,
    },
    {
      ChildcomboValues: [
        {
          ChildcomboValues: [],
          ComboChainField: "2",
          ComboQueryEField: "תחזוקה תקופתית",
          ComboQueryHField: "תחזוקה תקופתית",
          ComboValueField: 7,
          isDefault: false,
        },
        {
          ChildcomboValues: [],
          ComboChainField: "2",
          ComboQueryEField: "testing0",
          ComboQueryHField: "testing0",
          ComboValueField: 332,
          isDefault: false,
        },
      ],
      ComboChainField: null,
      ComboQueryEField: "Extrusion - Plate",
      ComboQueryHField: "Extrusion - Plate",
      ComboValueField: 2,
      isDefault: false,
    },
    {
      ChildcomboValues: [],
      ComboChainField: null,
      ComboQueryEField: "BlowMolding",
      ComboQueryHField: "BlowMolding",
      ComboValueField: 3,
      isDefault: false,
    },
  ],
  isOrderField: false,
  value: null,
};

export const InputGeneric: React.FC<displayFormResults> = (props) => {
  //destruct props
  const {
    content,
    search,
    formobject,
    multiform,
    add,
    language,
    SaveValues,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modal,
  } = props;

  const { t } = useTranslation();
  const [inputValue, setinputValue] = useState<ContentEntity>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [DataType, setDataType] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [KeyType, setKeyType] = useState<string>();
  const [cofirmPassword, setcofirmPassword] = useState<string>("");

  const displayName = useCallback(
    (content: ContentEntity) => {
      if (isLocalLanguage(language) === true) return content.DisplayLName;
      return content.DisplayEName;
    },
    [language]
  );

  const displayChildName = useCallback(
    (content) => {
      if (isLocalLanguage(language) === true) return content.ChildDisplayLName;
      return content.ChildDisplayEName;
    },
    [language]
  );

  //component on mount prepare input
  useEffect(() => {
    const ContentValues = content;
    let DataTypeNew = "";
    let keyNew = "";
    let keyVal: any = "";

    if (ContentValues.editableTable === true) {
      ContentValues.contentDisplayName = "";
    } else {
      ContentValues.contentDisplayName = displayName(ContentValues);
    }

    if (ContentValues.DisplayType) {
      ContentValues.required =
        ContentValues.ShowInCriteria === true && multiform
          ? false
          : !ContentValues.AllowNull;
      ContentValues.disabled = !(
        content.AllowEntry || (add ? ContentValues.ShowOnNew : false)
      );

      switch (ContentValues.DisplayType) {
        case 2:
          if (!ContentValues.value) {
            ContentValues.valueChosen = ContentValues?.comboValues?.find(
              (elem: any) => elem.isDefault === true
            );
          } else {
            ContentValues.valueChosen = ContentValues?.comboValues?.find(
              (elem: any) =>
                String(elem.ComboValueField) === ContentValues.value
            );
          }
          ContentValues.ChildValueChosen = null;
          if (ContentValues.valueChosen) {
            ContentValues.ChildValueChosen =
              ContentValues.valueChosen.ChildcomboValues.find(
                (elem: any) => elem.isDefault === true
              );
            if (ContentValues.ChildValueChosen === null)
              ContentValues.ChildValueChosen = null;
          }

          //set Data Type!
          if (ContentValues.ComboDisplayList) {
            keyNew = "INclause";
            keyVal =
              ContentValues.valueChosen?.map(
                (elem: any) => elem.ComboValueField
              ) ?? "";
          } else {
            keyNew = "Eq";
            keyVal = ContentValues.valueChosen?.ComboValueField ?? null;
          }
          DataTypeNew = "num";

          break;

        case 3:
          DataTypeNew = "True/False";
          keyNew = "Eq";
          //ContentValues.value = ContentValues.value === "True";
          keyVal = ContentValues.value === "True" ? 1 : 0;
          break;

        case 13:
          ContentValues.value = "";
          keyNew = "Eq";
          DataTypeNew = "text";
          break;
        case 7:
          keyNew = "Eq";
          DataTypeNew = "Date";
          ContentValues.value = ContentValues.value
            ? moment(ContentValues.value, "DD/MM/YYYY HH:mm:ss").format(
                "DD/MM/YY HH:mm"
              )
            : "";

          const toDateFormat = moment(
            ContentValues.value,
            "DD/MM/YYYY HH:mm"
          ).format("YYYY-MM-DD HH:mm:ss");
          const isValid = moment(
            toDateFormat,
            "YYYY-MM-DD HH:mm:ss",
            true
          ).isValid();

          keyVal = isValid ? toDateFormat : null;
          break;

        case 6:
          keyNew = "Eq";
          DataTypeNew = "num";
          keyVal = +ContentValues.value ?? null;
          if (
            ContentValues.DecimalPoint &&
            ContentValues.DecimalPoint !== null &&
            ContentValues.DecimalPoint > 0
          ) {
            ContentValues.value = parseFloat(ContentValues.value).toFixed(
              ContentValues.DecimalPoint
            );
          }

          // if (
          //   ContentValues.DecimalPoint &&
          //   ContentValues.DecimalPoint !== null &&
          //   ContentValues.DecimalPoint > 0
          // ) {
          //   ContentValues.decimalValue = "0.";
          //   for (let i = 0; i < ContentValues.DecimalPoint - 1; i++) {
          //     ContentValues.decimalValue = ContentValues.decimalValue + "0";
          //   }
          //   ContentValues.decimalValue = ContentValues.decimalValue + "1";
          //   ContentValues.decimalValue = parseFloat(ContentValues.decimalValue);
          // }
          break;
        case 18:
          keyNew = "Eq";
          DataTypeNew = "text";
          keyVal = /^#[0-9A-F]{6}$/i.test(ContentValues.value) ?? null;
          break;

        case 16:
        case 17:
          if (ContentValues.value?.toLowerCase().indexOf("pdf") >= 0) {
            ContentValues.fileType = "Pdf";
          } else if (
            ContentValues.value?.match(/^http.*\.(jpeg|jpg|gif|png|svg)$/) !=
            null
          ) {
            ContentValues.fileType = "Picture";
          } else {
            ContentValues.fileType = "File";
          }
          if (ContentValues.value != null && ContentValues.value != "") {
            ContentValues.fileName = ContentValues.value.split("/");
            ContentValues.fileName =
              ContentValues.fileName[ContentValues.fileName.length - 1];
          }
          break;
        default:
          keyNew = "Eq";
          DataTypeNew = "text";
          keyVal = ContentValues.value ?? "";
          break;
      }
    }
    setinputValue(ContentValues);

    if (
      ContentValues.DataSourceKey ||
      ContentValues.MandatoryField ||
      ContentValues.required
    ) {
      // @ts-ignore
      SaveValues(
        {
          FieldName: ContentValues.Name,
          [keyNew]: keyVal,
          DataType: DataTypeNew,
          checkOnSubmit: ContentValues.required && !ContentValues.disabled,
          DisplayName: ContentValues.contentDisplayName,
        },
        true
      );
      if (ContentValues.ChildName) {
        SaveValues(
          {
            FieldName: ContentValues.ChildName,
            [keyNew]: ContentValues.ChildValueChosen
              ? ContentValues.ChildValueChosen.ComboValueField
              : null,
            DataType: DataTypeNew,
            checkOnSubmit: ContentValues.required && !ContentValues.disabled,
            DisplayName: displayChildName(ContentValues),
          },
          true
        );
      }
    }

    setDataType(DataTypeNew);
    setKeyType(keyNew);
  }, [
    SaveValues,
    add,
    content,
    displayChildName,
    displayName,
    formobject,
    language,
    multiform,
    search,
  ]);

  // const addNewItem = function () {
  //   let modalInstance = modal
  //     .open({
  //       templateUrl: "views/common/mainContentTemplate.html",
  //       controller: function (
  //         $scope: any,
  //         $compile: any,
  //         $modalInstance: any,
  //         reportID: any,
  //         commonFunctions: any
  //       ) {
  //         $scope.reportID = reportID;
  //         $scope.pageDisplay = 0;
  //         $scope.returnValue = true;
  //         $scope.onlyNewTab = true;
  //         $scope.modal = true;
  //         $scope.showBreadCrumb = false;
  //         $scope.multiSelect = false;
  //         $scope.hideCriteria = true;
  //         commonFunctions.commonCodeSearch($scope);

  //         $scope.getDisplayReportSearchFields();

  //         $scope.ok = function () {
  //           $modalInstance.close();
  //         };

  //         $scope.rowClicked = function (id: any, formID: any, fieldName: any) {
  //           $modalInstance.close(id);
  //         };
  //       },
  //       resolve: {
  //         reportID: function () {
  //           return inputValue?.SearchLinkReportID;
  //         },
  //       },
  //     })
  //     .result.then(function (ID: string) {
  //       if (!isNaN(+ID)) handleInputNumberChange(ID);
  //       else handleInputNumberChange("");
  //     });
  // };

  const openNewTab = function () {
    if (inputValue?.value) {
      let url = props.state.href("appObjectFullView", {
        appObjectName: inputValue?.LinkTarget,
        ID: inputValue?.value,
      });
      window.open(url, inputValue?.LinkTarget);
    }
  };

  const handleInputChange = (text: string) => {
    setinputValue((prev) => ({ ...prev, value: text }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: text,
        DataType: "text",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
  };

  const handleInputPasswordChange = (text: string) => {
    setinputValue((prev) => ({ ...prev, value: text }));
    if (text === cofirmPassword) {
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: text,
          DataType: "text",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
          passwordMissMatch: false,
        },
        false
      );
    } else {
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: null,
          DataType: "text",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
          passwordMissMatch: true,
        },
        false
      );
    }
  };

  const handleInputChangePasswordConfirm = (text: string) => {
    setcofirmPassword(text);
    if (text === inputValue?.value) {
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: text,
          DataType: "text",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
          passwordMissMatch: false,
        },
        false
      );
    } else {
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: null,
          DataType: "text",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
          passwordMissMatch: true,
        },
        false
      );
    }
  };
  const handleInputNumberChange = (number: string) => {
    setinputValue((prev) => ({
      ...prev,
      value: number,
    }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: number !== "" ? (+number).toFixed(inputValue?.DecimalPoint) : null,
        DataType: "num",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
  };

  const handleInputNumberOnBlue = (number: string) => {
    setinputValue((prev) => ({
      ...prev,
      value: (+number).toFixed(prev?.DecimalPoint),
    }));
  };

  const handleSingleDropDownChange = (item: Item | undefined) => {
    let chosen: any = null;
    if (item) {
      chosen = inputValue?.comboValues?.find(
        (elem: any) => elem.ComboValueField === item.value
      );
    }
    setinputValue((prev) => ({
      ...prev,
      valueChosen: chosen,
      value: item?.value ?? null,
      ChildValueChosen: null,
    }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: chosen?.ComboValueField ?? null,
        DataType: "num",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
    if (inputValue?.ChildName) {
      SaveValues(
        {
          FieldName: inputValue?.ChildName,
          Eq: null,
          DataType: "num",
          checkOnSubmit: inputValue?.required,
          DisplayName: displayChildName(inputValue),
        },
        false
      );
    }
  };

  const handleSingleDropDownChildChange = (item: Item | undefined) => {
    let Childchosen: any = null;
    if (item) {
      Childchosen = inputValue?.valueChosen.ChildcomboValues.find(
        (elem: any) => elem.ComboValueField === item.value
      );
    }
    setinputValue((prev) => ({ ...prev, ChildValueChosen: Childchosen }));
    SaveValues(
      {
        FieldName: inputValue?.ChildName,
        Eq: Childchosen?.ComboValueField ?? null,
        DataType: "num",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
    //updateValue(inputValue.content.ChildName, Childchosen, 'Eq', 'combo', undefined);
  };

  const handleMultiDropDownChange = (items: Item[]) => {
    console.log("items", items);
    const valueChosen: ComboValuesEntity[] = [];
    items.forEach((elementSelected: Item) => {
      let chosen = inputValue?.value.find(
        (elem: any) => elem.ComboValueField === elementSelected.value
      );
      valueChosen.push(chosen);
    });
    console.log(valueChosen);
    setinputValue((prev) => ({ ...prev, valueChosen: valueChosen }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        INclause: valueChosen.map((elem) => elem.ComboValueField),
        DataType: "num",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
    //updateValue(inputValue.content.Name, valueChosen, 'INclause', 'combo', undefined)
  };

  const HandleCheckBoxClicked = () => {
    const checkedValue = inputValue?.value === "True" ? "False" : "True";
    setinputValue((prev) => ({ ...prev, value: checkedValue }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: checkedValue === "True" ? 1 : 0,
        DataType: "True/False",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
    //updateValue(inputValue.content.Name, checkedValue, 'Eq', 'True/False', undefined)
  };

  const HandleCheckBoxDropDownClicked = (Item: Item | undefined) => {
    if (Item) {
      const CheckBoxItemsMap = [undefined, false, true];
      const ChosenValue = CheckBoxItemsMap[Item.value];
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: ChosenValue,
          DataType: "True/False",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
        },
        false
      );
    } else {
      SaveValues(
        {
          FieldName: inputValue?.Name,
          Eq: null,
          DataType: "True/False",
          checkOnSubmit: inputValue?.required,
          DisplayName: inputValue?.contentDisplayName,
        },
        false
      );
    }

    //updateValue(inputValue.content.Name, ChosenValue, 'Eq', 'True/False', undefined)
  };

  const handleDateChange = (date: any) => {
    if (typeof date === "object") {
      setinputValue((prev) => ({
        ...prev,
        value: date.dateString,
      }));
    } else {
      setinputValue((prev) => ({
        ...prev,
        value: date,
      }));
    }
    const toDateFormat = moment(date.dateString, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const isValid = moment(toDateFormat, "YYYY-MM-DD HH:mm:ss", true).isValid();
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: isValid ? toDateFormat : null,
        DataType: "Date",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
  };

  const handleColorPicked = (color: any) => {
    setinputValue((prev) => ({ ...prev, value: color }));
    SaveValues(
      {
        FieldName: inputValue?.Name,
        Eq: color,
        DataType: "text",
        checkOnSubmit: inputValue?.required,
        DisplayName: inputValue?.contentDisplayName,
      },
      false
    );
  };

  //handle modal input open
  const [modalSelect, setModalSelect] = useState(false);
  const handleGetSelectedValue = useCallback(
    (selected) => {
      const id = selected[0] ? selected[0].values.ID : "";
      handleInputNumberChange(id);
      setModalSelect(false);
    },
    [handleInputNumberChange]
  );

  const mode = inputValue?.disabled ? InputMode.readonly : InputMode.editable;
  const Placeholder = content.Hint ?? "";

  switch (inputValue?.DisplayType) {
    case 1:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <InputText
            value={inputValue.value ?? ""}
            placeholder={Placeholder}
            required={inputValue?.required ?? false}
            onChange={(text) => handleInputChange(text)}
            TitleText={displayName(inputValue) ?? ""}
            mode={mode}
          ></InputText>
        </InputWrapper>
      );

    case 13:
      return (
        <>
          <InputWrapper
            order={inputValue.DisplayOrder ?? 0}
            fullSize={props.fullSize}
          >
            <PasswordInput
              value={inputValue.value ?? ""}
              placeholder={Placeholder}
              required={inputValue?.required ?? false}
              onChange={(text) => handleInputPasswordChange(text)}
              TitleText={displayName(inputValue) ?? ""}
            ></PasswordInput>
          </InputWrapper>
          <InputWrapper
            order={inputValue.DisplayOrder ?? 0}
            fullSize={props.fullSize}
          >
            <PasswordInput
              value={cofirmPassword}
              placeholder={Placeholder}
              required={inputValue?.required ?? false}
              onChange={(text) => handleInputChangePasswordConfirm(text)}
              TitleText={"Confirm Password"}
            ></PasswordInput>
          </InputWrapper>
        </>
      );

    case 7:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <DatePicker
            onDateChange={(date: DateReturned | string) =>
              handleDateChange(date)
            }
            Title={inputValue?.DisplayEName ?? "DatePicker"}
            selected={{
              format: DateFormat.DD_MM_YY_HH_MM,
              inputString: inputValue.value,
            }}
            disabled={inputValue.disabled ?? false}
            required={inputValue.required ?? false}
          />
        </InputWrapper>
      );
    case 6:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          {inputValue?.SearchLinkReportID == null &&
            inputValue?.LinkTarget === "" && (
              <InputText
                value={inputValue.value}
                placeholder={Placeholder}
                type={InputType.number}
                required={inputValue?.required ?? false}
                onChange={(text) => handleInputNumberChange(text)}
                TitleText={inputValue?.DisplayEName ?? ""}
                onBlur={(text) => handleInputNumberOnBlue(text)}
                mode={mode}
              ></InputText>
            )}

          {inputValue?.SearchLinkReportID != null && (
            <>
              <InputSearchFieldPopup
                placeholder={Placeholder}
                value={inputValue.value ?? ""}
                onChange={function (text: string): void {
                  console.log("empty ", text);
                }}
                TitleText={inputValue?.DisplayEName ?? ""}
                required={inputValue.required ?? false}
                onSearch={(text: string) => {
                  setModalSelect(true);
                  console.log("empty ", text);
                }}
                disabled={false}
              />
              {modalSelect && (
                <ModalSelectTable
                  content={{
                    request: { reportID: inputValue.SearchLinkReportID },
                  }}
                  onCloseModal={() => setModalSelect(false)}
                  handleGetSelectedValue={handleGetSelectedValue}
                />
              )}
            </>
          )}

          {inputValue?.SearchLinkReportID == null &&
            inputValue?.LinkTarget !== "" && (
              <InputSearchFieldPopup
                placeholder={Placeholder}
                value={inputValue.value ?? ""}
                required={inputValue.required ?? false}
                onChange={function (text: string): void {
                  handleInputNumberChange(text);
                }}
                TitleText={inputValue.DisplayEName ?? ""}
                onSearch={(text: string) => {
                  openNewTab();
                  console.log("empty ", text);
                }}
                disabled={inputValue.disabled ?? false}
              />
            )}

          {/*TO ADD step="{{inputValue.content.decimalValue}}"
                max="{{inputValue.content.MaxValue}}"
                min="{{inputValue.content.MinValue}}"
                ng-required="inputValue.required" ng-disabled="inputValue.disabled" */}
        </InputWrapper>
      );

    case 14:
      //inputValue.updateValue(inputValue.content.Name,inputValue.value,'Eq','text')
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <TextAreaField
            required={inputValue.required ?? false}
            placeholder={Placeholder}
            value={inputValue.value ?? ""}
            onChange={(text) => handleInputChange(text)}
            TitleText={inputValue.DisplayEName ?? ""}
            mode={inputValue.disabled ? InputMode.readonly : InputMode.editable}
          ></TextAreaField>
        </InputWrapper>
      );

    case 4:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <InputText
            value={inputValue.value ?? ""}
            placeholder={Placeholder}
            required={false}
            onChange={(text) => handleInputChange(text)}
            TitleText={inputValue?.DisplayEName ?? ""}
            mode={InputMode.readonly}
          ></InputText>
        </InputWrapper>
      );

    case 10:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <InputText
            value={inputValue.value ?? ""}
            placeholder={Placeholder}
            required={false}
            onChange={(text) => handleInputChange(text)}
            TitleText={inputValue?.DisplayEName ?? ""}
            mode={InputMode.readonly}
          ></InputText>
        </InputWrapper>
      );

    case 2:
      let key = "";
      if (content.DataSource) {
        key = isLocalLanguage(language)
          ? "ComboQueryEField"
          : "ComboQueryHField";
      } else {
        key = isLocalLanguage(language) ? "DisplayEName" : "DisplayLName";
      }

      const Items: Item[] = inputValue.comboValues
        ? inputValue.comboValues?.map((elem: any) => {
            return { value: elem.ComboValueField, label: elem[key] };
          })
        : [];

      let selectedItems: Item[] = [];
      if (inputValue?.ComboDisplayList) {
        selectedItems = inputValue.valueChosen
          ? inputValue.valueChosen.map((elem: any) => {
              return { value: elem.ComboValueField, label: elem[key] };
            })
          : [];
      }

      let childItems: Item[] = [];
      let selectedItemChild: any = null;
      if (inputValue?.ChildName) {
        childItems = inputValue.valueChosen
          ? inputValue.valueChosen.ChildcomboValues.map((elem: any) => {
              return { value: elem.ComboValueField, label: elem[key] };
            })
          : [];
        selectedItemChild = inputValue.ChildValueChosen
          ? {
              value: inputValue.ChildValueChosen.ComboValueField,
              label: inputValue.ChildValueChosen[key],
            }
          : null;
      }

      return (
        <>
          {inputValue?.DataSource &&
            (!inputValue?.ComboDisplayList ? (
              <InputWrapper
                order={inputValue.DisplayOrder ?? 0}
                fullSize={props.fullSize}
              >
                <SingleDropDown
                  placeholder={t(translations.FORMS.SELECT_DROPDOWN)}
                  required={inputValue.required ?? false}
                  onSelect={handleSingleDropDownChange}
                  items={Items}
                  TitleText={displayName(inputValue) ?? ""}
                  searchable={Items.length > 5}
                  searchPlaceHolder={t(translations.FORMS.SEARCH_DROPDOWN)}
                  mode={
                    inputValue.disabled
                      ? DropDownMode.readonly
                      : DropDownMode.selectable
                  }
                  selectedItem={
                    inputValue.valueChosen
                      ? {
                          value: inputValue.valueChosen.ComboValueField,
                          label: inputValue.valueChosen[key],
                        }
                      : undefined
                  }
                />
              </InputWrapper>
            ) : (
              <InputWrapper
                order={inputValue.DisplayOrder ?? 0}
                fullSize={props.fullSize}
              >
                <MultiDropDown
                  placeholder={t(translations.FORMS.SELECT_DROPDOWN)}
                  required={inputValue.required ?? false}
                  onSelect={handleMultiDropDownChange}
                  TitleText={displayName(inputValue) ?? ""}
                  items={Items}
                  selectedItems={selectedItems}
                />
              </InputWrapper>
            ))}

          {inputValue?.ChildName && inputValue.valueChosen && (
            <InputWrapper
              order={inputValue.DisplayOrder ?? 0}
              fullSize={props.fullSize}
            >
              <SingleDropDown
                placeholder={t(translations.FORMS.SELECT_DROPDOWN_CHILD)}
                required={inputValue?.required ?? false}
                onSelect={handleSingleDropDownChildChange}
                items={childItems}
                TitleText={displayChildName(inputValue) ?? ""}
                mode={
                  inputValue.disabled
                    ? DropDownMode.readonly
                    : DropDownMode.selectable
                }
                selectedItem={selectedItemChild}
              />
            </InputWrapper>
          )}
        </>
      );

    case 3:
      const CheckBoxItems: Item[] = [
        { value: 0, label: "NONE" },
        { value: 1, label: "FALSE" },
        { value: 2, label: "TRUE" },
      ];
      const CheckBoxItemsMap = [null, false, true];
      const checkBoxSelectedItem: any = inputValue.valueChosen
        ? {
            value: CheckBoxItemsMap.indexOf(inputValue.valueChosen),
            label:
              CheckBoxItems[CheckBoxItemsMap.indexOf(inputValue.valueChosen)]
                .label,
          }
        : null;

      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          {multiform ? (
            <SingleDropDown
              placeholder={t(translations.FORMS.SELECT_DROPDOWN)}
              required={inputValue?.required ?? false}
              onSelect={HandleCheckBoxDropDownClicked}
              items={CheckBoxItems}
              TitleText={displayName(inputValue) ?? ""}
              searchable={false}
              mode={
                inputValue.disabled
                  ? DropDownMode.readonly
                  : DropDownMode.selectable
              }
              selectedItem={checkBoxSelectedItem}
            />
          ) : (
            <CheckBox
              checked={inputValue.value === "True" ?? false}
              onChange={() => HandleCheckBoxClicked()}
              TitleText={displayName(inputValue) ?? ""}
              disabled={inputValue.disabled}
              // height={75}
            />
          )}
        </InputWrapper>
      );

    case 18:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          <ColorPicker
            TitleContent={displayName(inputValue) ?? ""}
            SelectedColor={inputValue.value}
            onSelectColor={(HexColor: any) => handleColorPicked(HexColor)}
          />
        </InputWrapper>
      );

    case 17:
      return (
        <React.Fragment>
          {inputValue.value ? (
            <InputWrapper
              order={inputValue.DisplayOrder ?? 0}
              fullSize={props.fullSize}
            >
              <ProductPreview
                TitleText={displayName(inputValue) ?? ""}
                url={inputValue.value}
              />
            </InputWrapper>
          ) : null}
        </React.Fragment>
      );

    case 16:
      return (
        <InputWrapper
          order={inputValue.DisplayOrder ?? 0}
          fullSize={props.fullSize}
        >
          {inputValue.fileType == "Picture" ? (
            inputValue.value ? (
              <ProductPreview
                TitleText={displayName(inputValue) ?? ""}
                url={inputValue.value}
              />
            ) : null
          ) : (
            <TitleButton target="_blank" href={inputValue.value}>
              {inputValue.fileName ?? "File Link"}
            </TitleButton>
          )}
        </InputWrapper>
      );
    default:
      return null;
  }
};

type Props = {
  $scope: any;
  content: ContentEntity;
  search: any;
  formobject: any;
  multiform: any;
  add: any;
  commonFunctions: any;
  modal: any;
  state: any;
  SaveValues: (value: any, isSysemChanges: boolean) => void;
  fullSize: any;
  [x: string]: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Wrapper: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const isRtl = useSelector(selectIsRtl);

  const [theme, setTheme] = useState({
    ...customTheme,
    dir: isRtl,
    language: language,
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    setTheme((prev) => {
      return { ...prev, language: language };
    });
  }, [language, i18n]);

  useEffect(() => {
    document.body.dir = isRtl;
  }, [isRtl]);

  return (
    <ThemeProvider theme={theme}>
      <InputGeneric language={language} {...props} />
    </ThemeProvider>
  );
};

const InputGenericField: React.FC<Props> = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default InputGenericField;
