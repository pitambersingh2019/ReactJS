import React, { useEffect, useState } from "react";
import store from "./../../../Redux/store";
import { Provider } from "react-redux";
import ReactToAngularJS from "../react-to-angular";

import { selectLanguage, selectIsRtl } from "../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import PasswordInput from "../../../Component/DesignSystem/PasswordInput";

const PasswordInputField = ({ textvalue, placeholder, $scope, title }) => {
  const onChange = (input) => {
    $scope.$apply(() => {
      $scope.textvalue = input;
    });
  };

  return (
    <PasswordInput
      value={textvalue || ""}
      placeholder={placeholder}
      onChange={onChange}
      TitleText={title}
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
      <PasswordInputField language={language} {...props} />
    </ThemeProvider>
  );
};

const InputPasswordGenericField = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default InputPasswordGenericField;
