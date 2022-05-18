import React, { useEffect, useState } from "react";
import store from "./../../../Redux/store";
import { Provider } from "react-redux";

import ReactToAngularJS from "../react-to-angular";

import { selectLanguage, selectIsRtl } from "../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";

import SingleDropDown from "../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../Component/DesignSystem/DropDown/types";

// ISNGLE DROPDOWN SELECT Component
const SingleDropDownCom = ({
  placeholder,
  $scope,
  inputvalue,
  disabled,
  required,
  language,
}) => {
  const key = language === "eng" ? "ComboQueryEField" : "ComboQueryHField";
  useEffect(() => {
    inputvalue.initField(inputvalue.valueChosen, "combo");
  }, [inputvalue]);

  const [options, setoptions] = useState([]);
  useEffect(() => {
    setoptions(
      inputvalue.value.map((elem) => {
        return { value: elem["ComboValueField"], label: elem[key] };
      })
    );
  }, [inputvalue.value, key]);

  const onChange = (item) => {
    //get item of choosen one
    let chosen = inputvalue.value.find(
      (elem) => elem.ComboValueField === item.value
    );
    $scope.$apply(() => {
      $scope.inputvalue.valueChosen = chosen;
    });
    inputvalue.updateValue(
      inputvalue.content.Name,
      inputvalue.valueChosen,
      "Eq",
      "combo",
      inputvalue.content.ChildName
    );
  };

  return (
    <SingleDropDown
      placeholder={placeholder}
      required={required}
      onSelect={onChange}
      items={options}
      TitleText={inputvalue.contentDisplayName}
      searchable={true}
      mode={disabled ? DropDownMode.disabled : DropDownMode.selectable}
      selectedItem={
        inputvalue.valueChosen
          ? {
              label: inputvalue.valueChosen[key],
              value: inputvalue.valueChosen.ComboValueField,
            }
          : null
      }
    />
  );
};

const Wrapper = (props) => {
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const isRtl = useSelector(selectIsRtl);

  const [theme, setTheme] = useState({ dir: isRtl, language: language });

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
      <SingleDropDownCom language={language} {...props} />
    </ThemeProvider>
  );
};

const SingleDropDownGeneric = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default SingleDropDownGeneric;
