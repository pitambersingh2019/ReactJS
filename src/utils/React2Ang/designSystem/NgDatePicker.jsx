import React, { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { Provider } from "react-redux";

import { selectLanguage, selectIsRtl } from "../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import DatePicker from "../../../Component/DesignSystem/DatePicker";

const DatePickerField = ({
  $scope,
  onupdate,
  onupdatedate,
  oninit,
  value,
  contentname,
  disabled,
}) => {
  // <input placeholder="{{inputValue.content.Hint}}"  ng-init="inputValue.initField(inputValue.value,'date')" type="datetime" class="form-control" ng-model="inputValue.value" date-time format="DD/MM/YYYY HH:mm:ss"  view="date" auto-close="true" ng-blur="inputValue.updateValue(content.Name,inputValue.value,'Eq','Date');inputValue.updateDate('value')" ng-required="inputValue.required" ng-disabled="inputValue.disabled"/>
  // </div>

  useEffect(() => {
    console.log(value);
    oninit(value, "date");
  }, [oninit, value]);

  const handleDateChange = (date) => {
    // $scope.$apply(() => {
    //     $scope.value = moment(date);
    // });
    console.log("DATE", date);
    onupdate(contentname, date, "Eq", "Date");
    onupdatedate("value");
  };

  return (
    <DatePicker
      onDateChange={(date) => handleDateChange(date)}
      selected={value._i}
      disabled={disabled}
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
      <DatePickerField language={language} {...props} />
    </ThemeProvider>
  );
};

const InputDatePicker = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default InputDatePicker;
