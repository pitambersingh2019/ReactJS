import React, { useEffect, useState } from "react";
import store from "../../../Redux/store";
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
  items,
  title,
  selected,
  onupdate,
  language,
}) => {
  // const key = (language === 'eng')? 'ComboQueryEField' : 'ComboQueryHField';
  // useEffect(() => {
  //   inputvalue.initField(inputvalue.valueChosen, 'combo')
  // }, [inputvalue])

  const [options, setoptions] = useState([]);

  const [selecteditem, setselecteditem] = useState(selected);

  useEffect(() => {
    if (items) {
      setoptions(
        items.map((elem, index) => {
          return { value: index, label: elem["SystemLng"] };
        })
      );
      if (selected)
        setselecteditem({
          label: selected.SystemLng,
          value: items.indexOf(selected),
        });
    }
  }, [items, selected]);

  useEffect(() => {
    console.log("selecteditem", selecteditem);
  }, [selecteditem]);
  const onChange = (item) => {
    const chosen = items[item.value];
    console.log(chosen);
    $scope.$apply(() => {
      $scope.selected = chosen;
    });
    onupdate();
  };

  return (
    <SingleDropDown
      placeholder={placeholder}
      required={false}
      onSelect={onChange}
      items={options}
      TitleText={title}
      searchable={true}
      mode={DropDownMode.selectable}
      selectedItem={selecteditem}
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

ReactToAngularJS(
  SingleDropDownGeneric,
  "reactSingleDropDownLanguage",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    placeholder: "=",
    items: "=",
    title: "=",
    onupdate: "=",
    selected: "=",
  }
);
