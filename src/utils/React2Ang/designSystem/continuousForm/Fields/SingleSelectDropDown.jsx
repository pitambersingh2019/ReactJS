/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import SingleSelectDrop from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { InputWrapper } from "./styles";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../../slice/selectors";
import { isLocalLanguage } from "../../../../CommonFunctions";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
const SingleSelectDropDown = ({ field, SaveValues, DeleteValues }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemChild, setSelectedItemChild] = useState(null);
  const language = useSelector(selectLanguage);
  const { t } = useTranslation();
  const displayName = useCallback(
    (content) => {
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

  const key = useMemo(
    () => (isLocalLanguage(language) ? "ComboQueryEField" : "ComboQueryHField"),
    [language]
  );
  useEffect(() => {
    const options = field.comboValues.map((elem) => {
      return {
        value: elem.ComboValueField,
        label: elem[key],
        ChildcomboValues: elem.ChildcomboValues,
      };
    });
    setItems(options);
  }, [field.comboValues, key]);

  const handleChange = (item) => {
    setSelectedItem(item);
    setSelectedItemChild(null);
    DeleteValues && DeleteValues(field.Name);
    if (item) {
      SaveValues &&
        SaveValues({
          FieldName: field.Name,
          Eq: item.value,
          DataType: "num",
        });
    } else {
      DeleteValues && DeleteValues(field.ChildName);
    }
  };

  const childItems = useMemo(
    () =>
      selectedItem
        ? selectedItem.ChildcomboValues.map((elem) => {
            return { value: elem.ComboValueField, label: elem[key] };
          })
        : [],
    [key, selectedItem]
  );

  const handleChangeChild = (item) => {
    setSelectedItemChild(item);
    if (item) {
      SaveValues &&
        SaveValues({
          FieldName: field.ChildName,
          Eq: item.value,
          DataType: "num",
        });
    } else {
      DeleteValues && DeleteValues(field.ChildName);
    }
  };
  return (
    <InputWrapper>
      <div
        style={{
          display: "flex",
          gap: field.ChildName ? "10px" : "0px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: field.ChildName ? "1 0 47%" : "1 0 100%",
            width: "100px",
          }}
        >
          <SingleSelectDrop
            placeholder={t(translations.FORMS.SELECT_DROPDOWN)}
            onSelect={handleChange}
            TitleText={displayName(field)}
            items={items}
            selectedItem={selectedItem}
          />
        </div>
        {field.ChildName && (
          <div style={{ flex: "1 0 47%", width: "100px" }}>
            <SingleSelectDrop
              placeholder={t(translations.FORMS.SELECT_DROPDOWN)}
              onSelect={handleChangeChild}
              TitleText={displayChildName(field)}
              items={childItems}
              selectedItem={selectedItemChild}
            />
          </div>
        )}
      </div>
    </InputWrapper>
  );
};

export default SingleSelectDropDown;
