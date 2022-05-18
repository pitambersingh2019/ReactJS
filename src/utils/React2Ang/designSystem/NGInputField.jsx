import React, { useEffect, useState } from "react";
import store from "./../../../Redux/store";
import { Provider } from "react-redux";
import ReactToAngularJS from "../react-to-angular";

import { selectLanguage, selectIsRtl } from "../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import InputFieldText from "../../../Component/DesignSystem/InputText";
import { InputType } from "../../../Component/DesignSystem/InputText/types";

const InputField = ({
  textvalue,
  placeholder,
  onupdate,
  content,
  oninit,
  $scope,
  required,
  disabled,
  title,
  type,
}) => {
  //type => text, number
  const inputtype = type === "text" ? InputType.text : InputType.number;

  useEffect(() => {
    if (oninit) {
      if (inputtype === InputType.text) oninit(textvalue, "text");
      else oninit(textvalue, "num");
    }
  }, []);

  const onChange = (input) => {
    if (inputtype === InputType.text) {
      $scope.$apply(() => {
        $scope.textvalue = input;
      });
      if (onupdate) onupdate(content.Name, input, "Eq", "text");
    } else {
      $scope.$apply(() => {
        $scope.textvalue = Number(input);
      });
      if (onupdate) onupdate(content.Name, input, "Eq", "num");
    }
  };

  return (
    <InputFieldText
      value={textvalue || ""}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      TitleText={title}
      type={inputtype}
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
      <InputField language={language} {...props} />
    </ThemeProvider>
  );
};

const InputGenericField = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default InputGenericField;
