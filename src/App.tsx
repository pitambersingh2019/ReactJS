/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { selectLanguage, selectIsRtl } from "./slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { customTheme } from "./styles/theme";
import RuleContainer from "./Containers/RuleContainer/RuleContainer";

function App() {
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const isRtl = useSelector(selectIsRtl);

  const [theme, setTheme] = useState({
    ...customTheme,
    dir: isRtl,
    background: "white",
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
      {/*
      <div style={{ width: "400px", padding: "50px" }}>
        <Dropdown
          placeholder={"Select an Item"}
          required={true}
          onSelect={function (item: any): void {
            console.log(item);
          }}
          TitleText={"DropDown"}
          items={options}
          mode={DropDownMode.selectable}
        />
      </div>
      */}
      {/* <Login /> */}
      <div className="App">
        {/*<LangBar>
          <Item onClick={() => handleThemechange("ltr")}>En</Item>
          <Item onClick={() => handleThemechange("rtl")}>Heb</Item>
        </LangBar>*/}
        {/* <ListView handleMessageParams={function (message: string, subMachinesList: string[], subMachinesIDList: number[]): void {
          console.log("a");
        } }></ListView> */}

        {/* <DropDownSearch data={[{"label": "sa","value":1},{"label": "sami","value":2}]} handleItemClicked={(label?: string, value?: number) => handleitem(label, value)}/> */}

        <RuleContainer />
        {/*<ProductRecipe />*/}
        {/*<GridVirtualizerFixedEditable />*/}
      </div>
    </ThemeProvider>
  );
}

export default App;
